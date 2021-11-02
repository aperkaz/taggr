import React from "react";
import styled from "styled-components";

import StartPage from "./pages/start";
import PreProcessingPage from "./pages/preprocessing";
import DashboardPage from "./pages/dashboard";
import SettingsPage from "./pages/settings";

import { useAppSelector } from "../store/hooks";
import { sharedTypes, sharedUtils } from "taggr-shared";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PageWrapper = styled.div`
  height: 100%;
`;

const App = () => {
  const activeRoute = useAppSelector((s) => s.activeRoute);

  return (
    <Wrapper>
      <PageWrapper>{renderRoute(activeRoute)}</PageWrapper>
    </Wrapper>
  );
};

const renderRoute = (activeRoute: sharedTypes.FrontendRoutes) => {
  switch (activeRoute) {
    case "START_PAGE":
      return <StartPage />;
    case "PRE_PROCESSING_PAGE":
      return <PreProcessingPage />;
    case "DASHBOARD_PAGE":
      return <DashboardPage />;
    case "SETTINGS_PAGE":
      return <SettingsPage />;
    default:
      throw new sharedUtils.UnreachableCaseError(activeRoute);
  }
};

export default App;
