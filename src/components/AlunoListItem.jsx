import { useState } from "react";
import { BotaoPrincipal } from "./botoes/BotaoPrincipal";
import { ProgressoLeitura } from "./ProgressoLeitura";
import { ModalDetalhesAluno } from "./Modals/ModalDetalhesAluno";

export function AlunoListItem(props) {
    const [modalDetalhes, setModalDetalhes] = useState(false);
    const [alunoData, setAlunoData] = useState({
        nome: props.nome,
        livrosTotais: props.livrosTotais,
        livrosLidos: props.livrosLidos,
        bonus: props.bonus,
        livroAtual: props.livroAtual,
        matricula: props.matricula,
    });

    const atualizarAluno = (novoAluno) => {
        setAlunoData(prev => ({ ...prev, ...novoAluno }));
    };


    return (
        <div className="flex gap-x-12 border-b-[1px] border-[#727272] pb-8 justify-around items-center">
            <div className="flex flex-col gap-3 w-64 ml-5">
                <p className="text-[#727272] text-xs">Nome</p>
                <p className="text-xs">{props.nome}</p>
            </div>
            <div className="flex flex-col gap-6 w-36">
                <ProgressoLeitura total={props.livrosTotais} lidos={props.livrosLidos} />
            </div>
            <div className="flex flex-col gap-3 w-16">
                <p className="text-[#727272] text-xs">Bônus</p>
                <p className="text-xs">{props.bonus}</p>
            </div>
            <div className="flex flex-col gap-3 w-64">
                <p className="text-[#727272] text-xs">Livro Atual</p>
                <p className="text-xs">{props.livroAtual}</p>
            </div>
            <div className="mr-5">
                <BotaoPrincipal nome="Acessar Perfil" onClick={() => setModalDetalhes(true)} />
            </div>

            
            {modalDetalhes && (
                <ModalDetalhesAluno
                    onClose={() => setModalDetalhes(false)}
                    matricula={props.matricula}
                    turma={props.turma}
                />
            )}
        </div>
    );
}
