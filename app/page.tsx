"use client";
import React, { useState } from "react";
import ProductCard from "@/components/productCard/page";
import Image from "next/image"; // Importing Next.js Image component

interface Product {
  name: string;
  price: string;
  type: string;
  image: string;
}

const products: Product[] = [
  { name: "Mango Smoothie", price: "149", type: "yellow", image: "/mango.jpg" },
  { name: "Green Detox", price: "199", type: "green", image: "/green.jpg" },
  { name: "Berry Blast", price: "179", type: "red", image: "/berry.jpg" },
  {
    name: "Tropical Punch",
    price: "159",
    type: "yellow",
    image: "/tropical.jpg",
  },
  { name: "Orange Zing", price: "129", type: "orange", image: "/orange.jpg" },
  { name: "Apple Breeze", price: "169", type: "green", image: "/apple.jpg" },
  {
    name: "Pineapple Paradise",
    price: "139",
    type: "yellow",
    image: "/pineapple.jpg",
  },
  { name: "Grape Gush", price: "189", type: "purple", image: "/grape.jpg" },
  {
    name: "Watermelon Wave",
    price: "149",
    type: "red",
    image: "/watermelon.jpg",
  },
  { name: "Kiwi Kick", price: "179", type: "green", image: "/kiwi.jpg" },
];

const Home: React.FC = () => {
  const [cart, setCart] = useState<Map<string, number>>(new Map());
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBillScreenVisible, setBillScreenVisible] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      newCart.set(product.name, (newCart.get(product.name) || 0) + 1);
      return newCart;
    });
  };

  const removeFromCart = (product: Product) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      const currentQuantity = newCart.get(product.name) || 0;
      if (currentQuantity > 1) {
        newCart.set(product.name, currentQuantity - 1);
      } else {
        newCart.delete(product.name);
      }
      return newCart;
    });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach((quantity, productName) => {
      const product = products.find((p) => p.name === productName);
      if (product) total += parseInt(product.price) * quantity;
    });
    return total;
  };

  const totalItems = Array.from(cart.values()).reduce(
    (acc, quantity) => acc + quantity,
    0
  );
  const totalPrice = calculateTotalPrice();

  const handlePay = () => {
    setModalOpen(false);
    setBillScreenVisible(true);
  };

  const handleOrderAgain = () => {
    setBillScreenVisible(false);
    setCart(new Map());
  };

  const currentDateTime = new Date().toLocaleString();
  const billNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-2 mb-12">
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
          />
        ))}
      </div>

      {totalItems > 0 && !isBillScreenVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex justify-between items-center">
          <p className="text-lg font-semibold text-cyan-900">
            {totalItems} items added
          </p>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            onClick={() => setModalOpen(true)}
          >
            Check out
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Order Summary
            </h2>
            <p className="text-lg mb-4 text-gray-800 text-center">
              Total Price: <span className="text-green-600">₹{totalPrice}</span>
            </p>
            <a
              href="#"
              className="text-blue-500 underline mb-4 block text-center"
              onClick={() => setModalOpen(false)}
            >
              Edit Cart
            </a>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-full"
              onClick={handlePay}
            >
              Pay
            </button>
          </div>
        </div>
      )}

      {isBillScreenVisible && (
        <div className="fixed inset-0 bg-white flex justify-center items-center p-4">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center w-11/12 sm:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your order has been placed successfully!
            </h2>
            <p className="text-lg text-gray-700">
              Thank you for ordering from ShopQR.
            </p>
            <p className="text-lg text-gray-700 mt-2">
              Bill No: <strong>{billNumber}</strong>
            </p>
            <p className="text-lg text-gray-700 mt-2">
              Total Amount:{" "}
              <strong className="text-green-600">₹{totalPrice}</strong>
            </p>
            <p className="text-lg text-gray-700 mt-2">
              Date & Time: <strong>{currentDateTime}</strong>
            </p>
            {/* Using Next.js Image component for QR Code */}
            <Image
              src="/mp.png" // Replace with your QR code path
              alt="QR Code"
              width={150}
              height={150}
              className="mt-4 mx-auto"
            />
            <a
              href="#"
              className="text-blue-500 underline mt-6 block"
              onClick={handleOrderAgain}
            >
              Order Again
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
