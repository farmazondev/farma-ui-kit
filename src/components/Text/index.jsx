import React from "react";
import "./style.scss";

const fontSizes = {
  sm: "12px",
  regular: "14px",
  lg: "16px",
  xl: "18px",
  xxl: "20px",
  "2xl": "24px",
  "3xl": "26px",
  "4xl": "28px",
  "5xl": "30px",
};

const fontWeights = {
  regular: "400",
  medium: "600",
  bold: "700",
  extraBold: "800",
};

const Text = React.forwardRef(
  ({ type = "p", children, size, weight, color, className = "", ...props }, ref) => {
    const Component = ["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(type) ? type : "span";

    return (
      <Component
        ref={ref}
        className={["f-text", className].filter(Boolean).join(" ")}
        style={{
          ...(fontSizes[size] && { fontSize: fontSizes[size] }),
          ...(fontWeights[weight] && { fontWeight: fontWeights[weight] }),
          ...(color && { color: `var(--button-${color.toLowerCase()})` }),
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";
export default React.memo(Text);
