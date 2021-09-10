import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import Avatar from "react-avatar";
import Grid from "@material-ui/core/Grid";

import MaterialTable, { MTableToolbar } from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
//import { FileIcon, defaultStyles } from 'react-file-icon';
import { Dialog, DialogTitle } from '@material-ui/core';
import { FileIcon, defaultStyles } from 'react-file-icon';
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MyUpload from "./uploadProvider";
import { API_URL, API_URL_DOC } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
 

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const api = axios.create({
  baseURL: API_URL,
});


const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      width: "50%",
      height: "auto",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 2, 2),
    },
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);


function App(props) {
  const columns = [
    { title: "ID", field: "id", hidden: true, width: "0%" },

    {
      title: " ",
      width: "2%",

      cellStyle: {
        width: 5,
        maxWidth: 5,
        textAlign: "right",
        backgroundColor: "#fff",
      },
      headerStyle: {
        width: 5,
        maxWidth: 5,
        textAlign: "right",
        backgroundColor: "#fff",
      },
      MuiToolbarRegular:{

        backgroundColor: "#fff !important",

      },
      render: (rowData) => (

        <div className="myclass">  <FileIcon size={10} extension={handleExtension(rowData.imageName)} {...defaultStyles[handleExtension(rowData.imageName)]} /></div>
        // <Avatar
        //   maxInitials={1}
        //   size={30}
        //   round={true}
        //   src={rowData === undefined ? " " : rowData.avatar}
        // />
      ),
    },

    {
      title: "File Name",
      field: "imageName",
       //render: (rowData) => <><FileIcon size={10} extension="pdf" {...defaultStyles.pdf} /></>,
      cellStyle: {
        width: 300,
        maxWidth: 300,
        backgroundColor: "#fff",
      },
      headerStyle: {
        width: 300,
        maxWidth: 300,
        backgroundColor: "#fff",
        borderTop:"1px #f2f2f2 solid"
      },
    },

    {
      title: "Size",
      field: "first_name",
      cellStyle: {
        width: 50,
        maxWidth: 50,
        backgroundColor: "#fff",
      },
      headerStyle: {
        width: 50,
        maxWidth: 50,
        backgroundColor: "#fff",
      },
    },

    {
      title: "Type",
      field: "category",

      cellStyle: {
        width: 80,
        maxWidth: 80,
        textAlign: "center",
        backgroundColor: "#fff",
      },
      headerStyle: {
        width: 80,
        maxWidth: 80,
        textAlign: "center",
        backgroundColor: "#fff",
      },
    },

    {
      title: "Last Updated",
      field: "created_at",

      cellStyle: {
        width: 100,
        maxWidth: 100,
        textAlign: "center",
        backgroundColor: "#fff",
      },
      headerStyle: {
        width: 100,
        maxWidth: 100,
        textAlign: "center",
        backgroundColor: "#fff",
      },
    },
  ];
  const [filter, setFilter] = useState(null);
  const [data, setData] = useState([]); //table data
  const profile = useSelector((state)=> state.practicebyid.data)
  const provider = useSelector((state) => state.provider.data);
  let provider_id=0


if(!provider){
    if(profile){
        console.log(profile)
      if(profile.providers.length>0){
          provider_id=profile.providers[0].providerId
      }
    }
}

else{
    provider_id=provider.providerId
}

  
 

  useEffect(() => {

    console.log(provider)


    api
      .get(`/api/provider/getAllDocuments/${provider_id}`)
      .then((res) => {
        console.log(res.data)
        setData(res.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  const handleRowUpdate = (newData, oldData, resolve, reject) => {
    //validation
    let errorList = [];
    if (newData.first_name === "") {
      errorList.push("Please enter first name");
      alert(errorList);
      reject();
      return;
    }

    if (newData.last_name === "") {
      errorList.push("Please enter last name");
      alert(errorList);
      reject();
      return;
    }

    api
      .patch("/users/" + newData.id, newData)
      .then((res) => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve();
      })
      .catch((error) => {
        reject();
      });
  };


const handleExtension=(String)=>{

  let fileName=String.split("/").pop()

  return String.split(".").pop()
  

}



  const handleRowAdd = (newData, resolve, reject) => {
    //validation
    let errorList = [];
    if (newData.first_name === undefined) {
      errorList.push("Please enter first name");
      alert(errorList);
      reject();
      return;
    }
    if (newData.last_name === undefined) {
      errorList.push("Please enter last name");
      alert(errorList);
      reject();
      return;
    }

    api
      .post("/users", newData)
      .then((res) => {
        let dataToAdd = [...data];
        dataToAdd.push(newData);
        setData(dataToAdd);
        resolve();
      })
      .catch((error) => {
        reject();
      });
  };

  const handleRowDelete = (oldData, resolve, reject) => {

    console.log(oldData)

    api
      .get(`/api/provider/deleteDocument/` + oldData.id)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        reject();
      });



  };


  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const DownloadFile=(url)=>{
    console.log(url.src)
    axios({
      method: "get",
    //  url: "http://localhost:8080/api/provider/image/resources/static/assets/practice/documents/Capturedropdown.PNG",
      url: API_URL_DOC+url.src,
      responseType: "arraybuffer"
    })
      .then((response) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/octet-stream" })
        );
        link.download = API_URL_DOC+url.src;
    
        document.body.appendChild(link);
    
        link.click();
        setTimeout(function () {
          window.URL.revokeObjectURL(link);
        }, 200);
      })
      .catch((error) => {});
  }

 const handleCallback = (childData) =>{
    setOpen(false)

}

  return (
    <div className="App">


<div>
        <Modal style={{padding:'0', borderRadius:'8',}}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          padding={0}
          borderRadius={8}
          disableBackdropClick={true}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          
        >
          <Fade in={open}>
            <div className={classes.paper} style={{padding:'0', borderRadius:'8px',}}>
              <header class="card-header">
                <h2 class="card-title">
                  Claim Notes
                  <div onClick={handleClose} class="card-actions">
                    <div class="button-ask-adj">
                      <div class="MuiDialogActions-root MuiDialogActions-spacing">
                        <button
                          class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary"
                          tabindex="0"
                          type="button"
                        >
                          <span class="MuiButton-label">Close</span>
                          <span class="MuiTouchRipple-root"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </h2>
              </header>
              <div style={{maxHeight:'400px', overflow:'scroll'}}> 
              <MyUpload parentCallback = {handleCallback} />
              </div>
            </div>
          </Fade>
        </Modal>
      </div>

      <Grid container spacing={1}>
        <Grid item xs={12} style={{ marginTop: "-60px" }}>
          <MaterialTable
           
          
            title=" "
            columns={columns}
            data={data}
            icons={tableIcons}
            actions={[
              {
                icon: SystemUpdateAltIcon,
                onClick: (e, rowData) => {
                  DownloadFile(rowData)
                },
              },

              {
                icon: AddBox,
                isFreeAction: true,
                onClick: () => {
                  setOpen(true);
                }
              }
              
              // {
              //   icon: 'add',
              //   isFreeAction: true,
              //   onClick: () => {
              //     // open dialog to save new one
              //   }
              // }

            ]}
            
            editable={{

              // onRowUpdate: (newData, oldData) =>
              //   new Promise((resolve, reject) => {
              //     handleRowUpdate(newData, oldData, resolve, reject);
                  
              //   })
                
              //   ,


              // onRowAdd: (newData) =>
              //   new Promise((resolve, reject) => {
              //     handleRowAdd(newData, resolve, reject);
              //   }),

              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  handleRowDelete(oldData, resolve, reject);
                }),
            }}
            options={{
              actionsColumnIndex: -1,

            }} 
            
            components={{
            Toolbar: props => (
              <div
                style={{
                  backgroundColor: "#fff",
                  height: "65px",
                   
                  alignItems: "right"
                }}
              >
                <MTableToolbar {...props} />
              </div>
            )
             
          }}
              
           
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}

export default App;
