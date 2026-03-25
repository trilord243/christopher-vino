"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="mt-6 flex gap-3">
      <div className="flex items-center border rounded-lg">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-3 py-3 text-gray-600 hover:bg-gray-100 rounded-l-lg"
        >
          -
        </button>
        <span className="px-4 py-3 text-sm font-medium min-w-[3rem] text-center">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-3 py-3 text-gray-600 hover:bg-gray-100 rounded-r-lg"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        disabled={!product.inStock}
        className="flex-1 bg-amber-700 hover:bg-amber-800 disabled:bg-gray-300 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        Agregar al Carrito
      </button>
    </div>
  );
}
