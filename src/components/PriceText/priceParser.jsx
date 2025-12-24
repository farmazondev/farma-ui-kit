const parseFloatIfNumber = (value) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  }
  return null;
};

export const priceParser = (price, toFixDecimal = 2) => {
  const localPrice = parseFloatIfNumber(price);
  if (typeof localPrice !== 'number') return null;
  const priceWithDecimals = localPrice.toFixed(toFixDecimal);
  const priceArr = priceWithDecimals.split('.');
  return (
    <>
      {priceArr[0]},<span className="price-sub">{priceArr[1]} TL</span>
    </>
  );
};
