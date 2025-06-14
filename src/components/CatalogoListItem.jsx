import { MenuIcon } from "lucide-react";
import { BotaoPrincipal } from "./botoes/BotaoPrincipal";
import { StatusItem } from "./StatusItem";
import { useState } from "react";
import { ModalDetalhesLivro } from "../components/Modals/ModalDetalhesLivro";
import { ModalAdicionarEmprestimo } from "../components/Modals/ModalAdicionarEmprestimo";
import { BotaoInativo } from "./botoes/BotaoInativo";
import { CategoriaItem } from "./CategoriaItem";

export function CatalogoListItem(props) {
    const [modalDetalhes, setModalDetalhes] = useState(false);
    const [modalEmprestimo, setModalEmprestimo] = useState(false);


    return (
        <div className="flex gap-x-12 border-b-[1px] border-[#727272] pb-8 justify-around items-center">
            <div className="flex flex-col gap-3 w-20 ml-5">
                <p className="text-[#727272] text-xs">ID</p>
                <p className="text-xs">{props.id}</p>
            </div>
            <div className="flex flex-col gap-3 w-64">
                <p className="text-[#727272] text-xs">Livro</p>
                <p className="text-xs">{props.livro}</p>
            </div>
            <div className="flex flex-col gap-3 w-64">
                <p className="text-[#727272] text-xs">Autor</p>
                <p className="text-xs">{props.autor}</p>
            </div>
            <div className="flex flex-col gap-3 w-24">
                <p className="text-[#727272] text-xs">Categoria</p>
                <CategoriaItem categoria={props.categoria} backgroundColor={props.cor} />
            </div>
            <div className="flex flex-col gap-3 w-24">
                <p className="text-[#727272] text-xs">Qtd. Livros</p>
                <p className="text-xs">{props.qtdLivros}</p>
            </div>
            <div className="flex flex-col gap-3 w-40">
                <p className="text-[#727272] text-xs">Status</p>
                {props.status === "disponivel" ? (
                    <StatusItem status="disponivel" qtdLivros={props.qtdLivros} qtdDisponivel={props.qtdDisponivel} />
                ) : (
                    <StatusItem status="reservado" qtdLivros={props.qtdLivros} qtdDisponivel={props.qtdDisponivel} />
                )}
            </div>
            <div className="flex items-center gap-5 mr-5 mt-5">
                {props.status === "disponivel" && props.qtdLivros > 0 ? (
                    <BotaoPrincipal nome="Emprestar" onClick={() => setModalEmprestimo(true)} />
                ) : (
                    <BotaoInativo nome="Indisponível" />
                )}
                <div onClick={() => setModalDetalhes(true)}>
                    <MenuIcon className="w-4 h-4 text-[#727272] cursor-pointer" />
                </div>
            </div>

            {modalDetalhes && (
                <ModalDetalhesLivro
                    onClose={() => setModalDetalhes(false)}
                    id={props.id}
                    livro={props.livro}
                    autor={props.autor}
                    categoria={props.categoria}
                    quantidade={props.qtdLivros}
                    reservados={props.qtdEmprestimos}
                    descricao={props.descricao}
                    onExclusaoFeito={props.onExclusaoFeito}
                />
            )}

            {modalEmprestimo && (
                <ModalAdicionarEmprestimo
                    onClose={() => setModalEmprestimo(false)}
                    livro={props.livro}
                    livroId={props.id}
                    onEmprestimoFeito={props.onEmprestimoFeito} />
            )}
        </div>


    )
}