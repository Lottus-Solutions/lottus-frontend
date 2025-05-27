import { useEffect, useRef, useState } from "react";
import { ChartColumnStacked, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { BotaoPrincipal } from "../../components/botoes/BotaoPrincipal";
import { CatalogoListItem } from "../../components/CatalogoListItem";
import { Perfil } from "../../components/Perfil";
import { Search } from "../../components/Search";
import { ModalAdicionarLivro } from "../../components/Modals/ModalAdicionarLivro";
import { ModalCategorias } from "../../components/Modals/ModalCategorias";
import axios from "../../configs/axiosConfig";
import { CatalogoListItemSkeleton } from "../../components/Skelletons/CatalogoListItemSkeleton";

export function Catalogo() {
    const [adicionarLivro, setAdicionarLivro] = useState(false);
    const [modalCategorias, setModalCategorias] = useState(false);
    const [livros, setLivros] = useState([]);
    const [busca, setBusca] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionadaId, setCategoriaSelecionadaId] = useState("");
    const [statusSelecionado, setStatusSelecionado] = useState(""); // Estado para status

    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [carregando, setCarregando] = useState(false);

    const debounceRef = useRef(null);
    const tamanhoPagina = 50;

    const buscarLivros = (pagina = 0) => {
        setCarregando(true);

        const params = {
            pagina,
            tamanho: tamanhoPagina
        };

        let endpoint = "/livros/buscar";

        if (statusSelecionado) {
            endpoint = "/livros/filtrar-por-status";
            params.statusvalue = statusSelecionado;

            console.log("Buscando livros com status:", statusSelecionado);
        } else if (busca.trim() !== "") {
            params.valor = busca;
        }


        axios.get(endpoint, { params })
            .then(response => {
                setLivros(response.data.content);
                setPaginaAtual(response.data.number);
                setTotalPaginas(response.data.totalPages);
            })
            .catch(error => {
                console.error("Erro ao buscar livros:", error);
            })
            .finally(() => setCarregando(false));
    };

    const buscarCategorias = () => {
        axios.get("/categorias")
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar categorias:", error);
            });
    };

    useEffect(() => {
        buscarCategorias();
    }, []);

    useEffect(() => {
        if (busca.trim() !== "") {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                buscarLivros(0);
            }, 500);

            return () => {
                if (debounceRef.current) {
                    clearTimeout(debounceRef.current);
                }
            };
        } else {
            buscarLivros(paginaAtual);
        }
    }, [busca, categoriaSelecionadaId, statusSelecionado, paginaAtual]);

    return (
        <div className="h-screen pt-16 pl-16 relative">
            <Perfil />
            <h2 className="text-3xl font-bold text-[#0292B7] mb-10">Catálogo</h2>

            <div className="flex justify-between w-9/10">
                <Search
                    placeholder="Busque por livro, autor ou ID"
                    value={busca}
                    onChange={(e) => {
                        setPaginaAtual(0);
                        setBusca(e.target.value);
                    }}
                />
                <div className="flex gap-4">
                    <div className="relative inline-block">
                        <select
                            name="Categoria"
                            className="w-fit border-[#727272] text-[#727272] border-[1px] rounded-full pl-3 pr-8 outline-0 text-xs h-9 appearance-none"
                            value={categoriaSelecionadaId}
                            onChange={(e) => {
                                setPaginaAtual(0);
                                setCategoriaSelecionadaId(e.target.value);
                            }}
                        >
                            <option value="">Categorias</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                        <Filter className="absolute top-1/2 right-3 -translate-y-1/2 text-[#727272]" size={14} />
                    </div>
                    <div className="relative inline-block">
                        <select
                            name="Status"
                            className="w-28 border-[#727272] text-[#727272] border-[1px] rounded-full px-4 pr-8 outline-0 text-xs h-9 appearance-none"
                            value={statusSelecionado}
                            onChange={(e) => {
                                setPaginaAtual(0);
                                setStatusSelecionado(e.target.value);
                            }}
                        >
                            <option value="">Status</option>
                            <option value="RESERVADO">Reservado</option>
                            <option value="DISPONIVEL">Disponível</option>
                        </select>
                        <Filter className="absolute top-1/2 right-3 -translate-y-1/2 text-[#727272]" size={14} />
                    </div>
                    <button
                        className="rounded-full h-9 w-9 flex items-center justify-center border-2 border-[#0292B7] cursor-pointer"
                        title="Ver categorias"
                        onClick={() => setModalCategorias(true)}
                    >
                        <ChartColumnStacked className="w-5 h-5 text-[#0292B7]" />
                    </button>
                    <div onClick={() => setAdicionarLivro(true)}>
                        <BotaoPrincipal nome="Adicionar Livro" />
                    </div>
                </div>
            </div>

            <div className="mt-12 w-9/10 h-7/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar">
                {carregando ? (
                    <>
                        {[...Array(5)].map((_, index) => (
                            <CatalogoListItemSkeleton key={index} />
                        ))}
                    </>
                ) : (
                    <>
                        {Array.isArray(livros) && livros.length > 0 ? (
                            livros.map(livro => (
                                <CatalogoListItem
                                    key={livro.id}
                                    id={livro.id}
                                    livro={livro.nome}
                                    autor={livro.autor}
                                    categoria={livro.categoria}
                                    qtdEmprestimos={livro.qtdEmprestimos || 0}
                                    qtdLivros={livro.quantidade}
                                    status={livro.status?.toLowerCase() || "disponível"}
                                />
                            ))
                        ) : (
                            <div className="text-center text-sm text-gray-500">Nenhum livro encontrado.</div>
                        )}
                    </>
                )}

                {!carregando && livros.length > 0 && (
                    <div className="flex justify-end items-center gap-6">
                        <button
                            disabled={paginaAtual === 0}
                            onClick={() => setPaginaAtual(paginaAtual - 1)}
                            className="p-2 text-[#0292B7] disabled:cursor-not-allowed transition"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <span className="text-sm text-gray-700">
                            <span>{paginaAtual + 1}</span> /{" "}
                            <span>{totalPaginas}</span>
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

            {adicionarLivro && (
                <ModalAdicionarLivro
                    onClose={() => setAdicionarLivro(false)}
                    atualizarLista={() => buscarLivros(paginaAtual)}
                />
            )}
            {modalCategorias && (
                <ModalCategorias onClose={() => setModalCategorias(false)} />
            )}
        </div>
    );
}
