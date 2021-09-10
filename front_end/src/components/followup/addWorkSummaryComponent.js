import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Typography 
} from 'antd';
import { getFollowUpDDValues, saveClaimWorkSummary } from "../../store/actions/followUpAction";
import { RootState } from "../../store";
import TextEditor from '../helper/TextEditor';
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


const { Option } = Select;
const { TextArea } = Input;
const { Item } = Form;
const provinceData = ["Zhejiang", "Jiangsu"];
const cityData = {
  Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
  Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"]
};

const AppDD = (prop) => {


  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const ddvalues = useSelector((state) => state.followUpActionDD.data)
  const user = useSelector((state) => state.user)
  const [cities, setCities] = React.useState(cityData[provinceData[0]]);
  const [status, setStatus] = React.useState([])
  const [subStatus, setSubStatus] = React.useState([])
  const [subStatusDenial, setSubStatusDenial] = React.useState([])
  const [subStatusInProcess, setSubStatusInProcess] = React.useState([])
  const [subStatusNotReceived, setSubStatusNotReceived] = React.useState([])
  const [subStatusPaid, setSubStatusPaid] = React.useState([])
  const [subStatusVoicML, setSubStatusVoicML]= React.useState([])
  const [subStatusZeroOut, setSubStatusZeroOut]= React.useState([])
  const [claimCorrectiveAction, setClaimCorrectiveAction] = React.useState([])
  const [claimDenialCategory, setClaimDenialCategory] = React.useState([])
  const [user_id, setUser_id]=React.useState()
  const [claim_id, setClaim_id]=React.useState()



  const [subStatusdd, setSubStatusdd] = React.useState([])
  const [correctiveAction, setCorrectiveAction] = React.useState([])
  const [denialcategory, setDnialcategory] = React.useState([])
  const [loading, setLoading]=React.useState(false)


  // showHide

  const [isStatus, setIsStatus]=React.useState(false)
  const [isSubStatus, setIsSubStatus]=React.useState(false)
  const [isDenied, setIsDenied]=React.useState(false)
  const [isCorrectiveAction, setIsCorrectiveAction]=React.useState(false)
  const [errorMessage, setErrorMessage]=React.useState()



  const [secondCity, setSecondCity] = React.useState(
    cityData[provinceData[0]][0]
  );

  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  const handleStatusChange =(value)=>{
    form.resetFields(["substatus"]); //reset particular field
    setIsStatus(true)
    if(value==1){
      setIsDenied(false)
      setSubStatusdd(subStatusPaid)
    }
    if(value==2){
      setIsDenied(true)
      setSubStatusdd(subStatusDenial)

    }
    
    if(value==3){
      setIsDenied(false)
      setSubStatusdd(subStatusInProcess)
    }

    if(value==4){
      setIsDenied(false)
      setSubStatusdd(subStatusNotReceived)
    }

    if(value==5){
      setIsDenied(false)
      setSubStatusdd(subStatusZeroOut)
    }

    if(value==6){
      setIsDenied(false)
      setSubStatusdd(subStatusVoicML)
    }

  }

  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 6 },
      lg: { span: 6 }

    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const onFinish = values => {
    
    setLoading(true)
    values.updated_by=user_id
    values.claim_id=claim_id
   
    saveClaimWorkSummary(values).then(data=>{
    
      if(data && data.status==200){
        setLoading(false)
        onTrigger(false)
      }
      if(data && data.status==208){
        console.log(data.data.message)
         setErrorMessage(data.data.message)
        setLoading(false)
      }

    })
    
  };

  useEffect(() => {
    setUser_id(user.user.employee_id)
    setClaim_id(prop.data.claim_id)

   // dispatch(getFollowUpDDValues())
    if (ddvalues) {
      setStatus(ddvalues.status)
      setSubStatus(ddvalues.subStatus)
      setSubStatusPaid(ddvalues.subStatusPaid)
      setSubStatusDenial(ddvalues.subStatusDenial)
      setSubStatusInProcess(ddvalues.subStatusInProcess)
      setSubStatusNotReceived(ddvalues.subStatusNotReceived)
      setClaimCorrectiveAction(ddvalues.claimCorrectiveAction)
      setClaimDenialCategory(ddvalues.claimDenialCategory)
      setSubStatusVoicML(ddvalues.subStatusVoicMessageLeft)
      setSubStatusZeroOut(ddvalues.subStatusZeroOut)
    }
    

  },
    [],
  );


  const onTrigger = (event) => {
    prop.parentCallback(event);
    
}

const HandleSubSChange = (value) => {
  form.resetFields(["creative_action"]); //reset particular field
  form.resetFields(["denial_category"]); //reset particular field
  setIsSubStatus(true)
 
};

const HandleDCC = (value) => {
  setIsDenied(true)
};

const HandleCCAC = (value) => {
    setIsCorrectiveAction(true)
};

const classes = useStyles();



  return (
    <>

      {/* onSubmit={this.handleSubmit} */}
   
      <div className={classes.root}>
        {errorMessage  ? <Alert severity="error">{errorMessage} </Alert>  : ''}
      
      </div>

{loading ? <CircularProgress disableShrink /> : ''}
   

      <Form 
         form={form}
      {...formItemLayout} onFinish={onFinish} 
       initialValues={{
            substatus: null,
            creative_action: null,
            denial_category: null, 
           // billed_after_patient: null,
            claim_id: claim_id,
            updated_by: user_id

         }}
      >

        <Form.Item label="Claim Status" name="claim_status" rules={[{ required: true }]}>
          <Select
          dropdownStyle = {{ position: "fixed" }}
           placeholder=" select claim status "
            style={{ width: '80%' }}
            onChange={handleStatusChange}
          >
            
            {status.map((province) => (
              <Option key={province.id}>{province.title}</Option>
            ))}
          </Select>
        </Form.Item>


{isStatus ? 
 <Form.Item name="substatus"
 label="Sub Status">

  <Select
  placeholder="Please Select SubStatus"
  dropdownStyle = {{ position: "fixed" }}

    style={{ width: '80%' }}
    
    onChange={HandleSubSChange}
  >
   
    {subStatusdd.map((item) => (
      <Option key={item.sub_status_id}>{item.title}</Option>
    ))}
  </Select>

</Form.Item> :''

}
           
       {isDenied ? 
        <Form.Item name="denial_category"
         label="Denial Category">

          <Select
          placeholder="Select  Denial Category"
          dropdownStyle = {{ position: "fixed" }}
              
            style={{ width: '80%' }}
            
            onChange={HandleDCC}
          >
            
            {claimDenialCategory.map((item) => (
              <Option key={item.id}>{item.title}</Option>
            ))}
          </Select>

        </Form.Item> :''
       }

        {isSubStatus ? 
        <Form.Item name="creative_action"
        label="Corrective Action">

         <Select
         placeholder="Slect Corrective Action"
         dropdownStyle = {{ position: "fixed" }}
     
           style={{ width: '80%' }}
           
           onChange={HandleCCAC}
         >
        
           {claimCorrectiveAction.map((item) => (
             <Option key={item.id}>{item.title}</Option>
           ))}
         </Select>

       </Form.Item> :''
       }

        

       


        {/* <Form.Item name="billed_after_patient"
         label="Bill After Patient">

          <Select
          dropdownStyle = {{ position: "fixed" }}
            placeholder="Select Bill After Patient"
            style={{ width: '100%' }}
            
            onChange={onSecondCityChange}
          >
            
            <Option key={1}>Yes</Option>
            <Option key={2}>No</Option>
          
          </Select>

        </Form.Item> */}

        {isCorrectiveAction ?
 <Form.Item name="remarks" label="Remarks"
 rules={[
   {
     required: true,
     message: 'Please enter body of post',
   },
 ]}
>

 <TextArea rows={4} />
</Form.Item> :''

        }

       


        <Form.Item name="claim_id" label="Claim Id" hidden={true}
         
        >
          
          <Input  />
        </Form.Item>

        <Form.Item name="updated_by" label="Claim Id" hidden={true}
         >
           <Input  />
         </Form.Item>
         <br/>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <br/>

      </Form>

    </>
  );
};

export default AppDD
