import React, { ReactElement, FC, useEffect, useState, useReducer } from "react";
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
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// constants
import { APP_TITLE, DRAWER_WIDTH } from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import {getPractices, setLoading, getPracticeById } from '../store/actions/practiceProfileAction'
import {getProviderFindOne} from "../store/actions/providerProfileAction"
import Modal from '../components/practice/AddPractice'
// define css-in-js

// component imports 

import {RootState} from '../store'
import Search from './search'
import Alert from './Alert'
import Weather from './Weather'
import {setAlert} from '../store/actions/alertAction'
import {setError} from '../store/actions/weatherAction'



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
interface Props {
  open: boolean;
  handleMenuOpen: () => void;
  toggleTheme: () => void;
  useDefaultTheme: boolean;
}

const Header: FC<Props> = ({
  open,
  handleMenuOpen,
  toggleTheme,
  useDefaultTheme,
}): ReactElement => {
  const classes = useStyles();


  // dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

//use effect



  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState)=> state.weather.data)
  const loading = useSelector((state: RootState)=> state.practicebyid.loading)
  const error = useSelector((state: RootState)=> state.weather.error)
  const alertMsg = useSelector((state: RootState)=> state.alert.message)
  const preacticesList = useSelector((state:RootState)=> state.assignedpractices.practices )

  const [value, setValue] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  

  const [userId, setUserId]=useState(1);
  const [practicedd, setPracticedd]= useState([])
  const [practiceid, setPracticeid]= useState(null)
  
  useEffect( () => {

  let User = JSON.parse(localStorage.getItem('user') || '{}');

if(preacticesList.length==0) {
  
  dispatch(getPractices(User.id))

  }
   
  },[]);

  const onTagsChange = (event :any, values:any) => {
    debugger
    let p_v: any = preacticesList.find((item)=>{
     return  item.PracticeName==values
    })
   console.log(p_v)

    dispatch(getPracticeById(p_v?.p_id))
    dispatch(getProviderFindOne(p_v?.p_id))

    };
  


  return (
    <>
   
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={handleMenuOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
              size="small"
            >

             
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {APP_TITLE}
            </Typography>
          </div>
          
          <div style={{ width: 250, }}>

              {preacticesList.length>0 ? 
               <Autocomplete
          
               id="combo-box-demo"
               disableClearable
               options={preacticesList.map((option) => option.PracticeName)}
               defaultValue={preacticesList[0].PracticeName}
               onChange={onTagsChange}
               renderInput={(params) => (
                 <TextField
                   {...params}
                   label="Select Practice"
                   margin="normal"
                   variant="outlined"
                   InputProps={{ ...params.InputProps, type: 'search' }}
                 />
               )}
             /> : 
             <Autocomplete
             freeSolo
             id="free-solo-2-demo"
             disableClearable
             options={preacticesList.map((option) => option.PracticeName)}
             onChange={onTagsChange}
             renderInput={(params) => (
               <TextField
                 {...params}
                 label="No Practice Assigned"
                 margin="normal"
                 variant="outlined"
                 InputProps={{ ...params.InputProps, type: 'search' }}
               />
             )}
           /> 
            
            }
         
    </div>
    <Modal/>
          
    
        </Toolbar>
      </AppBar>

      
    </>
  );
};

export default Header;
