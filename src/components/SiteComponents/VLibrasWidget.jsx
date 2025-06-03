import { useEffect } from "react";

export function VLibrasWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;

    script.onload = () => {
      const interval = setInterval(() => {
        if (window.VLibras) {
          try {
            new window.VLibras.Widget("https://vlibras.gov.br/app");
            clearInterval(interval); // Para de tentar depois que conseguir
          } catch (err) {
            console.error("Erro ao iniciar VLibras:", err);
          }
        }
      }, 500);
    };

    document.body.appendChild(script);
  }, []);

  return null;
}
