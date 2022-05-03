import React from "react";
import ContainerInner from "../components/Layout/ContainerInner";
import Link from "next/link";
import GolGrid from "../components/GolGrid/GolGrid";
import Sidebar from "../components/InfiniteGame/Sidebar/Sidebar";

const Infinite = () => {
  return (
    <ContainerInner>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          width: "100%",
          maxWidth: "882px",
          margin: "6vh auto 0",
          paddingBottom: 64,
          gap: 64,
        }}
      >
        <div style={{ width: 544, minWidth: 544 }}>
          <GolGrid />
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
  );
};

export default Infinite;
