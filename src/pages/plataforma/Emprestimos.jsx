import { useEffect, useState, useRef } from "react";
import { EmprestimoListItem } from "../../components/EmprestimoListItem";
import { Perfil } from "../../components/Perfil";
import { Search } from "../../components/Search";
import { ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import '../../index.css';
import axios from "../../configs/axiosConfig";
import { Calendario } from "../../components/Calendario";

export function Emprestimos() {
    const [emprestimos, setEmprestimos] = useState([]);
    const [mostrarAtrasados, setMostrarAtrasados] = useState(false);
    const [busca, setBusca] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [carregando, setCarregando] = useState(false);
    const debounceRef = useRef(null);

    const tamanhoPagina = 50;

    useEffect(() => {
        if (busca.trim() !== "") {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                buscarEmprestimos(0);
            }, 500);

            return () => {
                if (debounceRef.current) {
                    clearTimeout(debounceRef.current);
                }
            };
        } else {
            buscarEmprestimos(paginaAtual);
        }
    }, [busca, mostrarAtrasados, paginaAtual]);

    function buscarEmprestimos(pagina = 0) {
        setCarregando(true);
        const params = new URLSearchParams();
        if (busca.trim() !== "") {
            params.append("busca", busca);
        }
        if (mostrarAtrasados) {
            params.append("atrasados", "true");
        }
        params.append("pagina", pagina);
        params.append("tamanho", tamanhoPagina);

        axios.get(`/emprestimos?${params.toString()}`)
            .then(response => {
                setEmprestimos(response.data.content || response.data);
                setPaginaAtual(response.data.number || pagina);
                setTotalPaginas(response.data.totalPages || 1);
            })
            .catch(error => {
                console.error("Erro ao buscar empréstimos:", error);
            })
            .finally(() => setCarregando(false));
    }

    function handleToggleAtrasados() {
        setMostrarAtrasados(!mostrarAtrasados);
        setPaginaAtual(0);
    }

    return (
        <div className="h-screen pt-16 pl-16">
            <Calendario />
            <Perfil />
            <h2 className="text-3xl font-bold text-[#0292B7] mb-10">Empréstimos</h2>
            <div className="flex justify-between w-9/10">
                <Search
                    placeholder="Busque por aluno ou livro"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (debounceRef.current) {
                                clearTimeout(debounceRef.current);
                            }
                            buscarEmprestimos(0);
                        }
                    }}
                />
                <div className="flex items-center justify-center gap-5 mr-8 w-36 px-4 h-9 border-[#727272] border-[1px] rounded-full">
                    <p className="text-[#727272] text-xs">Em atraso</p>
                    <input
                        type="checkbox"
                        checked={mostrarAtrasados}
                        onChange={handleToggleAtrasados}
                        disabled={busca.trim() !== ""}
                    />
                </div>
            </div>
            <div className="mt-12 w-9/10 h-7/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar">
                {emprestimos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-3 mb-20">
                        <Inbox className="w-8 h-8 text-[#0292B7]" />
                        <div className="flex flex-col items-center gap-1">
                            {busca.trim() !== "" ? (
                                <>
                                    <p className="text-base">Empréstimo não encontrado!</p>
                                    <p className="text-[#727272]">Nenhum resultado corresponde à sua busca.</p>
                                </>
                            ) : (
                                <>
                                    <p className="text-base">Nenhum empréstimo ativo!</p>
                                    <p className="text-[#727272]">Nenhum empréstimo em andamento foi localizado.</p>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    emprestimos.map((emprestimo, index) => (
                        <EmprestimoListItem
                            key={index}
                            id={emprestimo.id}
                            aluno={emprestimo.nomeAluno}
                            turma={emprestimo.turmaAluno}
                            livro={emprestimo.nomeLivro}
                            dataDevolucao={emprestimo.dataDevolucaoPrevista}
                            diasAtraso={emprestimo.diasAtrasados}
                            atualizarLista={() => buscarEmprestimos(paginaAtual)}
                        />
                    ))
                )}

                {!carregando && emprestimos.length > 0 && (
                    <div className="flex justify-end items-center gap-6 mt-4">
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
        </div>
    );
}
