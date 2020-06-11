import React from "react";
import styled from "styled-components";
import Typography from "../atoms/Typography";

const Wrapper = styled.div`
  min-height: 50px;

  background: linear-gradient(
    354.71deg,
    rgba(135, 49, 232, 0.9) 0%,
    rgba(69, 40, 220, 0.9) 100%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 6px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tabs = styled.div`
  display: flex;
`;

const Tab = styled.div`
  padding: 0 1em;

  display: flex;
  flex-direction: column;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

const Underline = styled.div`
  width: 120%;
  border-top: 2px solid white;
`;

const NavBar = ({ activeTab = 0, tabs = [], selectTab = (i) => null }) => (
  <Wrapper>
    <Tabs>
      {tabs.map((tab, index) => (
        <Tab key={index} onClick={() => selectTab(index)}>
          <Typography variant="h5" style={{ color: "white" }}>
            {tab}
          </Typography>
          {activeTab === index ? <Underline></Underline> : null}
        </Tab>
      ))}
    </Tabs>
  </Wrapper>
);

export default NavBar;
