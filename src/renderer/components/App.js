import React from "react";
import { hot, setConfig } from "react-hot-loader";
import { connect } from "react-redux";
import styled from "styled-components";
import debounce from "lodash.debounce";

import StartPage from "./pages/StartPage";
// import DashboardPage from "./components/pages/DashboardPage";
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

const App = ({ activeRoute }) => (
  <Wrapper>
    <PageWrapper>{renderRoute(activeRoute)}</PageWrapper>
    <UpdateModal />
  </Wrapper>
);

const renderRoute = (activeRoute) => {
  switch (activeRoute) {
    case CONSTANTS.ROUTES.START_PAGE:
      return <StartPage />;
    // case CONSTANTS.ROUTES.DASHBOARD_PAGE:
    //   return (
    //     <DashboardPage
    //       filteredImageList={uiStore.filteredImageList}
    //       tagProcessingStatus={uiStore.tagProcessingStatus}
    //       tagCountList={uiStore.tagCountList}
    //       onInputChange={debounce(
    //         (payload) =>
    //           triggerAction({
    //             name: ACTIONS.FILTER_RESULTS_BY_TAG,
    //             payload,
    //           }),
    //         300
    //       )}
    //       onPressReset={async () => {
    //         triggerAction({
    //           name: ACTIONS.SET_UI_ROUTE,
    //           payload: CONSTANTS.ROUTES.START_PAGE,
    //         });
    //       }}
    //     />
    //   );
  }
};

// redux bindings
const mapStateToProps = (state) => ({ activeRoute: state.activeRoute });

setConfig({
  showReactDomPatchNotification: false,
});
export default connect(mapStateToProps)(hot(module)(App));
