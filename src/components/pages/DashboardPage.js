const { html } = require("htm/react");
const PropTypes = require("prop-types");
const { view } = require("@risingstack/react-easy-state");
const debounce = require("lodash.debounce");

const Header = require("../organisms/Header");
const Gallery = require("../organisms/Gallery");

const { uiStore, actions } = require("../../store/uiStore");

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  galleryWrapper: {
    flexGrow: 1,
    overflowY: "hidden",
    margin: "5px 0",
  },
};

const DashboardPage = ({ onInputChange, filteredImageList }) =>
  html` <div key="dashboard" style=${styles.wrapper}>
    <${Header} onInputChange="${onInputChange}" />
    <div key="2" style=${styles.galleryWrapper}>
      <${Gallery} imageList="${filteredImageList}" />
    </div>
  </div>`;

DashboardPage.defaultProps = {
  onInputChange: () => null,
  filteredImageList: [],
};

DashboardPage.propTypes = {
  onInputChange: PropTypes.func,
  filteredImageList: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
    })
  ),
};

const DashboardPageContainer = view(
  () => html`<${DashboardPage}
    onInputChange="${debounce(actions.setTagSearchValue, 300)}"
    filteredImageList="${uiStore.filteredImageList}"
  />`
);

module.exports = {
  vanilla: DashboardPage,
  withStore: DashboardPageContainer,
};
