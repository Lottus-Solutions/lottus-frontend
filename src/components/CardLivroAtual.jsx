export function CardLivroAtual({ livro, dataDevolucao, isAtrasado }) {
    if (!livro) return <p className="text-sm text-gray-500">Nenhum livro em andamento.</p>;

    const borda = isAtrasado ? "border-red-500" : "border-[#0292B7]";

    return (
        <div className={`border ${borda} rounded-lg p-2 flex flex-col gap-4 w-[90%]`}>
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-[#0292B7] text-xl font-semibold">{livro.nome}</h2>
                    <p className="text-[#0292B7] text-sm">{livro.autor}</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-xs">Prazo:</p>
                    <div className={`border ${borda} rounded-full px-3 py-1 text-sm`}>
                        <p className="text-xs">
                            {dataDevolucao
                                ? dataDevolucao.split('T')[0].split('-').reverse().join('/')
                                : '-'}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
