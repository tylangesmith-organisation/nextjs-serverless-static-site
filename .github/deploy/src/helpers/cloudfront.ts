import { Stack } from '@aws-cdk/core'
import { IBucket } from '@aws-cdk/aws-s3'
import { CloudFrontWebDistribution, OriginProtocolPolicy, IFunction, Function, FunctionCode, FunctionEventType } from '@aws-cdk/aws-cloudfront'
import { ICertificate } from '@aws-cdk/aws-certificatemanager'

export interface CreateFunctionProps {
  scope: Stack;
  name: string;
  filePath: string;
}

export const createFunction = (props: CreateFunctionProps): IFunction => {
  const { scope, name, filePath } = props

  return new Function(scope, `${name}Function`, {
    code: FunctionCode.fromFile({
      filePath
    })
  })
}

export interface CreateDistributionProps {
  scope: Stack;
  staticWebsiteBucket: IBucket;
  certificate: ICertificate;
  url: string;
  functionAssociation: IFunction;
}

export const createDistribution = (props: CreateDistributionProps): CloudFrontWebDistribution => {
  const { scope, staticWebsiteBucket, certificate, url, functionAssociation } = props

  return new CloudFrontWebDistribution(scope, 'distribution', {
    originConfigs: [
      {
        customOriginSource: {
          domainName: staticWebsiteBucket.bucketWebsiteDomainName,
          originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY
        },
        behaviors: [
          {
            isDefaultBehavior: true,
            functionAssociations: [
              {
                function: functionAssociation,
                eventType: FunctionEventType.VIEWER_REQUEST
              }
            ],
            pathPattern: '/_next/*'
          }
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
