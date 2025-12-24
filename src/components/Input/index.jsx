import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  applyMask,
  validateInput,
  getErrorMessage,
} from "../../utils/inputValidators";
import "./style.scss";


const Input = React.forwardRef(
  (
    { name, label, icon, placeholder = "", type = "text", onError, showError = false, required = false, ...props },
    ref
  ) => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [touched, setTouched] = useState(false);

    const handleClear = () => {
      setValue("");
      setIsValid(true);
      setErrorMessage("");
      onError?.(false);
      props.onChange?.({ target: { value: "" } });
    };

    const showClearButton = value.length >= 3;

    const handleInputChange = (newValue) => {
      // Apply masking only
      const maskedValue = applyMask(type, newValue);
      setValue(maskedValue);
      props.onChange?.({ target: { value: maskedValue } });
    };

    const validateField = () => {
      // Validate input
      const isInputValid = validateInput(type, value);
      setIsValid(isInputValid);

      if (required && !value) {
        setIsValid(false);
        setErrorMessage("Bu alan gereklidir");
        onError?.(true);
      } else if (!isInputValid && value.length > 0) {
        setErrorMessage(getErrorMessage(type, value));
        onError?.(true);
      } else {
        setErrorMessage("");
        onError?.(false);
      }
    };

    return (
      <div className="f-input-wrapper">
        {label && (
          <label htmlFor={name} className="label">
            {label}
          </label>
        )}
        <div
          className={`f-input-container ${isFocused ? "focused" : ""} ${
            !isValid && touched && (value || required) ? "error" : ""
          }`}
        >
          {icon && <div className="icon">{icon}</div>}
          <input
            ref={ref}
            id={name}
            name={name}
            type="text"
            className="f-input"
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={(e) => {
              setIsFocused(true);
              setTouched(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              setTouched(true);
              props.onBlur?.(e);
              handleInputChange(e.target.value);
              validateField();
            }}
            {...props}
          />
          {showClearButton && (
            <button
              type="button"
              className="reset-icon"
              onClick={handleClear}
              aria-label="Clear"
            >
              <X size={18} />
            </button>
          )}
        </div>
        {!isValid && touched && (value || required) && errorMessage && (
          <span className="error-message">{errorMessage}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default React.memo(Input);
