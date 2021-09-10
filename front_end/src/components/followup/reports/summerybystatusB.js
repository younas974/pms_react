import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableFooter from "@material-ui/core/TableFooter";
import { FontDownload } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import { getClaimStatusSummary, getUserActivity, getUsers } from "../../../store/actions/followUpAction";
import { Select } from 'antd';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Datepick from "../datepicker";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: "0px",
    overflowX: "auto",
    backgroundColor: "#fff !important",

  },
});

const theme = createTheme({
  overrides: {
    MuiTableCell: {
      stickyHeader: {
        fontSize: "0.9rem",
        color: "#0c86db !important",
        fontweight: "500",
      },

      footer: {
        fontSize: "0.9rem",
        color: "#000 !important",

        fontweight: "bold",
        left: 0,
        bottom: 0, // <-- KEY
        zIndex: 2,
        position: "sticky",
        backgroundColor: "#f2f2f2",
      },
      container: {
        display: "flex",
        flexWrap: "wrap",
        float: "right",
      },
    },

    SimpleTable: {
      height: "300px !important",
    },

    MuiTableBody: {
      height: "250px",
    },
  },
});

let id = 0;
function createData(name, calories, fat) {
  id += 1;
  return { id, name, calories, fat };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Frozen yoghurt", 159, 6.0),

];


const dateNow = new Date(); // Creating a new date object with the current date and time
const year = dateNow.getFullYear(); // Getting current year from the created Date object
const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
const month = // Setting current Month number from current Date object
  monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
    ? `0${monthWithOffset}`
    : monthWithOffset;
const date =
  dateNow.getDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${dateNow.getDate()}`
    : dateNow.getDate();

const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>

let user_id


function numberWithCommas(data) {
  if (data == null) {
    return data;
  } else {
    return data.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
}

const useStyles = makeStyles({});

function SimpleTable(props) {
  const { classes } = props;


  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54'),
  );

  const [tableData, setTableData] = React.useState([]);
  const [totalClaims, setTotalClaims] = React.useState()
  const [totalBalance, setTotalBalance] = React.useState()
  const [todayDate, setTodayDate] = React.useState()
  const [users, setUsers]=React.useState([])
  const [selectedUser, setSelectedUser]=React.useState()

  const [dataa, setDataa] = useState([]); //table data
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function numberWithCommas(data) {

    if (data == null) {
      return data
    }
    else {

      return data.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
  }



  const calculateTotal = (data) => {
    console.log('i am here')
    console.log(data)

    let totalClaims = 0;
    let totalBalance = 0;
    if (data) {
      data.map(item => {
        totalClaims = Number(totalClaims) + Number(item.claims);
        totalBalance = Number(totalBalance) + Number(item.balance);

      })
    }

    setTotalClaims(totalClaims)
    setTotalBalance(totalBalance)

  }

  function today() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    return year + '-' + month + '-' + day
  }

  useEffect( async() => {
  await  handleDateChange(new Date())

   await getUsersL()
    let currentDate = today()
    setTodayDate(materialDateInput)
    
 

  }, [])

  function getClaimStatusSummaryF(data) {
    getClaimStatusSummary(data).then(data => {

      // setDataa(data)
      // calculateTotal(data)
    }).catch(error => {
      console.log(error)
    })
  }

 async function getUsersL() {
 await   getUsers().then(data => {
      setUsers(data)
      setSelectedUser(data[0].employee_id)
      getUserActivityL({ date: materialDateInput , employee_id: data[0].employee_id})
      user_id=data[0].employee_id
      console.log(data[0].employee_id)

    }).catch(error => {
      console.log(error)
    })
  }



  function getUserActivityL(data) {
    getUserActivity(data).then(data => {

      setDataa(data)
      calculateTotal(data)

    }).catch(error => {
      console.log(error)
    })
  }


  const handleChange = (event) => {
    setTodayDate(event.target.value)
    let date = event.target.value

    getUserActivityL({date: date, employee_id: selectedUser})

  }

  const { Option } = Select;

function onChange(value) {

  setSelectedUser(value)
  getUserActivityL({date: todayDate, employee_id: value})

}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}



  return (
    <Paper className={classes.root}>
      <section className="card mb-4">

        <header className="card-header">
          <div className="card-actions adjdatefolloup">
            <form className={classes.container} noValidate>

            <Select
    defaultValue={user_id}
    showSearch
    style={{ width: 200 }}
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    // onFocus={onFocus}
    // onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    {
      users.map(item=>{
        return(
          <Option value={item.employee_id}>{item.first_name+' '+ item.last_name}</Option>
        )
      })
    }

  </Select>,

              <TextField

                id="date"
                type="date"
                onChange={handleChange}
                defaultValue={materialDateInput}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </div>

          <h2 className="card-title-ppp colordgrey">User Wise Productivity</h2>
        </header>
        <div className="card-body">
          <TableContainer className="containertab1" size="small">
            <ThemeProvider theme={theme}>
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>STATUS\SUB STATUS</TableCell>
                    <TableCell align="center">CLAIMS</TableCell>
                    <TableCell align="right">BALANCE</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>

                  {dataa ?
                    dataa.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                          {" "}
                          {item["status.title"]}
                        </TableCell>
                        <TableCell align="center">{item.claims}</TableCell>
                        <TableCell align="right">{'$ ' + numberWithCommas(item.balance)}</TableCell>
                      </TableRow>
                    ))


                    : 'No record Found'
                  }

                </TableBody>

                <TableFooter stickyHeader aria-label="sticky table" size="small">
                  <TableRow className="footerstickybg">
                    <TableCell align="left">Grand Total</TableCell>
                    <TableCell align="center">{totalClaims}</TableCell>
                    <TableCell align="right">{'$ ' + numberWithCommas(totalBalance)}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </ThemeProvider>
          </TableContainer>
        </div>
      </section>

    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
