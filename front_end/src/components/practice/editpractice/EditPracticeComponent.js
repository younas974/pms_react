import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { useDispatch, useSelector } from 'react-redux';
//import SimpleForm from "../components/SimpleForm";
import EditPracticeForm from "./editPracticeForm";
import submit from './editPracticeValidation';
import {getPractices, setLoading, updatePractice, setEditPracticeModal } from '../../../store/actions/practiceProfileAction'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background:'#fff !important',
    width:'50%'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditPracticeDialog(data) {

	const profile = useSelector((state)=> state.practicebyid.data)
    const ismodal = useSelector((state)=> state.updatePractice.setmodel)
	const dispatch = useDispatch();

 
 const showResults= (async function showResults(values) {

   
	 await dispatch(setLoading())
    let res= await	dispatch(updatePractice(values))
	 setOpen(false)

	 });


	
  const classes = useStyles();

  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      
      dispatch(setEditPracticeModal(true))
      setOpen(true);
  };



  const handleClose = () => {

 dispatch(setEditPracticeModal(false))
    setOpen(false);
  };

  useEffect(() => {

   return false
  },[]);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
         Edit
      </Button>
      <Dialog fullScreen open={ismodal} onClose={handleClose} TransitionComponent={Transition} disableBackdropClick={true}>
      <header class="card-header-ask">

	  <div class="card-actions">
										<div class="button-ask-adj">	 
									  <DialogActions>
          				 		   	<Button onClick={handleClose} color="primary">
           							 		 Close
         								</Button>
          								 
        							  </DialogActions>
										</div>	
									  </div>

		 <h2 class="card-title-ask">Update Practices</h2>

	  </header>
        <List>
          <div className="card-body">
			
      
		  <EditPracticeForm  profile={data.data} onSubmit={showResults} />
     
		 </div>
          
          <Divider />
          <ListItem button>
           
          </ListItem>
        </List>
	
      </Dialog>
	 
    </div>

 );
}