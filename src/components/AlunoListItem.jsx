import { BotaoPrincipal } from "./botoes/BotaoPrincipal";
import { ProgressoLeitura } from "./ProgressoLeitura";

export function AlunoListItem({ nome, livrosLidos, livrosTotais, bonus, livroAtual }) {
    return (
        <div className="flex gap-x-12 border-b-[1px] border-[#727272] pb-8 justify-around items-center">
            <div className="flex flex-col gap-3 w-64 ml-5">
                <p className="text-[#727272] text-xs">Nome</p>
                <p className="text-xs">{nome}</p>
            </div>
            <div className="flex flex-col gap-6 w-36">
                <ProgressoLeitura total={livrosTotais} lidos={livrosLidos} />
            </div>
            <div className="flex flex-col gap-3 w-16">
                <p className="text-[#727272] text-xs">Bônus</p>
                <p className="text-xs">{bonus}</p>
            </div>
            <div className="flex flex-col gap-3 w-64">
                <p className="text-[#727272] text-xs">Livro Atual</p>
                <p className="text-xs">{livroAtual}</p>
            </div>
            <div className="mr-5">
            <BotaoPrincipal nome="Acessar Perfil" />
            </div>
        </div>
    );
}
