import { useState } from "react";
import axios from "../configs/axiosConfig";
import { BotaoPrincipal } from "./botoes/BotaoPrincipal";
import { BotaoBranco } from "./botoes/BotaoBranco";
import { ConfirmFinalizarEmprestimo } from "./Modals/ConfirmFinalizarEmprestimo";
import { AlertSucesso } from "./Alerts/AlertSucesso";

export function EmprestimoListItem(props) {
    const [confirmModal, setShowConfirm] = useState(false);
    const [finalizarEmprestimo, setFinalizar] = useState(false);
    const [renovarEmprestimo, setRenovar] = useState(false);
    const [loadingRenovar, setLoadingRenovar] = useState(false);
    const [loadingFinalizar, setLoadingFinalizar] = useState(false);

    const handleFinalizarClick = () => {
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        setShowConfirm(false);
        setLoadingFinalizar(true);
        axios.post(`http://localhost:8080/emprestimos/${props.id}/finalizar`)
            .then(() => {
                setFinalizar(true);
                if (props.atualizarLista) props.atualizarLista();
            })
            .catch(error => {
                console.error("Erro ao finalizar empréstimo:", error);
                alert("Erro ao finalizar o empréstimo.");
            })
            .finally(() => {
                setLoadingFinalizar(false);
            });
    };

    const handleRenovarClick = () => {
        setLoadingRenovar(true);
        axios.post(`http://localhost:8080/emprestimos/${props.id}/renovar`)
            .then(() => {
                setRenovar(true);
                if (props.atualizarLista) props.atualizarLista();
            })
            .catch(error => {
                console.error("Erro ao renovar empréstimo:", error);
                alert("Erro ao renovar o empréstimo.");
            })
            .finally(() => {
                setLoadingRenovar(false);
            });
    };

    const diasAtraso = Number(props.diasAtraso);

    return (
        <div className="relative">
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
                    <p className={`text-xs ${diasAtraso > 0 ? "text-[#cf4a4a]" : ""}`}>
                        {diasAtraso} {diasAtraso === 1 ? "dia" : "dias"}
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <BotaoBranco
                        nome={loadingRenovar ? "Renovando..." : "Renovar"}
                        onClick={handleRenovarClick}
                        disabled={loadingRenovar}
                    />
                    <BotaoPrincipal
                        nome={loadingFinalizar ? "Finalizando..." : "Finalizar"}
                        onClick={handleFinalizarClick}
                        disabled={loadingFinalizar}
                    />
                </div>
            </div>

            {confirmModal && (
                <ConfirmFinalizarEmprestimo
                    onClose={() => setShowConfirm(false)}
                    onConfirm={handleConfirm}
                />
            )}

            {finalizarEmprestimo && (
                <AlertSucesso
                    titulo='Empréstimo Finalizado'
                    descricao='Este livro acabou de ter o empréstimo finalizado com o aluno.'
                    onClose={() => setFinalizar(false)}
                />
            )}

            {renovarEmprestimo && (
                <AlertSucesso
                    titulo='Empréstimo Renovado'
                    descricao='Este livro acabou de ter o empréstimo renovado para daqui 15 dias.'
                    onClose={() => setRenovar(false)}
                />
            )}
        </div>
    );
}
