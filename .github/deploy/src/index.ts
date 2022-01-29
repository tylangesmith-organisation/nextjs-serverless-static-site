import { App } from '@aws-cdk/core'
import { getStackName } from './helpers/helper'
import Stack from './stack'

// Ensure we have the required environment variables
if (!process.env.BRANCH_NAME) throw Error('A BRANCH_NAME must be provided...')
if (!process.env.DOMAIN_NAME) throw Error('A DOMAIN_NAME must be provided...')
if (!process.env.SUBDOMAIN_NAME) throw Error('A SUBDOMAIN_NAME must be provided...')
if (!process.env.GITHUB_REPOSITORY) throw Error('A GITHUB_REPOSITORY must be provided...')

// Get our stack name for our github repository name and branch name
const stackName = getStackName({
  githubRepository: process.env.GITHUB_REPOSITORY,
  branchName: process.env.BRANCH_NAME
})

// Create our AWS CloudFormation stack
new Stack(new App(), {
  stackName,
  branchName: process.env.BRANCH_NAME,
  domainName: process.env.DOMAIN_NAME,
  subDomainName: process.env.SUBDOMAIN_NAME,
  env: {
    // Need to pass these in to lookup the route53 hostedZone
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})
