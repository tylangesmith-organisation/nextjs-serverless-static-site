import { getBranchedSubDomainName, getUrl, isMasterBranch, getGithubRepositoryName, getStackName } from './helper'

describe('getSubDomainName', () => {
  it('should return base subdomain + branch name for non master branch', () => {
    // Arrange
    const subDomainName = 'nextjs-serverless-static-site'
    const branchName = 'formatting'

    // Act
    const branchedSubDomain = getBranchedSubDomainName({
      subDomainName,
      branchName
    })

    // Assert
    expect(branchedSubDomain).toEqual(`${subDomainName}-${branchName}`)
  })

  it('should return base subdomain for master branch', () => {
    // Arrange
    const subDomainName = 'nextjs-serverless-static-site'
    const branchName = 'master'

    // Act
    const branchedSubDomain = getBranchedSubDomainName({
      subDomainName,
      branchName
    })

    // Assert
    expect(branchedSubDomain).toEqual(subDomainName)
  })
})

describe('getUrl', () => {
  it('should return correct url for domainName and subDomainName', () => {
    // Arrange
    const domainName = 'tylangesmith.com'
    const subDomainName = 'formatting'

    // Act
    const url = getUrl({
      domainName,
      branchedSubDomainName: subDomainName
    })

    // Assert
    expect(url).toEqual(`${subDomainName}.${domainName}`)
  })
})

describe('isMasterBranch', () => {
  it('should return true for the master branch', () => {
    // Arrange
    const branchName = 'master'

    // Act
    const isMaster = isMasterBranch(branchName)

    // Assert
    expect(isMaster).toBeTruthy()
  })

  it('should return false for a non master branch', () => {
    // Arrange
    const branchName = 'thisisnotmaster'

    // Act
    const isMaster = isMasterBranch(branchName)

    // Assert
    expect(isMaster).toBeFalsy()
  })
})

describe('getGithubRepositoryName', () => {
  it('should return github repository name', () => {
    // Arrange
    const githubRepository = 'tylangesmith-organisation/nextjs-serverless-static-site'

    // Act
    const githubRepositoryName = getGithubRepositoryName(githubRepository)

    // Assert
    expect(githubRepositoryName).toEqual('nextjs-serverless-static-site')
  })
})

describe('getStackName', () => {
  it('should return stack name for non master branch', () => {
    // Arrange
    const githubRepositoryName = 'nextjs-serverless-static-site'
    const githubRepository = `tylangesmith-organisation/${githubRepositoryName}`
    const branchName = 'feature-xyz'

    // Act
    const stackName = getStackName({ githubRepository, branchName })

    // Assert
    expect(stackName).toEqual(`${githubRepositoryName}/${branchName}`)
  })

  it('should return stack name for master branch', () => {
    // Arrange
    const githubRepositoryName = 'nextjs-serverless-static-site'
    const githubRepository = `tylangesmith-organisation/${githubRepositoryName}`
    const branchName = 'master'

    // Act
    const stackName = getStackName({ githubRepository, branchName })

    // Assert
    expect(stackName).toEqual(`${githubRepositoryName}/${branchName}`)
  })
})
