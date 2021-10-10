import React from "react";
import { Modal } from "semantic-ui-react";

export const ModalBasic = (props) => {
  const { show, setShow, title, children } = props;

  const onClose = () => {
    setShow(false);
  };

  return (
    <Modal size="mini" open={show} onClose={onClose} className="ModalBasic">
      {title && <h2>{title}</h2>}
      {children}
    </Modal>
  );
};
