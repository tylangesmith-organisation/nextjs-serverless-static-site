import { Stack, RemovalPolicy } from '@aws-cdk/core'
import { Bucket, IBucket } from '@aws-cdk/aws-s3'
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment'
import { IDistribution } from '@aws-cdk/aws-cloudfront'

export interface CreateBucketProps {
  scope: Stack;
  bucketName: string;
}

export const createBucket = (props: CreateBucketProps): IBucket => {
  const { scope, bucketName } = props

  return new Bucket(scope, 'bucket', {
    bucketName,
    autoDeleteObjects: true,
    removalPolicy: RemovalPolicy.DESTROY
  })
}

export interface CreateBucketDeploymentProps {
  scope: Stack;
  bucket: IBucket;
  distribution: IDistribution;
  filePath: string;
}

export const createBucketDeployment = (props: CreateBucketDeploymentProps): BucketDeployment => {
  const { scope, bucket, distribution, filePath } = props

  return new BucketDeployment(scope, 'bucketDeployment', {
    destinationBucket: bucket,
    sources: [Source.asset(filePath)],
    distribution
  })
}
