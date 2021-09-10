import React, { FC, ReactElement, useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { providerList } from "../../store/typesfolder/provider.types";
import Avatar from "@material-ui/core/Avatar";
import {
  getProviderById,
  getProviderLogIn,
} from "../../store/actions/providerProfileAction";
import { RootState } from "../../store";
import { API_URL, API_URL_DOC } from "../../utils/constants";

interface practiceProps {
  profile: providerList[];
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

const PracticeSideBar: FC<practiceProps> = ({ profile }) => {


  const practice = useSelector((state: RootState)=> state.practicebyid.data)
  const classNamees = useStyles();
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [profilei, setProfileI]=useState('')

  const showtoest = (message: string, appearance: any) => {};

  const showProvider = (provider: any) => {
    console.log('below is the provider image')
    console.log(API_URL_DOC+provider?.provider_profile_pic?.data)
    return (
      <>
        <li
          className="cursor_pointer"
          onClick={() => handleProvider(provider.providerId)}
        >
          <figure className="image rounded2">
          <Avatar src={provider?.provider_profile_pic?.data ? API_URL_DOC+ provider.provider_profile_pic.data :''} className="rounded-circle ppsdlib" />

            {/* <img
              src={provider?.provider_profile_pic?.data ? API_URL_DOC+ provider.provider_profile_pic.data :''}
              alt="John Methew"
              height="40"
              className="rounded-circle ppsdlib"
            /> */}
          </figure>

          <span className="title colordblur ppsdlt">
            {provider.providerFirstName} {provider.providerLastName}
          </span>
          <span className="message truncate ppsdljt">
            {provider.speciality}
          </span>
          <span className="message truncate colordblur">
            Avg Col $000 | MTD $000
          </span>
          <hr className="dotted short" />
        </li>
      </>
    );
  };

  const handleProvider = (id: number) => {
    dispatch(getProviderById(id));
    dispatch(getProviderLogIn(id));
  };

  useEffect(() => {


  }, []);

  return (
    <>
      <section className="card cardic">
        <div className="card-body cardic">
          <div className="thumb-info mb-3 text-center">
            <div className="rounded img-fluid profileimgside">
              <Avatar src={(practice?.practice_profile_pic?.data) ? (API_URL_DOC+practice?.practice_profile_pic?.data) : '' } className="rounded" />
            </div>
          </div>

          <h4 className="colordgrey2">{practice?.PracticeName}</h4>
          <hr className="dotted short"></hr>

          <div className="card-body cardic scrollss">
            <div className="content">
              <ul className="simple-user-list">
                {profile ?  profile.map((provider) => showProvider(provider)) :  ''}

                <hr className="dotted short" />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PracticeSideBar;
