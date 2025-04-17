import { MenuIcon } from "lucide-react";
import { BotaoPrincipal } from "./botoes/BotaoPrincipal";
import { StatusItem } from "./StatusItem";

export function CatalogoListItem() {
    return (
        <div className="flex gap-x-12 border-b-[1px] border-[#727272] pb-8 justify-around items-center">
            <div className="flex flex-col gap-3 w-20">
                <p className="text-[#727272] text-xs">ID</p>
                <p className="text-xs">0001</p>
            </div>
            <div className="flex flex-col gap-3 w-64">
                <p className="text-[#727272] text-xs">Livro</p>
                <p className="text-xs">Harry Potter e a Pedra Filosofal</p>
            </div>
            <div className="flex flex-col gap-3 w-64">
                <p className="text-[#727272] text-xs">Autor</p>
                <p className="text-xs">J. K. Rowling</p>
            </div>
            <div className="flex flex-col gap-3 w-24">
                <p className="text-[#727272] text-xs">Categoria</p>
                <p className="text-xs">Aventura</p>
            </div>
            <div className="flex flex-col gap-3 w-24">
                <p className="text-[#727272] text-xs">Qtd. Livros</p>
                <p className="text-xs">3</p>
            </div>
            <div className="flex flex-col gap-3 w-28">
                <p className="text-[#727272] text-xs">Status</p>
                <StatusItem />
            </div>
            <div className="flex items-center gap-5">
                <BotaoPrincipal nome="Emprestar" />
                <MenuIcon className="w-4 h-4 text-[#727272] cursor-pointer" />
            </div>
        </div>
    )
}