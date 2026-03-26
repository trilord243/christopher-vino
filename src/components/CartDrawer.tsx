"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { storeConfig } from "@/lib/store-config";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, isOpen, setIsOpen } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            image: i.product.image,
          })),
          origin: window.location.origin,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Error al procesar el pago");
      }
    } catch {
      alert("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)} />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-gray-900">
            Carrito de Compras ({items.length})
          </h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <p className="text-gray-500">Tu carrito está vacío</p>
              <button onClick={() => setIsOpen(false)} className="mt-4 text-amber-700 hover:text-amber-800 font-medium">
                Seguir Comprando
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">{item.product.volume}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    {storeConfig.currencySymbol}{item.product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center bg-white border rounded text-gray-600 hover:bg-gray-100">-</button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center bg-white border rounded text-gray-600 hover:bg-gray-100">+</button>
                    <button onClick={() => removeItem(item.product.id)} className="ml-auto text-red-400 hover:text-red-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>{storeConfig.currencySymbol}{totalPrice.toFixed(2)}</span>
            </div>
            <Link href="/cart" onClick={() => setIsOpen(false)} className="block w-full bg-gray-900 hover:bg-gray-800 text-white text-center py-3 rounded-lg font-medium transition-colors">
              Ver Carrito
            </Link>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="block w-full bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white text-center py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? "Procesando..." : "Pagar"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
