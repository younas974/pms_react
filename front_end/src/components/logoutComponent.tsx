import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../store/actions/user.actions'

const LogOut =()=>{
    const dispatch= useDispatch();

    useEffect( () => {
        debugger
        dispatch(logout())
         
        },[]);


    return (
        <>

        </>
    )
}

export default LogOut