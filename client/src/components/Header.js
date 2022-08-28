import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Header = () => {
  return (
    <div className="header root">
      <AppBar className="header appbar">
        <Toolbar>
          <Typography variant="h4" className="header title">
            VideoWaterMark
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
