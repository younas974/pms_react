import React, { useState, useEffect } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import validate from '../practice/addpracticevalidation';
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
    <ul>
      <li>
        <button type="button" onClick={() => fields.push({})}>Add Security Question</button>
        {(touched || submitFailed) && error && <span>{error}</span>}
      </li>
      {fields.map((member, index) => (
        <li key={index}>
          <button
            type="button"
            title="Remove Member"
            onClick={() => fields.remove(index)}
          />
          <h4>Security Question #{index + 1}</h4>
          <label className="col-lg-2 control-label text-lg-right pt-2"  >Question: </label>
          <Field
            name={`${member}.question`}
            type="text"
            component={renderField}
            label="Question"
          />

        <label className="col-lg-2 control-label text-lg-right pt-2"  >Anwer: </label>
          <Field
            name={`${member}.answer`}
            type="text"
            component={renderField}
            label="Answer"
          />
        </li>
      ))}
    </ul>
  );
  

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
<div className="form-group row">
  
<label className="col-lg-2 control-label text-lg-right pt-2"  >Appname</label>

      <div className="col-lg-3">

 <Field
       name="createdById"
       type="hidden"
       component={renderField}
       validate={required}
              
     />

 <Field
       name="updatedById"
       type="hidden"
       component={renderField}
       validate={required}
       
     />

 <Field
     name="applicationName"
     type="text"
     component={renderField}
     validate={required}
     
   />
   
</div>

  <label className="col-lg-2 control-label text-lg-right pt-2"  >Username:</label>

      <div className="col-lg-3">

 <Field
     name="userName"
     type="text"
     component={renderField}
     validate={required}
     
   />

</div>

 <label className="col-lg-2 control-label text-lg-right pt-2"  >Password:</label>

     <div className="col-lg-3">
<Field
     name="password"
     type="text"
     component={renderField}
     validate={required}
   />

</div>

</div>
 
<div className="form-group row">
  
  <label className="col-lg-2 control-label text-lg-right pt-2"  >Link: </label>

   <div className="col-lg-3">



 <Field
     name="link"
     type="text"
     component={renderField}
     validate={required}
     
   />
</div>
</div>
           
<div className="form-group row">
  <div className="col-lg-8">
  <FieldArray name="practice_loginsec_qs" component={renderMembers} />
  </div>

  </div>         

{/* test */}

 
    {error && <strong>{error}</strong>}
<div className=" text-lg-right btn-ask-marj">
<button type="button"  disabled={pristine || submitting} onClick={reset} className="mb-1 mt-1 mr-1 btn btn-default text-lg-right"><i className="fas fa-sync"></i> Reset</button>
<button type="submit" disabled={submitting}  className="mb-1 mt-1 mr-1 btn btn-primary text-lg-right"><i className="fas fa-save"></i> Save</button>

  </div>
 
</form>

  );
};

export default reduxForm({
  form: 'submitPracticeLogIn',
  
  initialValues: {
    "createdById":1,
    "updatedById":1
  }
 
  // a unique identifier for this form ask
})(SubmitValidationForm);