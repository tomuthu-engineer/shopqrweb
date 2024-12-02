"use client";

import React, { useState } from "react";
import Image from "next/image";

// Define the Product type
interface Product {
  name: string;
  price: string;
  type: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const [quantity, setQuantity] = useState(0);

  const handleBuy = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart(product);
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onRemoveFromCart(product);
    }
  };

  return (
    <div className="p-4 w-full bg-white shadow-lg hover:shadow-xl rounded-lg transition-shadow duration-300 ease-in-out flex items-center gap-4">
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 640px) 100vw, 200px"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-xl font-bold text-gray-800">₹{product.price}</p>
      </div>

      <div className="flex items-center">
        {quantity === 0 ? (
          <button
            onClick={handleBuy}
            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            Buy
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRemoveFromCart}
              className="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-400 transition-colors duration-300"
            >
              -
            </button>
            <span className="text-base font-bold text-gray-800">
              {quantity}
            </span>
            <button
              onClick={handleBuy}
              className="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-400 transition-colors duration-300"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
