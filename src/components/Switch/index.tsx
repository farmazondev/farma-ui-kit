import React, { useState } from "react";
import "./style.scss";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "small" | "large";
  label?: string;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange = () => {},
  disabled = false,
  size = "small",
  label = "",
  className = "",
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newState = !isChecked;
    setIsChecked(newState);
    onChange(newState);
  };

  return (
    <div className={`switch-wrapper ${className}`}>
      {label && <label className="switch-label">{label}</label>}
      <button
        type="button"
        className={`switch ${size} ${isChecked ? "active" : ""} ${
          disabled ? "disabled" : ""
        }`}
        onClick={handleToggle}
        disabled={disabled}
        role="switch"
        aria-checked={isChecked}
      >
        <span className="switch-thumb" />
      </button>
    </div>
  );
};

export default Switch;
