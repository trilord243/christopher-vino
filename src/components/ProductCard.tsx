"use client";

import Link from "next/link";
import { Product } from "@/lib/types";
import { storeConfig } from "@/lib/store-config";
import { useCart } from "@/lib/cart-context";

const badgeLabels: Record<string, string> = {
  "Best Seller": "Más Vendido",
  "Popular": "Popular",
  "Premium": "Premium",
  "Top Rated": "Mejor Valorado",
  "Luxury": "Lujo",
  "Sale": "Oferta",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white ${
              product.badge === "Sale"
                ? "bg-red-500"
                : product.badge === "Luxury"
                ? "bg-purple-600"
                : product.badge === "Premium"
                ? "bg-amber-700"
                : "bg-gray-900"
            }`}
          >
            {badgeLabels[product.badge] || product.badge}
          </span>
        )}
        {product.rating && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mt-1">{product.volume}{product.abv ? ` | ${product.abv}` : ""}</p>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {storeConfig.currencySymbol}{product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                {storeConfig.currencySymbol}{product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            className="bg-amber-700 hover:bg-amber-800 text-white p-2 rounded-lg transition-colors"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
