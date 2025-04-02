import { BotaoPrincipal } from "./Botoes/BotaoPrincipal";
import { BotaoBranco } from "./Botoes/BotaoBranco";

export function EmprestimoListItem(props) {
    return (
        <div className="flex justify-start border-b-[1px] pb-8 border-[#727272] gap-x-12">
    <div className="flex flex-col gap-3 w-48">
        <p className="text-[#727272]">Aluno</p>
        <p>{props.aluno}</p>
    </div>
    <div className="flex flex-col gap-3 w-64">
        <p className="text-[#727272]">Livro</p>
        <p>{props.livro}</p>
    </div>
    <div className="flex flex-col gap-3 w-34">
        <p className="text-[#727272]">Data Devolução</p>
        <p>{props.dataDevolucao}</p>
    </div>
    <div className="flex flex-col gap-3 w-32">
        <p className="text-[#727272]">Dias em atraso</p>
        <p>{props.diasAtraso}</p>
    </div>

    <div className="flex items-center gap-6">
        <BotaoBranco nome="Renovar" />
        <BotaoPrincipal nome="Finalizar" />
    </div>
</div>

    )
}
