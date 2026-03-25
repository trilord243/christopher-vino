// ============================================
// CONFIGURACIÓN DE LA TIENDA - Edita nombre y logo aquí
// ============================================

export const storeConfig = {
  // Nombre de la tienda - aparece en header, footer, SEO
  name: "Premium Spirits",

  // Eslogan mostrado en header/hero
  tagline: "Vinos Finos y Licores Premium",

  // Logo: pon una ruta en /public (ej: "/logo.svg") o null para usar logo de texto
  logo: null as string | null,

  // Info de contacto
  phone: "555-123-4567",
  email: "info@premiumspirits.com",
  address: "123 Calle Principal, Nueva York, NY 10001",

  // Redes sociales (pon null para ocultar)
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://x.com",
  },

  // SEO
  siteUrl: "https://premiumspirits.com",
  description:
    "Compra vinos premium, whiskey, tequila, vodka y más. Los mejores precios en licores finos con envío rápido.",

  // Moneda
  currency: "USD",
  currencySymbol: "$",
};
