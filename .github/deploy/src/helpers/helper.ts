export const isMasterBranch = (branchName: string): boolean => {
  return branchName === 'master'
}

export interface GetSubDomainNameProps {
  subDomainName: string;
  branchName: string;
}

export const getBranchedSubDomainName = (props: GetSubDomainNameProps): string => {
  const { subDomainName, branchName } = props
  return isMasterBranch(branchName) ? subDomainName : `${subDomainName}-${branchName}`
}

export interface GetUrlProps {
  domainName: string;
  branchedSubDomainName: string;
}

export const getUrl = (props: GetUrlProps): string => {
  const { domainName, branchedSubDomainName } = props
  return `${branchedSubDomainName}.${domainName}`
}

export const getGithubRepositoryName = (githubRepository: string): string => {
  /*
    The GITHUB_REPOSITORY env var provided by GitHub Actions includes the owner
    of the repository and the repository name.

    We only want the repository name.

    E.g. tylangesmith-organisation/nextjs-serverless-static-site
          ==> nextjs-serverless-static-site
  */
  return githubRepository.split('/')[1]
}

export interface GetStackNameProps {
  githubRepository: string;
  branchName: string;
}

export const getStackName = (props: GetStackNameProps): string => {
  const { githubRepository, branchName } = props
  const githubRepositoryName = getGithubRepositoryName(githubRepository)
  return `${githubRepositoryName}-${branchName}`
}
