import { App } from '@aws-cdk/core'
import { getSubDomainName, getUrl } from './helpers/helper'
import Stack from './stack'

// Ensure we have the required environment variables
if (!process.env.BRANCH_NAME) throw Error('A BRANCH_NAME must be provided...')
if (!process.env.DOMAIN_NAME) throw Error('A DOMAIN_NAME must be provided...')
const branchName = process.env.BRANCH_NAME

// e.g. tylangesmith.com
const domainName = process.env.DOMAIN_NAME
const subDomainName = getSubDomainName({ branchName })
const url = getUrl({ domainName, subDomainName })

const app = new App()

new Stack(app, {
  stackName: `tylangesmith-${branchName}`,
  url,
  domainName,
  subDomainName
})
