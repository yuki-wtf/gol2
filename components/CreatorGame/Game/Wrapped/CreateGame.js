import { useStarknet, useStarknetInvoke } from "@starknet-react/core";
import React from "react";
import { useCreatorGameContract } from "../../../../hooks/useCreatorGameContract";
import Button from "../../../Button/Button";

const CreateGame = () => {
  const { contract } = useCreatorGameContract();
  const { account } = useStarknet();
  const { data, loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: "create",
  });
  console.log(error);
  console.log(data);
  return (
    <Button
      label="Testing Create a game"
      onClick={() => {
        if (account) {
          console.log("clicked");
          invoke({
            args: [
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "32",
              "8",
              "104",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
            ],
          });
        }
      }}
    />
  );
};

export default CreateGame;
