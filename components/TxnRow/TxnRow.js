import React from "react";
import { AnimatePresence } from "framer-motion";
import TransactionRow from "./TxnRow.styles";

export const TxnRowStatus = {
  TRANSACTION_RECEIVED: {
    statusText: "Pending ...",
    color: "#83E8FE",
    textColor: "#0A0C10",
    iconColor: "#0A0C10",
    buttonColor: "#0A0C10",
    userColor: "#0A0C10",
  },
  RECEIVED: {
    statusText: "Pending ...",
    color: "#83E8FE",
    textColor: "#0A0C10",
    iconColor: "#0A0C10",
    buttonColor: "#0A0C10",
    userColor: "#0A0C10",
  },
  NOT_RECEIVED: {
    statusText: "Pending...",
    color: "#83E8FE",
    textColor: "#0A0C10",
    iconColor: "#0A0C10",
    buttonColor: "#0A0C10",
    userColor: "#0A0C10",
  },
  REJECTED: {
    statusText: "(failed)",
    color: "transparent",
    textColor: "#F06B97",
    iconColor: "#F06B97",
    buttonColor: "#F3E9E1",
    userColor: "#F3E9E1",
  },
  ACCEPTED_ON_L1: {
    statusText: "Accepted",
    color: "#8AED9B",
    textColor: "#0A0C10",
    iconColor: "#0A0C10",
    buttonColor: "#0A0C10",
    userColor: "#0A0C10",
  },
  PENDING: {
    statusText: "Accepted",
    color: "#8AED9B",
    textColor: "#0A0C10",
    iconColor: "#0A0C10",
    buttonColor: "#0A0C10",
    userColor: "#0A0C10",
  },
  ACCEPTED_ON_L2: {
    statusText: "Accepted",
    color: "#8AED9B",
    textColor: "#0A0C10",
    iconColor: "#0A0C10",
    buttonColor: "#0A0C10",
    userColor: "#0A0C10",
  },
  COMPLETED: {
    statusText: "",
    color: "transparent",
    textColor: "#F06B97",
    iconColor: "#57637B",
    buttonColor: "#FCFAF8",
    userColor: "#F3E9E1",
  },
};

const TxnRow = ({ data }) => {
  return (
    <TransactionRow
      label={TxnRowStatus[data.status].statusText}
      status={data.status}
      user={data.transaction && data.transaction.contract_address}
    />
  );
};

export default TxnRow;
