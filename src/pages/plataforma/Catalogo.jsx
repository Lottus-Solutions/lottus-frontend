import { BotaoPrincipal } from "../../components/botoes/BotaoPrincipal";
import { Search } from "../../components/Search";

export function Catalogo() {
    return (
        <div className="h-screen pt-16 pl-16">
                    <h2 className="text-3xl font-bold text-[#0292B7] mb-10">Catálogo</h2>
                    <div className="flex justify-between w-9/10">
                        <Search />
                    </div>
                    <div className="mt-12 w-9/10 h-7/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar">
        
                        
                    </div>
                </div>
    )
}