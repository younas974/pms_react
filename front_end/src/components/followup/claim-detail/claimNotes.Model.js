import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { API_URL } from "../../../utils/constants";
import axios from "axios";
import * as moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
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
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveClaimWorkSummary } from "../../../store/actions/followUpAction";
import CircularProgress from "@material-ui/core/CircularProgress";

const { TextArea } = Input;
const api = axios.create({
  baseURL: API_URL,
});

const formItemLayout = {
  // labelCol: {
  //   xs: { span: 24 },
  //   sm: { span: 8 },
  //   md: { span: 6 },
  //   lg: { span: 6 }
  // },
  // wrapperCol: {
  //   xs: { span: 36 },
  //   sm: { span: 36 },
  // },
};

export default function ClaimNotesModel(props) {
  // states

  const user = useSelector((state) => state.user);

  const [claimNotes, setClaimNotes] = useState([]);
  const [addNotes, setAddNotes] = useState(false);
  const [user_id, setUser_id] = React.useState();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setUser_id(user.user.employee_id);
    let claim_id = props.claim_id;
    getClaimNotes(claim_id);
  }, []);

  function getClaimNotes(claim_id) {
    api
      .get(`/api/claim/get/claimnotes/${claim_id}`)
      .then((data) => {
        let dataa = [];
        console.log(data);
        data.data.map((item) => {
          console.log(item.claim_id);
        });
        setClaimNotes(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function dateFormate(data) {
    const date = new Date(data);
    const fullYear = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    return month + "/" + day + "/" + fullYear;
  }

  const toggleAddNotes = () => {
    if (addNotes) {
      setAddNotes(false);
    } else {
      setAddNotes(true);
    }
  };

  const onFinish = (values) => {
    values.claim_id = props.claim_id;
    values.updated_by = user_id;

    console.log(values);

    setLoading(true);

    saveClaimWorkSummary(values).then((data) => {
      if (data.status == 200) {
        getClaimNotes(props.claim_id);
        setLoading(false);
        onTrigger(false);
      }
    });
  };

  const onTrigger = (event) => {
    props.parentCallback(event);
  };

  return (
    <>
      {loading ? <CircularProgress disableShrink /> : ""}
      {claimNotes.length > 0 ? (
        claimNotes.map((item) => {
          return (
            <>
             
            
              <div class="card-body ppaddingzero" style={{border:'10px #eee solid',borderBottom:'5px #eee solid',}} >
                <div class="alert alert-default"  style={{padding:'5px', border:'10px #fff solid'}} >
                  <div class="row show-grid">
                    <div class="col-lg-6">
                      {" "}
                      <strong>
                        {item.updatedBy.first_name}{" "}
                        {item.updatedBy.last_name}
                      </strong>{" "}
                    </div>
                    <div class="col-lg-6">
                      {" "}
                      <span class="claimsdateflr">
                        <strong>{(dateFormate(item.updated_at))}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <p class="claimstextp" style={{marginTop:'-15px'}}>
                  {" "}
                  {item.remarks}
                </p>
              </div>
               
              
            </>
          );
        })
      ) : (
        <div className="text-center"> Not Notes Found </div>
      )}

      <div>
        <div className="add-notes">
          {/* <Fab size="small" color="secondary" aria-label="add" className="fr" >
          <AddIcon onClick={toggleAddNotes} />
        </Fab> */}
        </div>
        <div>
          {addNotes ? (
            <div className="container">
              <Form
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                  remarks: "",
                }}
              >
                <Form.Item
                  name="remarks"
                  //label="Remarks"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Notes",
                    },
                  ]}
                >
                  {/* @ts-ignore */}
                  <TextArea placeholder="Type Your Notes Here ..." rows={4} />
                </Form.Item>
                <Form.Item name="claim_id" label="Claim Id" hidden={true}>
                  <Input />
                </Form.Item>

                <Form.Item name="updated_by" label="Claim Id" hidden={true}>
                  <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 36, offset: 0 }}>
                  <Button className="buttons" type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
