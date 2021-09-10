import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Antddropdown from "../addWorkSummaryComponent"
import ClaimDetail from '../claim-detail/claimDetailModel';


const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: "transparent",
      width: "50%",
      height: "auto",
      boxShadow: theme.shadows[0],
      padding: theme.spacing(0, 1, 1),
    },
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);



export default function ClaimDetailModel(props: any) {



  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [mopen, setMopen] = React.useState(false);

  const [age, setAge] = React.useState<string | number>('');
  const [openn, setOpenn] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as number);
  };



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    //  setOpen(props.open);
    console.log(props.data)
  },
    [],
  );

  const handleCallback = (childData: any) => {
    console.log(childData)
    setOpen(childData)

  }

  function numberWithCommas(data: any) {

    if (data == null) {
      return data
    }
    else {

      return data.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
  }



  return (
    <div>

      <div onClick={handleOpen} className="under_line" style={{ border: 'none', background: 'none' }}>
        {'$' + numberWithCommas(props.data.charges)}
        {/* {props.data.charges} */}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3 id="transition-modal-title"> <CancelIcon
              className="modelclose"
              onClick={handleClose} /></h3>

            <ClaimDetail parentCallback={handleCallback} data={props.data} />
          </div>
        </Fade>
      </Modal>
    </div>

  );
}
