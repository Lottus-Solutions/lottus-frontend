export function CatalogoListItemSkeleton() {
    return (
        <div className="flex items-center justify-between w-full animate-pulse bg-gray-100 p-4 rounded-xl shadow">
            <div className="flex gap-8 w-full">
                {/* ID */}
                <div className="w-10 h-4 bg-gray-200 rounded" />

                {/* Livro */}
                <div className="w-32 h-4 bg-gray-200 rounded" />

                {/* Autor */}
                <div className="w-32 h-4 bg-gray-200 rounded" />

                {/* Categoria */}
                <div className="w-28 h-4 bg-gray-200 rounded" />

                {/* Qtd. Livros */}
                <div className="w-20 h-4 bg-gray-200 rounded" />

                {/* Status */}
                <div className="w-20 h-6 bg-gray-200 rounded-full" />
            </div>

            <div className="flex gap-4">
                {/* Botão Emprestar */}
                <div className="w-24 h-8 bg-gray-200 rounded-full" />

                {/* Ícone de Opções */}
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
            </div>
        </div>
    );
}
