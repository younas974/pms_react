import React, { FC, ReactElement, useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
// components
import PageTitle from "../components/PageTitle";

// constants
import { APP_TITLE, PAGE_TITLE_CODE } from '../utils/constants';
import ViewPracticeCompoenent from '../components/practice/viewPractice'
import { RootState } from "../store";
import { getPracticeById } from "../store/actions/practiceProfileAction";

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

const Practice: FC<{}> = (): ReactElement => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState)=> state.practicebyid.loading)
    const error = useSelector((state: RootState)=> state.weather.error)
    const alertMsg = useSelector((state: RootState)=> state.alert.message)
    const profile = useSelector((state: RootState)=> state.practicebyid.data)
    let history = useHistory();
  
    useEffect( () => {
  
      
  
      let User = JSON.parse(localStorage.getItem('user') || '{}');
      if(!User.accessToken){
        history.push('/')
      }
  
    if(!profile) {
      if(User){
        if(User.practices){
          if(User.practices.length>0){
            dispatch(getPracticeById(User.practices[0].p_id))
          } 
        }
      }
      }
       
      },[]);
    return (
        <>
            <Helmet>
                <title>{PAGE_TITLE_CODE} | {APP_TITLE}</title>
            </Helmet>
            <div className={classes.root}>
                {/* <PageTitle title={PAGE_TITLE_CODE} /> */}
            </div>
            < ViewPracticeCompoenent title="practice"/>
            
        </>
    )
}

export default Practice;