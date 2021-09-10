import React,{  useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { createPractice, createPracticeLogin } from '../../store/actions/practiceProfileAction'
import SubmitValidationForm from "../practice/AddPracticeloginsfrom";

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
const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <div>
        <input className="form-control" {...input} placeholder={label} type={type}  />
        {touched && error && <span style={{color:"red"}}>{error}</span>}
  
      </div>
    </div>
  );
 
export default function FullScreenDialog() {

	const profile = useSelector((state)=> state.practicebyid.data)
	
    const dispatch = useDispatch();
  
    const classes = useStyles();
 
    const [open, setOpen] = React.useState(false);

        
const [user_info, serUser_info] =React.useState({
	user_id:null,
	token: '',
	roles: []
});


    const handleClickOpen = () => {
    
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };


  const showResults= (async function showResults(values) {

    console.log('below are the values')
    console.log(profile)
    values.p_id=profile?.p_id;
    values.created_by=user_info.user_id;
	  values.updated_by=user_info.user_id;
   dispatch(createPracticeLogin(values))
   handleClose();


  });
 
  
  
  
  
  useEffect(() => {
    

    
    let User = JSON.parse(localStorage.getItem('user') || '{}');
    serUser_info({...user_info, user_id: User.id, token: User.accessToken, roles: User.roles})
  
        return false
    },[]);

  return (
    <div>

      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      <i class="fa fa-plus" aria-hidden="true"></i> &nbsp;   ADD
      </Button>
      
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} disableBackdropClick={true}>
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

		 <h2 class="card-title-ask">Add Practice Logins</h2>

	  </header>

        <List>
         
          <div className="card-body11">

          <SubmitValidationForm onSubmit={showResults} />
         
         </div>
          
          <Divider />
         
          <ListItem button>
           
          </ListItem>
          
          </List>
	
      </Dialog>
	 
    </div>

 );
}