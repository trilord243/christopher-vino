// ============================================
// CONFIGURACIÓN DE LA TIENDA - Edita nombre y logo aquí
// ============================================

export const storeConfig = {
  // Nombre de la tienda - aparece en header, footer, SEO
  name: "Licores y Más",

  // Eslogan mostrado en header/hero
  tagline: "Tu Tienda de Licores en Línea",

  // Logo: pon una ruta en /public (ej: "/logo.svg") o null para usar logo de texto
  logo: null as string | null,

  // Info de contacto
  phone: "555-123-4567",
  email: "info@licoresymas.com",
  address: "123 Calle Principal, Nueva York, NY 10001",

  // Redes sociales (pon null para ocultar)
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://x.com",
  },

  // SEO
  siteUrl: "https://licoresymas.com",
  description:
    "Compra los mejores licores: whiskey, tequila, vodka, ron, ginebra, vinos y más. Precios bajos y envío rápido.",

  // Moneda
  currency: "USD",
  currencySymbol: "$",
};
