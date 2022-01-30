import { Stack } from '@aws-cdk/core'
import { IBucket } from '@aws-cdk/aws-s3'
import {
  CloudFrontWebDistribution,
  IDistribution,
  IFunction,
  Function,
  FunctionCode,
  FunctionEventType,
  OriginAccessIdentity,
  IOriginAccessIdentity
} from '@aws-cdk/aws-cloudfront'
import { ICertificate } from '@aws-cdk/aws-certificatemanager'

export interface CreateFunctionProps {
  scope: Stack;
  functionName: string;
  filePath: string;
}

export const createFunction = (props: CreateFunctionProps): IFunction => {
  const { scope, functionName, filePath } = props

  return new Function(scope, 'mappingFunction', {
    functionName,
    code: FunctionCode.fromFile({
      filePath
    })
  })
}

export interface CreateOriginAccessIdentityProps {
  scope: Stack
}

export const createOriginAccessIdentity = (props: CreateOriginAccessIdentityProps): IOriginAccessIdentity => {
  const { scope } = props
  return new OriginAccessIdentity(scope, 'originAccessIdentity')
}

export interface CreateDistributionProps {
  scope: Stack;
  staticWebsiteBucket: IBucket;
  certificate: ICertificate;
  url: string;
  functionAssociation: IFunction;
  originAccessIdentity: IOriginAccessIdentity;
}

export const createDistribution = (props: CreateDistributionProps): IDistribution => {
  const { scope, staticWebsiteBucket, certificate, url, functionAssociation, originAccessIdentity } = props

  return new CloudFrontWebDistribution(scope, 'distribution', {
    originConfigs: [
      {
        s3OriginSource: {
          originAccessIdentity,
          s3BucketSource: staticWebsiteBucket
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
