import { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getProductsByCategory, getCategoryBySlug } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { storeConfig } from "@/lib/store-config";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} - Comprar ${category.name} en Línea`,
    description: category.description,
    openGraph: {
      title: `${category.name} | ${storeConfig.name}`,
      description: category.description,
      images: [category.image],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-amber-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{category.name}</span>
      </nav>

      {/* Category header */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{category.name}</h1>
            <p className="text-gray-200 mt-2 max-w-xl">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Subcategories */}
      {category.subcategories && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/category/${slug}`}
              className="px-4 py-2 text-sm rounded-full bg-gray-900 text-white font-medium"
            >
              Todo {category.name}
            </Link>
            {category.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/category/${slug}?sub=${sub.slug}`}
                className="px-4 py-2 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-colors"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-sm text-gray-500 mb-6">{products.length} productos</p>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No se encontraron productos en esta categoría.</p>
            <Link href="/" className="text-amber-700 hover:text-amber-800 font-medium mt-2 inline-block">
              Ver todas las categorías
            </Link>
          </div>
        )}
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: category.name,
            description: category.description,
            url: `${storeConfig.siteUrl}/category/${slug}`,
          }),
        }}
      />
    </>
  );
}
