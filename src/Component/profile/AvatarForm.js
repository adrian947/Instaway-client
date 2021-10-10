import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { UPDATE_AVATAR } from "./../../gql/user";
import { fileUpload } from "../../helpers/fileUpload";
import { StateContext } from "./../../hooks/useAuth";
import { SpinnerCircular } from 'spinners-react';


export const AvatarForm = ({ setShow }) => {
  const [UpdateAvatar] = useMutation(UPDATE_AVATAR);

  const [loading, setLoading] = useState(false);

  const auth = StateContext();
  const { setImage } = auth;

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log("file", file);

    try {
      setLoading(true);
      const respCloudinary = await fileUpload(file);
      console.log("cloudy", respCloudinary);
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

  return (
    <div className="avatarForm ">
      {loading ? (
        <button {...getRootProps()}><SpinnerCircular size={50} thickness={100} speed={100} color="rgba(57, 86, 172, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" /></button>
      ) : (
        <button {...getRootProps()}>Add picture</button>
      )}

      <button>Delete picture</button>
      <button onClick={() => setShow(false)}>Cancel</button>

      <input {...getInputProps()} />
    </div>
  );
};
