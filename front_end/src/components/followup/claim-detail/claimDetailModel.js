import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import Avatar from "react-avatar";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ClaimNotesModel from "./claimNotes.Model";
import { useDispatch, useSelector } from "react-redux";

import MaterialTable from "material-table";
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
import Alert from "@material-ui/lab/Alert";
import { API_URL } from "../../../utils/constants";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

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

const useStyles = makeStyles((theme) =>
  createStyles({
    overrides: {
      root: {
        paper: {
          padding: "0px 16px 16px",
          marginTop: "-10px",
        },
      },
    },

    MTableToolbar: {
      paddingRight: "-130px",
    },

    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      width: "50%",
      height: "auto",
      boxShadow: theme.shadows[0],
      padding: "0",
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

const api = axios.create({
  baseURL: API_URL,
});

const theme = createMuiTheme({
  root: {
    "& MuiPaper-root": {
      width: "100px",
      boxShadow: "none !important",
    },
  },
  overrides: {
    makeStyles: {
      paper: { padding: "0px" },
    },

    MuiTableCell: {
      root: {
        padding: 0,
        paddingRight: "1rem !important",
        "&:last-child": {
          paddingRight: 2,

          paper: {
            padding: "0px 16px 16px",
            marginTop: "-10px",
          },
        },
      },
    },
    MuiButtonBase: {
      root: {
        padding: "1px !important",
      },
    },
    makeStyles: {
      paper: {
        padding: 0,
      },
    },
  },
  MuiTypography: {
    h6: {
      textAlign: "right",
    },
  },
  MuiPaper: {
    elevation2: {
      boxShadow: "0px 0px 0px 0px rgba(0,0,0,0);",
    },
  },
});

function validateEmail(email) {
  const re =
    /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

function ClaimDetail(prop) {
  var columns = [
    { title: "id", field: "id", hidden: true },
    // {title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.first_name} />  },
    { title: "First name", field: "first_name" },
    { title: "Last name", field: "last_name" },
    { title: "email", field: "email" },
  ];

  var columnss = [
    { title: "id", field: "id", hidden: true },
    { title: "claim_id", field: "claim_id", hidden: true },
    {
      title: "DOS",
      field: "service_date",
      headerStyle: {
        paddingLeft: "0.5rem",
      },
      cellStyle: {
        whiteSpace: "nowrap",
        paddingLeft: "0.5rem",
      },
    },
    { title: "CPT", field: "cpt" },
    { title: "ALLOWED AMOUNT", field: "allowed_amount" },
    { title: "PAID AMOUNT", field: "paid_amount" },
    { title: "PR", field: "patient_resp" },
    {
      title: "SOURCE",
      field: "payment_srcs",
      lookup: {
        EOB: "EOB",
        Email: "Email",
        Fax: "Fax",
        CALL: "CALL",
        Portal: "Portal",
        EoborERA: "Eob/ERA",
      },

      // render: rowData=>(
      //     <>
      //     <select value={rowData.payment_srcs}>
      //         <option value="EOB">
      //           EOB
      //         </option>
      //         <option value='Email'>
      //           Email
      //         </option>
      //         <option value="Fax">
      //             Fax
      //         </option>
      //         <option value="Portal">
      //             Portal
      //         </option>
      //         <option value="Eob/ERA">
      //             Eob/ERA
      //         </option>
      //     </select>
      //     </>
      // )
    },
  ];

  const [data, setData] = useState([]); //table data
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [claim_idN, setClaim_idN] = useState(null);
  const [user_id, setUser_id] = React.useState();

  const user = useSelector((state) => state.user);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCallbackAddNotes = (childData) => {
    setOpen(false);
    // this.setState({data: childData})
  };

  useEffect(() => {
    setUser_id(user.user.employee_id);
    let role = "user";
    if (role == "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(true);
    }
    let claim_id = prop.data.claim_id;
    api
      .post("/api/claim/cptbyclaim", { claim_id: claim_id })
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        let resData = [];
        data.map((item) => {
          let obj = {
            id: item.id,
            claim_id: item.claim_id,
            cpt: item.cpt,
            paid_amount: item.paid_amount,
            patient_resp: item.patient_resp,
            allowed_amount: item.allowed_amount,
            payment_srcs: item.payment_srcs[0]?.src,
            service_date: item.claim.service_date,
          };
          console.log(obj);
          resData.push(obj);
        });
        setData(resData);
      })
      .catch((error) => {
        console.log(error);
      });

    // api.get("/users")
    //     .then(res => {
    //         setData(res.data.data)
    //      })
    //      .catch(error=>{
    //          console.log("Error")
    //      })
  }, []);

  function getCptByClaim(claim_id) {
    api
      .post("/api/claim/cptbyclaim", { claim_id: claim_id })
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        let resData = [];
        data.map((item) => {
          let obj = {
            id: item.id,
            claim_id: item.claim_id,
            cpt: item.cpt,
            paid_amount: item.paid_amount,
            patient_resp: item.patient_resp,
            allowed_amount: item.allowed_amount,
            payment_srcs: item.payment_srcs[0]?.src,
            service_date: item.claim.service_date,
          };
          console.log(obj);
          resData.push(obj);
        });
        setData(resData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation

    console.log(newData);
    let errorList = [];
    if (newData.claim_id === "") {
      errorList.push("Please select claim");
    }
    if (newData.cpt === "") {
      errorList.push("Please Enter Cpt");
    }
    if (newData.payment_srcs === "") {
      errorList.push("Please Select Payment Source");
    }

    // setClaim_idN(prop.data.claim_id)
    // setOpen(true)
    newData.updated_by = user_id;

    if (errorList.length < 1) {
      api
        .put("/api/claim/update/cptinfo/byclaim", newData)
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handlebulkUpdate = (newData, oldData, resolve) => {
    //validation
    let claimNewDataArray = [];
    let errorList = [];
    if (newData) {
      for (let item in newData) {
        newData[item].newData.updated_by = user_id;

        if (newData[item].newData.claim_id === "") {
          errorList.push("Please select claim");
        }
        if (newData[item].newData.cpt === "") {
          errorList.push("Please Enter Cpt");
        }
        if (newData[item].newData.payment_srcs === "") {
          errorList.push("Please Select Payment Source");
        }
        claimNewDataArray.push(newData[item].newData);
      }
    }

    if (errorList.length < 1) {
      api
        .put("/api/claim/updatecptbulk", claimNewDataArray)
        .then((res) => {
          getCptByClaim(prop.data.claim_id);
          const dataUpdate = [...data, newData];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          //  setErrorMessages(["Update failed! Server error"])
          // setIserror(true)
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
    // setClaim_idN(prop.data.claim_id)
    // setOpen(true)
  };

  const handleRowAdd = (newData, resolve) => {
    //validation

    let errorList = [];
    if (newData.cpt === undefined) {
      errorList.push("Please enter Cpt");
    }
    // if(newData.payment_srcs === undefined){
    //   errorList.push("Please select payment source")
    // }
    if (newData.service_date === undefined) {
      errorList.push("Please enter DOS");
    }
    newData.updated_by = user_id;
    newData.claim_id = prop.data.claim_id;
    console.log(newData);
    if (errorList.length < 1) {
      //no error
      api
        .post("/api/claim/add/cpt", newData)
        .then((res) => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch((error) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    // setClaim_idN(prop.data.claim_id)
    // setOpen(true)

    api
      .post("api/claim/delete/cpt", oldData)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  const onTrigger = (event) => {
    prop.parentCallback(event);
  };

  return (
    <div className="App">
      <div>
        <Modal style={{backgroundColor:'none',}}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          disableEscapeKeyDown={true}
          onClose={handleClose}

          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
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

              <ClaimNotesModel
                parentCallback={handleCallbackAddNotes}
                claim_id={claim_idN}
              />
            </div>
          </Fade>
        </Modal>
      </div>

      <Grid container spacing={0} style={{ boxShadow: "none", padding: "0" }}>
        {/* <Grid item xs={3}></Grid> */}
        <Grid item xs={12}>
          <div>
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
          </div>

          <div className={classes.root}>
            <MaterialTable
              style={{
                boxShadow: "none",
                padding: "0",
                marginTop: "-40px",
                marginRight: "-7px",
                border: "10px #fff solid",
              }}
              theme={theme}
              className={classes.root}
              title="Claim Detail"
              columns={columnss}
              data={data}
              icons={tableIcons}
              editable={{
                // isEditable: rowData => isAdmin? true: false,
                // isDeletable: rowData => false,

                onBulkUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      handlebulkUpdate(newData, oldData, resolve);
                      resolve();
                    }, 1000);
                  }),

                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    handleRowUpdate(newData, oldData, resolve);
                  }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAdd(newData, resolve);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve);
                  }),
              }}
              options={{
                addRowPosition: "first",
                pageSize: 20,
                headerStyle: {
                  backgroundColor: "#f2f2f2",
                  color: "#1565c0",
                  whiteSpace: "nowrap",
                  paddingBottom: "10px",
                  paddingTop: "9px",
                  marginBottom: "11px",
                  borderTop: "1px 1px 1px 1px rgba(0, 0, 0, .2) solid",
                  borderBottom: "1px rgba(0, 0, 0, .2) solid",
                  fontSize: "13px",
                },
              color: "#fff",
              addRowPosition: "first",
              pageSize: 20,
                search: false,
                actionsColumnIndex: -1,
                paging: false,
                emptyRowsWhenPaging: false,
                //       fixedColumns: {
                //   right: 1
                // }
              }}
            />
          </div>
        </Grid>
        <Grid item xs={0}></Grid>
      </Grid>
      {/* <div>
        <button type="button" class="btn btn-primary fr">Save</button>
             </div> */}
    </div>
  );
}

export default ClaimDetail;
