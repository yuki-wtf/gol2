import React, { useEffect, useState } from "react";
import {
  useStarknet,
  ConnectorNotFoundError,
  InjectedConnector,
} from "@starknet-react/core";
import Button from "../../Button/Button";
import UserDropdownMenu from "./UserDropdownMenu/UserDropdownMenu";
import NetworkDropdownMenu from "./NetworkDropdownMenu/NetworkDropdownMenu";
import DialogDownloadWallet from "../../DialogDownloadWallet/DialogDownloadWallet";

const ConnectWallet = () => {
  const [open, setOpen] = useState(true);
  const { account, connect, error, disconnect, connectors } = useStarknet();

  // useEffect(() => {
  //   setTimeout(() => {
  //     connect(new InjectedConnector());
  //   }, 1000);
  // }, [connect]);

  if (account) {
    return (
      <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
        <NetworkDropdownMenu account={account} disconnect={disconnect} />
        <UserDropdownMenu account={account} disconnect={disconnect} />
      </div>
    );
  }

  return (
    <div style={{ marginLeft: "auto" }}>
      {!account &&
        !error &&
        open &&
        connectors.map((connector, i) =>
          connector.available() ? (
            <Button
              primary
              label="Connect"
              key={connector.id}
              onClick={() => connect(connector)}
            />
          ) : null
        )}
      {error instanceof ConnectorNotFoundError && (
        <DialogDownloadWallet
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
        // <div>
        //   <p>
        //     <a href="https://github.com/argentlabs/argent-x">
        //       Download Argent-X
        //     </a>
        //   </p>
        // </div>
      )}
    </div>
  );
};
export default ConnectWallet;
