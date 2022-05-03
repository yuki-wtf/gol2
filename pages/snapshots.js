import React from "react";
import useFetchTokens from "../hooks/useFetchTokens";
const Snapshots = () => {
  const { snapshots, loading, error } = useFetchTokens();
  return (
    <div style={{ padding: 32 }}>
      {loading && <div>Loading</div>}
      {snapshots &&
        snapshots.map((snapshot) => <span key={snapshot}>{snapshot}, </span>)}
    </div>
  );
};

export default Snapshots;
