import { useState } from "react";
import { CardEditarCategoria } from "./CardEditarCategoria";

export function CategoriaListItem(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="flex border-b-[1px] border-[#727272] pb-4 justify-between items-start">
                <div className="flex flex-col gap-3 w-32 ml-5">
                    <p className="text-[#727272] text-xs">Nome da Categoria</p>
                    <p className="text-xs">{props.nome}</p>
                </div>
                <div className="flex flex-col gap-3 w-32">
                    <p className="text-[#727272] text-xs">Livros Cadastrados</p>
                    <p className="text-xs">0</p>
                </div>
                <div className="flex gap-5 mr-5 items-center">
                    <img
                        src="/images/edit-circle.svg"
                        alt="Editar"
                        className='cursor-pointer'
                        onClick={() => setIsModalOpen(true)}
                    />
                    <img
                        src="/images/delete-circle.svg"
                        alt="Excluir"
                        className='cursor-pointer'
                    />
                </div>
            </div>

            {isModalOpen && (
                <CardEditarCategoria onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
}
