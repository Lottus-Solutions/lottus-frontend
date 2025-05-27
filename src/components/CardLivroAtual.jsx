export function CardLivroAtual(props) {
    return (
        <div className="border border-[#0292B7] rounded-lg p-2 flex flex-col gap-4 w-[90%]">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-[#0292B7] text-xl font-semibold">Livro</h2>
                    <p className="text-[#0292B7] text-sm">Autor</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-xs">Prazo:</p>
                    <div className="border border-[#0292B7] rounded-full px-3 py-1 text-sm">
                        <p className="text-xs">17/01/2006</p>
                    </div>
                </div>
            </div>

            <button
                className="min-w-30 w-fit h-6 flex items-center justify-center px-4 rounded-full bg-[#0292B7] border-[1px] border-[#0292B7] text-white cursor-pointer text-xs"
            >
                Renovar
            </button>
        </div>
    );
}
