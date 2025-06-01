import { useState } from "react";
import { CardEditarCategoria } from "./CardEditarCategoria";
import { ConfirmExcluirCategoria } from "./Modals/ConfirmExcluirCategoria";
import axios from "../configs/axiosConfig";

export function CategoriaListItem(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmExcluirOpen, setIsConfirmExcluirOpen] = useState(false);

    const excluirCategoria = () => {
        axios.delete(`/categorias/${props.id}`)
            .then(() => {
                props.onCategoriasAtualizadas(); // Atualiza a lista no ModalCategorias
                setIsConfirmExcluirOpen(false);  // Fecha o modal
            })
            .catch((error) => {
                console.error("Erro ao excluir categoria:", error);
                alert("Erro ao excluir categoria. Tente novamente.");
            });
    };

    return (
        <>
            <div className="flex border-b-[1px] border-[#727272] pb-4 justify-between items-start">
                <div className="flex flex-col gap-3 w-32 ml-5">
                    <p className="text-[#727272] text-xs">Nome da Categoria</p>
                    <p className="text-xs" style={{ color: props.categoriaCor }}>
                        {props.nome}
                    </p>
                </div>
                <div className="flex flex-col gap-3 w-32">
                    <p className="text-[#727272] text-xs">Livros Cadastrados</p>
                    <p className="text-xs">0</p>
                </div>
                <div className="flex gap-5 mr-5 items-center">
                    <img
                        src="/images/edit-circle.svg"
                        alt="Editar"
                        className="cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    />
                    <img
                        src="/images/delete-circle.svg"
                        alt="Excluir"
                        className="cursor-pointer"
                        onClick={() => setIsConfirmExcluirOpen(true)}
                    />
                </div>
            </div>

            {isModalOpen && (
                <CardEditarCategoria
                    onClose={() => {
                        setIsModalOpen(false);
                        props.onCategoriasAtualizadas();
                    }}
                    id={props.id}
                    nomeInicial={props.nome}
                    corInicial={props.categoriaCor}
                    onCategoriasAtualizadas={props.onCategoriasAtualizadas}
                />
            )}

            {isConfirmExcluirOpen && (
                <ConfirmExcluirCategoria
                    onClose={() => setIsConfirmExcluirOpen(false)}
                    onConfirm={excluirCategoria}
                />
            )}
        </>
    );
}
