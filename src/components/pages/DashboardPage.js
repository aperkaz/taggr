const { html } = require("htm/react");
const PropTypes = require("prop-types");

const Header = require("../organisms/Header");
const Gallery = require("../organisms/VirtualizedGallery");
// const Gallery = require("../organisms/Gallery");

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

module.exports = DashboardPage;
