import { getSubDomainName, getUrl, isMasterBranch } from './helper'

describe('getSubDomainName', () => {
  it('should return branch name for non master branch', () => {
    // Arrange
    const baseSubdomainName = 'nextjs-serverless-static-site'
    const branchName = 'formatting'

    // Act
    const subDomain = getSubDomainName({
      baseSubdomainName,
      branchName
    })

    // Assert
    expect(subDomain).toEqual(`${baseSubdomainName}-${branchName}`)
  })

  it('should return empty string master branch', () => {
    // Arrange
    const baseSubdomainName = 'nextjs-serverless-static-site'
    const branchName = ''

    // Act
    const subDomain = getSubDomainName({
      baseSubdomainName,
      branchName
    })

    // Assert
    expect(subDomain).toEqual(baseSubdomainName)
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
      subDomainName
    })

    // Assert
    expect(url).toEqual(`${subDomainName}.${domainName}`)
  })

  it('should return correct url for domainName and empty subDomainName', () => {
    // Arrange
    const domainName = 'tylangesmith.com'
    const subDomainName = ''

    // Act
    const url = getUrl({
      domainName,
      subDomainName
    })

    // Assert
    expect(url).toEqual(`${domainName}`)
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
