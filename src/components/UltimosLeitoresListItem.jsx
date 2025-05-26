export function UltimosLeitoresListItem({ leitor }) {
    return (
        <div className="flex border-b-[1px] border-[#727272] pb-4 justify-between items-start">
            <div className="flex flex-col gap-3 w-64">
                <p className="text-[#727272] text-xs">Nome do Aluno</p>
                <p className="text-xs">{leitor.aluno.nome}</p>
            </div>
            <div className="flex flex-col gap-3 w-24">
                <p className="text-[#727272] text-xs">Turma</p>
                <p className="text-xs">{leitor.aluno.turma.serie}</p>
            </div>
            <div className="flex flex-col gap-3 w-24">
                <p className="text-[#727272] text-xs">Data de Retirada</p>
                <p className="text-xs">{leitor.dataEmprestimo}</p>
            </div>
            <div className="flex flex-col gap-3 w-28">
                <p className="text-[#727272] text-xs">Data de Devolução</p>
                <p className="text-xs">{leitor.dataDevolucaoPrevista}</p>
            </div>
        </div>
    );
}
