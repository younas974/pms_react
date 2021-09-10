import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm,FieldArray } from 'redux-form'
import { load as loadAccount } from '../../../store/reducer/pprofileReducer'
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
import validate from './editPracticeValidation';
import { useDispatch, useSelector } from 'react-redux';

const data = {
  // used to populate "account" reducer when "Load" is clicked
  firstName: 'Jane',
  lastName: 'Doe',
  age: '42',
  anniversaryDate: '2018-08-22',
  sex: 'female',
  employed: true,
  favoriteColor: 'Blue',
  bio: 'Born to write amazing Redux code.'
}
const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']




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
  
      {index==0 ? <label className="col-lg-3 control-label text-lg-right pt-2"  >Service Address:</label> :[ index==1 ? <label className="col-lg-3 control-label text-lg-right pt-2"  >Pay to Address:</label>:[ index==2 ? <label className="col-lg-3 control-label text-lg-right pt-2"  >Mailing Address:</label> :'' ] ] }
    
    <div className="col-lg-9">   
           <Field
            name={`${member}.streetaddress`}
            type="text"
            component={renderField}
          />
    
         
    <div className="col-lg-4-ask-2">
     
     <div className="row form-group">
       <div className="col-lg-4-ask-1">
       <Field 
            
            name={`${member}.zip`}
            type="text"
            component={renderField}
            label="zip"
            normalize={normalizePhone}
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
    
  

let InitializeFromStateForm = props => {
  
  //const profile = useSelector((state)=> state.practicebyid.data)
  const { handleSubmit,error, load, pristine, reset, submitting, profile } = props
  useEffect(() => {
   
    // Update the document title using the browser API
    console.log("i am in form component")

  },[]);

  return (

<form className="form-horizontal form-bordered" onSubmit={handleSubmit} >
      
      <div className="form-group row">
<label className="col-lg-2 control-label text-lg-right pt-2"  >Practice Name:</label>
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
          
          <label className="col-lg-2 control-label text-lg-right pt-2"  >Official Email:</label>
<div className="col-lg-3">

<Field
name="officeEmailAddress"
type="text"
component={renderField}
validate={ required }

/>

</div>
          
<label className="col-lg-2 control-label text-lg-right pt-2"  >Country:</label>
<div className="col-lg-3">
<Field
name="County"
type="text"
component={renderField}
/>
</div>
</div>
      
     <div className="form-group row">
<label className="col-lg-2 control-label text-lg-right pt-2"  >Group NPI:</label>
<div className="col-lg-3">
<Field
name="groupNPI"
type="number"
component={renderField}
validate={[ required, maxLength(10)]}
inputProps={{ min: 0, max: 10 }} 
/>

</div>
          
          <label className="col-lg-2 control-label text-lg-right pt-2"  > Business lic No:</label>
<div className="col-lg-3">
<Field
name="licenceNo"
type="text"
component={renderField}
/>

</div>
          
          <label className="col-lg-2 control-label text-lg-right pt-2"  >Tax ID:</label>
<div className="col-lg-3">
<Field
name="textId"
type="number"
component={renderField}
validate={[ required, maxLength(9)]}
InputProps={{ inputProps: { min: 0, max: 10 } }}
/>
</div>
</div>
      
     <div className="form-group row" >
<label className="col-lg-2 control-label text-lg-right pt-2"  >COI:</label>
<div className="col-lg-3">
<Field
name="malPractice"
type="text"
component={renderField}
/>
</div>
          
          <label className="col-lg-2 control-label text-lg-right pt-2"  >Medicaid-TPI-Grp:</label>
<div className="col-lg-3">
<Field
name="medicaidTPIGroup"
type="text"
component={renderField}
/>
</div>

                 <label className="col-lg-2 control-label text-lg-right pt-2"  >Authorized Email:</label>
<div className="col-lg-3">
<Field
name="autorizedOfficialEmail"
type="text"
component={renderField}
/>
</div>                


</div> 
      
      <div className="form-group row" >

          
          <label className="col-lg-2 control-label text-lg-right pt-2"  >Phone Number:</label>
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
          
          <label className="col-lg-2 control-label text-lg-right pt-2"  >Fax Number:</label>
<div className="col-lg-3">
<Field
name="faxINTEGER"
type="tel"
component={renderField}
{...phoneMask}
/>
</div>

<label className="col-lg-2 control-label text-lg-right pt-2"  >Email Address:</label>
<div className="col-lg-3">
<Field
name="emailAddress"
type="text"
component={renderField}
/>
</div>
</div> 
     
      <div className="form-group row">
<label className="col-lg-2 control-label text-lg-right pt-2"  >Cell Number:</label>
<div className="col-lg-3">
<Field
name="cellNumber"
type="tel"
component={renderField}
{...phoneMask}
/>
</div>
          
          
          <label className="col-lg-2 control-label text-lg-right pt-2"  >Medicare PTAN:</label>
<div className="col-lg-3">
<Field
name="medicarePTAN"
type="number"
component={renderField}
/>
</div>


</div>
      

      
{/* test */}
<div className="form-ask-height">
      <div className="form-group row" >
 <FieldArray name="addresses" component={renderMembers}  />
</div>
</div>

{/* end eddresses */}

{error && <strong>{error}</strong>}
<div className=" text-lg-right btn-ask-marj">
<button type="button"  disabled={pristine || submitting} onClick={reset} className="mb-1 mt-1 mr-1 btn btn-default text-lg-right"><i className="fas fa-sync"></i> Reset</button>
<button type="submit" disabled={submitting}  className="mb-1 mt-1 mr-1 btn btn-primary text-lg-right"><i className="fas fa-save"></i> Update</button>

</div>
</form>

 )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
    validate,
  form: 'initializeFromState' // a unique identifier for this form
})(InitializeFromStateForm)

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => ({
    initialValues: state.practicebyid.data // pull initial values from account reducer
  }),
//  { load: loadAccount } // bind account loading action creator
)(InitializeFromStateForm)

export default InitializeFromStateForm