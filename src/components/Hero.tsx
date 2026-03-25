import Link from "next/link";
import { storeConfig } from "@/lib/store-config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1574610758891-5b809b6e6e40?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
        <p className="text-amber-700 font-semibold tracking-widest uppercase text-sm mb-4">
          Elige tu licor favorito
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 max-w-3xl mx-auto">
          Los mejores licores al mejor precio.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
          Whiskey, tequila, vodka, ron, ginebra, vinos y mucho más. Encuentra tu bebida perfecta en {storeConfig.name}.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Link
            href="/category/whiskey"
            className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-md"
          >
            Ver Licores
          </Link>
          <Link
            href="/category/red-wine"
            className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3 rounded-full font-semibold transition-colors border border-gray-200 shadow-sm"
          >
            Explorar Vinos
          </Link>
        </div>
      </div>
    </section>
  );
}
