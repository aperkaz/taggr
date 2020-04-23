const { html } = require("htm/react");
const PropTypes = require("prop-types");

const { fade, makeStyles } = require("@material-ui/core/styles");
const AppBar = require("@material-ui/core/AppBar").default;
const Toolbar = require("@material-ui/core/Toolbar").default;
const Typography = require("@material-ui/core/Typography").default;
const Button = require("@material-ui/core/Button").default;
const InputBase = require("@material-ui/core/InputBase").default;
const SearchIcon = require("@material-ui/icons/Search").default;

const TagCountDisplay = require("../molecules/TagCountDisplay");

// TODO: configure theme with typography and colors
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  searchIcon: {
    padding: theme.spacing(0, 1.5),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "20ch",
  },
}));

const Header = ({ onInputChange, onPressReset, tagCountList }) => {
  const classes = useStyles();

  return html`
    <div key="header">
      <div key="header" className="${classes.grow}">
        <${AppBar} position="static">
          <${Toolbar} variant="dense">
            <${Typography}
              variant="h5"
              style=${{
                fontFamily: "Pacifico",
              }}
            >
              Taggr
            <//>
            <div className="${classes.grow}" />
            <div className="${classes.search}">
              <div className="${classes.searchIcon}">
                <${SearchIcon} />
              </div>
              <${InputBase}
                placeholder="Search by tag"
                classes=${{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange=${(e) => onInputChange(e.target.value)}
                inputProps="${{ "aria-label": "search" }}"
              />
            </div>
            <${Button}
              style=${{
                fontFamily: "Nunito",
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                color: "white",
              }}
              onClick=${onPressReset}
              >Reset<//
            >
          <//>
        <//>
      </div>
      <div style=${{ marginTop: "8px" }}>
        <${TagCountDisplay} tagCountList=${tagCountList} />
      </div>
    </div>
  `;
};

Header.defaultProps = {
  onInputChange: () => null,
  onPressReset: () => null,
};

Header.propTypes = {
  onInputChange: PropTypes.func,
  onPressReset: PropTypes.func,
};

module.exports = Header;
