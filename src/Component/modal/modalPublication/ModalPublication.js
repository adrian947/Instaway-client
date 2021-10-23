import React from "react";
import { Modal } from "semantic-ui-react";
import { Actions } from "./Actions";
import { CommentForm } from "./CommentForm";
import { Comments } from "./Comments";

export const ModalPublication = ({ state, setstate, publi }) => {
  const handleCloseModal = () => {
    setstate(false);
  };
  
  return (
    <div>
      <Modal
        open={state}
        onClose={handleCloseModal}
        className="modal_publication"
      >
        <div className="modal__grid">
          <div
            className="modal__image"
            style={{ backgroundImage: `url("${publi.file}")` }}
          ></div>
          <div className="modal_comments">
            <Comments publi={publi} />
            <Actions publi={publi} />
            <div>
              <CommentForm publi={publi} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
