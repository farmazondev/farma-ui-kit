import React from "react";
import "./style.scss";

type FontSize =
  | "sm"
  | "regular"
  | "lg"
  | "xl"
  | "xxl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";
type FontWeight = "regular" | "medium" | "bold" | "extraBold";
type TextType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

const fontSizes: Record<FontSize, string> = {
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

const fontWeights: Record<FontWeight, string> = {
  regular: "400",
  medium: "600",
  bold: "700",
  extraBold: "800",
};

interface TextProps {
  type?: TextType;
  children: React.ReactNode;
  size?: FontSize;
  weight?: FontWeight;
  color?: string;
  className?: string;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    { type = "p", children, size, weight, color, className = "", ...props },
    ref
  ) => {
    const Component = ["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(type)
      ? type
      : "span";

    return (
      <Component
        ref={ref as any}
        className={["f-text", className].filter(Boolean).join(" ")}
        style={{
          ...(size && fontSizes[size] && { fontSize: fontSizes[size] }),
          ...(weight &&
            fontWeights[weight] && { fontWeight: fontWeights[weight] }),
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
