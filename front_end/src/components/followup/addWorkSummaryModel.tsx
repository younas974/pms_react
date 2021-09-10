import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Antddropdown from "./addWorkSummaryComponent"
import AutorenewIcon from '@material-ui/icons/Autorenew';
import LastPageIcon from '@material-ui/icons/LastPage';
import DialogActions from '@material-ui/core/DialogActions';
import RestoreIcon from '@material-ui/icons/Restore';


const useStyles = makeStyles((theme) =>
createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: '40%',
    height: 'auto',
    fontSize: '13px',
    
    boxShadow: theme.shadows[0],
    padding: theme.spacing(0, .5, .5),
    borderRadius: '8px',
  },

  label: {fontSize: '13px', },

  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}),
);




export default function TransitionsModal(props: any) {



  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [mopen, setMopen] =React.useState(false);

  const [age, setAge] = React.useState<string | number>('');
  const [openn, setOpenn] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as number);
  };


  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
   
  };


useEffect( () => {
//  setOpen(props.open);
  console.log(props.data)
  },
  [],
);

const handleCallback = (childData:any) =>{

        setOpen(childData)
    
          onTrigger(true)
        

}

const onTrigger = (event:any) => {
  props.parentCallback(event);
 // event.preventDefault();
}


  return (
    <div>
      
        <RestoreIcon  onClick={handleOpen} style={{border: 'none', background: 'none', cursor:'pointer'}}/>
     
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <header className="card-header">
									<div className="card-actions">
                  <div className="button-ask-adj">	 
									  <DialogActions>
          				 		   	<Button onClick={handleClose} color="primary">
           							 		 Close
         								</Button>
          								 
        							  </DialogActions>
										</div>	
									  </div>
									 

									<h2 className="card-title">Follow Up Action</h2>
 	</header>
     <br/>
        <Antddropdown  parentCallback = {handleCallback} data={props.data}/>
          </div>
        </Fade>
        
      </Modal>
      
    </div>
  );
}
