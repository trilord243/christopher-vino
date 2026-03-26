"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { storeConfig } from "@/lib/store-config";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
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

  return (
    <>
      <nav className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-amber-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Carrito de Compras</span>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-20 h-20 mx-auto text-gray-200 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-6">Parece que aún no has agregado ningún producto.</p>
            <Link
              href="/"
              className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Empezar a Comprar
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 border rounded-xl">
                  <Link href={`/product/${item.product.slug}`} className="shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.product.slug}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-amber-700">{item.product.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{item.product.volume}</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {storeConfig.currencySymbol}{item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border rounded-lg">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100">-</button>
                        <span className="px-3 py-1.5 text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100">+</button>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} className="text-sm text-red-500 hover:text-red-700">
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {storeConfig.currencySymbol}{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <button onClick={clearCart} className="text-sm text-gray-500 hover:text-red-500 transition-colors">
                Vaciar Carrito
              </button>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-32">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen del Pedido</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">{storeConfig.currencySymbol}{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Envío</span>
                    <span className="font-medium text-green-600">
                      {totalPrice >= 100 ? "Gratis" : `${storeConfig.currencySymbol}9.99`}
                    </span>
                  </div>
                  {totalPrice < 100 && (
                    <p className="text-xs text-amber-700">
                      Agrega {storeConfig.currencySymbol}{(100 - totalPrice).toFixed(2)} más para envío gratis.
                    </p>
                  )}
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      {storeConfig.currencySymbol}
                      {(totalPrice + (totalPrice >= 100 ? 0 : 9.99)).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full mt-6 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  {loading ? "Procesando..." : "Proceder al Pago"}
                </button>
                <Link href="/" className="block text-center mt-3 text-sm text-gray-500 hover:text-amber-700">
                  Seguir Comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
