import { useEffect, useState } from "react";
import { ChartColumnStacked, Filter } from "lucide-react";
import { BotaoPrincipal } from "../../components/botoes/BotaoPrincipal";
import { CatalogoListItem } from "../../components/CatalogoListItem";
import { Perfil } from "../../components/Perfil";
import { Search } from "../../components/Search";
import { ModalAdicionarLivro } from "../../components/Modals/ModalAdicionarLivro";
import { ModalCategorias } from "../../components/Modals/ModalCategorias";
import axios from "../../configs/axiosConfig";

export function Catalogo() {
    const [adicionarLivro, setAdicionarLivro] = useState(false);
    const [modalCategorias, setModalCategorias] = useState(false);
    const [livros, setLivros] = useState([]);
    const [busca, setBusca] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionadaId, setCategoriaSelecionadaId] = useState("");

    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const tamanhoPagina = 10;

    const buscarLivros = (pagina = 0) => {
        axios.get("/livros", {
            params: {
                pagina,
                tamanho: tamanhoPagina
            }
        })
        .then(response => {
            setLivros(response.data.content);
            setPaginaAtual(response.data.number);
            setTotalPaginas(response.data.totalPages);
        })
        .catch(error => {
            console.error("Erro ao buscar livros:", error);
        });
    };

    const buscarLivrosFiltrados = (pagina = 0) => {
        axios.get(`/livros/buscar/${encodeURIComponent(busca)}`, {
            params: {
                pagina,
                tamanho: tamanhoPagina
            }
        })
        .then(response => {
            setLivros(response.data.content);
            setPaginaAtual(response.data.number);
            setTotalPaginas(response.data.totalPages);
        })
        .catch(error => {
            console.error("Erro ao buscar livros:", error);
        });
    };

    const filtrarPorCategoria = (idCategoria, pagina = 0) => {
        if (idCategoria === "") {
            buscarLivros(pagina);
        } else {
            axios.get("/livros/filtrar-por-categoria", {
                params: {
                    categoriaIds: idCategoria,
                    pagina,
                    tamanho: tamanhoPagina
                }
            })
            .then(response => {
                setLivros(response.data.content);
                setPaginaAtual(response.data.number);
                setTotalPaginas(response.data.totalPages);
            })
            .catch(error => {
                console.error("Erro ao filtrar livros:", error);
            });
        }
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
            buscarLivrosFiltrados(paginaAtual);
        } else if (categoriaSelecionadaId !== "") {
            filtrarPorCategoria(categoriaSelecionadaId, paginaAtual);
        } else {
            buscarLivros(paginaAtual);
        }
    }, [busca, categoriaSelecionadaId, paginaAtual]);

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
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setPaginaAtual(0);
                        }
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
                        <select name="Status" className="w-28 border-[#727272] text-[#727272] border-[1px] rounded-full px-4 pr-8 outline-0 text-xs h-9 appearance-none">
                            <option value="">Status</option>
                            <option value="">Reservado</option>
                            <option value="">Disponível</option>
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
                {Array.isArray(livros) && livros.map(livro => (
                    <CatalogoListItem
                        key={livro.id}
                        id={livro.id}
                        livro={livro.nome}
                        autor={livro.autor}
                        categoria={livro.categoria}
                        descricao={livro.descricao}
                        qtdEmprestimos={livro.qtdEmprestimos || 0}
                        qtdLivros={livro.quantidade}
                        status={livro.status?.toLowerCase() || "disponível"}
                    />
                ))}
            </div>

            {/* Paginação */}
            <div className="mt-4 flex justify-center gap-4">
                <button
                    disabled={paginaAtual === 0}
                    onClick={() => setPaginaAtual(paginaAtual - 1)}
                    className="px-4 py-1 border rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                <span>Página {paginaAtual + 1} de {totalPaginas}</span>
                <button
                    disabled={paginaAtual + 1 >= totalPaginas}
                    onClick={() => setPaginaAtual(paginaAtual + 1)}
                    className="px-4 py-1 border rounded disabled:opacity-50"
                >
                    Próxima
                </button>
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
