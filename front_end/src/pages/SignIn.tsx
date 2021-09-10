import React, { FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SignInComponent from '../components/SignIn'

// components
import PageTitle from "../components/PageTitle";

// constants
import { APP_TITLE, PAGE_TITLE_DASHBOARD, SIGN_IN } from '../utils/constants';

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

const SignIn: FC<{}> = (): ReactElement => {
    const classes = useStyles();
    return (
        <>
            <SignInComponent title="sign in page"/>

        </>
    )
}

export default SignIn;