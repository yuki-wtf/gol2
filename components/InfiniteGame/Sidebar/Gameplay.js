import React, { useEffect, useState } from "react";
import SidebarSection from "../../SidebarSection/SidebarSection";
import TxnRow from "../../TxnRow/TxnRow";

import { useStarknetTransactionManager } from "@starknet-react/core";
const Gameplay = ({ title, type }) => {
  const { transactions } = useStarknetTransactionManager();

  return (
    <SidebarSection type={type} title={title}>
      <div style={{ minHeight: 260 }}>
        <div>
          {transactions.length === 0
            ? "No transactions"
            : transactions
                .map((tx, index) => {
                  console.log(tx);
                  return <TxnRow key={index} data={tx} />;
                })
                .reverse()}
        </div>
      </div>
    </SidebarSection>
  );
};

export default Gameplay;
