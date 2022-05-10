import React from "react";
import { useRouter } from "next/router";

import { ThemeProvider } from "styled-components";
import { creator } from "../../../styles/themes/creator";
import ContainerInner from "../../../components/Layout/ContainerInner";
import Sidebar from "../../../components/InfiniteGame/Sidebar/Sidebar";
import CreatorGameHeader from "../../../components/CreatorGameHeader/CreatorGameHeader";
import { useStarknet } from "@starknet-react/core";
import GameContainer from "../../../components/InfiniteGame/Game/GameContainer";
const CreatorGame = () => {
  const router = useRouter();
  const { account } = useStarknet();
  const {
    query: { cid },
  } = router;

  console.log(cid);
  console.log(router);

  return (
    <ThemeProvider theme={creator}>
      <ContainerInner>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            width: "100%",
            maxWidth: "882px",
            margin: "1vh auto 0",
            paddingBottom: 64,
            gap: 64,
          }}
        >
          <div style={{ width: 544, minWidth: 544 }}>
            <CreatorGameHeader gameId={cid} address={account} />
            <GameContainer />
          </div>
          <div
            style={{
              display: "flex",
              // maxWidth: "274px",
              flex: 1,
            }}
          >
            <Sidebar />
          </div>
        </div>
      </ContainerInner>
    </ThemeProvider>
  );
};

export default CreatorGame;
