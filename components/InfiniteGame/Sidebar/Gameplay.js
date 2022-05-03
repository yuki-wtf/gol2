import React from "react";
import SidebarSection from "../../SidebarSection/SidebarSection";

const Gameplay = ({ title, type }) => {
  return (
    <SidebarSection type={type} title={title}>
      {/* Temp */}
      <div style={{ minHeight: 260 }}></div>
    </SidebarSection>
  );
};

export default Gameplay;
