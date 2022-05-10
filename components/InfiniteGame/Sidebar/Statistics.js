import React, { useEffect, useMemo } from "react";
import { useStarknetCall } from "@starknet-react/core";
import { useInfiniteGameContract } from "../../../hooks/useInfiniteGameContract";
import { toBN } from "starknet/dist/utils/number";
import SidebarSection from "../../SidebarSection/SidebarSection";
import StatRow from "../../StatRow/StatRow";
import { HiQrcode, HiOutlineUser, HiOutlineHeart } from "react-icons/hi";
import { FaSkull } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  updateLatestGeneration,
  updateSelectedGeneration,
} from "../../../features/Infinite/generations/generationsSlice";

const Statistics = ({ title }) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(updateLatestGeneration(latestGenValue));
    dispatch(updateSelectedGeneration(latestGenValue));
  }, [latestGenValue, dispatch]);

  return (
    <SidebarSection title={title}>
      <StatRow
        icon={<HiQrcode size={24} />}
        title="Generations"
        loading={loading}
        value={latestGenValue}
      />
      <StatRow
        icon={<HiOutlineHeart size={24} />}
        title="Lives given"
        loading={loading}
        value={0}
      />
      <StatRow
        icon={<FaSkull size={24} />}
        title="Extinctions"
        loading={loading}
        value={0}
      />
      <StatRow
        icon={<BiTimeFive size={24} />}
        title="Longest stable period"
        loading={loading}
        value={0}
      />
    </SidebarSection>
  );
};

export default Statistics;
