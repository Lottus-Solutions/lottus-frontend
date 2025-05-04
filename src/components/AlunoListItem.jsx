
import { BotaoPrincipal } from "./botoes/BotaoPrincipal";
import { ProgressoLeitura } from "./ProgressoLeitura"; 

export function AlunoListItem() {
    return (
        <div className="flex gap-x-12 border-b-[1px] border-[#727272] pb-8 justify-around items-center">
            <div className="flex flex-col gap-3 w-16">
                <p className="text-[#727272] text-xs">Matricula</p>
                <p className="text-xs">012410</p>
            </div>
            <div className="flex flex-col gap-3 w-64">
                <p className="text-[#727272] text-xs">Nome</p>
                <p className="text-xs">Caio Viveiros Soares</p>
            </div>
            <div className="flex flex-col gap-6 w-36">
                <ProgressoLeitura total={4} lidos={3} />
            </div>
            <div className="flex flex-col gap-3 w-16">
                <p className="text-[#727272] text-xs">Bônus</p>
                <p className="text-xs">0</p>
            </div>
            <div className="flex flex-col gap-3 w-64">
                <p className="text-[#727272] text-xs">Livro Atual</p>
                <p className="text-xs">Harry Potter e a pedra filosofal</p>
            </div>
            
            <BotaoPrincipal nome="Acessar Perfil" />
        </div>
    )
}
