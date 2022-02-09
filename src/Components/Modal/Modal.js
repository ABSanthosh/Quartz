import React from "react";
import PropTypes from "prop-types";
import "./Modal.scss";

function Modal({ children }) {
  return <div className="ModalWrapper">{children}</div>;
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {};

export default Modal;
