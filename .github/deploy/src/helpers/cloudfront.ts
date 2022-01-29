import { Stack } from '@aws-cdk/core'
import { IBucket } from '@aws-cdk/aws-s3'
import { CloudFrontWebDistribution, OriginProtocolPolicy } from '@aws-cdk/aws-cloudfront'
import { ICertificate } from '@aws-cdk/aws-certificatemanager'

export interface CreateDistributionProps {
  scope: Stack;
  staticWebsiteBucket: IBucket;
  certificate: ICertificate;
  url: string;
}

export const createDistribution = (props: CreateDistributionProps): CloudFrontWebDistribution => {
  const { scope, staticWebsiteBucket, certificate, url } = props

  return new CloudFrontWebDistribution(scope, 'distribution', {
    originConfigs: [
      {
        customOriginSource: {
          domainName: staticWebsiteBucket.bucketWebsiteDomainName,
          originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY
        },
        behaviors: [
          {
            isDefaultBehavior: true
          }
          // {
          //   isDefaultBehavior: true,
          //   functionAssociations: [
          //     {
          //       function,
          //       eventType: LambdaEdgeEventType.ORIGIN_REQUEST
          //     }
          //   ]
          // },
          // {
          //   pathPattern: '/_next/*'
          // }
        ]
      }
    ],
    viewerCertificate: {
      aliases: [url],
      props: {
        acmCertificateArn: certificate.certificateArn,
        sslSupportMethod: 'sni-only',
        minimumProtocolVersion: 'TLSv1'
      }
    }
  })
}
