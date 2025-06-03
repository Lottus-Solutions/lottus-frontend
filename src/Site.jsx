import { Header } from "./components/SiteComponents/Header";
import { SessaoHome } from "./components/SiteComponents/SessaoHome";
import { SessaoSobre } from "./components/SiteComponents/SessaoSobre";
import { SessaoSolucoes } from "./components/SiteComponents/SessaoSolucoes";
import { BotaoUp } from "./components/SiteComponents/BotaoUp";
import { SessaoContato } from "./components/SiteComponents/SessaoContato";
import { Footer } from "./components/SiteComponents/Footer";
import { VLibrasWidget } from "./components/SiteComponents/VLibrasWidget";

export function Site() {
  return (
    <div className="bg-[#F0F6F9] max-w-screen h-full">
      <VLibrasWidget /> {/* Integra VLibras */}
      <Header />
      <SessaoHome />
      <SessaoSobre />
      <SessaoSolucoes />
      <div className="w-full h-full flex items-center justify-center">
        <SessaoContato />
      </div>
      <Footer />
      <BotaoUp />
    </div>
  );
}
