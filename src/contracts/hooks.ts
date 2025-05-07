import { PlatformConfig } from "./config";
import { useReadContract } from "wagmi";

export function usePlatformReadFunctions({
  functionName,
  args = [],
  chainId,
}: any) {
  const { data, isError, isLoading, refetch } = useReadContract({
    ...PlatformConfig,
    functionName,
    args,
    chainId,
  });

  return { data, isError, isLoading, refetch };
}
