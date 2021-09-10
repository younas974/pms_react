
import React, { ReactElement, useReducer, FC, useState, useEffect } from "react";
import {
  createMuiTheme,
  Theme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from "react-helmet";

import {RootState} from './store'
import Search from './components/search'
import Alert from './components/Alert'
import Weather from './components/Weather'
import {setAlert} from './store/actions/alertAction'
import {setError} from './store/actions/weatherAction'
import Header from './components/Header';
import LogIn from './pages/SignIn'

// components
import Layout from "./components/Layout";

// theme
import { lightTheme, darkTheme } from "./theme/appTheme";

// app routes
import { routes } from "./config";

// constants
import { APP_TITLE } from "./utils/constants";

// interfaces
import RouteItem from "./model/RouteItem.model";

// define app context
const AppContext = React.createContext(null);

// default component
const DefaultComponent: FC<{}> = (): ReactElement => (
  <div>{`No Component Defined.`}</div>
);

function App() {

  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState)=> state.weather.data)
  const loading = useSelector((state: RootState)=> state.weather.loading)
  const error = useSelector((state: RootState)=> state.weather.error)
  const alertMsg = useSelector((state: RootState)=> state.alert.message)

  const [useDefaultTheme, toggle] = useReducer((theme) => !theme, true);

  // define custom theme
  let theme: Theme = createMuiTheme(useDefaultTheme ? lightTheme : darkTheme);
  theme = responsiveFontSizes(theme);

  let history = useHistory();
  
  useEffect( () => {

    let User = JSON.parse(localStorage.getItem('user') || '{}');
    if(!User.accessToken){
    //  history.push('/')
    }
     
    },[]);
  
  return (

    <>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <AppContext.Provider value={null}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
            <Route exact path="/" component={LogIn} />
            <Layout toggleTheme={toggle} useDefaultTheme={useDefaultTheme}>
                {/* for each route config, a react route is created */}
          
                {routes.map((route: RouteItem) => (
                  route.subRoutes ? route.subRoutes.map((item: RouteItem) => (
                    <Route
                      key={`${item.key}`}
                      path={`${item.path}`}
                      component={item.component || DefaultComponent}
                      exact
                    />
                  )) : 
                    <Route
                      key={`${route.key}`}
                      path={`${route.path}`}
                      component={route.component || DefaultComponent}
                      exact
                    />
                ))}

              </Layout>
            </Switch>
          </Router>
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;
