import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "../../configs/axiosConfig";
import { AlunoListItem } from "../../components/AlunoListItem";
import { BotaoPrincipal } from "../../components/botoes/BotaoPrincipal";
import { Perfil } from "../../components/Perfil";
import { Search } from "../../components/Search";
import { ModalAdicionarAluno } from "../../components/Modals/ModalAdicionarAluno";

export function Alunos() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [alunos, setAlunos] = useState([]);
    const { id } = useParams();
    const { state } = useLocation();
    const nomeTurma = state?.nomeTurma || "Turma";

    useEffect(() => {
        axios.get(`/alunos/turma/${id}`)
            .then(response => {
                setAlunos(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar alunos:", error);
            });
    }, [id]);

    return (
        <div className="h-screen pt-16 pl-16">
            <Perfil />
            <h2 className="text-3xl font-bold text-[#0292B7] mb-4">Alunos</h2>
            <p className="text-base text-[#0292B7] mb-10">{nomeTurma}</p>

            <div className="flex justify-between w-9/10">
                <Search placeholder="Busque por nome" />
                <div onClick={() => setMostrarModal(true)}>
                    <BotaoPrincipal nome="Adicionar Aluno" />
                </div>
            </div>

            <div className="mt-12 w-9/10 h-7/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar">
                {alunos.map(aluno => (
                    <AlunoListItem
                        key={aluno.matricula}
                        matricula={aluno.matricula}
                        nome={aluno.nome}
                        livrosLidos={aluno.qtdLivrosLidos}
                        livrosTotais={4}
                        bonus={aluno.qtdBonus}
                        livroAtual="Harry Potter e a Pedra Filosofal"
                    />
                ))}
            </div>

            {mostrarModal && (
                <ModalAdicionarAluno onClose={() => setMostrarModal(false)} />
            )}
        </div>
    );
}
