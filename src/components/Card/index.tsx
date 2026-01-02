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

interface CardProps {
  children: ReactNode;
}

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

const CardItem: React.FC<CardProps> = ({ children }) => {
  return <div className="card-item">{children}</div>;
};

export { CardItem, CardRow };
export default CardRow;
