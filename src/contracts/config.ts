import { addressesByChainId } from "./addresses";
import PlatformAbi from "./abis/platform.json";

export const mainChainId = Number(process.env.NEXT_PUBLIC_MAIN_CHAIN_ID);

export const PlatformConfig: any = {
  address: addressesByChainId[mainChainId].Platform,
  abi: PlatformAbi,
} as const;
