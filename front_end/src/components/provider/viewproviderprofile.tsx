import React, { FC, ReactElement, useState, useEffect } from "react";
import { practiceprofile } from '../../store/types'
import { APP_TITLE, PAGE_TITLE_HOME } from "../../utils/constants";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import EditProviderModal from './editprovider/EditProviderComponent'
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store";
import Modal from '../../components/provider/AddProvider'
import { ProviderObject } from "../../store/typesfolder/provider.types";
import { DatePicker, Select } from "antd";
import moment from "moment";
import { wrapDatePicker } from "../../components/helper/datepicker";
import { getUserDepatment, getUserRoles } from "../../_services/permissionServices";
import Restricted from "../../permission-provider/Restricted";

const ADatePicker = wrapDatePicker(DatePicker);
const dateFormat = 'MM-DD-YYYY';

interface practiceProps {
    profile: ProviderObject;
}

const permissions= {
      department: ['IT', 'Creditionaling'],
      roles: ['ROLE_SUPERUSER']
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  })
);

const ViewPractice: FC<practiceProps> =({profile}) =>{

    const classNamees = useStyles();
    const { addToast } = useToasts();
  	const dispatch = useDispatch();


const showtoest=(message:string, appearance: any)=>{

}

useEffect( () => {
  
console.log('Below is the user')     
console.log(getUserDepatment())

    },[]);
    

    const notAllowed = (<div className="container">
    <div className="row">
        <div className="col">
            <h4>Not Allowed </h4>
            You are not allowed to access this feature, please contact your administrator
        </div>
    </div>
</div>);
    return(
        <>
        <Helmet>
                <title>
                  {PAGE_TITLE_HOME} | {APP_TITLE}
                </title>
        </Helmet>
         
              <div className={classNamees.root}>
              <div className="col">
            
        <header className="card-header">
					 
			    	 <h2 className="card-title-ppp colordblur">Personal Information</h2>
			 
        </header>

<br/>
                                     
 <form className="form-horizontal form-bordered" method="get">
                                                  
     <div className="form-group row">
        <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >First Name:</label>
              <div className="col-lg-3">
                    <input readOnly={true} value={profile?.providerFirstName} name="name"  type="text" className="form-control" placeholder="name"   disabled={false}/>
              </div>

              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Middle Name:</label>
                 <div className="col-lg-3">
                     <input readOnly={true} value={profile?.providerMiddleName} type="text" className="form-control"  />
                 </div>      
                                                        
              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">Last Name:</label>
                                                        
                 <div className="col-lg-3">
                      <input readOnly={true} value={profile?.providerLastName} type="text" className="form-control"  />
                 </div>
   
     </div>
 
     <div className="form-group row">
        <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >SSN No:</label>
              <div className="col-lg-3">
                    <input readOnly={true} value={profile?.SSN} name="name"  type="text" className="form-control" placeholder="name"   disabled={false}/>
              </div>

              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Individual NPI:</label>
                 <div className="col-lg-3">
                     <input readOnly={true} value={profile?.individualNPI} type="text" className="form-control"  />
                 </div>      
                                                        
                 <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >DOB:</label>
                                                        
                   <div className="col-lg-3">
                         <input readOnly={true} value={profile?.DOB} type="text" className="form-control"  />
                    </div>
      
     </div>

     <div className="form-group row">
        <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Job Title:</label>
              <div className="col-lg-3">
                     <input readOnly={true} value={profile?.providerTitle} name="name"  type="text" className="form-control" placeholder="name"   disabled={false}/>
              </div>

              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Gender:</label>
                 <div className="col-lg-3">
                     <input readOnly={true} value={profile?.gender} type="text" className="form-control"  />
                 </div>      
                                                        
                 <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Tax ID:</label>
                                                        
                   <div className="col-lg-3">
                         <input readOnly={true} value={profile?.textId} type="text" className="form-control"  />
                    </div>
     
     </div>
                                                    
     <div className="form-group row" >
             
  <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Speciality:</label>
    
         <div className="col-lg-3">
               <input readOnly={true} value={profile?.speciality} type="text" className="form-control"  />
        </div>
 
    </div>  
    <br/><br/>
    
    <header className="card-header">

                      	 
                     <h2 className="card-title-ppp colordblur">Contact Information</h2>
                    
     </header>
<br/>
<Restricted to={permissions} fallback={notAllowed}>
    <div className="form-group row" >

         <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable" >Email ID:</label>
            <div className="col-lg-3">
                <input readOnly={true} value={profile?.officeEmailAddress} type="text" className="form-control"  />
            </div>
   

         <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Official Email:</label>
            <div className="col-lg-3">
              <input readOnly={true} value={profile?.officeEmailAddress} type="text" className="form-control"  />
            </div>


         
            <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Phone Number:</label>
           <div className="col-lg-3">
              <input readOnly={true} value={profile?.phoneNumber? profile?.phoneNumber:''} type="text" className="form-control"  />
           </div>
     
     </div> 
                                                   
     <div className="form-group row">
        
     <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Fax Number:</label>
              <div className="col-lg-3">
                     <input readOnly={true} value={profile?.faxINTEGER} type="text" className="form-control"  />
               </div>
       
               <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Cell Number:</label>
                <div className="col-lg-3">
                    <input readOnly={true} value={profile?.cellNumber} type="text" className="form-control"  />
                </div>                                                   
   
  <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Email Address:</label>
                                                        
                <div className="col-lg-3">
                        <input readOnly={true} value={profile?.emailAddress} type="text" className="form-control"  />
                </div>
          
     </div>
    
     </Restricted>
      <br/><br/>
    


     <header className="card-header">
				 <h2 className="card-title-ppp colordblur">Other Information</h2>
    </header>

   <br/>
   <Restricted to={permissions} fallback={notAllowed}>
     <div className="form-group row">
       
             <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >CAQHID: </label>
    
        <div className="col-lg-3">
         <input readOnly={true}  value={profile?.CAQHID} type="text" className="form-control"  />
        </div>

        <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >State License No:</label>
                                                       
               <div className="col-lg-3">
                    <input readOnly={true}  value={profile?.state_licence.title} type="text" className="form-control"  />
               </div> 

         <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >CARF Acceditation:</label>
                                                       
               <div className="col-lg-3">
                    <input readOnly={true}  value={profile?.CARFAcreditation} type="text" className="form-control"  />
               </div>  

               {
                     profile?.pharmacy_certification ?
                   <>
<label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Pharmacy Certification:</label>
                                                       
                                                       <div className="col-lg-3">
                                                             {profile?.pharmacy_certification.title ? <input readOnly={true}  value={profile?.pharmacy_certification.title} type="text" className="form-control"  /> : ''}
                                                             
                                 
                                                       </div>       
                                 
                                                        <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Effective Date:</label>
                                                                                        
                                                       <div className="col-lg-3">
                                                             {/* <DatePicker value={profile?.pharmacy_certification.effective_date} type="text" className="form-control"  /> */}
                                                       
                                                             <DatePicker disabled={true}  className="form-control"   format={dateFormat}  defaultValue={moment(profile?.pharmacy_certification.effective_date, dateFormat)} />
                                                       </div>      
                                 
                                                       <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Valid Thru:</label>
                                                                                        
                                                             <div className="col-lg-3">
                                                                   {/* <DatePicker value={profile?.pharmacy_certification.effective_date} type="text" className="form-control"  /> */}
                                                             
                                                                   <DatePicker  className="form-control"  disabled={true}   format={dateFormat}  defaultValue={moment(profile?.pharmacy_certification.expiry_date, dateFormat)} />
                                                             </div>    
                    </>
                       : ''
               }
                       
      </div> 
                  {profile.dae_certification ?
 <div className="form-group row">
           
 <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >DAE Certification:</label>
 
          <div className="col-lg-3">
               {profile.dae_certification ? <input readOnly={true}  value={profile?.dae_certification.title} type="text" className="form-control"  /> : ''}
          </div>

          <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Effective Date:</label>
                                             
                    <div className="col-lg-3">
                          {/* <DatePicker value={profile?.pharmacy_certification.effective_date} type="text" className="form-control"  /> */}
                    
                          {profile.dae_certification ?   <DatePicker disabled={true}  className="form-control"   format={dateFormat}  defaultValue={moment(profile?.dae_certification.effective_date, dateFormat)} />: ''} 
                         
                    </div>      
            
                    <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Valid Thru:</label>
                                                     
                          <div className="col-lg-3">
                                {/* <DatePicker value={profile?.pharmacy_certification.effective_date} type="text" className="form-control"  /> */}
                          
                                {profile.dae_certification ?  <DatePicker  disabled={true}  className="form-control"   format={dateFormat}  defaultValue={moment(profile?.dae_certification.expiry_date, dateFormat)} /> : ''} 
                         

                                
                          </div>    
</div>  

: ''

                  }        

                  {
                        profile?.state_licence ? 
<div className="form-group row">
           
          
           <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >State Licence:</label>
                    <div className="col-lg-3">
                    {profile?.state_licence.title ? <input value={profile?.state_licence.title} type="text" className="form-control"  /> : ''}
                       
                    </div>

                    <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Effective Date:</label>
                                                       
                              <div className="col-lg-3">
                                    {/* <DatePicker value={profile?.pharmacy_certification.effective_date} type="text" className="form-control"  /> */}
                              
                                    <DatePicker disabled={true}  className="form-control"   format={dateFormat}  defaultValue={moment(profile?.state_licence.effective_date, dateFormat)} />
                              </div>      
                      
                              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Valid Thru:</label>
                                                               
                                    <div className="col-lg-3">
                                          {/* <DatePicker value={profile?.pharmacy_certification.effective_date} type="text" className="form-control"  /> */}
                                    
                                          <DatePicker  disabled={true}  className="form-control"   format={dateFormat}  defaultValue={moment(profile?.state_licence.expiry_date, dateFormat)} />
                                    </div>    
         </div>  
:''


                  }                          
        
        {profile?.driving_licence ?

<div className="form-group row">
           
          
<label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Driving Licence:</label>
         <div className="col-lg-3">
         {profile?.driving_licence ? <input readOnly={true}  value={profile?.driving_licence.title} type="text" className="form-control"  /> : 'NIL'}
            
         </div>

         <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Effective Date:</label>
                                            
                   <div className="col-lg-3">
                         {/* <DatePicker value={profile?.pharmacy_certification.effective_date} type="text" className="form-control"  /> */}
                   
                         {profile?.driving_licence ? <DatePicker  className="form-control"   format={dateFormat} disabled={true}   defaultValue={moment(profile?.driving_licence.effective_date, dateFormat)} inputReadOnly={true}  />  : 'NIL'} 
                         
                   </div>      
           
                   <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Valid Thru:</label>
                                                    
                         <div className="col-lg-3">
                               {/* <DatePicker value={profile?.pharmacy_certification.effective_date} type="text" className="form-control"  /> */}
                         
                               {profile?.driving_licence ? <DatePicker  disabled={true}  className="form-control"  format={dateFormat}  defaultValue={moment(profile?.driving_licence.expiry_date, dateFormat)} /> : 'NIL'} 

                               
                         </div>    
</div>  

:''
        }
         
       

 
                  {profile.addresses.length>0 ? 
                                                    
           <div>

    <div className="form-group row">
     </div>   
                                                    
      <div className="form-ask-height">
            <div className="form-group row" >

                <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Service Address:</label>
            
            <div className="col-lg-4">
                                                        
           <input readOnly={true}  value={profile?.addresses[0].addresstype.name=="service"? profile.addresses[0].streetaddress : '' } type="text" className="form-control"  />
                                                            
                <div className="col-lg-4-ask-2">
                                                         
        <div className="row form-group">
                
                 <div className="col-lg-4-ask-1">
                      <input readOnly={true}  value={profile?.addresses[0].addresstype.name=="service"? profile.addresses[0].zip : '' } type="text" name="Zip" placeholder="Zip" className="form-control" />
                 </div>
         
               <div className="mb-3 hidden-lg"></div>
         
                <div className="col-lg-4-ask">
                     <input readOnly={true}  value={profile?.addresses[0].addresstype.name=="service"? profile.addresses[0].state : '' } type="text" name="State" placeholder="State" className="form-control" />
                </div>
         
        <div className="mb-3 hidden-lg"></div>
         
            <div className="col-lg-4-ask">
                 <input readOnly={true}  value={profile?.addresses[0].addresstype.name=="service"? profile.addresses[0].city : '' } type="text" name="Area code" placeholder="Area code" className="form-control" />
            </div>
                                                          
                  </div>
                     </div>
                                                         
                         </div>
                                                        {
          profile?.addresses.map((item:any) => {
            if (item.addresstype.name =="payto") {
              return (
                  <>
                <label className="col-ask-3 control-label text-lg-right pt-2 pptextlable"  >Pay to Address:</label>
                <div className="col-lg-4">
                  <div>
            
            <input readOnly={true}  value={item.streetaddress? item.streetaddress : '' } type="text" className="form-control"  />
                   <div className="col-lg-4-ask-2">
                        <div className="row form-group">
                              <div className="col-lg-4-ask-1">
                                    <input value={item.zip? item.zip : '' } type="text" name="Zip" placeholder="Zip" className="form-control" />
                               </div>
         
                              <div className="mb-3 hidden-lg"></div>
         
                                <div className="col-lg-4-ask">
                                     <input value={item.state? item.state : '' } type="text" name="State" placeholder="State" className="form-control" />
                                </div>
         
                                <div className="mb-3 hidden-lg"></div>
         
                                <div className="col-lg-4-ask">
                                    <input value={item.city? item.city : '' } type="text" name="Area code" placeholder="Area code" className="form-control" />
                                </div>
                                                          
                             </div>
                           </div>
                      </div>
                      </div>
                      </>
              )
            }
          
          })
        }
                                   
                                                   
       </div> 
           </div>
                <div className="form-group row" >
                    <label className="col-lg-2 control-label text-lg-left pt-2"  ></label>
                    <label className="col-ask-3 control-label text-lg-left pt-2"  ></label>
                </div> 
             <div className="form-ask-height-1">
                                                    
        
                                                        {
          profile?.addresses.map((item:any) => {
            if (item.addresstype.name =="mailing") {
              return (
                <div className="form-group row" >
                <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Mailing Address:</label>
                <div className="col-lg-4">
                  <div>
            <input readOnly={true}  value={item.streetaddress? item.streetaddress : '' } type="text" className="form-control"  />
                 <div className="col-lg-4-ask-2">
                     <div className="row form-group">
                              <div className="col-lg-4-ask-1">
                                    <input readOnly={true}  value={item.zip? item.zip : '' } type="text" name="Zip" placeholder="Zip" className="form-control" />
                              </div>
         
                              <div className="mb-3 hidden-lg"></div>
         
                                 <div className="col-lg-4-ask">
                                   <input readOnly={true}  value={item.state? item.state : '' } type="text" name="State" placeholder="State" className="form-control" />
                                 </div>
         
                                 <div className="mb-3 hidden-lg"></div>
         
                                  <div className="col-lg-4-ask">
                                      <input readOnly={true}  value={item.city? item.city : '' } type="text" name="Area code" placeholder="Area code" className="form-control" />
                                  </div>
                                                          
                              </div>
                          </div>
                      </div>
                      </div>
                                                    
                      </div>  
              )
            }
          
          })
        }
 
                </div>
                                              
                    </div> : ''
                                                
              }
 
         {/* <div className="card-body">
									<div className="mb-1 mt-1 mr-1 text-lg-right formfooterbtn"><EditProviderModal data={profile} /></div>
									<div className="mb-1 mt-1 mr-1 text-lg-right formfooterbtn"> <Modal/> </div>
								 
			   </div> */}
                  </Restricted>
                   </form>
                                           
               </div>
            </div>
       </>
    )
}

export default ViewPractice