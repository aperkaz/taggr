const { html } = require("htm/react");
const PropTypes = require("prop-types");

const { fade, makeStyles } = require("@material-ui/core/styles");
const AppBar = require("@material-ui/core/AppBar").default;
const Toolbar = require("@material-ui/core/Toolbar").default;
const Typography = require("@material-ui/core/Typography").default;
const InputBase = require("@material-ui/core/InputBase").default;
const SearchIcon = require("@material-ui/icons/Search").default;

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
    marginRight: theme.spacing(2),
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

// TODONOW: add tag header, with most present tags
const Header = ({ onInputChange }) => {
  const classes = useStyles();

  return html`
    <div key="header">
      <div key="header" className="${classes.grow}">
        <${AppBar} position="static">
          <${Toolbar}>
            <${Typography} className="{classes.title}" variant="h6" noWrap>
              🛡 Privatus
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
          <//>
        <//>
      </div>
    </div>
  `;
};

Header.defaultProps = {
  onInputChange: () => null,
};

Header.propTypes = {
  onInputChange: PropTypes.func,
};

module.exports = Header;
