const { html } = require("htm/react");
const PropTypes = require("prop-types");

const { makeStyles } = require("@material-ui/core/styles");
const Avatar = require("@material-ui/core/Avatar").default;
const Chip = require("@material-ui/core/Chip").default;
const Typography = require("@material-ui/core/Typography").default;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.25),
    },
  },
}));

const TagCountDisplay = ({ tagCountList }) => {
  const classes = useStyles();
  return tagCountList.length == 0
    ? ``
    : html` <div className="${classes.root}" key="tagCountDisplay">
        <${Typography}
          variant="h5"
          style=${{
            fontFamily: "Nunito",
            marginRight: "1rem",
          }}
        >
          Popular tags:
        <//>
        ${tagCountList.map(
          (tagCount) =>
            html`
              <${Chip}
                key="${tagCount.name}"
                avatar=${html`<${Avatar}>${tagCount.count}<//>`}
                label="${tagCount.name}"
              />
            `
        )}
      </div>`;
};

TagCountDisplay.propTypes = {
  tagCountList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      count: PropTypes.number,
    })
  ),
};

TagCountDisplay.defaultProps = {
  tagCountList: [],
};

module.exports = TagCountDisplay;
