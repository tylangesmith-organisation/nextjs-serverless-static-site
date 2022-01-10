import { App, Stack, StackProps } from '@aws-cdk/core'
import { createStaticWebsiteBucket, createStaticWebsiteBucketDeployment } from './helpers/bucket'
import { getHostedZone, createARecordForDistribution } from './helpers/route53'
import { createCertificate } from './helpers/certificate'
import { createEdgeLambdaFunction } from './helpers/lambda'
import { createDistribution } from './helpers/cloudfront'

export interface Props extends StackProps {
  url: string;
  domainName: string;
  subDomainName: string;
}

export default class Website extends Stack {
  constructor (scope: App, props: Props) {
    super(scope, 'nextjs-serverless-static-site', props)
    const { url, domainName, subDomainName } = props

    const staticWebsiteBucket = createStaticWebsiteBucket({
      scope: this,
      bucketName: url
    })

    const hostedZone = getHostedZone({
      scope: this,
      domainName
    })

    const certificate = createCertificate({
      scope: this,
      hostedZone,
      url
    })

    const edgeLambdaFunction = createEdgeLambdaFunction({
      scope: this,
      handler: 'mapperFunction.handler',
      name: 'mapper'
    })

    const distribution = createDistribution({
      scope: this,
      staticWebsiteBucket,
      certificate,
      url,
      edgeLambdaFunction
    })

    createARecordForDistribution({
      scope: this,
      hostedZone,
      subDomainName,
      distribution
    })

    createStaticWebsiteBucketDeployment({
      scope: this,
      staticWebsiteBucket,
      distribution
    })
  }
}
