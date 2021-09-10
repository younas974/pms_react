
import React, { useState, useEffect } from 'react';
import { Field, Fields, FormSection, reduxForm, FieldArray } from 'redux-form';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
//import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { DatePicker, Select } from "antd";
import moment from "moment";
import { wrapDatePicker } from "../../../components/helper/datepicker";
import { connect } from 'react-redux'
import validate from './editPracticeValidation';

const ADatePicker = wrapDatePicker(DatePicker);
const zipreq = value => {
  if (!value) {
    return value
  }

  if ((value.length != 5 && (value.length != 10))) {
    return 'Zip code should be 5 digit or 9 digit'
  }
  else {
    return undefined
  }
}

const CustomFields = () => {
  return (
    <div>

      <div>
        <div className="input-row">
        <Field
            name="id"
            type="hidden"
            component={renderField}

          />

          <Field name="title" component={renderField} placeholder="" type="text" />

        </div>

        <div className="input-row strt">

          <Field
            name="effective_date"
            component={ADatePicker}
            defaultValue={moment(new Date(), "MM/DD/YYYY")}
            style={{ width: "100%" }}
          />

        </div>

        <div className="input-row exp">

          <Field
            name="expiry_date"
            component={ADatePicker}
            defaultValue={moment(new Date(), "MM/DD/YYYY")}
            style={{ width: "100%" }}
          />
          <Field
            name="created_by"
            type="hidden"
            component={renderField}

          />
          <Field
            name="updated_by"
            type="hidden"
            component={renderField}

          />

        </div>


      </div>

    </div>

  )
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
      <input className="form-control" {...input} placeholder={label} type={type} />
      {touched && error && <span style={{ color: "red" }}>{error}</span>}

    </div>
  </div>
);





const lessThan = otherField =>
  (value, previousValue, allValues) => value < allValues[otherField] ? value : previousValue
const greaterThan = otherField =>
  (value, previousValue, allValues) => value > allValues[otherField] ? value : previousValue

const FieldNormalizingForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
}

const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (

  <React.Fragment>

    {(touched || submitFailed) && error && <span>{error}</span>}

    {fields.map((member, index) => (

      <div className="col-lg-6 row paddingtop1rem" style={{ paddingTop: "1rem" }}>

        {index == 0 ? <label className="col-lg-3 control-label text-lg-right pt-2"  >Service Address:</label> : [index == 1 ? <label className="col-lg-3 control-label text-lg-right pt-2"  >Pay to Address:</label> : <label className="col-lg-3 control-label text-lg-right pt-2"  >Mailing Address:</label>]}

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

const requiredName = value => {

  if (value) {
    console.log(typeof vlaue)
    return undefined
  }
  else {
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
  value && value.length > max || value.length < max ? `Must be ${max} characters ` : undefined

const maxLength15 = maxLength(10)


export const gnpi = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Group NPI, must be 10 digits'
    : undefined

export const tid = value =>
  value && !/^(0|[1-9][0-9]{8})$/i.test(value)
    ? 'Group NPI, must be 9 digits'
    : undefined



let SubmitEditProviderForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props;
  useEffect(() => {
    // Update the document title using the browser API
    console.log("i am in form component")

  }, []);


  return (

    <form className="form-horizontal form-bordered" onSubmit={handleSubmit} >
      <div className="form-group row">


        <label className="col-lg-2 control-label text-lg-right pt-2"  >First Name:</label>

        <div className="col-lg-3">



          <Field
            name="providerFirstName"
            type="text"
            component={renderField}

          />

        </div>

        <label className="col-lg-2 control-label text-lg-right pt-2"  >Middle Name:</label>

        <div className="col-lg-3">

          <Field
            name="providerMiddleName"
            type="text"
            component={renderField}


          />

        </div>

        <label className="col-lg-2 control-label text-lg-right pt-2"  >Last Name:</label>

        <div className="col-lg-3">
          <Field
            name="providerLastName"
            type="text"
            component={renderField}
          />
        </div>

      </div>


      <div className="form-group row">


        <label className="col-lg-2 control-label text-lg-right pt-2"  >Gender: </label>

        <div className="col-lg-3">

          <Field className="w-100" name="gender" component="select">
            <option value="0" >Please Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Field>


        </div>

        <label className="col-lg-2 control-label text-lg-right pt-2"  >DOB:</label>

        <div className="col-lg-3">

          <Field
            name="DOB"
            component={ADatePicker}
            defaultValue={moment(new Date(), "MM/DD/YYYY")}
            style={{ width: "100%" }}
          />

        </div>

        <label className="col-lg-2 control-label text-lg-right pt-2"  >Individual NPI:</label>

        <div className="col-lg-3">
          <Field
            name="individualNPI"
            type="text"
            component={renderField}
          />
        </div>

      </div>


      <div className="form-group row">


        <label className="col-lg-2 control-label text-lg-right pt-2"  >Job Title: </label>

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
            name="Jobtitle"
            type="text"
            component={renderField}

          />
        </div>

        <label className="col-lg-2 control-label text-lg-right pt-2"  >Speciality:</label>

        <div className="col-lg-3">

          <Field
            name="speciality"
            type="text"
            component={renderField}


          />

        </div>

        <label className="col-lg-2 control-label text-lg-right pt-2"  >SSN No:	</label>

        <div className="col-lg-3">
          <Field
            name="SSN"
            type="text"
            component={renderField}
          />
        </div>

      </div>


      <div className="form-group row">


        <label className="col-lg-2 control-label text-lg-right pt-2"  >CDS/Pharmacy: </label>

        <div className="col-lg-3">

          <Field
            name="CdsPharmacy"
            type="text"
            component={renderField}

          />
        </div>

        <label className="col-lg-2 control-label text-lg-right pt-2"  >Board Certification:</label>

        <div className="col-lg-3">

          <Field
            name="boardCertification"
            type="text"
            component={renderField}


          />

        </div>

        <label className="col-lg-2 control-label text-lg-right pt-2"  >CAQHID:</label>

        <div className="col-lg-3">
          <Field
            name="CAQHID"
            type="text"
            component={renderField}
          />
        </div>

      </div>



      <div className="form-group row">


        <label className="col-lg-2 control-label text-lg-right pt-2"  >State License No:  </label>

        <div className="col-lg-3">


          <FormSection name="state_licence">
            {CustomFields()}
          </FormSection>

        </div>


        <label className="col-lg-2 control-label text-lg-right pt-2"  >Pharmacy Certification:</label>

<div className="col-lg-3">
  <FormSection name="pharmacy_certification">
    {CustomFields()}
  </FormSection>

</div>

        <label className="col-lg-2 control-label text-lg-right pt-2"  >CARF Acceditation:</label>

        <div className="col-lg-3">

          <Field
            name="CARFAcceditation"
            type="text"
            component={renderField}


          />

        </div>

       

      </div>



      <div className="form-group row">


        <label className="col-lg-2 control-label text-lg-right pt-2"  >Driving Licence</label>

        <div className="col-lg-3">


          <FormSection name="driving_licence">
            {CustomFields()}
          </FormSection>


        </div>

        <label className="col-lg-2 control-label text-lg-right pt-2"  >DAE Certification:</label>

        <div className="col-lg-3">
          <FormSection name="dae_certification">
            {CustomFields()}
          </FormSection>

        </div>

        <label className="col-lg-2 control-label text-lg-right pt-2"  >CAQH Creditionals:</label>

        <div className="col-lg-3">

          <FormSection name="caqh_creditional">
            {CustomFields()}
          </FormSection>
        </div>

      </div>





      <div className="form-group row">


        <label className="col-lg-2 control-label text-lg-right pt-2"  >Official Email:</label>

        <div className="col-lg-3">

          <Field
            name="officeEmailAddress"
            type="text"
            component={renderField}
            validate={required}

          />

        </div>


        
        <label className="col-lg-2 control-label text-lg-right pt-2"  >Tax ID:</label>

        <div className="col-lg-3">

          <Field
            name="textId"
            type="text"
            component={renderField}
            // InputProps={{ inputProps: { min: 0, max: 10 } }}
            // validate={[required, tid]}
            // {...tidmask}
          />
        </div>

        <label className="col-lg-2 control-label text-lg-right pt-2"  >Medicaid Group ID:</label>

        <div className="col-lg-3">
          <Field
            name="medicaidTPIGroup"
            type="text"
            component={renderField}
          />
        </div>

      </div>


      <div className="form-group row" >


        <label className="col-lg-2 control-label text-lg-right pt-2"  >Phone Number:</label>

        <div className="col-lg-3">
          <Field
            name="phoneNumber"
            type="text"
            type="tel"
            component={renderField}
            validate={[required, phoneNumber]}
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

        <label className="col-lg-2 control-label text-lg-right pt-2"  >Profile Image:</label>

        <div className="col-lg-3">
          <input type="file" name="fileToUpload" id="fileToUpload" />
        </div>
      </div>

      {/* test */}
      <div className="form-ask-height">
        <div className="form-group row" >
          <FieldArray name="addresses" component={renderMembers} />
        </div>
      </div>

      {/* end eddresses */}

      {error && <strong>{error}</strong>}
      <div className=" text-lg-right btn-ask-marj">
        <button type="button" disabled={pristine || submitting} onClick={reset} className="mb-1 mt-1 mr-1 btn btn-default text-lg-right"><i className="fas fa-sync"></i> Reset</button>
        <button type="submit" disabled={submitting} className="mb-1 mt-1 mr-1 btn btn-primary text-lg-right"><i className="fas fa-save"></i> Save</button>

      </div>




    </form>

  );
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
SubmitEditProviderForm = reduxForm({
  validate,
form: 'EditProviderForm' // a unique identifier for this form
})(SubmitEditProviderForm)

// You have to connect() to any reducers that you wish to connect to yourself
SubmitEditProviderForm = connect(
state => ({
   initialValues: state.provider.data // pull initial values from account reducer

}),
//  { load: loadAccount } // bind account loading action creator
)(SubmitEditProviderForm)

export default SubmitEditProviderForm