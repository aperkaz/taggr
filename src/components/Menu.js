import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const CustomMenu = ({ options, anchorEl, onClose }) => (
  <div>
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      {options.map((option) => {
        return (
          <MenuItem key={option.text} onClick={option.onClick}>
            {option.text}
          </MenuItem>
        );
      })}
    </Menu>
  </div>
);

CustomMenu.defaultProps = {
  options: [],
  anchorEl: null,
  onClose: () => console.log("menu closed"),
};

CustomMenu.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
};

export default CustomMenu;
