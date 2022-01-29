import { App, Stack, StackProps } from '@aws-cdk/core'
import { getBranchedSubDomainName, getUrl } from './helpers/helper'
import { createStaticWebsiteBucket, createStaticWebsiteBucketDeployment } from './helpers/bucket'
import { getHostedZone, createARecordForDistribution } from './helpers/route53'
import { createCertificate } from './helpers/certificate'
import { createFunction, createDistribution } from './helpers/cloudfront'

export interface Props extends StackProps {
  branchName: string;
  domainName: string;
  subDomainName: string
}

export default class StaticWebsiteStack extends Stack {
  constructor (scope: App, props: Props) {
    super(scope, 'staticWebsite', props)
    const { branchName, domainName, subDomainName } = props
    // Prop value examples
    // branchName: my-feature
    // domainName: tylangesmith.com
    // subDomainName: nextjs-serverless-static-site

    // First let's branch our subDomain
    // branchedSubDomainName: ${subDomainName}-${branch}
    //                        e.g. nextjs-serverless-static-site-my-feature
    const branchedSubDomainName = getBranchedSubDomainName({
      branchName,
      subDomainName
    })

    // Now we want to combine this with our domainName to get something close
    // to the final url
    // url: e.g. nextjs-serverless-static-site-my-feature.tylangesmith.com
    const url = getUrl({
      domainName,
      branchedSubDomainName
    })

    // Let's create somewhere to store our static website content
    // For that we can use an S3 bucket with static website hosting enabled
    const staticWebsiteBucket = createStaticWebsiteBucket({
      scope: this,
      bucketName: url
    })

    // Next let's lookup and grab a reference to our hosted zone in Route53
    const hostedZone = getHostedZone({
      scope: this,
      domainName
    })

    // Now we want to create an SSL certificate for our url under the hosted
    // zone we just grabbed a reference to
    // This will allow us to securely server content from our CloudFront Distribution
    const certificate = createCertificate({
      scope: this,
      hostedZone,
      url
    })

    // Now let's create our mapping function. This runs on CloudFront at the edge
    // on a particular set of paths
    // This allows us to ensure pages are mapped to their correct html files when
    // the Next.js library isn't loaded on the client
    const functionAssociation = createFunction({
      scope: this,
      name: 'mapping',
      filePath: './src/functions/mapperFunction.js'
    })

    const distribution = createDistribution({
      scope: this,
      staticWebsiteBucket,
      certificate,
      url,
      functionAssociation
    })

    createARecordForDistribution({
      scope: this,
      hostedZone,
      branchedSubDomainName,
      distribution
    })

    createStaticWebsiteBucketDeployment({
      scope: this,
      staticWebsiteBucket,
      distribution
    })
  }
}
