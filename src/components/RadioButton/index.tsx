import React, { useRef } from "react";
import "./style.scss";

interface RadioButtonProps {
  label?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "blue" | "orange";
  className?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
