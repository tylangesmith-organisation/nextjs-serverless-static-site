import { Stack } from '@aws-cdk/core'
import { Function, Runtime, AssetCode, Version } from '@aws-cdk/aws-lambda'
import { Role, PolicyStatement, ServicePrincipal, CompositePrincipal, Effect } from '@aws-cdk/aws-iam'

export interface CreateEdgeLambdaFunctionProps {
  scope: Stack;
  name: string;
  handler: string;
}

export const createEdgeLambdaFunction = (props: CreateEdgeLambdaFunctionProps): Version => {
  const { scope, name, handler } = props

  const executionRole = new Role(scope, `${name}-execution-role`, {
    assumedBy: new CompositePrincipal(
      new ServicePrincipal('lambda.amazonaws.com'),
      new ServicePrincipal('edgelambda.amazonaws.com')
    )
  })

  executionRole.addToPolicy(new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ['sts:AssumeRole'],
    resources: ['*']
  }))

  executionRole.addToPolicy(new PolicyStatement({
    effect: Effect.ALLOW,
    actions: [
      'logs:CreateLogStream',
      'logs:PutLogEvents',
      'logs:CreateLogGroup'
    ],
    resources: ['*']
  }))

  const lambda = new Function(scope, `${name}-function`, {
    runtime: Runtime.NODEJS_14_X,
    code: new AssetCode('./src/functions'),
    handler,
    role: executionRole
  })

  return new Version(scope, `${name}-function-version`, {
    lambda
  })
}
