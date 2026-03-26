"use client";

import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Pago Cancelado</h1>
      <p className="text-gray-600 mb-8">
        Tu pago ha sido cancelado. No se realizó ningún cargo. Tus productos siguen en el carrito.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/cart"
          className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Volver al Carrito
        </Link>
        <Link
          href="/"
          className="inline-block border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Seguir Comprando
        </Link>
      </div>
    </div>
  );
}
