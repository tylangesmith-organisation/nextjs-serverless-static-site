import { App } from '@aws-cdk/core'
import { getBranchedSubDomainName, getUrl, getStackName } from './helpers/helper'
import Stack from './stack'

// e.g BRANCH_NAME: my-feature
// e.g DOMAIN_NAME: tylangesmith.com
// e.g. SUBDOMAIN_NAME: nextjs-serverless-static-site
// e.g. GITHUB_REPOSITORY: tylangesmith-organisation/nextjs-serverless-static-site
if (!process.env.BRANCH_NAME) throw Error('A BRANCH_NAME must be provided...')
if (!process.env.DOMAIN_NAME) throw Error('A DOMAIN_NAME must be provided...')
if (!process.env.SUBDOMAIN_NAME) throw Error('A SUBDOMAIN_NAME must be provided...')
if (!process.env.GITHUB_REPOSITORY) throw Error('A GITHUB_REPOSITORY must be provided...')

// Branch our subdomain
// e.g. branchedSubDomainName: nextjs-serverless-static-site-my-feature
const branchedSubDomainName = getBranchedSubDomainName({
  branchName: process.env.BRANCH_NAME,
  subDomainName: process.env.SUBDOMAIN_NAME
})

// Now we want to combine this with our domainName
// e.g. url: nextjs-serverless-static-site-my-feature.tylangesmith.com
const url = getUrl({
  domainName: process.env.DOMAIN_NAME,
  branchedSubDomainName
})

// Get our stack name which also supports branching
// e.g. stackName: nextjs-serverless-static-site-my-feature
const stackName = getStackName({
  githubRepository: process.env.GITHUB_REPOSITORY,
  branchName: process.env.BRANCH_NAME
})

new Stack(new App(), {
  stackName,
  url,
  domainName: process.env.DOMAIN_NAME,
  subDomainName: branchedSubDomainName,
  env: {
    // These extra env variables are required for route53 hosted zone lookups
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})
