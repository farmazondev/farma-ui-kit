import { MouseEvent, FC } from "react";
import "./style.scss";

interface ButtonProps {
  className?: string;
  variant?: string;
  title?: string;
  isLoading?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  className = "",
  variant,
  title = "",
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled = false,
  onClick,
  ...props
}) => {
  const isDisabled = disabled || isLoading;
  const buttonClasses = [
    `f-button ${variant || ""}`,
    isDisabled && "disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled && onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={buttonClasses}
      type="button"
      onClick={handleClick}
      {...props}
    >
      <div className="left-icon">{leftIcon && leftIcon}</div>

      <span className="text">{title}</span>

      <div className="right-icon">{rightIcon && rightIcon}</div>

      {isLoading && (
        <span className="ui-button__loader" aria-hidden="true">
          <span className="ui-button__spinner"></span>
        </span>
      )}
    </button>
  );
};

Button.displayName = "Button";

export default Button;
