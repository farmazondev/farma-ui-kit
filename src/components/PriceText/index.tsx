import React from "react";
import { priceParser } from "./priceParser";
import "./style.scss";

interface PriceTextProps {
  price: string | number;
  toFixDecimal?: number;
  size?: number;
  priceSubSize?: number | null;
  weight?: "light" | "purple" | "bold";
  variant?: string;
  isCrossOut?: boolean;
  className?: string;
}

const PriceText: React.FC<PriceTextProps> = ({
  price,
  toFixDecimal = 2,
  size = 14,
  priceSubSize = null,
  weight = "light",
  variant = "default",
  isCrossOut = false,
  className = "",
}) => {
  // priceSubSize belirtilmezse, size'ın 3/4'ü kadar olsun
  const calculatedSubSize =
    priceSubSize !== null ? priceSubSize : Math.round(size * 0.75);

  return (
    <span
      className={`price-text price-text--${weight} price-text--${variant} ${
        isCrossOut ? "price-text--crossOut" : ""
      } ${className}`}
      style={
        {
          "--price-text-size": `${size}px`,
          "--price-sub-size": `${calculatedSubSize}px`,
        } as React.CSSProperties
      }
    >
      {priceParser(price, toFixDecimal)}
    </span>
  );
};

export default PriceText;
