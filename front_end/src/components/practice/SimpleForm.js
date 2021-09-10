import React, { useState, useEffect } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import validate from './addpracticevalidation';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';


const zipreq = value=>{
  if(!value){
    return value
  }
  
  if((value.length!=5 && (value.length !=10))){
    return 'Zip code should be 5 digit or 9 digit'
  }
  else{
    return undefined
  }
}


const normalizePhone = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 5) {
      return onlyNums + '-'
    }
    if (onlyNums.length === 9) {
      return onlyNums.slice(0, 5) + '-' + onlyNums.slice(5)
    }
  }
  if (onlyNums.length <= 5) {
    return onlyNums
  }
  if (onlyNums.length <= 9) {
    return onlyNums.slice(0, 5) + '-' + onlyNums.slice(5)
  }
  return onlyNums.slice(0, 5) + '-' + onlyNums.slice(5, 9)
}

 
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div>
      <input className="form-control" {...input} placeholder={label} type={type}  />
      {touched && error && <span style={{color:"red"}}>{error}</span>}

    </div>
  </div>
);

const lessThan = otherField =>
  (value, previousValue, allValues) => value < allValues[otherField] ? value : previousValue
const greaterThan = otherField =>
  (value, previousValue, allValues) => value > allValues[otherField] ? value : previousValue

const FieldNormalizingForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props}

const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
   
   
   
<React.Fragment>
    
{(touched || submitFailed) && error && <span>{error}</span>}
  
  {fields.map((member, index) => (

  <div className="col-lg-6 row paddingtop1rem" style={{paddingTop: "1rem"}}>

    {index==0 ? <label className="col-lg-3 control-label text-lg-left pt-2 pptextlable"  >Service Address:</label> :[ index==1 ? <label className="col-lg-3 control-label text-lg-left pt-2 pptextlable"  >Pay to Address:</label>: <label className="col-lg-3 control-label text-lg-left pt-2 pptextlable"  >Mailing Address:</label>] }
  
  <div className="col-lg-9">   
         <Field
          name={`${member}.streetaddress`}
          type="text"
          component={renderField}
        />
  
       
  <div className="col-lg-4-ask-2">
   
   <div className="row form-group rowla">
     <div className="col-lg-4-ask-1">
     <Field 
          
          name={`${member}.zip`}
          type="text"
          component={renderField}
          label="zip"
          normalize={normalizePhone}
          validate={zipreq}
        />
     </div>

     <div className="mb-3 hidden-lg"></div>

     <div className="col-lg-4-ask">
     <Field
          name={`${member}.state`}
          type="text"
          component={renderField}
          label="state"
        />
     </div>

     <div className="mb-3 hidden-lg"></div>

     <div className="col-lg-4-ask">
     <Field
          name={`${member}.city`}
          type="text"
          component={renderField}
          label="city"
          
        />

<Field
          name={`${member}.addresstypeId`}
          type="hidden"
          component={renderField}
          
        />

     </div>
     </div>

   </div>
   </div>
   </div>
  
    ))}
</React.Fragment>
)


// maskings 

const phoneMask = createTextMask({
  pattern: '(999) 999-9999',
});

const gnmask = createTextMask({
  pattern: '9999999999',
});

const tidmask = createTextMask({
  pattern: '999999999',
});

// validations

const requiredName = value =>{

  if(value){
    console.log(typeof vlaue)
    return undefined
  }
  else{
    return 'Required'
  }

}


const required = value => (value || typeof value === 'number' ? undefined : 'Required')


// custom validations
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

  export const maxLength = max => value =>
  value && value.length > max || value.length < max  ? `Must be ${max} characters ` : undefined
  
  const maxLength15 = maxLength(10)
  

  export const gnpi = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Group NPI, must be 10 digits'
    : undefined

    export const tid = value =>
  value && !/^(0|[1-9][0-9]{8})$/i.test(value)
    ? 'Group NPI, must be 9 digits'
    : undefined



  const SubmitValidationForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props;
  useEffect(() => {
    // Update the document title using the browser API
    console.log("i am in form component")

  
  },[]);

 


  return (
<form className="form-horizontal form-bordered" onSubmit={handleSubmit} >
      

                      <div className="form-group row rowla">
  <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Practice Name:</label>
  <div className="col-lg-3">
   

<Field
          name="createdById"
          type="hidden"
          component={renderField}
          
        />

<Field
          name="updatedById"
          type="hidden"
          component={renderField}
          
        />
  
    <Field
        name="PracticeName"
        type="text"
        component={renderField}
        
      />
  </div>
                          
                          <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Official Email:</label>
  <div className="col-lg-3">
 
    <Field
        name="officeEmailAddress"
        type="text"
        component={renderField}
        validate={ required }
         
      />

  </div>
                          
    <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Country:</label>
  <div className="col-lg-3">
  <Field
        name="country"
        type="text"
        component={renderField}
      />
  </div>
</div>
                      
                     <div className="form-group row rowla">
  <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Group NPI:</label>
  <div className="col-lg-3">
  <Field
        name="groupNPI"
         
        type="text"
        component={renderField}
        validate={[required,gnpi]}
        {...gnmask}
        inputProps={{ min: 0, max: 10 }} 
      />

  </div>
                          
                          <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  > Business lic No:</label>
  <div className="col-lg-3">
  <Field
        name="licenceNo"
        type="text"
        component={renderField}
      />
      
  </div>
                          
                          <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Tax ID:</label>
  <div className="col-lg-3">
  <Field
        name="textId"
        type="text"
        component={renderField}
        InputProps={{ inputProps: { min: 0, max: 10 } }}
        validate={[required,tid]}
        {...tidmask}
      />
  </div>
</div>
                      
                     <div className="form-group row rowla" >
  <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >COI:</label>
  <div className="col-lg-3">
  <Field
        name="malPractice"
        type="text"
        component={renderField}
      />
  </div>
                          
                          <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Medicaid-TPI-Grp:</label>
  <div className="col-lg-3">
  <Field
        name="medicaidTPIGroup"
        type="text"
        component={renderField}
      />
  </div>

                                 <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Authorized Email:</label>
  <div className="col-lg-3">
  <Field
        name="autorizedOfficialEmail"
        type="text"
        component={renderField}
      />
  </div>                
  

</div> 
                      
                      <div className="form-group row rowla" >
                         
                          <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Phone Number:</label>
  <div className="col-lg-3">
  <Field
        name="phoneINTEGER"
        type="text"
        type="tel"
        component={renderField}
         validate={[required,phoneNumber]}
        {...phoneMask}
      />
  </div>
                          
                          <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Fax Number:</label>
  <div className="col-lg-3">
  <Field
        name="faxINTEGER"
        type="tel"
        component={renderField}
        {...phoneMask}
      />
  </div>

  <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Email Address:</label>
  <div className="col-lg-3">
  <Field
        name="emailAddress"
        type="text"
        component={renderField}
      />
  </div>
</div> 
                     
                      <div className="form-group row rowla">
  <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Cell Number:</label>
  <div className="col-lg-3">
  <Field
        name="cellNumber"
        type="tel"
        component={renderField}
        {...phoneMask}
      />
  </div>
                          
                          
                          <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >Medicare PTAN:</label>
  <div className="col-lg-3">
  <Field
        name="medicarePTAN"
        type="number"
        component={renderField}
      />
  </div>

  <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable"  >File Upload:</label>
  <div className="col-lg-3">
  <input  type="file" name="fileToUpload" id="fileToUpload" />
   
  </div>
 
 
</div>
                      
      
                      
{/* test */}
<div className="form-ask-height">
                      <div className="form-group row rowla" >
<FieldArray name="addresses" component={renderMembers}  />
</div>
</div>

{/* end eddresses */}

    {error && <strong>{error}</strong>}
<div className=" text-lg-right btn-ask-marj">
<button type="button"  disabled={pristine || submitting} onClick={reset} className="mb-1 mt-1 mr-1 btn btn-default text-lg-left"><i className="fas fa-sync"></i> Reset</button>
<button type="submit" disabled={submitting}  className="mb-1 mt-1 mr-1 btn btn-primary text-lg-left"><i className="fas fa-save"></i> Save</button>

  </div>

   


</form>

  );
};

export default reduxForm({
  form: 'submitValidation',
  validate,
  initialValues: {
    "addresses": [
      {
       addresstypeId: 2,
      },{
        addresstypeId: 4,
      },{
        addresstypeId: 3,
      }
    ],
    "createdById":1,
    "updatedById":1
  }


  




  // a unique identifier for this form
})(SubmitValidationForm);
