import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { useDispatch, useSelector } from 'react-redux';
import SubmitValidationForm from "./ProvidersimpleForm";
import {createProvider} from "../../store/actions/providerProfileAction"

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
	const user= useSelector((state)=>state.user.user)
	const dispatch = useDispatch();

  const [addPractice, setAddPractice]= useState({
    data: practicedata,
    loading:false,
    error:''
})

 const showResults= (async function showResults(values) {
			values.created_by=user_info.user_id;
			values.p_id=profile.p_id;
			values.updated_by=user_info.user_id;
			console.log(JSON.stringify(values))
			if(values.driving_licence){
				values.driving_licence.created_by=user_info.user_id;
				values.driving_licence.updated_by=user_info.user_id;
			}

			if(values.state_licence){
				values.state_licence.created_by=user_info.user_id;
				values.state_licence.updated_by=user_info.user_id;
			}


			if(values.dae_certification){
				values.dae_certification.created_by=user_info.user_id;
				values.dae_certification.updated_by=user_info.user_id;
			}

			if(values.pharmacy_certification){
				values.pharmacy_certification.created_by=user_info.user_id;
				values.pharmacy_certification.updated_by=user_info.user_id;
			}

			if(values.caqh_creditional){
				values.caqh_creditional.created_by=user_info.user_id;
				values.caqh_creditional.updated_by=user_info.user_id;
			}
		

			var jsonse = JSON.stringify(values);
			var blob = new Blob([jsonse], {type: "application/json"});

			let formData = new FormData();
			formData.append('uploadfile', null);
			formData.append('data', blob);


	// await dispatch(setLoading())
	 await	dispatch(createProvider(formData))
	setOpen(false)



	 });


	
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

		 <h2 class="card-title-ask">Add New Provider</h2>

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