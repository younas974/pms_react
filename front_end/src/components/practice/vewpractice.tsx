import React, { FC, ReactElement, useState, useEffect } from "react";
import { practiceprofile } from "../../store/types";
import { APP_TITLE, PAGE_TITLE_HOME } from "../../utils/constants";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import EditPracticeModal from "../../components/practice/editpractice/EditPracticeComponent";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Restricted from "../../permission-provider/Restricted";
import { notAllowed } from "../nopermission";

interface practiceProps {
  profile: practiceprofile;
}


const permissions= {
  department: ['IT', 'Creditionaling'],
  roles: ['ROLE_SUPERUSER']
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  })
);

const ViewPractice: FC<practiceProps> = ({ profile }) => {
  const classNamees = useStyles();
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const showtoest = (message: string, appearance: any) => {};
  const user = useSelector((state: RootState)=> state.user)
  
  const [isAdmin, setIsAdmin] = useState(false)
  const [isUser, setIUser] = useState(false)
  const [isTeamLead, setIsTeamLead] = useState(false)
  const [isManager, setIsManager] = useState(false)
  const [isSuperUser, setIsSuperUser] = useState(false)

  useEffect(() => {

    let userRoles :any[] = user.user.roles
    if (userRoles) {


      userRoles.map(item => {
        if (item == 'ROLE_USER') {
          setIUser(true)
        }

        if (item == 'ROLE_TEAMLEAD') {
          setIsTeamLead(true)
        }

        if (item == 'ROLE_ADMIN') {
          setIsAdmin(true)
        }

        if (item == 'ROLE_MANAGER') {
          setIsManager(true)
        }

        if (item == 'ROLE_SUPERUSER') {
          setIsSuperUser(true)
        }


      })

     }
 
    let User = JSON.parse(localStorage.getItem("user") || "{}");
     
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>

      <div className={classNamees.root}>
        <div className="col">
          <header className="card-header">
            <h2 className="card-title-ppp colordgrey">Personal Information</h2>
          </header>

          <form className="form-horizontal form-bordered" method="get">
            <div className="form-group row rowadj">
              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                Practice Name:
              </label>
              <div className="col-lg-3">
                <input
                  readOnly
                  value={profile?.PracticeName}
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="name"
                  disabled={false}
                />
              </div>

              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                Group NPI:
              </label>
              <div className="col-lg-3">
                <input  readOnly
                  value={profile?.groupNPI}
                  type="text"
                  className="form-control"
                />
              </div>

              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                Tax ID:
              </label>
              <div className="col-lg-3">
                <input  readOnly
                  value={profile?.textId}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group row rowadj">
              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                Medicaid-Grp:
              </label>
              <div className="col-lg-3">
                <input
                readOnly
                  value={profile?.medicaidTPIGroup}
                  type="text"
                  className="form-control"
                />
              </div>

              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                Medicare PTAN:
              </label>
              <div className="col-lg-3">
                <input
                 readOnly
                  value={profile?.medicarePTAN ? profile?.medicarePTAN : ""}
                  type="text"
                  className="form-control"
                />
              </div>

              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                County:
              </label>
              <div className="col-lg-3">
                <input
                 readOnly
                  value={profile?.County}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <br />

            <header className="card-header">
              <h2 className="card-title-ppp colordgrey">Contact Information</h2>
            </header>

            <Restricted to={permissions} fallback={notAllowed}> 
            <div className="form-group row rowadj">
              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                Office Email ID:
              </label>
              <div className="col-lg-3">
                <input
                 readOnly
                  value={profile?.officeEmailAddress}
                  type="text"
                  className="form-control"
                />
              </div>

              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                Email Address:
              </label>
              <div className="col-lg-3">
                <input
                 readOnly
                  value={profile?.emailAddress}
                  type="text"
                  className="form-control"
                />
              </div>

              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                Phone Number:
              </label>
              <div className="col-lg-3">
                <input
                 readOnly
                  value={profile?.phoneINTEGER ? profile?.phoneINTEGER : ""}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group row rowadj">
              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                Fax Number:
              </label>
              <div className="col-lg-3">
                <input
                 readOnly
                  value={profile?.faxINTEGER}
                  type="text"
                  className="form-control"
                />
              </div>

              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                Cell Number:
              </label>
              <div className="col-lg-3">
                <input
                 readOnly
                  value={profile?.cellNumber}
                  type="text"
                  className="form-control"
                />
              </div>

              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                Authorized Email:
              </label>
              <div className="col-lg-3">
                <input
                 readOnly
                  value={profile?.autorizedOfficialEmail}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>

            </Restricted>
            <br />
            <header className="card-header">
              <h2 className="card-title-ppp colordgrey">Other Information</h2>
            </header>
            <Restricted to={permissions} fallback={notAllowed}> 
            <div className="form-group row rowadj">
              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                CDS/Pharmacy:
              </label>
              <div className="col-lg-3">
                <input
                 readOnly
                  value={
                    profile?.CDSPharmacyCertification
                      ? profile?.CDSPharmacyCertification
                      : ""
                  }
                  type="text"
                  className="form-control"
                />
              </div>

              <label className="col-lg-2 control-label text-lg-right pt-2 pptextlable">
                COI:
              </label>

              <div className="col-lg-3">
                <input
                 readOnly
                  value={profile?.malPractice}
                  type="text"
                  className="form-control"
                />
              </div>
              <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                License No:
              </label>
              <div className="col-lg-3">
                <input
                 readOnly
                  value={profile?.licenceNo}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>

            {profile.addresses.length > 0 ? (
              <div>
                <div className="form-group row rowadj">
                  <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                    Service Address:
                  </label>
                  <div className="col-lg-4">
                    <input
                      value={
                        profile?.addresses[0].addresstype.name == "service"
                          ? profile.addresses[0].streetaddress
                          : ""
                      }
                      type="text"
                      className="form-control"
                    />

                    <div className="col-lg-4-ask-2">
                      <div className="row form-group rowla">
                        <div className="col-lg-4-ask-1">
                          <input
                           readOnly
                            value={
                              profile?.addresses[0].addresstype.name ==
                              "service"
                                ? profile.addresses[0].zip
                                : ""
                            }
                            type="text"
                            name="Zip"
                            placeholder="Zip"
                            className="form-control"
                          />
                        </div>

                        <div className="mb-3 hidden-lg"></div>

                        <div className="col-lg-4-ask">
                          <input
                           readOnly
                            value={
                              profile?.addresses[0].addresstype.name ==
                              "service"
                                ? profile.addresses[0].state
                                : ""
                            }
                            type="text"
                            name="State"
                            placeholder="State"
                            className="form-control"
                          />
                        </div>

                        <div className="mb-3 hidden-lg"></div>

                        <div className="col-lg-4-ask">
                          <input
                           readOnly
                            value={
                              profile?.addresses[0].addresstype.name ==
                              "service"
                                ? profile.addresses[0].city
                                : ""
                            }
                            type="text"
                            name="Area code"
                            placeholder="Area code"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {profile?.addresses.map((item: any) => {
                    if (item.addresstype.name == "payto") {
                      return (
                        <>
                          <label className="col-ask-3 control-label text-lg-right pt-2 pptextlable">
                            Pay to Address:
                          </label>
                          <div className="col-lg-4">
                            <div>
                              <input
                               readOnly
                                value={
                                  item.streetaddress ? item.streetaddress : ""
                                }
                                type="text"
                                className="form-control"
                              />
                              <div className="col-lg-4-ask-2">
                                <div className="row form-group rowla">
                                  <div className="col-lg-4-ask-1">
                                    <input
                                     readOnly
                                      value={item.zip ? item.zip : ""}
                                      type="text"
                                      name="Zip"
                                      placeholder="Zip"
                                      className="form-control"
                                    />
                                  </div>

                                  <div className="mb-3 hidden-lg"></div>

                                  <div className="col-lg-4-ask">
                                    <input
                                     readOnly
                                      value={item.state ? item.state : ""}
                                      type="text"
                                      name="State"
                                      placeholder="State"
                                      className="form-control"
                                    />
                                  </div>

                                  <div className="mb-3 hidden-lg"></div>

                                  <div className="col-lg-4-ask">
                                    <input
                                     readOnly
                                      value={item.city ? item.city : ""}
                                      type="text"
                                      name="Area code"
                                      placeholder="Area code"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}
                </div>

                <div className="form-group row rowadj">
                  <label className="col-lg-2 control-label text-lg-left pt-2"></label>
                  <label className="col-ask-3 control-label text-lg-left pt-2"></label>
                </div>
                <div className="form-ask-height-1">
                  {profile?.addresses.map((item: any) => {
                    if (item.addresstype.name == "mailing") {
                      return (
                        <div className="form-group row rowadj ">
                          <label className="col-lg-2 control-label text-lg-left pt-2 pptextlable">
                            Mailing Address:
                          </label>
                          <div className="col-lg-4">
                            <div>
                              <input
                               readOnly
                                value={
                                  item.streetaddress ? item.streetaddress : ""
                                }
                                type="text"
                                className="form-control"
                              />
                              <div className="col-lg-4-ask-2">
                                <div className="row form-group rowla">
                                  <div className="col-lg-4-ask-1">
                                    <input
                                     readOnly
                                      value={item.zip ? item.zip : ""}
                                      type="text"
                                      name="Zip"
                                      placeholder="Zip"
                                      className="form-control"
                                    />
                                  </div>

                                  <div className="mb-3 hidden-lg"></div>

                                  <div className="col-lg-4-ask">
                                    <input
                                     readOnly
                                      value={item.state ? item.state : ""}
                                      type="text"
                                      name="State"
                                      placeholder="State"
                                      className="form-control"
                                    />
                                  </div>

                                  <div className="mb-3 hidden-lg"></div>

                                  <div className="col-lg-4-ask">
                                    <input
                                     readOnly
                                      value={item.city ? item.city : ""}
                                      type="text"
                                      name="Area code"
                                      placeholder="Area code"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="card-body text-lg-right btn-ask-marj">
            {isAdmin ?    <EditPracticeModal data={profile} /> : '' }
            </div>
            </Restricted>
          </form>
          
        </div>
      </div>
    </>
  );
};

export default ViewPractice;
