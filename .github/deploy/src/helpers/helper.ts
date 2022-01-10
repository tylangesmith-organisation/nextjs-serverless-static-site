export const isMasterBranch = (branchName: string): boolean => {
  return branchName === 'master'
}

export interface GetSubDomainNameProps {
  baseSubdomainName: string;
  branchName: string;
}

export const getSubDomainName = (props: GetSubDomainNameProps): string => {
  const { baseSubdomainName, branchName } = props
  return isMasterBranch(branchName) ? baseSubdomainName : `${baseSubdomainName}-${branchName}`
}

export interface GetUrlProps {
  domainName: string;
  subDomainName: string;
}

export const getUrl = (props: GetUrlProps): string => {
  const { domainName, subDomainName } = props
  return subDomainName === '' ? domainName : `${subDomainName}.${domainName}`
}
