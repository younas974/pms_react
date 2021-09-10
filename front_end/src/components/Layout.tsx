import React, { FC, ReactNode, useReducer, useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { RootState } from "../store";

// components

import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import TopHeader from "./topheader/topheader"
import {getPractices, setLoading } from '../store/actions/practiceProfileAction'
import { useDispatch, useSelector } from 'react-redux';

// constants

import { DRAWER_WIDTH, FOOTER_HEIGHT } from "../utils/constants";
import { exit } from "process";
import { setUserInfo } from "../store/actions/user.actions";

// define css-in-js

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
      background: theme.palette.background.paper,
      marginLeft: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(7) + 1,
      },
    },
    toolbar: {
      ...theme.mixins.toolbar,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: DRAWER_WIDTH,
    },
  })
);

// define interface to represent component props

interface Props {
  toggleTheme: () => void;
  useDefaultTheme: boolean;
  children: ReactNode;
}

// functional component

const Layout: FC<Props> = ({ toggleTheme, useDefaultTheme, children }) => {
  const classes = useStyles();
  const [open, toggle] = useReducer((open) => !open, true);
  const dispatch = useDispatch();
  const [userId, setUserId]=useState(1);
  let history = useHistory();
  const istoester = useSelector((state: RootState)=> state.toester.show)
  const toester= useSelector((state: RootState)=> state.toester)
  const { addToast } = useToasts();

  useEffect( () => {
    let userinfo;
    let User = JSON.parse(localStorage.getItem('user') || '{}');
    if(!User.accessToken){
      history.push('/')
    }

    if(User){
       userinfo={
        user_id:User.id,
        employee_id: User.employee_id,
        token: User.accessToken,
        roles: User.roles,
        p_id: 0
}

  dispatch(setUserInfo(userinfo)) 

    }
    
     
    },[]);

    useEffect( () => {
      if(istoester){     
        
          addToast(toester.message, { appearance: toester.appearance, autoDismiss: true },);
      }
  },[istoester]);

  return (

    <div>

    <div className={classes.root}>
      
      <TopHeader/>
      
      {/* <Header
        open={!open}
        handleMenuOpen={toggle}
        toggleTheme={toggleTheme}
        useDefaultTheme={useDefaultTheme}
      /> */}
     
      <Navigation open={!open} handleMenuClose={toggle} />
       <div className="contopadj"></div>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: !open,
        })}
      >
         
        {children}
       
      </main>
      
      <footer>
        <Footer />
      </footer>
    </div>

    </div>
  );
};

export default Layout;