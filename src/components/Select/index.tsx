import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  MouseEvent as ScrollEvent,
} from "react";
import { ChevronDown, ChevronUp, Check, CircleX } from "lucide-react";
import "./style.scss";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
  value?: string | Array<any>;
  onChange?: (value: string | Array<any>) => void;
  required?: boolean;
  hint?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label = "",
  placeholder = "Select",
  options = [],
  value = "",
  onChange = () => {},
  required = false,
  hint = "",
  disabled = false,
  className = "",
  multiple = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
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

  const handleOptionClick = (optionValue: string) => {
    if (disabled) return;
    if (multiple && Array.isArray(value)) {
      if (!value.includes(optionValue)) {
        onChange([...value, optionValue]);
      } else {
        onChange(value.filter((val) => val !== optionValue));
      }
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const getActiveCByValueType = (optionValue: string) => {
    if (multiple && Array.isArray(value) && value.includes(optionValue)) {
      return true;
    }
    if (!multiple && !Array.isArray(value) && value === optionValue) {
      return true;
    }
    return false;
  };

  const displayLabel = useMemo(() => {
    if (multiple && Array.isArray(value) && value.length > 0) {
      return options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label);
    } else if (!multiple && !Array.isArray(value) && value) {
      return value;
    }
    return placeholder;
  }, [value, placeholder]);

  const onScroll = (e: ScrollEvent<HTMLDivElement>) => {
    const { scrollWidth, scrollLeft, clientWidth, classList } = e.currentTarget;
    if (scrollWidth - scrollLeft === clientWidth) {
      classList.add("scroll-ended");
    } else {
      classList.remove("scroll-ended");
    }
  };

  const removeSelectedItem = (label: string) => {
    return;
  };

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
          } ${value ? "has-value" : ""} ${
            Array.isArray(displayLabel) ? "multiple" : ""
          }`}
          onClick={handleSelectClick}
          disabled={disabled}
        >
          <div className="selected-value-area" onScroll={onScroll}>
            {Array.isArray(displayLabel) ? (
              displayLabel.map((label, index) => (
                <span key={index} className="multiple-item">
                  {label}
                  <CircleX
                    width={12}
                    height={12}
                    onClick={() => removeSelectedItem(label)}
                  />
                </span>
              ))
            ) : (
              <span className="select-text">{displayLabel}</span>
            )}
          </div>

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
                  className={`item ${
                    getActiveCByValueType(option.value) ? "active" : ""
                  }`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  <span className="option-label">{option.label}</span>
                  {getActiveCByValueType(option.value) && (
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
