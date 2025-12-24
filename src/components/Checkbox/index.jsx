import React, { useRef, useState } from "react";
import { Check } from "lucide-react";
import "./style.scss";

const Checkbox = ({
  label = "",
  checked = false,
  disabled = false,
  name = "",
  required = false,
  validateMessage = null,
  isLabelNotClickable = false,
  onChange = undefined,
  variant = "default",
  className = "",
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const refId = useRef(`checkbox-${Math.random().toString(36).substr(2, 9)}`);

  const handleChange = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`checkbox ${disabled ? "disabled" : ""} ${variant} ${className}`}>
      <label htmlFor={refId.current}>
        <input
          id={refId.current}
          data-validate-message={validateMessage}
          type="checkbox"
          checked={isChecked}
          name={name}
          onChange={handleChange}
          required={required}
          disabled={disabled}
        />
        <div className={`custom-icon ${isChecked ? "checked" : "unchecked"}`}>
          {isChecked && <Check size={16} className="icon-check" />}
        </div>
        {label && !isLabelNotClickable && <div className="text">{label}</div>}
      </label>
      {label && isLabelNotClickable && <div className="text">{label}</div>}
    </div>
  );
};

export default Checkbox;
