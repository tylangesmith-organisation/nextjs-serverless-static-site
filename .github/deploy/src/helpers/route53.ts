import { Stack } from '@aws-cdk/core'
import { IDistribution } from '@aws-cdk/aws-cloudfront'
import { IHostedZone, HostedZone, ARecord, RecordTarget } from '@aws-cdk/aws-route53'
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets'

export interface GetHostedZoneProps {
  scope: Stack;
  domainName: string;
}

export const getHostedZone = (props: GetHostedZoneProps): IHostedZone => {
  const { scope, domainName } = props

  return HostedZone.fromLookup(scope, 'hostedZone', {
    domainName
  })
}

export interface CreateARecordForDistributionProps {
  scope: Stack;
  hostedZone: IHostedZone;
  branchedSubDomainName: string;
  distribution: IDistribution;
}

export const createARecordForDistribution = (props: CreateARecordForDistributionProps): ARecord => {
  const { scope, hostedZone, branchedSubDomainName, distribution } = props

  return new ARecord(scope, 'aRecord', {
    target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    zone: hostedZone,
    recordName: branchedSubDomainName
  })
}
