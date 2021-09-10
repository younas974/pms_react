import React,{useEffect} from 'react'
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { API_URL } from '../../utils/constants';
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const MyUpload =(props)=>{

const [fileList, setFileList]= React.useState([])
const [list, setList]= React.useState([])
const [iserror, setIserror] = React.useState(false);

const profile = useSelector((state)=> state.practicebyid.data)
const provider = useSelector((state) => state.provider.data);
const user = useSelector((state)=> state.user)

const api = axios.create({
    baseURL: API_URL,
  });


const  handleChange=(selectorFiles)=>
{

  let  fileObj={
    uploadfile: selectorFiles,
    practice_id: provider?.providerId,
    category: ''
    }

    list.push(fileObj)
    setFileList(list)
    
}

const handleCategory =(value,i, item)=>{

    fileList[i]={
        uploadfile: item.uploadfile,
        practice_id: provider.providerId,
        category: value
    }
}

const handleFormSubmit =()=>{

    fileList.map(item=>{
       
        if(!provider){
            setIserror(true)
            return false
        }
        else{
            
            setIserror(false)
        }
        if(item.practice_id==null){
            setIserror(true)
            return false
        }


        let formData = new FormData();    //formdata object
        formData.append('uploadfile', item.uploadfile[0]);   //append the values with key, value pair
        formData.append('provider_id', item.practice_id);
        formData.append('category', item.category);
        formData.append('created_by', user.user.employee_id);
        formData.append('updated_by', user.user.employee_id);

        
    api
    .post("/api/provider/documents", formData)
    .then((res) => {
        onTrigger(true)
    })
    .catch((error) => {
      console.log(error);
    });

    })

  


}

const onTrigger = (value) => {
    props.parentCallback(true);
   
}

useEffect(() => {
  console.log(provider)

  },[]);
    return (
        <>
         
         {iserror && (
              <Alert style={{marginTop: "1rem", marginBottom: "1rem"}} severity="error">
                Kindly select provider
              </Alert>
            )}
    <div className="container">
    <form action="/action_page.php">

       <input type="file" onChange={ (e) => handleChange(e.target.files) } />

</form>
<div>
    
     
        
        {fileList.length>0 ? fileList.map(function(item, i){
        return  <> 
        
        <div className="row"><div className="col-md-6 col-sm-6 col-xs-6"><AttachmentIcon/> {item.uploadfile[0].name}
         </div> <div className="col-md-6 col-sm-6 col-xs-6">
             <select onChange={ (e) => handleCategory(e.target.value, i , item) }> 
             <option value={0}>Select Category</option> 
                 <option vlau={1}>Demographic</option> 
                 <option vlau={2}>Location</option> 
                 <option vlau={3}>HCFA</option> 
             </select> </div>  </div> </>;
    }):''}
       
    </div>

    </div>
    <div>
    <input onClick={handleFormSubmit} className="fr" type="Submit"/>
        </div>
        </>
    )
}

export default MyUpload

