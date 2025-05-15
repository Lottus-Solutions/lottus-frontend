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

    const buscarLivros = () => {
        axios.get("/livros")
            .then(response => {
                setLivros(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar livros:", error);
                alert("Erro ao carregar o catálogo.");
            });
    };

    useEffect(() => {
        buscarLivros();
    }, []);

    return (
        <div className="h-screen pt-16 pl-16 relative">
            <Perfil />
            <h2 className="text-3xl font-bold text-[#0292B7] mb-10">Catálogo</h2>
            <div className="flex justify-between w-9/10">
                <Search placeholder="Busque por livro, autor ou ID" />
                <div className="flex gap-4">
                    <div className="relative inline-block">
                        <select name="Categoria" className="w-28 border-[#727272] text-[#727272] border-[1px] rounded-full px-4 pr-8 outline-0 text-xs h-9 appearance-none">
                            <option value="">Categorias</option>
                            <option value="">Aventura</option>
                            <option value="">Terror</option>
                            <option value="">Ficção</option>
                            <option value="">Infantil</option>
                        </select>
                        <Filter className="absolute top-1/2 right-3 -translate-y-1/2 text-[#727272]" size={14} />
                    </div>
                    <div className="relative inline-block">
                        <select name="Status" className="w-28 border-[#727272] text-[#727272] border-[1px] rounded-full px-4 pr-8 outline-0 text-xs h-9 appearance-none">
                            <option value="">Status</option>
                            <option value="">Reservado</option>
                            <option value="">Disponivel</option>
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
                {livros.map(livro => (
                    <CatalogoListItem
                        key={livro.id}
                        id={livro.id}
                        livro={livro.nome}
                        autor={livro.autor}
                        categoria={livro.categoria}
                        qtdEmprestimos={livro.qtdEmprestimos || 0}
                        qtdLivros={livro.quantidade}
                        status={livro.status?.toLowerCase() || "disponivel"}
                    />
                ))}
            </div>

            {adicionarLivro && (
                <ModalAdicionarLivro 
                    onClose={() => setAdicionarLivro(false)} 
                    atualizarLista={buscarLivros}
                />
            )}
            {modalCategorias && (
                <ModalCategorias onClose={() => setModalCategorias(false)} />
            )}
        </div>
    );
}
