import React from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
export default (props) => {
  return (
    <Modal open={props.open} onClose={props.close} center>
      {props.children}
    </Modal>
  );
};
