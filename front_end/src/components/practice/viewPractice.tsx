import React, {FC, FormEvent, useState, useEffect} from 'react'
import {setAlert} from '../../store/actions/alertAction'
import {getWeather, setLoading } from '../../store/actions/weatherAction'
 
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ViewPractice from '../../components/practice/vewpractice'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store";
import NoPracticeFound from '../../components/NoPracticeFound'
import Practiceprofilelogins from './practiceprofilelogins'
import Practiceprofiledocuments from './Practiceprofiledocuments'
import PracticeSidebar from './PracticeSidebar'
import Avatar from "@material-ui/core/Avatar";
import { getProviderLogIn } from '../../store/actions/providerProfileAction';
import { getPracticeLogIn } from '../../store/actions/practiceProfileAction';
import PermissionProvider from '../../permission-provider/PermissionProvider';
import { fetchPermission } from '../../_services/permissionServices';
import Restricted from '../../permission-provider/Restricted';
import { notAllowed } from '../nopermission';
import NoPracticeSideBar from './NoPracticeSideBar';


interface SearchProps{
    title: string,

}
const permissions= {
  department: ['IT', 'Creditionaling'],
  roles: ['ROLE_SUPERUSER']
}

function TabPanel(props:any) {
    const { children, value, index, ...other } = props;

    
  
    return (
      <div

        
        role="tabpanel"
        hidden={value !== index}
        class={`minheightfortabs-${index}`}
      
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
  
  function a11yProps(index:any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
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

 
const ViewPracticeCompoenent : FC<SearchProps> =({title})=>{

    const profile = useSelector((state: RootState)=> state.practicebyid.data)
    const provider = useSelector((state: RootState)=> state.provider.data)
    const providerlogin= useSelector((state: RootState)=> state.providerLogins.data)
    const practicelogin= useSelector((state: RootState)=> state.practiceLogin.data)
    const user = useSelector((state: RootState)=> state.user)

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUser, setIUser] = useState(false)
    const [isTeamLead, setIsTeamLead] = useState(false)
    const [isManager, setIsManager] = useState(false)
    const [isSuperUser, setIsSuperUser] = useState(false)
  
    const handleChange = (event: any, newValue: any) => {
      setValue(newValue);
    };

    const handlelogin =()=>{
      console.log(profile?.p_id)
      if(profile?.p_id){
        dispatch(getPracticeLogIn(profile?.p_id))
      }
      else{
        dispatch(getPracticeLogIn(0))
      }
    
    
    }

    

    const dispatch= useDispatch();
    const [city, setCity]=useState('');
    
 

    const submitHandler=(e: FormEvent<HTMLFormElement>) =>{

        e.preventDefault();
        if(city.trim()===''){
            return dispatch(setAlert('City is required'));
        }
        dispatch(setLoading())
        dispatch(getWeather(city))
        setCity('')
        
    }
 

    useEffect(() => {

      let userRoles :any[] = user.user.roles
      if (userRoles) {

  
        userRoles.map(item => {
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

    })

    return (

      
      <PermissionProvider fetchPermission={fetchPermission()}>
    <div className="hero is-light has-text-cetnered">
        
        <div className="rowpp"></div>
        
        <div className="row">
 
        <div className="col-lg-8 col-xl-9">

            <div className="tabstopajd">

        <div className={classes.root}>
            
            <AppBar position="static">
            
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary">
             
                <Tab label="Practice Profile" {...a11yProps(0)} />
                <Tab label="Logins" onClick={handlelogin}  {...a11yProps(1)} />
                <Tab label="Documents" {...a11yProps(2)} />
           
            </Tabs>
           
           </AppBar>
            
             <TabPanel value={value} index={0}>
             
                   {!profile ? <NoPracticeFound/>: profile && <ViewPractice profile={profile} />}
             
             </TabPanel>
               
             <TabPanel value={value} index={1}>
             <Restricted to={permissions} fallback={notAllowed}>
                 {practicelogin ?  <Practiceprofilelogins logins={practicelogin}/> : 'No Log Information Found'}
            </Restricted>
             </TabPanel>
            
             <TabPanel value={value} index={2}>
                
             <Restricted to={permissions} fallback={notAllowed}>
             <Practiceprofiledocuments/>
            </Restricted>

                
             
             </TabPanel>
    </div>

</div>
    
       </div>
 
       <div className="col-lg-3 col-xl-3 mb-4 mb-xl-0">
     {profile  ? <PracticeSidebar profile={profile.providers} /> :<NoPracticeSideBar/> }  

     </div>
    
    </div>
        
   </div>
   </PermissionProvider>
 );
}

export default ViewPracticeCompoenent