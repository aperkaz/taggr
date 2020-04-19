const { html } = require("htm/react");
const PropTypes = require("prop-types");
const { makeStyles } = require("@material-ui/core/styles");

const ImageTile = require("./ImageTile");

// TODONOW: add relative size to parent and overflow-y: scroll.

const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    maxHeight: "100%",
    overflowY: "scroll",
    "@media (min-width: 3820px)": {
      width: "60%",
      margin: "5px auto",
    },
  },
  imageWrapper: {
    margin: "5px",
    minHeight: "200px",
    height: "calc(25vh - 10px)",
    minWidth: "200px",
    width: "calc(25% - 10px)",
  },
}));

const Gallery = ({ imageList }) => {
  const classes = useStyles();
  return html`
    <div className="${classes.wrapper}">
      ${imageList.map(
        (image) => html`<div
          key="${image.hash}"
          className="${classes.imageWrapper}"
        >
          <${ImageTile} imageUrl="${image.path}"><//>
        </div>`
      )}
    </div>
  `;
};

// TODO: virtualize list for performance https://github.com/developerdizzle/react-virtual-list
// TODO: image menu: https://github.com/aperkaz/privatus/blob/add-react/src/components/DashboardImageGallery.js

Gallery.defaultProps = {
  imageList: [],
};

Gallery.propTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      hash: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      path: PropTypes.string,
    })
  ),
};

module.exports = Gallery;
