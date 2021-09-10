import React, { FC, ReactElement, useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

// components
import PageTitle from "../components/PageTitle";

// constants
import { APP_TITLE, PAGE_TITLE_CODE } from '../utils/constants';
import ViewProviderCompoenent from '../components/provider/viewProvider'
import { getPracticeById, getPractices } from "../store/actions/practiceProfileAction";
import {getProviderFindOne} from "../store/actions/providerProfileAction"

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

const Provider: FC<{}> = (): ReactElement => {

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

    
      if(profile) {
        
              dispatch(getProviderFindOne(profile.p_id))
        }
         if(User){
            dispatch(getPractices(User.id));
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
            <ViewProviderCompoenent title="provider"/>
        </>
    )
}

export default Provider;