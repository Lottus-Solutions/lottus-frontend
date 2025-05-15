export function CategoriaListItem() {
    return (
        <div className="flex border-b-[1px] border-[#727272] pb-4 justify-between items-start">
            <div className="flex flex-col gap-3 w-32 ml-5">
                <p className="text-[#727272] text-xs">Nome da Categoria</p>
                <p className="text-xs">Terror</p>
            </div>
            <div className="flex flex-col gap-3 w-32">
                <p className="text-[#727272] text-xs">Livros Cadastrados</p>
                <p className="text-xs">19</p>
            </div>
            <div className="flex flex-col gap-3 w-24">
                <p className="text-[#727272] text-xs">Ultima Alteração</p>
                <p className="text-xs">01/04/2025</p>
            </div>
            <div className="flex gap-5 mr-5 items-center">
                <img src="/images/edit-circle.svg" alt="Editar" className='cursor-pointer' />
                <img src="/images/delete-circle.svg" alt="Excluir" className='cursor-pointer'/>
            </div>
        </div>
    )
}