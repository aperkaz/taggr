import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import semverCompare from "semver/functions/compare";

import StartPage from "./pages/start";
import DashboardPage from "./pages/main";
import SettingsPage from "./pages/settings";
import UpdateModal from "./molecules/UpdateModal";
import CONSTANTS from "../store/constants";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PageWrapper = styled.div`
  height: 100%;
`;

const App = ({ activeRoute }) => {
  const [state, setState] = React.useState({
    currentAppVersion: "v0.0.0",
    latestAppVersion: "v0.0.0",
  });

  const fetchLatestAppVersion = async () => {
    var url = `https://api.github.com/repos/aperkaz/taggr-releases/tags`;
    const res = await fetch(url);

    res.json().then((tagList) => {
      const descendingOrderVersionTags = tagList.sort((v1, v2) => {
        return semverCompare(v2.name, v1.name);
      });

      // TODO: hack to prevent electron to be required from the browser
      if (window.IS_DEV == null) return;

      const { app } = window.require("electron").remote;

      const latestAppVersion = descendingOrderVersionTags[0].name;
      const currentAppVersion = `v${app.getVersion()}`;

      setState((prev) => ({
        ...prev,
        latestAppVersion,
        currentAppVersion,
      }));

      console.log(
        `Current version: ${currentAppVersion} | Latest version: ${latestAppVersion}`
      );
    });
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

const renderRoute = (activeRoute) => {
  switch (activeRoute) {
    case CONSTANTS.ROUTES.START_PAGE:
      return <StartPage />;
    case CONSTANTS.ROUTES.DASHBOARD_PAGE:
      return <DashboardPage />;
    case CONSTANTS.ROUTES.SETTINGS_PAGE:
      return <SettingsPage />;
    default:
      return <div>TODO: add placeholder</div>;
  }
};

// redux bindings
const mapStateToProps = (state) => ({ activeRoute: state.activeRoute });

export default connect(mapStateToProps)(App);
