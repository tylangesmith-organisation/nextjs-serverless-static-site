import { App } from '@aws-cdk/core'
import { getBranchedSubDomainName, getUrl } from './helpers/helper'
import Stack from './stack'

// Ensure we have the required environment variables
if (!process.env.BRANCH_NAME) throw Error('A BRANCH_NAME must be provided...')
if (!process.env.DOMAIN_NAME) throw Error('A DOMAIN_NAME must be provided...')
if (!process.env.SUBDOMAIN_NAME) throw Error('A SUBDOMAIN_NAME must be provided...')

// Construct our website urls for the current branch
const branchName = process.env.BRANCH_NAME
const domainName = process.env.DOMAIN_NAME
const subDomainName = process.env.SUBDOMAIN_NAME
const branchedSubDomainName = getBranchedSubDomainName({ subDomainName, branchName })
const url = getUrl({ domainName, branchedSubDomainName })

console.log(`GITHUB_REPOSITORY: ${process.env.GITHUB_REPOSITORY}`)

const app = new App()

new Stack(app, {
  stackName: `nextjs-serverless-static-site-${branchName}`,
  url,
  domainName,
  subDomainName,
  env: {
    // Need to pass these in to lookup the route53 hostedZone
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})
