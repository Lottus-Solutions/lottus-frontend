export function UltimosLeitoresListItem() {
    return (
        <div className="flex border-b-[1px] border-[#727272] pb-4 justify-between items-start">
            <div className="flex flex-col gap-3 w-64">
                <p className="text-[#727272] text-xs">Nome do Aluno</p>
                <p className="text-xs">Caio Viveiros Soares</p>
            </div>
            <div className="flex flex-col gap-3 w-24">
                <p className="text-[#727272] text-xs">Turma</p>
                <p className="text-xs">3° Ano</p>
            </div>
            <div className="flex flex-col gap-3 w-24">
                <p className="text-[#727272] text-xs">Data de Retirada</p>
                <p className="text-xs">01/04/2025</p>
            </div>
            <div className="flex flex-col gap-3 w-28">
                <p className="text-[#727272] text-xs">Data de Devolução</p>
                <p className="text-xs">16/04/2025</p>
            </div>
        </div>
    )
}