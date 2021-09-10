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
import Datepick from "./datepicker";
import ClaimStatusSummary from "./reports/claimstatussum";
import UserWiseSummary from "./reports/userwisesum";
import SummeryByStatusA from "./reports/summerybystatusA";
import SummeryByStatusB from "./reports/summerybystatusB";

const Followupcomp = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-5">
       <UserWiseSummary/>
        </div>

        <div className="col-md-7">
          <section className="card mb-4">
          
           <SummeryByStatusA/>

          </section>
        </div>
      </div>

      <div className="row">
        <div className="col-md-5">
        <ClaimStatusSummary/>
        </div>

        <div className="col-md-7">
          <section className="card mb-4">
            
          <SummeryByStatusB/>

          </section>
        </div>
      </div>
    </>
  );
};

export default Followupcomp;
