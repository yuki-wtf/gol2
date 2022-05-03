import { useContract } from "@starknet-react/core";

import InfiniteAbi from "../abi/GoL2_infinite.json";

export function useInfiniteGameContract() {
  return useContract({
    abi: InfiniteAbi,
    address:
      "0x0296707849bfbcf454401229e471304d97abe10641440c9f3f754bb6e926620f",
  });
}
