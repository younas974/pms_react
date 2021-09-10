import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { DataGrid } from "@material-ui/data-grid";
import { FormatAlignCenter } from "@material-ui/icons";

const Followupcomp = () => {
  return (
    <>
      <div className="card-body cardic">
        <div className="rounded img-fluid ">
          <img src="../images/follow1.jpg" height="105" />
        </div>
        <br />
        <div className="rounded img-fluid ">
          <img src="../images/follow2.jpg" height="240" />
        </div>

        <br />
        <div className="rounded img-fluid ">
          <img src="../images/follow3.jpg" height="155" />
        </div>
      </div>
    </>
  );
};

export default Followupcomp;
