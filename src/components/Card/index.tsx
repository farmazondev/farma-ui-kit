import React, { ReactNode } from "react";
import "./style.scss";

interface CardRowProps {
  children: ReactNode;
  desktopCol?: number;
  mobileCol?: number;
  gap?: number;
  variant?: "category";
  noShadow?: boolean;
  radius10?: boolean;
  noBorder?: boolean;
}

interface CardItemProps {
  children: ReactNode;
  display?: "flex" | "grid" | "block" | "inline-flex";
  flexDirection?: "row" | "column";
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch";
  gap?: number;
}

interface CardItemSubComponents {
  Wrapper: React.FC<{ children: ReactNode }>;
  Left: React.FC<{ children: ReactNode }>;
  Center: React.FC<{ children: ReactNode }>;
  Right: React.FC<{ children: ReactNode }>;
  Bottom: React.FC<{ children: ReactNode }>;
}

// CardItem sub-components
const CardItemLeft: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="card-item-left">{children}</div>;
};

const CardItemCenter: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="card-item-center">{children}</div>;
};

const CardItemRight: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="card-item-right">{children}</div>;
};

const CardItemWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="card-item-wrapper">{children}</div>;
};

const CardItemBottom: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="card-item-bottom">{children}</div>;
};

// Main CardItem component
const CardItem: React.FC<CardItemProps> & CardItemSubComponents = ({
  children,
  display,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
}) => {
  const style: React.CSSProperties = {};

  if (display) style.display = display;
  if (display === "flex" || display === "inline-flex") {
    if (flexDirection) style.flexDirection = flexDirection;
    if (justifyContent) style.justifyContent = justifyContent;
    if (alignItems) style.alignItems = alignItems;
  }
  if (gap !== undefined) style.gap = `${gap}px`;

  return (
    <div className="card-item" style={style}>
      {children}
    </div>
  );
};

CardItem.Wrapper = CardItemWrapper;
CardItem.Left = CardItemLeft;
CardItem.Center = CardItemCenter;
CardItem.Right = CardItemRight;
CardItem.Bottom = CardItemBottom;

// CardRow component
const CardRow: React.FC<CardRowProps> = ({
  children,
  desktopCol = 5,
  mobileCol = 1,
  gap = 20,
  variant = null,
  noShadow = false,
  radius10 = false,
  noBorder = false,
}) => {
  return (
    <div
      className={`card-row ${variant} ${noShadow ? "no-shadow" : ""} ${
        desktopCol === 1 ? "list-view" : ""
      } ${radius10 ? "radius-10" : ""} ${noBorder ? "no-border" : ""}`}
      style={
        {
          gridTemplateColumns: `repeat(${desktopCol}, 1fr)`,
          gap: `${gap}px`,
          "--mobile-columns": mobileCol,
        } as React.CSSProperties & { "--mobile-columns": number }
      }
    >
      {children}
    </div>
  );
};

export { CardItem, CardRow };
export default CardRow;
