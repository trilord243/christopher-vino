import Link from "next/link";
import { storeConfig } from "@/lib/store-config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Imagen de fondo clara - viñedo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
        <p className="text-amber-700 font-semibold tracking-widest uppercase text-sm mb-4">
          Elige tus vinos
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 max-w-3xl mx-auto">
          Elige vinos de nuestra extensa variedad de sabores.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
          Para satisfacer tus gustos específicos, ofrecemos una amplia selección de vinos y licores premium.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Link
            href="/category/red-wine"
            className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-md"
          >
            Ver Vinos
          </Link>
          <Link
            href="/category/whiskey"
            className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3 rounded-full font-semibold transition-colors border border-gray-200 shadow-sm"
          >
            Explorar Licores
          </Link>
        </div>
      </div>
    </section>
  );
}
