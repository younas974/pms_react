import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import  {Addresstype} from '../../model/Practiceprofile.model'
import { RootState } from "../../store";
import { useDispatch, useSelector } from 'react-redux';
//import SimpleForm from "../components/SimpleForm";
import SubmitValidationForm from "../practice/SimpleForm";
import {getPractices, setLoading, getPracticeById, createPractice } from '../../store/actions/practiceProfileAction'
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
 
const practicedata= 
	{
		p_id: null,
		PracticeName: "",
		groupNPI	:null ,
		licenceNo: "",
		textId: null,
		malPractice: "",
		DEACertification: "",
		CDSPharmacyCertification: "",
		phoneINTEGER: "",
		faxINTEGER: "",
		hospitalAffiiation: "",
		cellNumber: "",
		medicarePTAN: "",
		emailAddress: "",
		medicaidTPIGroup: "",
		officeEmailAddress: "",
		autorizedOfficialEmail: "",
		CARFAcceditation: "",
		contactOfficialEmail: "",
		County: "",
		addresses: [
			{
				id: "",
				streetaddress: "",
				city: "",
				state:"",
				zip:"",
			country: "",	
			addresstypId: null,
				addestype: {
				id:null,
				name: "service"
				}
			},
			{
				id: "",
				streetaddress: "",
				city: "",
				state:"",
				zip:"",
			country: "",	
			addresstypId: null,
				addestype: {
				id:null,
				name: "mailing"
				}
			},
			{
				id: "",
				streetaddress: "",
				city: "",
				state:"",
				zip:"",
			country: "",	
			addresstypId: null,
				addestype: {
				id:null,
				name: "payto"
				}
			},
		]
	}



export default function FullScreenDialog() {

	const profile = useSelector((state)=> state.practicebyid.data)
	const dispatch = useDispatch();

  const [addPractice, setAddPractice]= useState({
    data: practicedata,
    loading:false,
    error:''
})

 const showResults= (async function showResults(values) {

	await dispatch(setLoading())
	await	dispatch(createPractice(values))
	setOpen(false)

	 });


	
  const classes = useStyles();

  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {

	console.log("i am in add practice")
	console.log(practicedata)


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

		 <h2 class="card-title-ask">Add New Practices</h2>

	  </header>
        <List>
          <div className="card-body">
			
      
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