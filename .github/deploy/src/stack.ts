import { App, Stack, StackProps } from '@aws-cdk/core'
import { createBucket, createBucketDeployment } from './helpers/bucket'
import { getHostedZone, createARecordForDistribution } from './helpers/route53'
import { createCertificate } from './helpers/certificate'
import { createFunction, createDistribution } from './helpers/cloudfront'

export interface Props extends StackProps {
  url: string;
  domainName: string;
  subDomainName: string
}

export default class StaticWebsiteStack extends Stack {
  constructor (scope: App, props: Props) {
    super(scope, 'staticWebsite', props)
    const { url, domainName, subDomainName } = props

    // Let's create somewhere to store our static website content
    // For that we can use an S3 bucket
    const bucket = createBucket({
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
    // on a defined path
    // This allows us to ensure pages are mapped to their correct html files when
    // the Next.js library isn't loaded on the client
    const functionAssociation = createFunction({
      scope: this,
      functionName: `mapping-${this.stackName}`,
      filePath: './src/functions/mapperFunction.js'
    })

    // With those few components now created we can now create our CloudFront
    // distribution
    // This allows for our static website content to be propogated across a CDN
    // geographically closer to our users
    const distribution = createDistribution({
      scope: this,
      bucket,
      certificate,
      url,
      functionAssociation
    })

    // Create an A record entry in Route53 that points to our CloudFront distribution
    // E.g. nextjs-serverless-static-site.tylangesmith.com ==> xyz.cloudfront.net
    createARecordForDistribution({
      scope: this,
      hostedZone,
      subDomainName,
      distribution
    })

    // Finally let's deploy our static content to our S3 bucket
    createBucketDeployment({
      scope: this,
      bucket,
      distribution,
      filePath: './out'
    })
  }
}
