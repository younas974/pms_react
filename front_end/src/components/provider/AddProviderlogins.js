import React, { useState, useEffect } from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Addresstype } from "../../model/Practiceprofile.model";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
//import SimpleForm from "../components/SimpleForm";

import submit from "../practice/addpracticevalidation";
import {
  getPractices,
  setLoading,
  getPracticeById,
  createPractice,
} from "../../store/actions/practiceProfileAction";
import SubmitValidationForm from "./AddProviderloginsform";
import { createProviderLogin } from "../../store/actions/providerProfileAction";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    background: "#fff !important",
    width: "50%",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

  paperFullScreen: { width: "50% !important" },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div>
      <input
        className="form-control"
        {...input}
        placeholder={label}
        type={type}
      />
      {touched && error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  </div>
);

export default function FullScreenDialog() {
  const profile = useSelector((state) => state.practicebyid.data);
  const provider_id = useSelector((state) => state.provider.data);

  const dispatch = useDispatch();

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [user_info, serUser_info] = React.useState({
    user_id: null,
    token: "",
    roles: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showResults = async function showResults(values) {
 
    if(!provider_id && provider_id.providerId){
        window.alert('Kindly select provider')
    }

    values.provider_id = provider_id.providerId;
    values.created_by = user_info.user_id;
    values.updated_by = user_info.user_id;
    dispatch(createProviderLogin(values));
    handleClose();
  };

  useEffect(() => {
    let User = JSON.parse(localStorage.getItem("user") || "{}");
    serUser_info({
      ...user_info,
      user_id: User.id,
      token: User.accessToken,
      roles: User.roles,
    });

    return false;
  }, []);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <i class="fa fa-plus" aria-hidden="true"></i> &nbsp; ADD
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        disableBackdropClick={true}
        MuiListProps={{
          style: {
            backgroundColor: "#fff",
            boxShadow: "none",
          },
        }}
      >
        <header class="card-header-ask">
          <div class="card-actions">
            <div class="button-ask-adj">
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </div>
          </div>

          <h2 class="card-title-ask">Add Provider Logins</h2>
        </header>

        <List style={{backgroundColor:'#fff'}}>
          <div className="card-body11">
            {/* <SubmitValidationForm /> */}

            <SubmitValidationForm onSubmit={showResults} />
          </div>

          <Divider />

          <ListItem button></ListItem>
        </List>
      </Dialog>
    </div>
  );
}
