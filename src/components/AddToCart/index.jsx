import React, { useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import Button from "../Button";
import "./style.scss";

const AddToCart = ({
  onAddToCart = () => {},
  onQuantityChange = () => {},
  onRemoveFromCart = () => {},
  label = "Sepete Ekle",
  className = "",
  size = "sm",
  variant = "default",
  isSelectedCount = null,
  maxValue = null,
}) => {
  const [quantity, setQuantity] = useState(isSelectedCount || 0);
  const [isAdded, setIsAdded] = useState(isSelectedCount ? true : false);

  const handleAddToCart = () => {
    setQuantity(1);
    setIsAdded(true);
    onAddToCart();
  };

  const handleIncrement = () => {
    if (maxValue && quantity >= maxValue) {
      return;
    }
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      // Show trash icon, don't change quantity yet
      return;
    }
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleRemove = () => {
    setQuantity(0);
    setIsAdded(false);
    onRemoveFromCart();
  };

  if (!isAdded) {
    return (
      <Button
        className={`add-to-cart ${size} add-to-cart--${variant} ${className}`}
        title={label}
        onClick={handleAddToCart}
      />
    );
  }

  return (
    <div
      className={`cart-quantity-control cart-quantity-control--${size} cart-quantity-control--${variant} ${className}`}
    >
      <button
        type="button"
        className="cart-action-btn decrement"
        onClick={quantity === 1 ? handleRemove : handleDecrement}
        title={quantity === 1 ? "Kaldır" : "Azalt"}
      >
        {quantity === 1 ? <Trash2 size={18} /> : <Minus size={18} />}
      </button>

      <span className="quantity-display">{quantity}</span>

      <button
        type="button"
        className="cart-action-btn increment"
        onClick={handleIncrement}
        disabled={maxValue && quantity >= maxValue}
        title="Arttır"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default AddToCart;
