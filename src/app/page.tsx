import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import { storeConfig } from "@/lib/store-config";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <CategoryGrid />
      <FeaturedProducts />

      {/* Contenido SEO */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tu Tienda de Licores en Línea de Confianza
          </h2>
          <p className="text-gray-600 leading-relaxed">
            En {storeConfig.name}, ofrecemos una amplia selección de vinos y licores de todo el mundo.
            Ya sea que busques una botella para una ocasión especial, tus favoritos de siempre o un regalo único,
            nuestra colección curada tiene algo para todos. Desde audaces Cabernet Sauvignon y suaves
            Pinot Noir hasta whiskeys premium, tequilas artesanales y ginebras de autor — explora nuestros
            pasillos y encuentra la bebida perfecta para cualquier momento.
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LiquorStore",
            name: storeConfig.name,
            description: storeConfig.description,
            url: storeConfig.siteUrl,
            telephone: storeConfig.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: storeConfig.address,
            },
            priceRange: "$$",
            openingHours: "Mo-Su 10:00-22:00",
          }),
        }}
      />
    </>
  );
}
