import React, { useMemo } from "react";
import { useStarknetCall } from "@starknet-react/core";
import { useInfiniteGameContract } from "../../../hooks/useInfiniteGameContract";
import { toBN } from "starknet/dist/utils/number";
import SidebarSection from "../../SidebarSection/SidebarSection";
import StatRow from "../../StatRow/StatRow";
import { HiQrcode, HiOutlineUser, HiOutlineHeart } from "react-icons/hi";
import { FaSkull } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";

const Statistics = ({ title }) => {
  const { contract: infinite } = useInfiniteGameContract();
  const {
    data: latestGenResult,
    loading,
    error,
  } = useStarknetCall({
    contract: infinite,
    method: "current_generation_id",
    args: ["", "", "pending"],
  });

  const latestGenValue = useMemo(() => {
    if (latestGenResult && latestGenResult.length > 0) {
      const value = toBN(latestGenResult[0]);
      return value.toString(10);
    }
  }, [latestGenResult]);
  return (
    <SidebarSection title={title}>
      <StatRow
        icon={<HiQrcode size={24} />}
        title="Generations"
        loading={loading}
        value={latestGenValue}
      />
      <StatRow
        icon={<HiOutlineUser size={24} />}
        title="Unique players"
        loading={loading}
        value={latestGenValue}
      />
      <StatRow
        icon={<HiOutlineHeart size={24} />}
        title="Lives given"
        loading={loading}
        value={latestGenValue}
      />
      <StatRow
        icon={<FaSkull size={24} />}
        title="Extinctions"
        loading={loading}
        value={latestGenValue}
      />
      <StatRow
        icon={<BiTimeFive size={24} />}
        title="Longest stable period"
        loading={loading}
        value={latestGenValue}
      />
    </SidebarSection>
  );
};

export default Statistics;
