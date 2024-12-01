import React from "react";
import ProductCard from "@/components/productCard/page"; // Ensure correct path

// Define the Product type (same as in ProductCard.tsx)
interface Product {
  name: string;
  price: string;
  type: string;
  image: string;
}

// Define the array of products
const products: Product[] = [
  {
    name: "Mango Smoothie",
    price: "149",
    type: "yellow", // tropical juice
    image: "/mango.jpg",
  },
  {
    name: "Green Detox",
    price: "199",
    type: "green", // healthy green juice
    image: "/green.jpg",
  },
  {
    name: "Berry Blast",
    price: "179",
    type: "red", // berry-based juice
    image: "/berry.jpg",
  },
  {
    name: "Tropical Punch",
    price: "159",
    type: "yellow", // tropical juice
    image: "/tropical.jpg",
  },
  {
    name: "Orange Zing",
    price: "129",
    type: "orange", // citrus juice
    image: "/orange.jpg",
  },
  {
    name: "Apple Breeze",
    price: "169",
    type: "green", // apple-based juice
    image: "/apple.jpg",
  },
  {
    name: "Pineapple Paradise",
    price: "139",
    type: "yellow", // tropical juice
    image: "/pineapple.jpg",
  },
  {
    name: "Grape Gush",
    price: "189",
    type: "purple", // grape-based juice
    image: "/grape.jpg",
  },
  {
    name: "Watermelon Wave",
    price: "149",
    type: "red", // watermelon juice
    image: "/watermelon.jpg",
  },
  {
    name: "Kiwi Kick",
    price: "179",
    type: "green", // kiwi-based juice
    image: "/kiwi.jpg",
  },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-2">
      {/* Map over the products array and render a ProductCard for each one */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
