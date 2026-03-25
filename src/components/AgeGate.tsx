"use client";

import { useState, useEffect } from "react";
import { storeConfig } from "@/lib/store-config";

export default function AgeGate() {
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    const isVerified = sessionStorage.getItem("age-verified");
    if (!isVerified) setVerified(false);
  }, []);

  if (verified) return null;

  const handleVerify = () => {
    sessionStorage.setItem("age-verified", "true");
    setVerified(true);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="text-3xl font-bold text-gray-900 mb-2">{storeConfig.name}</div>
        <div className="text-sm text-gray-400 mb-6">{storeConfig.tagline}</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Verificación de Edad</h2>
        <p className="text-gray-500 mb-6">
          Debes tener 21 años o más para ingresar a {storeConfig.name}. Por favor confirma tu edad.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleVerify}
            className="flex-1 bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Tengo 21+
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
          >
            Soy menor de 21
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Al ingresar a este sitio aceptas nuestros Términos de Servicio y Política de Privacidad.
        </p>
      </div>
    </div>
  );
}
