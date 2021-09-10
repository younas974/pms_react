import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import Avatar from "react-avatar";
import Grid from "@material-ui/core/Grid";

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
import { API_URL } from "../../utils/constants";
import AddWorkSummaryModel from "./addWorkSummaryModel";
import { Link } from "react-router-dom";

import {
  getClaims,
  getFollowUpDDValues,
  getPendingClaims,
  getUsers,
  getWorkedClaims,
} from "../../store/actions/followUpAction";
import { useDispatch, useSelector } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import ClaimDetailModel from "./reports/claimDetailModalComponent";
import { render } from "react-dom";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ClaimNotesModel from "./claim-detail/claimNotes.Model";
import ClaimDetail from "./claim-detail/claimDetailModel";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Select } from "antd";

const { Option } = Select;

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline style={{ align: "right" }} {...props} ref={ref} />
  )),
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

const theme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        fontSize: "12px",
      },
    },
    MuiTableCell: {
      root: {
        fontSize: "12px",
        padding: 0,
        paddingRight: "1rem !important",
        "&:last-child": {
          paddingRight: 2,
        },
      },
    },
    MuiButtonBase: {
      root: {
        padding: "1px !important",
      },
    },
    MuiPaper: {
      root: {
        margin: 0,
      },
    },

    MuiAlert: {
      root: {
        margin: 0,
      },
    },
    MuiSvgIcon: {
      root: {
        //  width: '90%',
        color: "#447fc3",
        backgroundColor: "#fff",
        borderRadius: "50%",
      },
    },
  },
});

const api = axios.create({
  baseURL: API_URL,
});

// const handleClaimDetail=(rowData)=>{

//   render(){
//     return( <p> hellow</p>)
//   }

// }



function validateEmail(email) {
  const re =
    /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

function DenialManagement() {
  const handleClick = () => {
    console.log("i am cliecked");
  };

  function numberWithCommas(data) {
    if (data == null) {
      return data;
    } else {
      return data.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  var columns = [
    { title: "id", field: "id", hidden: true },
    // {title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.first_name} />  },

    {
      title: "Claim Status",
      field: "status",
      editable: "never",
      filtering: true,
      cellStyle: {
        whiteSpace: "nowrap",
        paddingLeft: "0.5rem",
      },
      editable: "never",
      headerStyle: {
        paddingLeft: "0.5rem",
      },
    },

    {
      title: "Rendering Provider",
      field: "rendering_provider",
      editable: "never",
      cellStyle: {
        whiteSpace: "nowrap",
        paddingLeft: "0.5rem",
      },
      editable: "never",
      headerStyle: {
        paddingLeft: "0.5rem",
      },
    },

    {
      title: "Billing Provider",
      field: "billing_provider",
      editable: "never",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "Facility",
      field: "facility_location",
      editable: "never",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "Patient A/C #",
      field: "patient_accountNo",
      type: "numeric",
      editable: "never",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "Patient Name",
      field: "patient_name",
      editable: "never",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "DOB",
      field: "patient_DOB",
      editable: "never",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      dateSetting: {
        format: "MM/dd/yyyy",
      },
    },

    {
      title: "Claim #",
      field: "claim_id",
      type: "numeric",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editable: "never",
      headerStyle: {},
    },
    {
      title: "Creation date",
      field: "claim_date",
      editable: "never",
      dateSetting: {
        format: "MM/dd/yyyy",
      },

      cellStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "First Submission",
      field: "first_submission_date",
      editable: "never",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      dateSetting: {
        format: "MM/dd/yyyy",
      },
    },
    {
      title: "Last Submission",
      field: "last_submission_date",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      dateSetting: {
        format: "MM/dd/yyyy",
      },
    },

    {
      title: "Primary Ins",
      field: "insurance_name",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "Secondary Ins",
      field: "sec_insurance",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "Current Ins",
      field: "current_insurance",

      cellStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "DOS",
      field: "service_date",
      editable: "never",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      dateSetting: {
        format: "MM/dd/yyyy",
      },
    },
    {
      title: "Billed Amount",
      field: "charges",
      type: "numeric",
      // type: "currency"
      // , currencySetting: { currencyCode: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      cellStyle: {
        whiteSpace: "nowrap",
        cursor: "pointer",
      },

      render: (rowData) => <ClaimDetailModel data={rowData} />,
      //  onClick:(e, rowData) => {
      //   console.log('i am clicked')

      // }
      // render: rowData => <ClaimDetailModel data={rowData} />,
    },

    {
      title: "Due Amount",
      field: "balance",
      type: "currency",
      currencySetting: {
        currencyCode: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "Ins Payment",
      field: "insurance_payment",
      type: "numeric",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Patient Payment",
      field: "patient_payment",
      type: "currency",
      currencySetting: {
        currencyCode: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Total Payment",
      field: "paid_amount",
      type: "currency",
      currencySetting: {
        currencyCode: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "Adjustment",
      field: "adjustment_amount",
      type: "currency",
      currencySetting: {
        currencyCode: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "Priority",
      field: "priority",
      editable: "never",

      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Remarks",
      field: "remarks",
      hidden: true,
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Aging",
      field: "aging",
      type: "numeric",
      editable: "never",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Bucket",
      field: "bucket",
      editable: "never",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Assigned To",
      field: "assignTo",
      editable: "never",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "FU Action",
      field: "action",
      editable: "never",
      cellStyle: {
        textAlign: "center",
        curson: "pointer",
      },
      render: (rowData) => <AddWorkSummaryModel data={rowData} parentCallback = {handleCallbackAddS} />,
    },
  ];
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIUser] = useState(false);
  const [isTeamLead, setIsTeamLead] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [claim_idN, setClaim_idN] = useState(null);
  const [openClaimDM, setOpenClaimDM] = React.useState(false);
  const [user_id, setUser_id] = React.useState();
  const [isworked, setIsworked] = React.useState(false);
  const [ispending, setIspending] = React.useState(false);
  const [isall, setIsall] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenCD = () => {
    setOpenClaimDM(true);
  };

  const handleCloseCD = () => {
    setOpenClaimDM(false);
  };

  function handleCallbackAddS(){
   if(isworked){
    getWorkedClaimsL({ is_worked: true, assigned_to: selectedUser });
   }
   if(isall){
    getAllClaims();
   }

   if(ispending){
    getPendingClaimsL({ is_worked: false, assigned_to: selectedUser });
   }
  }
  

  useEffect(async () => {
    await getUsersL();
    let userRoles = user.user.roles;
    setUser_id(user.user.employee_id);
    if (userRoles) {
      userRoles.map((item) => {
        if (item == "ROLE_USER") {
          setIUser(true);
        }

        if (item == "ROLE_TEAMLEAD") {
          setIsTeamLead(true);
        }

        if (item == "ROLE_ADMIN") {
          setIsAdmin(true);
        }

        if (item == "ROLE_MANAGER") {
          setIsManager(true);
        }

        if (item == "ROLE_SUPERUSER") {
          setIsSuperUser(true);
        }
      });
    }

    getClaims()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch(getFollowUpDDValues());
  }, []);

  function getAllClaims() {
    getClaims()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getPendingClaimsL(data) {
    getPendingClaims(data)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getWorkedClaimsL(data) {
    getWorkedClaims(data)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];

    // if (newData.first_name === "") {
    //   errorList.push("Please enter first name")
    // }
    // if (newData.last_name === "") {
    //   errorList.push("Please enter last name")
    // }
    // if (newData.email === "" ) {
    //   errorList.push("Please enter a valid email")
    // }

    setClaim_idN(oldData.claim_id);
    setOpen(true);
    newData.updated_by = user_id;

    if (errorList.length < 1) {
      api
        .post("/api/claim/updateclaim", newData)
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

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData.first_name === undefined) {
      errorList.push("Please enter first name");
    }
    if (newData.last_name === undefined) {
      errorList.push("Please enter last name");
    }
    if (newData.email === undefined || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email");
    }

    if (errorList.length < 1) {
      //no error
      api
        .post("/users", newData)
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
    setClaim_idN(oldData.claim_id);
    setOpen(true);

    api
      .post("/api/claim/delete", {
        claim_id: oldData.claim_id,
        updated_by: user_id,
      })
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

  const [dopen, setDopen] = React.useState(false);

  const handleCallback = (childData) => {
    setDopen(childData);
    window.alert(childData);
    // this.setState({data: childData})
  };

  const handleCallbackAddNotes = (childData) => {
    setOpen(false);
    // this.setState({data: childData})
  };

  const classes = useStyles();

  const HandleWorked = (value, event) => {
    if (value == "All") {
      setIsall(true);
      setIspending(false);
      setIsworked(false);
      getAllClaims();
    }

    if (value == "Worked") {
      setIsall(false);
      setIspending(false);
      setIsworked(true);
      getWorkedClaimsL({ is_worked: true, assigned_to: selectedUser });
    }
    if (value == "Pending") {
      setIsall(false);
      setIspending(true);
      setIsworked(false);
      getPendingClaimsL({ is_worked: false, assigned_to: selectedUser });
    }
  };

  async function getUsersL() {
    await getUsers()
      .then((data) => {
        setUsers(data);
        // setSelectedUser(data[0].employee_id)
        //  getUserActivityL({ date: materialDateInput , employee_id: data[0].employee_id})
        //  user_id=data[0].employee_id
        //  console.log(data[0].employee_id)
      })
      .catch((error) => {
        console.log(error);
      });
  }

   function onChange (value) {
    console.log(value)
    if(value==0){
      setSelectedUser(null)
      console.log(selectedUser)
    }
    else{
      setSelectedUser(value);
    }
  
  //  handleCallbackAddS()
  }

  const [selectedRow, setSelectedRow] = useState(null);
  return (
    <div className="App">
      {/* claim Notes */}

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
              <ClaimNotesModel
                parentCallback={handleCallbackAddNotes}
                claim_id={claim_idN}
              />
              </div>
            </div>
          </Fade>
        </Modal>
      </div>

      {/* end claim notes */}

      {/* claim Detail */}

      <div>
        {/* <div  onClick={handleOpen} style={{border: 'none', background: 'none'}}> {props.data.charges} </div> */}

        <Modal 
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          // open={openClaimDM}
          open={openClaimDM}
          onClose={handleCloseCD}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openClaimDM}>
            <div className={classes.paper}>
              <h3 id="transition-modal-title">
                {" "}
                <CancelIcon className="modelclose" onClick={handleCloseCD} />
              </h3>

              <ClaimDetail parentCallback={handleCallback} data={160082181} />
            </div>
          </Fade>
        </Modal>
      </div>

      {/* end claim detail */}

      <Grid container spacing={0}>
        <Grid item xs={3}></Grid>
        <Grid item xs={12} style={{ marginTop: "-35px" }}>
          <div>
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
          </div>

          <MuiThemeProvider theme={theme}>
            <span className="inputallc">
              <FormControlLabel
                onChange={(e) => HandleWorked("All", e)}
                className=""
                control={
                  <Checkbox
                    checked={isall}
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="checkedI"
                  />
                }
                label="All"
              />

              <FormControlLabel
                onChange={(e) => HandleWorked("Pending", e)}
                className=""
                control={
                  <Checkbox
                    checked={ispending}
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="checked2"
                  />
                }
                label="Pending"
              />
              <FormControlLabel
                onChange={(e) => HandleWorked("Worked", e)}
                className=""
                control={
                  <Checkbox
                    checked={isworked}
                    // onChange={(e) => HandleWorked("Worked", e)}
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="checked3"
                  />
                }
                label="worked"
              />

              {/* <Select

className=""
    defaultValue={user_id}
    showSearch
    style={{ width: 200 }}
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value={0}>All </Option>
    {
      
      users.map(item=>{
        return(
          <Option value={item.employee_id}>{item.first_name+' '+ item.last_name}</Option>
        )
      })
    }

  </Select>
   */}
            </span>

            <spam className="inputallc">
              <span className="lablepaddignford">
                <label>
                  <strong>TOTAL CLAIMS : </strong>{" "}
                </label>
                <span className="colorbb"> 150 </span>{" "}
              </span>
              <span className="lablepaddignford">
                <label>
                  <strong>ASSIGNED CLAIMS : </strong>{" "}
                </label>
                <span className="colorbb"> 100 </span>{" "}
              </span>
              <span className="lablepaddignford">
                <label>
                  <strong>PENDING CLAIMS : </strong>{" "}
                </label>
                <span className="colorbb"> 50 </span>{" "}
              </span>
            </spam>

            <MaterialTable
              style={{ marginTop: "0", padding: "0" }}
              title="Show Claim"
              columns={columns}
              data={data}
              icons={tableIcons}
              // onRowClick={(event, rowData, togglePanel) => togglePanel()}

              // detailPanel={rowData => (
              //   <div style={{ textAlign: 'left' }}>

              //     <h4 className="d-inline-b ml4rem">Remarks: </h4> <span> {rowData.remarks}</span>

              //   </div>
              // )}

              actions={[
                {
                  icon: SpeakerNotesIcon,
                  onClick: (e, rowData) => {
                    setOpen(true);
                    setClaim_idN(rowData.claim_id);
                  },
                },
                // {
                //   icon: 'add',
                //   isFreeAction: true,
                //   onClick: () => {
                //     // open dialog to save new one
                //   }
                // }
              ]}
              editable={{
                isEditable: (rowData) => (isAdmin ? true : false),
                isDeletable: (rowData) => (isAdmin ? true : false),

                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    handleRowUpdate(newData, oldData, resolve);
                  }),
                // onRowAdd: (newData) =>
                //   new Promise((resolve) => {
                //     handleRowAdd(newData, resolve)
                //   }),

                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve);
                  }),
              }}
              onRowClick={(evt, selectedRow) =>
                setSelectedRow(selectedRow.tableData.id)
              }
              options={{
                filtering: true,
                rowStyle: (rowData) => ({
                  backgroundColor:
                    selectedRow === rowData.tableData.id ? "#eee" : "#FFF",
                  color: selectedRow === rowData.tableData.id ? "#000" : "#444",
                }),
                pageSize: 20,
                headerStyle: {
                  backgroundColor: "#f2f2f2",
                  color: "#1565c0",
                  whiteSpace: "nowrap",
                  paddingBottom: "10px",
                  paddingTop: "9px",
                  marginBottom: "11px",
                  borderTop: "1px rgba(0, 0, 0, .2) solid",
                  borderBottom: "1px rgba(0, 0, 0, .2) solid",
                  fontSize: "13px",
                },
                search: true,
                actionsColumnIndex: -1,
                paging: true,
                emptyRowsWhenPaging: false,
                showTitle: false,
                //       fixedColumns: {
                //   right: 1
                // }
              }}
            />
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}

export default DenialManagement;
