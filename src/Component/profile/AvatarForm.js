import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from "./../../gql/user";
import { fileUpload } from "../../helpers/fileUpload";
import { StateContext } from "./../../hooks/useAuth";
import { SpinnerCircular } from "spinners-react";
import { toast } from "react-toastify";

export const AvatarForm = ({ setShow }) => {
  const auths = StateContext();
  const { setImage, auth } = auths;
  const [loading, setLoading] = useState(false);

  //Update Cache Apollo
  const [UpdateAvatar] = useMutation(UPDATE_AVATAR, {
    update(cache, { data: { updateAvatar } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: {
          userName: auth.userName,
        },
      });

      cache.writeQuery({
        query: GET_USER,
        variables: {
          userName: auth.userName,
        },
        data: {
          getUser: { ...getUser, avatar: updateAvatar.urlAvatar },
        },
      });
    },
  });

  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    update(cache, {data: {deleteAvatar}}){
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: {
          userName: auth.userName,
        },
      });
      cache.writeQuery({
        query: GET_USER,
        variables: {
          userName: auth.userName,
        },
        data: {
          getUser: { ...getUser, avatar: "" },
        },
      });
    }
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    try {
      setLoading(true);
      const respCloudinary = await fileUpload(file);
      setImage(respCloudinary);

      const { data } = await UpdateAvatar({
        variables: {
          file: {
            status: true,
            urlAvatar: respCloudinary,
          },
        },
      });
      if (data.updateAvatar) {
        setLoading(false);
        setShow(false);
        toast.success("Avatar changed successfully ", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setLoading(false);
        setShow(false);
        toast.warning("Avatar changed Error ", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const handleDelete = async () => {
    try {
      const { data } = await deleteAvatar();
      setShow(false);

      if (!data.deleteAvatar) {
        toast.warning("Avatar delete Error ", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="avatarForm ">
      {loading ? (
        <button {...getRootProps()}>
          <SpinnerCircular size="15" color="#1895F6" />
        </button>
      ) : (
        <button {...getRootProps()}>Add picture</button>
      )}

      <button onClick={handleDelete}>Delete picture</button>
      <button onClick={() => setShow(false)}>Cancel</button>

      <input {...getInputProps()} />
    </div>
  );
};
