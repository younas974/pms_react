const editPractice = values => {
    console.log(values)
    const errors = {};
    if (!values.PracticeName) {
      errors.PracticeName = 'Required';
    }
    if (!values.addresses || !values.addresses.length) {
      errors.addresses = { _error: 'At least one member must be entered' };
    } else {
      const membersArrayErrors = [];
      values.addresses.forEach((address, memberIndex) => {
        console.log(' ia am here')
        const memberErrors = {};
        if (!address || !address.streetaddress) {
          memberErrors.streetaddress = 'Required';
          membersArrayErrors[memberIndex] = memberErrors;
        }
  
          if (!address || !address.zip) {
           memberErrors.zip = 'Required';
          membersArrayErrors[memberIndex] = memberErrors;
        // } else if (address.zip.length > 9) {
        //   memberErrors.zip = 'Max limit is 9'
        // }
        // else if (address.zip.length < 5) {
        //   memberErrors.zip = 'Min limit is 4'
        }
       
  
        if (!address || !address.city) {
          memberErrors.city = 'Required';
          membersArrayErrors[memberIndex] = memberErrors;
        }
  
        if (!address || !address.state) {
          memberErrors.state = 'Required';
          membersArrayErrors[memberIndex] = memberErrors;
        }
      
      });
      if (membersArrayErrors.length) {
        errors.addresses = membersArrayErrors;
      }
    }
    return errors;
  };
  
  export default editPractice;