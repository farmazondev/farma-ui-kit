import React, { useRef } from "react";
import "./style.scss";

const RadioButton = ({
  label = "",
  value = "",
  checked = false,
  disabled = false,
  name = "",
  onChange = () => {},
  variant = "blue",
  className = "",
}) => {
  const refId = useRef(`radio-btn-${Math.random().toString(36).substr(2, 9)}`);

  const handleChange = (e) => {
    if (disabled) return;
    onChange(e);
  };

  return (
    <label
      htmlFor={refId.current}
      className={`radio-button ${variant} ${checked ? "active" : ""} ${
        disabled ? "disabled" : ""
      } ${className}`}
    >
      <input
        id={refId.current}
        type="radio"
        checked={checked}
        name={name}
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className="button-label">{label}</span>
    </label>
  );
};

export default RadioButton;
