export function HistoricoLeituraListItem({ item }) {
    const { livro, dataEmprestimo, dataDevolucaoPrevista } = item;

    return (
        <div className="flex border-b-[1px] border-[#727272] pb-4 justify-between items-start">
            <div className="flex flex-col gap-3 w-64">
                <p className="text-[#727272] text-xs">Nome do Livro</p>
                <p className="text-xs">{livro?.nome}</p>
            </div>
            <div className="flex flex-col gap-3 w-24">
                <p className="text-[#727272] text-xs">Autor</p>
                <p className="text-xs">{livro?.autor}</p>
            </div>
            <div className="flex flex-col gap-3 w-24">
                <p className="text-[#727272] text-xs">Data de Retirada</p>
                <p className="text-xs">
                    {dataEmprestimo ? dataEmprestimo.split('T')[0].split('-').reverse().join('/') : '-'}
                </p>
            </div>

            <div className="flex flex-col gap-3 w-28">
                <p className="text-[#727272] text-xs">Data de Devolução</p>
                <p className="text-xs">
                    {dataDevolucaoPrevista
                        ? dataDevolucaoPrevista.split('T')[0].split('-').reverse().join('/')
                        : '-'}
                </p>
            </div>

        </div>
    );
}
