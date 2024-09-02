import * as Icon from "@mui/icons-material";
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [ anchorEl, setAnchorEl ] = useState<HTMLElement|null>(null);
  const open = Boolean(anchorEl);

  function handleMenuOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          onClick={handleMenuOpen}
          aria-controls="navigation-menu"
          aria-haspopup="true"
          aria-expanded={open}>
          <Icon.Menu />
        </IconButton>
        <Box sx={{flexGrow: 1}} />
        <Link to="/login" style={{color: 'inherit'}}><Icon.Login /></Link>
        <Menu
          id="navigation-menu"
          open={open}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
          keepMounted>
          <MenuItem onClick={handleMenuClose}>
            <Link to='/'>Home</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to='/books'>Books</Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
