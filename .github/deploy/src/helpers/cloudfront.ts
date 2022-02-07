import { Stack } from '@aws-cdk/core'
import { IBucket } from '@aws-cdk/aws-s3'
import {
  Distribution,
  IDistribution,
  IFunction,
  Function,
  FunctionCode,
  FunctionEventType
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

export interface CreateDistributionProps {
  scope: Stack;
  bucket: IBucket;
  certificate: ICertificate;
  url: string;
  functionAssociation: IFunction;
}

export const createDistribution = (props: CreateDistributionProps): IDistribution => {
  const { scope, bucket, certificate, url, functionAssociation } = props

  return new Distribution(scope, 'distribution', {
    domainNames: [url],
    defaultBehavior: {
      origin: new S3Origin(bucket),
      functionAssociations: [
        {
          function: functionAssociation,
          eventType: FunctionEventType.VIEWER_REQUEST
        }
      ]
    },
    certificate,
    defaultRootObject: '/index.html',
    errorResponses: [
      {
        httpStatus: 404,
        responseHttpStatus: 404,
        responsePagePath: '/404.html'
      }
    ]
  })
}
