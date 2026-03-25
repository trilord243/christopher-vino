"use client";

import Link from "next/link";
import { useState } from "react";
import { storeConfig } from "@/lib/store-config";
import { categories } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Barra superior */}
      <div className="bg-amber-50 text-center py-1.5 text-sm font-medium text-amber-900 tracking-wide border-b border-amber-100">
        Envío gratis en pedidos mayores a $100 | Entrega local el mismo día
      </div>

      {/* Header principal */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Botón menú móvil */}
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Teléfono (izquierda) */}
        <a href={`tel:${storeConfig.phone}`} className="hidden lg:flex items-center gap-2 text-sm text-gray-600 hover:text-amber-700">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {storeConfig.phone}
        </a>

        {/* Logo (centrado) */}
        <Link href="/" className="flex items-center gap-3 shrink-0 mx-auto lg:mx-0">
          {storeConfig.logo ? (
            <img src={storeConfig.logo} alt={storeConfig.name} className="h-12" />
          ) : (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">
                {storeConfig.name}
              </div>
              <div className="text-xs text-gray-500 leading-tight hidden sm:block tracking-wider uppercase">
                {storeConfig.tagline}
              </div>
            </div>
          )}
        </Link>

        {/* Acciones derecha */}
        <div className="flex items-center gap-4">
          {/* Búsqueda */}
          <form action="/search" className="hidden md:flex">
            <div className="relative">
              <input
                type="text"
                name="q"
                placeholder="Buscar licores, vinos..."
                className="w-64 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 hover:bg-gray-100 rounded-lg text-gray-700"
            aria-label="Carrito"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navegación */}
      <nav className="hidden lg:block border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-0">
            {categories.map((cat) => (
              <li key={cat.slug} className="group relative">
                <Link
                  href={`/category/${cat.slug}`}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors"
                >
                  {cat.name}
                </Link>
                {cat.subcategories && (
                  <div className="absolute top-full left-0 hidden group-hover:block bg-white border border-gray-100 rounded-b-lg shadow-lg min-w-48 z-50">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/category/${cat.slug}?sub=${sub.slug}`}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-amber-700 hover:bg-amber-50/50"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="p-4">
            <form action="/search" className="mb-4">
              <input
                type="text"
                name="q"
                placeholder="Buscar..."
                className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-amber-400"
              />
            </form>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="block py-2.5 text-sm text-gray-700 hover:text-amber-700 border-b border-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
