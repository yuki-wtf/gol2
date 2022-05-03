import React from "react";
import {
  useStarknet,
  InjectedConnector,
  ConnectorNotFoundError,
} from "@starknet-react/core";
import { truncate } from "../../../utils/truncate";
import Button from "../../Button/Button";
import UserDropdownMenu from "./UserDropdownMenu/UserDropdownMenu";
import NetworkDropdownMenu from "./NetworkDropdownMenu/NetworkDropdownMenu";

const ConnectWallet = () => {
  const { account, connect, error, disconnect, connectors } = useStarknet();
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
        <div>
          <p>
            <a href="https://github.com/argentlabs/argent-x">
              Download Argent-X
            </a>
          </p>
        </div>
      )}
    </div>
  );
};
export default ConnectWallet;
