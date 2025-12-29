import React, { useRef } from "react";
import "./style.scss";

const formatBoldText = (text: string): React.ReactNode => {
  //rakam görünce otomatik bold yapıyor
  return text
    .split(/(\d+\s?TL)/)
    .map((part, index) =>
      /\d+\s?TL/.test(part) ? <strong key={index}>{part}</strong> : part
    );
};

interface RadioProps {
  disabled?: boolean;
  className?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  name?: string;
  value?: string;
  label?: string | React.ReactNode;
  subLabel?: string | React.ReactNode | null;
  showChangeButton?: boolean;
  changeButtonOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLabelBoldPrice?: boolean;
}

const Radio: React.FC<RadioProps> = ({
  disabled = false,
  className = null,
  onChange = () => {},
  checked = false,
  name = "",
  value = "",
  label = "",
  subLabel = null,
  showChangeButton = false,
  changeButtonOnClick = () => {},
  isLabelBoldPrice = false,
}) => {
  const refId = useRef(`radio-${Math.random().toString(36).substr(2, 9)}`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange(e);
  };

  return (
    <label
      htmlFor={refId.current}
      className={`radio ${disabled ? "disabled" : ""} ${className || ""}`}
      onClick={(e) => {
        if (disabled) e.preventDefault();
      }}
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

      <div className={`circle-icon ${checked ? "selected" : "unselected"}`} />

      {label && (
        <div className="text">
          <div className="label">
            {typeof label === "string" ? (
              <span>{isLabelBoldPrice ? formatBoldText(label) : label}</span>
            ) : (
              label
            )}
            {showChangeButton && (
              <div className="separator-wrapper">
                <button
                  type="button"
                  className="separator-action"
                  onClick={(e) => {
                    e.stopPropagation();
                    changeButtonOnClick(e);
                  }}
                >
                  Değiştir
                </button>
              </div>
            )}
          </div>

          {subLabel && <div className="sub-label">{subLabel}</div>}
        </div>
      )}
    </label>
  );
};

export { formatBoldText };
export default Radio;
