import React, { useEffect, useState } from "react";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Datepick from "../datepicker";
import { DatePicker } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { getClaimStatusSummary } from "../../../store/actions/followUpAction";




const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    float: 'right'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


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




const ClaimStatusSummary = () => {

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54'),
  );

  const [tableData, setTableData] = React.useState([]);
  const [totalClaims, setTotalClaims] = React.useState()
  const [totalBalance, setTotalBalance] = React.useState()
  const [todayDate, setTodayDate] = React.useState("2021-8-20")

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

  useEffect(() => {
    handleDateChange(new Date())


    //console.log(selectedDate.toUTCString())

    let currentDate = today()
    setTodayDate(currentDate)

    getClaimStatusSummaryF({ date: materialDateInput })

  }, [])

  function getClaimStatusSummaryF(data) {
    getClaimStatusSummary(data).then(data => {

      setDataa(data)
      calculateTotal(data)

    }).catch(error => {
      console.log(error)
    })
  }

  const handleChange = (event) => {
    let date = event.target.value
    // setFilterDate(date)
    console.log(date)
    getClaimStatusSummaryF({ date: date })

  }



  return (
    <>

      <section className="card mb-4">
        <header className="card-header">
          <div className="card-actions">
            <a
              href="#"
              className="card-action card-action-toggle"
              data-card-toggle=""
            ></a>
            <a
              href="#"
              className="card-action card-action-dismiss"
              data-card-dismiss=""
            ></a>
          </div>

          <h2 className="card-title-ppp colordgrey">Claim Status Summary

            <form className={classes.container} noValidate>
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

          </h2>
        </header>
        <div className="card-body">
          <table id="process-manager-table" className="table table-responsive-md table-sm mb-0" >
            <thead>
              <tr>
                <th className="thcolo tdfourtypc">STATUS\SUB STATUS</th>
                <th className="text-right thcolo tdtwentypc">CLAIMS</th>
                <th className="text-right thcolo tdtwentypc">BALANCE</th>
                {/* <th className="tetdcenter thcolo">P.CLAIMS</th> */}
              </tr>
            </thead>

          </table>


          <div id="table-wrapper">


            <table id="process-manager-table" className="table table-responsive-md table-sm mb-0" >

              <tbody>

                {dataa ? dataa.map(item => (
                  <tr>
                    <td className="tdfourtfiveypc ">{item["status.title"]}</td>
                    <td className="text-right tdtwentypc">{item.claims}</td>
                    <td className="text-right tdtwentypc">{numberWithCommas(item.balance)}</td>
                    {/* <td className="tetdcenter">6</td> */}
                  </tr>
                )) : 'No record Found'}

              </tbody>
            </table>

          </div>
          <div id="table-wrapper3">
            <table className="table table-responsive-md table-sm mb-0" >
              <tbody>
                <tr>
                </tr>
                <tr>

                  <td className="tetdbold tdsixtypc">Grand Total</td>
                  <td className="tetdcenter tetdbold tdtwentypc">{totalClaims}</td>
                  <td className="text-right tetdbold tdtwentypc">

                    {numberWithCommas(totalBalance)}</td>

                  {/* <td className="tetdcenter">1</td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </>
  );
};

export default ClaimStatusSummary;