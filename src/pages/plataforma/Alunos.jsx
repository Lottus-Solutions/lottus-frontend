import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "../../configs/axiosConfig";
import { AlunoListItem } from "../../components/AlunoListItem";
import { BotaoPrincipal } from "../../components/botoes/BotaoPrincipal";
import { Perfil } from "../../components/Perfil";
import { Search } from "../../components/Search";
import { ModalAdicionarAluno } from "../../components/Modals/ModalAdicionarAluno";
import { ModalDetalhesAluno } from "../../components/Modals/ModalDetalhesAluno";
import { AlertInform } from '../../components/Alerts/AlertInform';
import { Inbox } from "lucide-react";  // <-- IMPORTAÇÃO DO ÍCONE
import { Calendario } from "../../components/Calendario";

export function Alunos() {
    const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
    const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);
    const [alunos, setAlunos] = useState([]);
    const [termoBusca, setTermoBusca] = useState("");
    const [alertExcluir, setAlertExcluir] = useState(false);

    const debounceRef = useRef(null);

    const { id } = useParams();
    const { state } = useLocation();
    const nomeTurma = state?.nomeTurma || "Turma";

    const atualizarAlunoNaLista = (alunoAtualizado) => {
        setAlunos(prevAlunos =>
            prevAlunos.map(aluno =>
                aluno.matricula === alunoAtualizado.matricula ? alunoAtualizado : aluno
            )
        );
    };

    useEffect(() => {
        if (termoBusca.trim() !== "") {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                buscarAlunosPorNome(termoBusca);
            }, 500);

            return () => {
                if (debounceRef.current) {
                    clearTimeout(debounceRef.current);
                }
            };
        } else {
            buscarAlunos();
        }
    }, [termoBusca, id]);

    const buscarAlunos = (pagina = 0) => {
        setCarregando(true);
        axios
            .get(`/alunos/turma/${id}?pagina=${pagina}&tamanho=${tamanhoPagina}`)
            .then(response => {
                setAlunos(response.data.content || []);
                setTotalPaginas(response.data.totalPages || 1);
                setCarregando(false);
            })
            .catch(error => {
                console.error("Erro ao buscar alunos:", error);
                setCarregando(false);
            });
    };

    const buscarAlunosPorNome = (nome) => {
        axios.get(`/alunos/buscar-aluno-nome-turma/${id}/${nome}`)
            .then(response => {
                setAlunos(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar aluno por nome:", error);
            });
    };

    const abrirDetalhes = (aluno) => {
        setAlunoSelecionado(aluno);
        setMostrarDetalhes(true);
    };

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
                    descricao="Caso queira adiciona-lo novamente é necessário fazer outro cadastro."
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
                        <p className="text-base">Aluno não encontrado!</p>
                        <p className="text-[#727272]">Nenhum resultado corresponde à sua busca.</p>
                    </div>
                ) : (
                    alunos.map(aluno => (
                        <div key={aluno.matricula} onClick={() => console.log("abrir detalhes", aluno)}>
                            <AlunoListItem
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
                        </div>
                    ))
                )}
            </div>

            {!carregando && alunos.length > 0 && (
                <div className="flex justify-end items-center gap-6 mt-6 pr-8">
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

            {mostrarModalAdicionar && (
                <ModalAdicionarAluno
                    onClose={() => setMostrarModalAdicionar(false)}
                    atualizarLista={() => buscarAlunos(paginaAtual)}
                />
            )}
        </div>
    );
}