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
import { useDispatch, useSelector } from 'react-redux';
//import SimpleForm from "../components/SimpleForm";
import EditProviderForm from "./editProviderForm";
import {getPractices, setLoading, updatePractice, setEditPracticeModal } from '../../../store/actions/practiceProfileAction'
import {updateProvider} from '../../../store/actions/providerProfileAction'
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
 
export default function EditPracticeDialog(data) {



	const profile = useSelector((state)=> state.practicebyid.data)
    const ismodal = useSelector((state)=> state.updatePractice.setmodel)
	const provider = useSelector((state)=> state.provider.data)
	const dispatch = useDispatch();

  const [addPractice, setAddPractice]= useState({
    data: practicedata,
    loading:false,
    error:''
})

const [user_info, serUser_info] =React.useState({
	user_id:null,
	token: '',
	roles: []
});


 const showResults= (async function showResults(values) {


	values.created_by=user_info.user_id;
	values.p_id=profile.p_id;
	values.updated_by=user_info.user_id;
	if(values.driving_licence){
		values.driving_licence.created_by=user_info.user_id;
		values.driving_licence.updated_by=user_info.user_id;
		values.driving_licence.provider_id=provider?.providerId;
	}

	if(values.state_licence){
		values.state_licence.created_by=user_info.user_id;
		values.state_licence.updated_by=user_info.user_id;
		values.state_licence.provider_id=provider?.providerId
	}


	if(values.dae_certification){
		values.dae_certification.created_by=user_info.user_id;
		values.dae_certification.updated_by=user_info.user_id;
		values.dae_certification.provider_id=provider?.providerId
	}

	if(values.pharmacy_certification){
		values.pharmacy_certification.created_by=user_info.user_id;
		values.pharmacy_certification.updated_by=user_info.user_id;
		values.pharmacy_certification.provider_id=provider?.providerId;
	}

	if(values.caqh_creditional){
		values.caqh_creditional.created_by=user_info.user_id;
		values.caqh_creditional.updated_by=user_info.user_id;
		values.caqh_creditional.provider_id=provider?.providerId
	}


	var jsonse = JSON.stringify(values);
	var blob = new Blob([jsonse], {type: "application/json"});

	console.log('below are the values')
	console.log(JSON.stringify(values))
	let formData = new FormData();
	formData.append('uploadfile', null);
	formData.append('data', blob);


   
	 await dispatch(setLoading())
    let res= await	dispatch(updateProvider(formData))
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

	let User = JSON.parse(localStorage.getItem('user') || '{}');
	serUser_info({...user_info, user_id: User.id, token: User.accessToken, roles: User.roles})

 
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

		 <h2 class="card-title-ask">Update Provider</h2>

	  </header>

        <List>

          <div className="card-body11">
     
		  <EditProviderForm  profile={data.data} onSubmit={showResults} />
     
		 </div>
          
          <Divider />
		  
          <ListItem button>
           
          </ListItem>
        </List>
	
      </Dialog>
	 
    </div>

 );
}