import React, {
  ReactElement,
  FC,
  useEffect,
  useState,
  useReducer,
} from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import UserIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

// constants
import { APP_TITLE, DRAWER_WIDTH } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  getPractices,
  setLoading,
  getPracticeById,
  getPracticeLogIn,
} from "../../store/actions/practiceProfileAction";
import Modal from "../practice/AddPractice";
// define css-in-js
// component imports

import { RootState } from "../../store";
import Search from "../search";
import Alert from "../Alert";
import Weather from "../Weather";
import { setAlert } from "../../store/actions/alertAction";
import { setError } from "../../store/actions/weatherAction";
import {getProviderFindOne} from "../../store/actions/providerProfileAction"
import { setUserInfo } from "../../store/actions/user.actions";

// constants

// define css-in-js

// define interface to represent component props
interface Props {
  open: boolean;
  handleMenuOpen: () => void;
  toggleTheme: () => void;
  useDefaultTheme: boolean;
}
interface Props {
  open: boolean;
  handleMenuOpen: () => void;
  toggleTheme: () => void;
  useDefaultTheme: boolean;
}

const HeaderTop: FC<any> = ({
  open,
  handleMenuOpen,
  toggleTheme,
  useDefaultTheme,
}): ReactElement => {
  // dropdown

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      toolbar: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      title: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      menuButton: {
        marginRight: 36,
      },
      hide: {
        display: "none",
      },
    })
  );

  // define interface to represent component props

  //use effect

  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const loading = useSelector((state: RootState) => state.practicebyid.loading);
  const error = useSelector((state: RootState) => state.weather.error);
  const alertMsg = useSelector((state: RootState) => state.alert.message);
  const user = useSelector((state: RootState)=> state.user)


  const preacticesList = useSelector(
    (state: RootState) => state.assignedpractices.practices
  );

  const [value, setValue] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [title, setTitle] = React.useState(null);


  const [isAdmin, setIsAdmin] = useState(false)
  const [isUser, setIUser] = useState(false)
  const [isTeamLead, setIsTeamLead] = useState(false)
  const [isManager, setIsManager] = useState(false)
  const [isSuperUser, setIsSuperUser] = useState(false)

  

  useEffect(() => {

    let User = JSON.parse(localStorage.getItem("user") || "{}");
    let userinfo;
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

    let userRoles :any[] = user.user.roles
    if (userRoles) {

      User.roles.map((item: any) => {
        if (item == 'ROLE_USER') {
          setIUser(true)
        }

        if (item == 'ROLE_TEAMLEAD') {
          setIsTeamLead(true)
        }

        if (item == 'ROLE_ADMIN') {
          setIsAdmin(true)
        }

        if (item == 'ROLE_MANAGER') {
          setIsManager(true)
        }

        if (item == 'ROLE_SUPERUSER') {
          setIsSuperUser(true)
        }


      })

     }

    if (preacticesList.length == 0) {
      dispatch(getPractices(User.id));
    }
  }, []);

  const onTagsChange = (event: any, values: any) => {

    let p_v: any = preacticesList.find((item) => {
      return item.PracticeName == values;
    });
    console.log(p_v);

  dispatch(getPracticeById(p_v?.p_id))
  dispatch(getProviderFindOne(p_v?.p_id))
  dispatch(getPracticeLogIn(p_v?.p_id))

  };
  return (
    <>
      <header className="header">
        <div className="logo-container">
          <a href="#" className="logo">
            <img src="../images/logo.png" height="40" alt="PROMBS Admin" />
          </a>

          <div
            className="d-md-none toggle-sidebar-left"
           // data-toggle-className="sidebar-left-opened"
            data-target="html"
            data-fire-event="sidebar-left-opened"
          >
            <i className="fas fa-bars" aria-label="Toggle sidebar"></i>
          </div>
        </div>

        <div className="header-right">
          <ul className="notifications">
            <li>
              <div className="dropdown-menu notification-menu">
                <div className="content">
                  <div className="text-right">
                    <a href="#" className="view-more">
                      View All
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <span className="separator"></span>

          <div id="userbox" className="userbox">
            <div className="form-group row rowheaderadv">
              <div className="col-lg-5 col-5 col-sm-5">
                <div style={{ width: 210 }}>
                  {preacticesList.length > 0 ? (
                    <Autocomplete
                      id="combo-box-demo"
                      disableClearable
                      options={preacticesList.map(
                        (option) => option.PracticeName
                      )}
                      defaultValue={preacticesList[0].PracticeName}
                      onChange={onTagsChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Practice"
                          margin="normal"
                          variant="outlined"
                          InputProps={{ ...params.InputProps, type: "search" }}
                        />
                      )}
                    />
                  ) : (
                    <Autocomplete
                      freeSolo
                      id="free-solo-2-demo"
                      disableClearable
                      options={preacticesList.map(
                        (option) => option.PracticeName
                      )}
                      onChange={onTagsChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="No Practice Assigned"
                          margin="normal"
                          variant="outlined"
                          InputProps={{ ...params.InputProps, type: "search" }}
                        />
                      )}
                    />
                  )}
                </div>
              </div>

              <div className="col-lg-3 col-sm-2 control-label text-lg-left pt-2 pptextlable topheaderbtnadj">
                {isAdmin ?  <Modal />  : '' }
              </div>

              <div className="col-lg-4 col-sm-1 colaskadj">
                <a href="#" data-toggle="dropdown">
                  <figure className="profile-picture">
                    <IconButton
                      size="small"
                      color="inherit"
                      onClick={handleClick}
                    > 
                      <UserIcon />
                    </IconButton>
                  </figure>

                  <div
                    className="profile-info"
                    data-lock-name="John Doe"
                    data-lock-email="prombs.com"
                  >
                    <span className="name">Welcome Aftab</span>

                    <span className="role">administrator</span>
                  </div>
                </a>

                <div className="dropdown-menu">
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>

                    <MenuItem onClick={handleClose}>My account</MenuItem>

                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderTop;
