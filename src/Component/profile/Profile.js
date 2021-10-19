import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../gql/user";
import imageNotFound from "../../assets/png/avatar.png";
import { UserNotFound } from "../user/UserNotFound";
import { ModalBasic } from "../modal/modalBasic/ModalBasic";
import { AvatarForm } from "./AvatarForm";

import { StateContext } from "./../../hooks/useAuth";
import { HeaderProfile } from "./HeaderProfile";
import { SettingForm } from "./SettingForm";
import { Followers } from './Followers';

export const Profile = ({ userName, dataLength }) => {
  //user logued data
  const { auth, urlImage } = StateContext();

  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: {
      userName: userName,
    },
  });  

  //handle modal

  const [show, setShow] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);

  // wait loading in false for return data
  if (loading) return null;
  // if error is that user not find
  if (error) {
    return <UserNotFound />;
  }
  //find data
  const { getUser } = data;

  const openModal = (type) => {
    switch (type) {
      case "avatar":
        setChildrenModal(<AvatarForm setShow={setShow} />);
        setTitleModal("Change Avatar");
        setShow(true);
        break;
      case "setting":
        setChildrenModal(
          <SettingForm
            setShow={setShow}
            setTitleModal={setTitleModal}
            setChildrenModal={setChildrenModal}
            refetch={refetch}
            getUser={getUser}
          />
        );
        setTitleModal("Setting");
        setShow(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <main className="main contenedor">
        <div className="main__grid">
          <div className="main__column">
            <img
              src={getUser.avatar ? getUser.avatar || urlImage : imageNotFound}
              alt="imageNotFound"
              className="main__image"
              onClick={() => userName === auth.userName && openModal("avatar")}
            />
          </div>
          <div className="main__flex">
            <div>
              <HeaderProfile
                userName={userName}
                auth={auth}
                getUser={getUser}
                openModal={openModal}
              />
            </div>
            <div><Followers userName={userName} dataLength={dataLength}/></div>
            <div className="main__others">
              <p className="main__name">{getUser.name}</p>
              {getUser.siteWeb && (
                <a
                  href={getUser.siteWeb}
                  className="main__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {getUser.siteWeb}
                </a>
              )}
              {getUser.description && (
                <p className="main__description">{getUser.description}</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <ModalBasic show={show} setShow={setShow} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
};
