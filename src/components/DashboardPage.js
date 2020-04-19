const { html } = require("htm/react");
const PropTypes = require("prop-types");
const debounce = require("lodash.debounce");

// TODONOW: add store connection, with another export
// const { view } = require("@risingstack/react-easy-state");

const Header = require("./Header");
const Gallery = require("./Gallery");

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
  html` <div style=${styles.wrapper}>
    <${Header} onInputChange="${debounce(onInputChange, 300)}" />
    <div style=${styles.galleryWrapper}>
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

module.exports = DashboardPage;
