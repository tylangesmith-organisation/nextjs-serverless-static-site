import { Stack } from '@aws-cdk/core'
import { IHostedZone } from '@aws-cdk/aws-route53'
import { DnsValidatedCertificate, ICertificate } from '@aws-cdk/aws-certificatemanager'

export interface CreateCertificateProps {
  scope: Stack;
  hostedZone: IHostedZone;
  url: string;
}

export const createCertificate = (props: CreateCertificateProps): ICertificate => {
  const { scope, hostedZone, url } = props

  return new DnsValidatedCertificate(scope, 'certificate', {
    domainName: url,
    hostedZone,
    region: 'us-east-1'
  })
}
