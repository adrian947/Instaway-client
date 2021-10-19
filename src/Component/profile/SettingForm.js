import React from "react";
import { StateContext } from "./../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { FormChangePass } from "./ModalChange/FormChangePass";
import { FormChangeEmail } from "./ModalChange/FormChangeEmail";
import { FormChangeDescription } from './ModalChange/FormChangeDescription';
import { FormChangeWebSite } from './ModalChange/FormChangeWebSite';

export const SettingForm = ({ setShow, setTitleModal, setChildrenModal, refetch, getUser }) => {
  const history = useHistory();
  const client = useApolloClient();
  const { logOut } = StateContext();

  const handleChangePassword = () => {
    setTitleModal("Change Password");
    setChildrenModal(
      <FormChangePass
        setShow={setShow}
        setChildrenModal={setChildrenModal}
        handleLogOut={handleLogOut}
      />
    );
  };

  const handleLogOut = () => {
    history.push("/");
    //clear cache Apollo
    client.clearStore();
    logOut();
  };

  const handleChangeEmail = () => {
    setTitleModal("Change Email");
    setChildrenModal(
      <FormChangeEmail
        setShow={setShow}
        setChildrenModal={setChildrenModal}
        handleLogOut={handleLogOut}
        refetch={refetch}
        getUser={getUser}
      />
    );
  };


  const handleChangeDescription = () => {
    setTitleModal("Change Description");
    setChildrenModal(
      <FormChangeDescription
        setShow={setShow}
        refetch={refetch}
        getUser={getUser}
      />
    );
  };

  const handleChangeSiteWeb = () => {
    setTitleModal("Change Description");
    setChildrenModal(
      <FormChangeWebSite
        setShow={setShow}
        refetch={refetch}
        getUser={getUser}
      />
    );
  };

  return (
    <div className="settingForm ">
      <button onClick={handleChangeEmail}>Change email</button>
      <button onClick={handleChangePassword}>Change Password</button>
      <button onClick={handleChangeDescription}>Change Description</button>
      <button onClick={handleChangeSiteWeb}>Web site</button>
      <button onClick={handleLogOut}>Log out</button>
      <button onClick={() => setShow(false)}>Cancel</button>
    </div>
  );
};
