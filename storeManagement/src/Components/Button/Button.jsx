import React from "react";
import PropTypes from "prop-types";
import ButtonStyles from "./button.module.scss";

const Button = ({
  children,
  className = "",
  type = "button",
  onclickFunction,
}) => {
  return (
    <button
      type={type}
      className={`${ButtonStyles.button} ${className}`}
      onClick={onclickFunction}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  onclickFunction: PropTypes.func,
};

export default Button;
