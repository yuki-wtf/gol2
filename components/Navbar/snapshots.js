import React from "react";
import useFetchTokens from "../../hooks/useFetchTokens";
import { uuid } from "uuidv4";
const Snapshots = () => {
  const { snapshots, loading, error } = useFetchTokens();
  return (
    <div style={{ marginLeft: 22 }}>
      I own generations{" "}
      {/* {snapshots &&
        snapshots.map((snapshot, i) => <span key={uuid()}>{snapshot}, </span>)} */}
    </div>
  );
};

export default Snapshots;
