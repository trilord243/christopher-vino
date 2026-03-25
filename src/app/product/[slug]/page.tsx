import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductBySlug, getCategoryBySlug } from "@/lib/data";
import { storeConfig } from "@/lib/store-config";
import AddToCartButton from "./AddToCartButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} - ${product.volume}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${storeConfig.name}`,
      description: product.description,
      images: [product.image],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-amber-700">Inicio</Link>
        <span className="mx-2">/</span>
        {category && (
          <>
            <Link href={`/category/${category.slug}`} className="hover:text-amber-600">
              {category.name}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span
                className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-bold text-white ${
                  product.badge === "Sale"
                    ? "bg-red-500"
                    : product.badge === "Luxury"
                    ? "bg-purple-600"
                    : product.badge === "Premium"
                    ? "bg-amber-600"
                    : "bg-gray-900"
                }`}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${star <= Math.round(product.rating!) ? "text-amber-500" : "text-gray-200"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.rating} / 5</span>
              </div>
            )}

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {storeConfig.currencySymbol}{product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {storeConfig.currencySymbol}{product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Details table */}
            <div className="mt-6 border rounded-xl divide-y">
              {product.volume && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-500">Volumen</span>
                  <span className="font-medium text-gray-900">{product.volume}</span>
                </div>
              )}
              {product.abv && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-500">ABV</span>
                  <span className="font-medium text-gray-900">{product.abv}</span>
                </div>
              )}
              {product.region && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-500">Región</span>
                  <span className="font-medium text-gray-900">{product.region}</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-500">Disponibilidad</span>
                <span className={`font-medium ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                  {product.inStock ? "En Stock" : "Agotado"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="font-semibold text-gray-900 mb-2">Descripción</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Add to cart */}
            <AddToCartButton product={product} />

            {/* Shipping info */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
                </svg>
                Envío gratis +$100
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Empaque seguro
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.image,
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: storeConfig.currency,
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
            ...(product.rating && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                bestRating: 5,
                reviewCount: Math.floor(product.rating * 20),
              },
            }),
          }),
        }}
      />
    </>
  );
}
