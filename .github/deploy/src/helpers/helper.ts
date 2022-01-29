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
  return branchedSubDomainName === '' ? domainName : `${branchedSubDomainName}.${domainName}`
}
