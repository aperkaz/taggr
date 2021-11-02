import React, { useState, useEffect } from "react";
import styled from "styled-components";
import semverCompare from "semver/functions/compare";

import StartPage from "./pages/start";
import PreProcessingPage from "./pages/preprocessing";
import DashboardPage from "./pages/dashboard";
import SettingsPage from "./pages/settings";

import UpdateModal from "./molecules/UpdateModal";

import ROUTES from "../../shared/fe-routes";
import logger from "../../shared/logger";
import { useAppSelector } from "../store/hooks";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PageWrapper = styled.div`
  height: 100%;
`;

const App = () => {
  const [state, setState] = useState({
    currentAppVersion: "v0.0.0",
    latestAppVersion: "v0.0.0",
  });

  const activeRoute = useAppSelector((s) => s.activeRoute);

  const fetchLatestAppVersion = async () => {
    const url = `https://api.github.com/repos/aperkaz/taggr-releases/tags`;
    const response = await fetch(url);

    if (response.ok) {
      // if HTTP-status is 200-299
      let tagList: { name: string }[] = await response.json();

      const descendingOrderVersionTags = tagList.sort((v1: any, v2: any) => {
        return semverCompare(v2.name, v1.name);
      });

      logger.log(descendingOrderVersionTags);

      const { app } = window.require("electron").remote;

      const latestAppVersion = descendingOrderVersionTags[0].name;
      const currentAppVersion = `v${app.getVersion()}`;

      setState((prev) => ({
        ...prev,
        latestAppVersion,
        currentAppVersion,
      }));

      logger.warn(
        `Current version: ${currentAppVersion} | Latest version: ${latestAppVersion}`
      );
    } else {
      logger.error("HTTP-Error: " + response.status);
    }
  };

  useEffect(() => {
    fetchLatestAppVersion();
  }, []);

  return (
    <Wrapper>
      <PageWrapper>{renderRoute(activeRoute)}</PageWrapper>
      <UpdateModal
        currentAppVersion={state.currentAppVersion}
        latestAppVersion={state.latestAppVersion}
        onUpdateSelect={() => {
          let shell = window.require("electron").shell;
          shell.openExternal("https://taggr.ai");
        }}
      />
    </Wrapper>
  );
};

const renderRoute = (activeRoute: string) => {
  switch (activeRoute) {
    case ROUTES.START_PAGE:
      return <StartPage />;
    case ROUTES.PRE_PROCESSING_PAGE:
      return <PreProcessingPage />;
    case ROUTES.DASHBOARD_PAGE:
      return <DashboardPage />;
    case ROUTES.SETTINGS_PAGE:
      return <SettingsPage />;
    default:
      return <div>TODO: add placeholder</div>;
  }
};

export default App;
