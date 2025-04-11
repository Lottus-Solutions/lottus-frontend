import { Header } from "./components/SiteComponents/Header";
import { SessaoHome } from "./components/SiteComponents/SessaoHome";
import { SessaoSobre } from "./components/SiteComponents/SessaoSobre";
import { SessaoSolucoes } from "./components/SiteComponents/SessaoSolucoes";
import { BotaoUp } from "./components/SiteComponents/BotaoUp";
import { SessaoContato } from "./components/SiteComponents/SessaoContato";
import { Footer } from "./components/SiteComponents/Footer";

export function Site() {
    return (
        <div className="bg-[#F0F6F9] max-w-screen h-full">
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
    )
}