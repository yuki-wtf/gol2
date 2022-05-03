import DropdownMenu from "../../../DropDownMenu/DropDownMenu";
import { truncate } from "../../../../utils/truncate";
import { InjectedConnector } from "@starknet-react/core";
import { HiChevronDown, HiOutlineGlobeAlt } from "react-icons/hi";
import { FaEthereum } from "react-icons/fa";
import { useState } from "react";

const NetworkDropdownMenu = ({ account, disconnect }) => {
  const [network, setNetwork] = useState("goerli");
  const renderNetworkIcon = () => {
    switch (network) {
      case "goerli":
        return <HiOutlineGlobeAlt size={15} />;

      case "mainnet":
        return <FaEthereum size={15} />;

      default:
        return <HiOutlineGlobeAlt size={15} />;
    }
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {renderNetworkIcon()}
        {network}
        <HiChevronDown size={24} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" sideOffset={5}>
        <DropdownMenu.Label>Select a network</DropdownMenu.Label>
        <DropdownMenu.RadioGroup value={network} onValueChange={setNetwork}>
          <DropdownMenu.RadioItem value="mainnet">
            <FaEthereum size={24} />
            Mainnet
            <DropdownMenu.ItemIndicator />
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="goerli">
            <HiOutlineGlobeAlt size={24} />
            Goerli
            <DropdownMenu.ItemIndicator />
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NetworkDropdownMenu;
