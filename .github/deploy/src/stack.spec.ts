import { App } from '@aws-cdk/core'
import { SynthUtils } from '@aws-cdk/assert'
import Stack from './stack'
import { GetHostedZoneProps } from './helpers/route53'

// The HostedZone.fromLookup requires an AWS SDK call so let's mock that
jest.mock('./helpers/route53', () => ({
  ...(jest.requireActual('./helpers/route53')),
  getHostedZone: jest.fn((props: GetHostedZoneProps) => {
    const { domainName } = props
    return {
      zoneName: domainName,
      hostedZoneArn: '',
      hostedZoneId: ''
    }
  })
}))

describe('Stack', () => {
  it('should create the expected stack for the master branch', () => {
    // Arrange
    const app = new App()
    const domainName = 'tylangesmith.com'
    const subDomainName = 'nextjs-serverless-static-site'
    const url = `${subDomainName}.${domainName}`

    // Act
    const stack = new Stack(app, {
      url,
      domainName,
      subDomainName,
      env: {
        region: 'us-east-1'
      }
    })

    // Assert
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })

  it('should create the expected stack for the non-master branch', () => {
    // Arrange
    const app = new App()
    const branchName = 'my-feature'
    const domainName = 'tylangesmith.com'
    const subDomainName = 'nextjs-serverless-static-site'
    const url = `${subDomainName}-${branchName}.${domainName}`

    // Act
    const stack = new Stack(app, {
      url,
      domainName,
      subDomainName,
      env: {
        region: 'us-east-1'
      }
    })

    // Assert
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })
})
