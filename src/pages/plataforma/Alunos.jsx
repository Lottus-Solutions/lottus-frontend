import { useState } from "react";
import { AlunoListItem } from "../../components/AlunoListItem";
import { BotaoPrincipal } from "../../components/botoes/BotaoPrincipal";
import { Perfil } from "../../components/Perfil";
import { Search } from "../../components/Search";
import { ModalAdicionarAluno } from "../../components/Modals/ModalAdicionarAluno";


export function Alunos() {
    const [mostrarModal, setMostrarModal] = useState(false);

    return (
        <div className="h-screen pt-16 pl-16">
            <Perfil />
            <h2 className="text-3xl font-bold text-[#0292B7] mb-4">Alunos</h2>
            <p className="text-base text-[#0292B7] mb-10">Ensino Fundamental I - 1° Ano</p>
            <div className="flex justify-between w-9/10">
                <Search placeholder="Busque por matricula ou nome" />
                <div onClick={() => setMostrarModal(true)}>
                    <BotaoPrincipal nome="Adicionar Aluno" />
                </div>

            </div>
            <div className="mt-12 w-9/10 h-7/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar">
                <AlunoListItem />
                <AlunoListItem />
                <AlunoListItem />
                <AlunoListItem />
                <AlunoListItem />
                <AlunoListItem />
                <AlunoListItem />
                <AlunoListItem />
            </div>

            {mostrarModal && (
                <ModalAdicionarAluno onClose={() => setMostrarModal(false)} />
            )}
        </div>
    )
}