"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Pago Exitoso</h1>
      <p className="text-gray-600 mb-2">
        Tu pedido ha sido procesado correctamente.
      </p>
      <p className="text-gray-500 mb-8">
        Recibirás un correo de confirmación con los detalles de tu compra.
      </p>
      <Link
        href="/"
        className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        Volver a la Tienda
      </Link>
    </div>
  );
}
