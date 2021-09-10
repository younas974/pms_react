import React, { FC, ReactElement, useEffect } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

// components
import PageTitle from "../components/PageTitle";

// constants
import { APP_TITLE, PAGE_TITLE_SETTINGS } from "../utils/constants";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  })
);

const Settings: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  let history = useHistory();

  useEffect( () => {

    

    let User = JSON.parse(localStorage.getItem('user') || '{}');
    if(!User.accessToken){
      history.push('/')
    }

     
    },[]);


  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_SETTINGS} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        {/* <PageTitle title={PAGE_TITLE_SETTINGS} /> */}
      </div>
    </>
  );
};

export default Settings;
