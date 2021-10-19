import React, { useCallback, useMemo, useState } from "react";
import { Modal, Icon, Dimmer, Loader } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { PUBLISH } from "./../../../gql/publication";
import { fileUpload as fileforCloudi } from "./../../../helpers/fileUpload";
import { toast } from "react-toastify";

export const ModalUpload = ({ show, setShow }) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [isloading, setIsloading] = useState(false);

  const [publish] = useMutation(PUBLISH);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFileUpload({
      type: "image",
      file: file,
      preview: URL.createObjectURL(file),
    });
  });

  const { getRootProps, getInputProps, isDragActive, isDragAccept } =
    useDropzone({
      accept: "image/jpeg, image/png",
      noKeyboard: true,
      multiple: false,
      onDrop,
    });

  const activeStyle = {
    borderColor: "#000",
  };

  const acceptStyle = {
    borderColor: "#262626",
  };

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDragActive, isDragAccept]
  );

  const handleClose = () => {
    setIsloading(false);
    setFileUpload(null);
    setShow(false);
    // window.location.reload(); recarga la pagina
  };

  const handleUploadImage = async () => {
    try {
      setIsloading(true);
      const cloudiURL = await fileforCloudi(fileUpload.file);

      const resp = await publish({
        variables: {
          file: cloudiURL,
        },
      });

      if (!resp.data.publish.status) {
        toast.warning("the picture could not be uploaded");
        isloading(false);
      } else {
        handleClose();
      }
    } catch (error) {
      console.log("erro", error);
    }
  };

  return (
    <Modal
      size="small"
      open={show}
      onClose={handleClose}
      className="modal__upload"
    >
      <div
        {...getRootProps({ style })}
        className="dropzone"
        style={fileUpload && { border: 0 }}
      >
        {!fileUpload && (
          <>
            <Icon name="cloud upload" />
            <p>Push your picture or video that want publish</p>
          </>
        )}
        <input {...getInputProps()} />
      </div>

      {fileUpload?.type === "image" && (
        <div
          style={{ backgroundImage: `url("${fileUpload.preview}")` }}
          className="image"
        ></div>
      )}

      {fileUpload && (
        <button className="btn__upload" onClick={handleUploadImage}>
          Upload
        </button>
      )}

      {isloading && (
        <Dimmer active className="publishing">
          <Loader />
          <p>Publishing...</p>
        </Dimmer>
      )}
    </Modal>
  );
};
