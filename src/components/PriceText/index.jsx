import React from 'react';
import { priceParser } from './priceParser.jsx';
import './style.scss';

const PriceText = ({ 
  price, 
  toFixDecimal = 2,
  size = 14,
  priceSubSize = null,
  weight = 'light', //light, purple
  variant = 'default',
  isCrossOut = false,
  className = '' 
}) => {
  // priceSubSize belirtilmezse, size'ın 3/4'ü kadar olsun
  const calculatedSubSize = priceSubSize !== null ? priceSubSize : Math.round(size * 0.75);
    
  return (
    <span 
      className={`price-text price-text--${weight} price-text--${variant} ${isCrossOut ? 'price-text--crossOut' : ''} ${className}`}
      style={{
        '--price-text-size': `${size}px`,
        '--price-sub-size': `${calculatedSubSize}px`,
      }}
    >
      {priceParser(price, toFixDecimal)}
    </span>
  );
};

export default PriceText;
