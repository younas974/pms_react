import React, { FC, ReactElement, useState, useEffect, FormEvent } from "react";
import { setAlert } from "../../store/actions/alertAction";
import { getWeather, setLoading } from "../../store/actions/weatherAction";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ViewProviderProfile from "./viewproviderprofile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import NoPracticeFound from "../../components/NoPracticeFound";
import Providerprofilelogins from "../../components/provider/providerprofilelogins";
import Providerprofiledocuments from "./ProviderProfileDocument";
import PracticeSidebar from "../provider/ProviderSidebar";
import EditProviderModal from "./editprovider/EditProviderComponent";
import Modal from "../../components/provider/AddProvider";
import { getProviderById, getProviderLogIn } from "../../store/actions/providerProfileAction";
import { getPracticeById } from "../../store/actions/practiceProfileAction";
import PermissionProvider from "../../permission-provider/PermissionProvider";
import { getUserDepatment, getUserRoles, fetchPermission } from "../../_services/permissionServices";
import { Permission } from "../../store/types/permissionypes";
import Restricted from "../../permission-provider/Restricted";
import { notAllowed } from "../nopermission";
import NoPracticeSideBar from "../practice/NoPracticeSideBar";

interface SearchProps {
  title: string;
}

const permissions= {
  department: ['IT', 'Creditionaling'],
  roles: ['ROLE_SUPERUSER']
}


function findCommonElements3(arr1:any, arr2:any) {
  return arr1.some((item: any )=> arr2.includes(item))
}



function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      class={`minheightfortabs-${index}`}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const ViewProviderCompoenent: FC<SearchProps> = ({ title }) => {
  const profile = useSelector((state: RootState) => state.practicebyid.data);
  const practice = useSelector((state: RootState)=> state.practicebyid.data)
  const provider = useSelector((state: RootState) => state.provider.data);
  const providerlogin = useSelector(
    (state: RootState) => state.providerLogins.data
  );
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handlelogin = () => {
    if (provider) {
      if (provider?.providerId) {
        dispatch(getProviderLogIn(provider?.providerId));
      } else {
        dispatch(getProviderLogIn(0));
      }
    } else {
      dispatch(getProviderLogIn(0));
    }
  };

  const dispatch = useDispatch();
  const [city, setCity] = useState("");

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const user = useSelector((state: RootState) => state.user);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIUser] = useState(false);
  const [isTeamLead, setIsTeamLead] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);

  useEffect(() => {

    console.log('below are the provider')
    console.log(getUserDepatment())
    let userRoles: any[] = user.user.roles;
    if (userRoles) {
      userRoles.map((item) => {
        if (item == "ROLE_USER") {
          setIUser(true);
        }

        if (item == "ROLE_TEAMLEAD") {
          setIsTeamLead(true);
        }

        if (item == "ROLE_ADMIN") {
          setIsAdmin(true);
        }

        if (item == "ROLE_MANAGER") {
          setIsManager(true);
        }

        if (item == "ROLE_SUPERUSER") {
          setIsSuperUser(true);
        }
      });
    }

    let User = JSON.parse(localStorage.getItem("user") || "{}");

    if(!practice){
      if(User.practices.length>0){
        dispatch(getPracticeById(User.practices[0].p_id))
      }
     
    }
  }, []);

  return (
    <PermissionProvider fetchPermission={fetchPermission()}>
    <div className="hero is-light has-text-cetnered">
      <div className="rowpp"></div>

      <div className="row">
        <div className="col-lg-8 col-xl-9">
          <div className="tabstopajd">
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                  indicatorColor="primary"
                >
                  <Tab label="Provider Profile" {...a11yProps(0)} />
                  <Tab label="Logins" onClick={handlelogin} {...a11yProps(1)} />
                  <Tab label="Documents" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              
              <TabPanel value={value} index={0}>
                {!provider ? (
                  <NoPracticeFound />
                ) : (
                  provider &&   
                    <ViewProviderProfile profile={provider} /> 
                )}
                <div className="card-body">
                  <div className="mb-1 mt-1 mr-1 text-lg-right formfooterbtn">

                  <Restricted to={permissions} fallback={''}>
                  <EditProviderModal data={profile} /> 
                     </Restricted>

                  </div>
                  <div className="mb-1 mt-1 mr-1 text-lg-right formfooterbtn">

                  <Restricted to={permissions} fallback={''}>
                  <Modal /> 
                     </Restricted>
                
                  </div>
                </div>
              </TabPanel>
                   
              <TabPanel value={value} index={1}>

              <Restricted to={permissions} fallback={notAllowed}>
              <Providerprofilelogins logins={providerlogin} />
                     </Restricted>
               
              </TabPanel>
              <TabPanel value={value} index={2}>

              <Restricted to={permissions} fallback={notAllowed}>
              <Providerprofiledocuments />
              
                     </Restricted>
              
              </TabPanel>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-xl-3 mb-4 mb-xl-0">
          {profile ? <PracticeSidebar profile={profile.providers} /> : <NoPracticeSideBar/>}
        </div>
      </div>
    </div>
    </PermissionProvider>
  );
};

export default ViewProviderCompoenent;
