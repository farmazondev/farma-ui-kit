import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import "./style.scss";

const Select = ({
  label = "",
  placeholder = "Select",
  options = [],
  value = "",
  onChange = () => {},
  required = false,
  hint = "",
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const selectBtnRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue) => {
    if (disabled) return;
    onChange(optionValue);
    setIsOpen(false);
  };

  // Get selected option label
  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={`select-wrapper ${className}`} ref={wrapperRef}>
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}

      <div className="select-container">
        <button
          ref={selectBtnRef}
          type="button"
          className={`select-button ${isOpen ? "open" : ""} ${
            disabled ? "disabled" : ""
          } ${value ? "has-value" : ""}`}
          onClick={handleSelectClick}
          disabled={disabled}
        >
          <span className="select-text">{displayLabel}</span>
          <span className="select-icon">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </span>
        </button>

        {isOpen && !disabled && (
          <div className="select-dropdown">
            <ul className="select-menu">
              {options.map((option) => (
                <li
                  key={option.value}
                  className={`item ${value === option.value ? "active" : ""}`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  <span className="option-label">{option.label}</span>
                  {value === option.value && (
                    <span className="option-check">
                      <Check size={18} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {hint && <div className="select-hint">{hint}</div>}
    </div>
  );
};

export default Select;
