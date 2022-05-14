import { useContract } from "@starknet-react/core";

import CreatorAbi from "../abi/GoL2_creator.json";

export function useCreatorGameContract() {
  return useContract({
    abi: CreatorAbi,
    address:
      "0x021720286a97c4cb4504de696a28f60a421af77a21f5da9df717d071756d9734",
  });
}
