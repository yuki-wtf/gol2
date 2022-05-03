import React from "react";
import useFetchTokens from "../../../hooks/useFetchTokens";
import CreditsContainer from "./CreditsContainer";

const CreditsConnected = () => {
  const { tokenCount, loading, error } = useFetchTokens();
  return (
    <CreditsContainer tokenCount={tokenCount} loading={loading} error={error} />
  );
};

export default CreditsConnected;
