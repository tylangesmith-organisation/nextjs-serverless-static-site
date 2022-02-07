import { Stack } from '@aws-cdk/core'
import { IBucket } from '@aws-cdk/aws-s3'
import {
  Distribution,
  IDistribution,
  IFunction,
  Function,
  FunctionCode,
  FunctionEventType,
  OriginAccessIdentity,
  IOriginAccessIdentity
} from '@aws-cdk/aws-cloudfront'
import { ICertificate } from '@aws-cdk/aws-certificatemanager'
import { S3Origin } from '@aws-cdk/aws-cloudfront-origins'

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
}

export const createDistribution = (props: CreateDistributionProps): IDistribution => {
  const { scope, staticWebsiteBucket, certificate, url, functionAssociation } = props

  const origin = new S3Origin(staticWebsiteBucket)

  return new Distribution(scope, 'distribution', {
    domainNames: [url],
    defaultBehavior: {
      origin,
      functionAssociations: [
        {
          function: functionAssociation,
          eventType: FunctionEventType.VIEWER_REQUEST
        }
      ]
    },
    certificate
  })
}
