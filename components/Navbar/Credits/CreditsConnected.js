import React, { useState, useEffect } from "react";
import useFetchTokens from "../../../hooks/useFetchTokens";
import Toast from "../../Toast/Toast";
import CreditsContainer from "./CreditsContainer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  position: relative;
`;
const CreditsConnected = () => {
  const { tokenCount, loading, error } = useFetchTokens();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 2000);
  }, []);

  return (
    <>
      <Toast.Root open={open} onOpenChange={setOpen}>
        <Toast.Title>Hello</Toast.Title>
        <Toast.Description>asdfsdf</Toast.Description>
      </Toast.Root>
      <CreditsContainer
        tokenCount={tokenCount}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default CreditsConnected;
