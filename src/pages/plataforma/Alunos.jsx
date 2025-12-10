import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "../../configs/axiosConfig";
import { AlunoListItem } from "../../components/AlunoListItem";
import { BotaoPrincipal } from "../../components/Botoes/BotaoPrincipal";
import { Perfil } from "../../components/Perfil";
import { Search } from "../../components/Search";
import { ModalAdicionarAluno } from "../../components/Modals/ModalAdicionarAluno";
import { AlertInform } from "../../components/Alerts/AlertInform";
import { ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import { Calendario } from "../../components/Calendario";

export function Alunos() {
    const [alunos, setAlunos] = useState([]);
    const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
    const [alertExcluir, setAlertExcluir] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [termoBusca, setTermoBusca] = useState("");

    // paginação
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const tamanhoPagina = 10;

    const debounceRef = useRef(null);
    const { id } = useParams();
    const { state } = useLocation();
    const nomeTurma = state?.nomeTurma || "Turma";

    // Buscar alunos (com paginação e busca)
    function buscarAlunos(pagina = 0) {
        setCarregando(true);
        const params = new URLSearchParams();

        if (termoBusca.trim() !== "") {
            params.append("nome", termoBusca.trim());
        }
        params.append("pagina", pagina.toString());
        params.append("tamanho", tamanhoPagina.toString());

        axios
            .get(`/alunos/turma/${id}?${params.toString()}`)
            .then((response) => {
                setAlunos(response.data.content || response.data);
                setPaginaAtual(response.data.number || pagina);
                setTotalPaginas(response.data.totalPages || 1);
            })
            .catch((error) => {
                console.error("Erro ao buscar alunos:", error);
            })
            .finally(() => setCarregando(false));
    }

    // Atualiza a lista sempre que a página, o termo de busca ou o ID da turma mudarem
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            buscarAlunos(paginaAtual);
        }, 500);

        return () => clearTimeout(debounceRef.current);
    }, [termoBusca, paginaAtual, id]);

    useEffect(() => {
        if (alertExcluir) {
            const timer = setTimeout(() => {
                setAlertExcluir(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [alertExcluir]);

    return (
        <div className="h-screen pt-16 pl-16">
            {alertExcluir && (
                <AlertInform
                    onClose={() => setAlertExcluir(false)}
                    titulo="Aluno removido do sistema."
                    descricao="Caso queira adicioná-lo novamente é necessário fazer outro cadastro."
                />
            )}

            <Calendario />
            <Perfil />

            <h2 className="text-3xl font-bold text-[#0292B7] mb-4">Alunos</h2>
            <p className="text-base text-[#0292B7] mb-10">{nomeTurma}</p>

            <div className="flex justify-between w-9/10">
                <Search
                    placeholder="Busque por nome"
                    value={termoBusca}
                    onChange={(e) => {
                        setPaginaAtual(0);
                        setTermoBusca(e.target.value);
                    }}
                />
                <div onClick={() => setMostrarModalAdicionar(true)}>
                    <BotaoPrincipal nome="Adicionar Aluno" />
                </div>
            </div>

            <div className="mt-12 w-9/10 h-7/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar">
                {carregando ? (
                    <p className="text-center text-gray-500">Carregando...</p>
                ) : alunos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-3 mb-20">
                        <Inbox className="w-8 h-8 text-[#0292B7]" />
                        {termoBusca.trim() !== "" ? (
                            <>
                                <p className="text-base">Aluno não encontrado!</p>
                                <p className="text-[#727272]">
                                    Nenhum resultado corresponde à sua busca.
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-base">Nenhum aluno cadastrado!</p>
                                <p className="text-[#727272]">
                                    Esta turma ainda não possui alunos cadastrados.
                                </p>
                            </>
                        )}
                    </div>
                ) : (
                    alunos.map((aluno) => (
                        <AlunoListItem
                            key={aluno.matricula}
                            turma={nomeTurma}
                            matricula={aluno.matricula}
                            nome={aluno.nome}
                            livrosLidos={aluno.qtdLivrosLidos}
                            livrosTotais={4}
                            bonus={aluno.qtdBonus}
                            livroAtual={aluno.livroAtual}
                            onExclusaoFeito={() => {
                                setAlertExcluir(true);
                                buscarAlunos(paginaAtual);
                            }}
                        />
                    ))
                )}
                {!carregando && alunos.length > 0 && (
                    <div className="flex justify-end items-center gap-6">
                        <button
                            disabled={paginaAtual === 0}
                            onClick={() => setPaginaAtual(paginaAtual - 1)}
                            className="p-2 text-[#0292B7] disabled:cursor-not-allowed transition"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <span className="text-sm text-gray-700">
                            <span>{paginaAtual + 1}</span> / <span>{totalPaginas}</span>
                        </span>

                        <button
                            disabled={paginaAtual + 1 >= totalPaginas}
                            onClick={() => setPaginaAtual(paginaAtual + 1)}
                            className="p-2 text-[#0292B7] disabled:cursor-not-allowed transition"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>


            {mostrarModalAdicionar && (
                <ModalAdicionarAluno
                    onClose={() => setMostrarModalAdicionar(false)}
                    atualizarLista={() => buscarAlunos(paginaAtual)}
                />
            )}
        </div>
    );
}
