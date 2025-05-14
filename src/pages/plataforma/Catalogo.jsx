import { useState } from "react";
import { ChartColumnStacked, Filter } from "lucide-react";
import { BotaoPrincipal } from "../../components/botoes/BotaoPrincipal";
import { CatalogoListItem } from "../../components/CatalogoListItem";
import { Perfil } from "../../components/Perfil";
import { Search } from "../../components/Search";
import { ModalAdicionarLivro } from "../../components/Modals/ModalAdicionarLivro";

export function Catalogo() {
    const [mostrarModal, setMostrarModal] = useState(false);

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
                    >
                        <ChartColumnStacked className="w-5 h-5 text-[#0292B7]" />
                    </button>
                    <div onClick={() => setMostrarModal(true)}>
                        <BotaoPrincipal nome="Adicionar Livro" />
                    </div>
                </div>
            </div>
            <div className="mt-12 w-9/10 h-7/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar">
                <CatalogoListItem 
                    id="1"
                    livro="Harry Potter e a Pedra Filosofal"
                    autor="J.K. Rowling"
                    categoria="Ficção"
                    qtdEmprestimos={2}
                    qtdLivros={3}
                    status="reservado"
                />
                <CatalogoListItem 
                    id="2"
                    livro="Harry Potter e a Pedra Filosofal"
                    autor="J.K. Rowling"
                    categoria="Ficção"
                    qtdEmprestimos={0}
                    qtdLivros={3}
                    status="disponivel"
                />
                <CatalogoListItem 
                    id="3"
                    livro="Harry Potter e a Pedra Filosofal"
                    autor="J.K. Rowling"
                    categoria="Ficção"
                    qtdEmprestimos={2}
                    qtdLivros={3}
                    status="reservado"
                />
                <CatalogoListItem 
                    id="4"
                    livro="Harry Potter e a Pedra Filosofal"
                    autor="J.K. Rowling"
                    categoria="Ficção"
                    qtdEmprestimos={0}
                    qtdLivros={3}
                    status="disponivel"
                />
                
            </div>

            {mostrarModal && (
                <ModalAdicionarLivro onClose={() => setMostrarModal(false)} />
            )}
        </div>
    );
}
