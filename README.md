[![Deploy](https://github.com/tylangesmith-organisation/nextjs-serverless-static-site/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/tylangesmith-organisation/nextjs-serverless-static-site/actions/workflows/deploy.yml)

## Next.js Serverless Static Site

This is an example project to demonstate how to deploy a Next.js static site using AWS CDK.

Checkout the blog post for a more indepth explaination: [Building a Next.js Serverless Static Site using AWS CDK](https://tylangesmith.com/blog/building-a-nextjs-serverless-static-site-using-aws-cdk).

## Deploying the Project

All the CI / CD and AWS CDK infrastructure code can be found under the [.github](.github) folder. This requires you to have an AWS account already setup with a few essentials.

Some of these essentials include:

- IAM user you can use for deployment
- AWS CDK already bootstrapped
- Your domain setup in Route53

Checkout my [tylangesmith-organisation/iam-entities](https://github.com/tylangesmith-organisation/iam-entities) and [tylangesmith-organisation/cdk-bootstrap](https://github.com/tylangesmith-organisation/cdk-bootstrap) repos that might help with this.

After that's complete you'll need to ensure the environment variables in the [deploy.yml](.github/workflows/deploy.yml) file are set. These are as follows

| Variable              | Type                 | Description                    |
|-----------------------|----------------------|--------------------------------|
| ACCOUNT_ID            | GitHub Secret        | The AWS Account ID             |
| AWS_ACCESS_KEY_ID     | GitHub Secret        | The IAM user Access Key ID     |
| AWS_SECRET_ACCESS_KEY | GitHub Secret        | The IAM user Secret Access Key |
| AWS_DEFAULT_REGION    | Environment Variable | The default AWS region to use  |
| DOMAIN_NAME           | Environment Variable | Your domain name               |
| SUBDOMAIN_NAME        | Environment Variable | The subdomain to use           |
