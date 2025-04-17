import { useState } from "react";
import { BotaoPrincipal } from "./botoes/BotaoPrincipal";
import { BotaoBranco } from "./botoes/BotaoBranco";
import { ModalFinalizar } from "./Modals/ModalFinalizar";


export function EmprestimoListItem(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFinalizarClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex gap-x-12 border-b-[1px] border-[#727272] pb-8 justify-around">
                <div className="flex flex-col gap-3 w-56">
                    <p className="text-[#727272] text-xs">Aluno</p>
                    <p className="text-xs">{props.aluno}</p>
                </div>
                <div className="flex flex-col gap-3 w-64">
                    <p className="text-[#727272] text-xs">Livro</p>
                    <p className="text-xs">{props.livro}</p>
                </div>
                <div className="flex flex-col gap-3 w-28">
                    <p className="text-[#727272] text-xs">Data Devolução</p>
                    <p className="text-xs">{props.dataDevolucao}</p>
                </div>
                <div className="flex flex-col gap-3 w-28">
                    <p className="text-[#727272] text-xs">Dias em atraso</p>
                    <p className="text-xs">{props.diasAtraso}</p>
                </div>

                <div className="flex items-center gap-6">
                    <BotaoBranco nome="Renovar" />
                    <BotaoPrincipal nome="Finalizar" onClick={handleFinalizarClick} />
                </div>
            </div>

            {/* Renderiza o ModalFinalizar se isModalOpen for true */}
            {isModalOpen && <ModalFinalizar onClose={closeModal} />}
        </div>
    );
}