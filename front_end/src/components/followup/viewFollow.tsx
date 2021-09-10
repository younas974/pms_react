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
import Followupcomp from "./followuptable";
import Followupsidebar from "./followsidebar";
import DenialManagement from "./denialManagement";
import AntdDropDown from './addWorkSummaryComponent'

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="hero is-light has-text-cetnered">
        <div className="rowpp"></div>
        <div className="row">
          <div className="col-lg-8 col-xl-12">
            <div data-collapsed="0" className="card">
              <div className={classes.root}>
                <AppBar
                  position="static"
                  color="default"
                  className="muipaper-roor"
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                  >
                    <Tab label="Reporting" {...a11yProps(0)} />

                    <Tab label="Follow-up" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>

                <TabPanel value={value} index={0}>
                  {/* <AntdDropDown/> */}
                  <Followupcomp />
                </TabPanel>
                <TabPanel value={value} index={1}  >
              <DenialManagement/>
                </TabPanel>
              </div>
            </div>
          </div>

          {/* <div className="col-lg-3 col-xl-3 mb-4 mb-xl-0">
            <section className="card cardic">
              <Followupsidebar />
            </section>
          </div> */}
        </div>
      </div>
    </>
  );
}
