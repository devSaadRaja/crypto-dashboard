import { usePlatformReadFunctions } from "@/contracts/hooks";

export const mainChainId = Number(process.env.NEXT_PUBLIC_MAIN_CHAIN_ID);

// =============== READ FUNCTIONS =============== //

export function getCreatorRole() {
  return usePlatformReadFunctions({
    functionName: "CREATOR_ROLE",
    chainId: mainChainId,
  });
}

export function getDefaultAdminRole() {
  return usePlatformReadFunctions({
    functionName: "DEFAULT_ADMIN_ROLE",
    chainId: mainChainId,
  });
}

export function getFeeConfig() {
  return usePlatformReadFunctions({
    functionName: "getFeeConfig",
    chainId: mainChainId,
  });
}

export function getAlreadyVoted(user: string, competitionId: number) {
  return usePlatformReadFunctions({
    functionName: "getAlreadyVoted",
    args: [user, competitionId],
    chainId: mainChainId,
  });
}

export function getCompetitionInfo(competitionId: number) {
  return usePlatformReadFunctions({
    functionName: "getCompetitionInfo",
    args: [competitionId],
    chainId: mainChainId,
  });
}

export function getCompetitionParticipants(competitionId: number) {
  return usePlatformReadFunctions({
    functionName: "getCompetitionParticipants",
    args: [competitionId],
    chainId: mainChainId,
  });
}

export function getCreatorCompetitions(creator: string) {
  return usePlatformReadFunctions({
    functionName: "getCreatorCompetitions",
    args: [creator],
    chainId: mainChainId,
  });
}

export function getNftIds(competitionId: number) {
  return usePlatformReadFunctions({
    functionName: "getNftIds",
    args: [competitionId],
    chainId: mainChainId,
  });
}

export function getRoleAdmin(role: string) {
  return usePlatformReadFunctions({
    functionName: "getRoleAdmin",
    args: [role],
    chainId: mainChainId,
  });
}

export function getSubmission(competitionId: number) {
  return usePlatformReadFunctions({
    functionName: "getSubmission",
    args: [competitionId],
    chainId: mainChainId,
  });
}

export function getSubmissionVotes(competitionId: number, participant: string) {
  return usePlatformReadFunctions({
    functionName: "getSubmissionVotes",
    args: [competitionId, participant],
    chainId: mainChainId,
  });
}

export function getUserDetails(user: string) {
  return usePlatformReadFunctions({
    functionName: "getUserDetails",
    args: [user],
    chainId: mainChainId,
  });
}

export function getUserVotes(user: string, competitionId: number) {
  return usePlatformReadFunctions({
    functionName: "getUserVotes",
    args: [user, competitionId],
    chainId: mainChainId,
  });
}

export function hasRole(role: string, account: any) {
  return usePlatformReadFunctions({
    functionName: "hasRole",
    args: [role, account],
    chainId: mainChainId,
  });
}

export function isUserRegistered(user: string) {
  return usePlatformReadFunctions({
    functionName: "isUserRegistered",
    args: [user],
    chainId: mainChainId,
  });
}

export function getNftContract() {
  return usePlatformReadFunctions({
    functionName: "nftContract",
    chainId: mainChainId,
  });
}

export function getTotalCompetitions() {
  return usePlatformReadFunctions({
    functionName: "totalCompetitions",
    chainId: mainChainId,
  });
}

export function getTreasury() {
  return usePlatformReadFunctions({
    functionName: "treasury",
    chainId: mainChainId,
  });
}

export function supportsInterface(interfaceId: string) {
  return usePlatformReadFunctions({
    functionName: "supportsInterface",
    args: [interfaceId],
    chainId: mainChainId,
  });
}
