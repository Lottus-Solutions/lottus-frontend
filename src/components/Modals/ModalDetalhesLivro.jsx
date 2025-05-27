import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { UltimosLeitoresListItem } from '../UltimosLeitoresListItem';
import { ConfirmExcluirLivro } from './ConfirmExcluirLivro';
import { useState, useEffect } from 'react';
import { ModalEditarLivro } from './ModalEditarLivro';
import axios from "../../configs/axiosConfig";
import { AlertSucesso } from '../Alerts/AlertSucesso';

export function ModalDetalhesLivro(props) {
    const [confirmExcluir, setConfirmExcluir] = useState(false);
    const [ModalEditarLivroOpen, setModalEditarOpen] = useState(false);
    const [leitores, setLeitores] = useState([]);
    const [exibirAlerta, setExibirAlerta] = useState(false);

    const [detalhesLivro, setDetalhesLivro] = useState({
        livro: props.livro,
        autor: props.autor,
        descricao: props.descricao,
        quantidade: props.quantidade,
        reservados: props.reservados,
        categoria: props.categoria,
        categoriaId: props.categoriaId,
        id: props.id
    });

    useEffect(() => {
        setDetalhesLivro({
            livro: props.livro,
            autor: props.autor,
            descricao: props.descricao,
            quantidade: props.quantidade,
            reservados: props.reservados,
            categoria: props.categoria,
            categoriaId: props.categoriaId,
            id: props.id
        });
    }, [props]);

    useEffect(() => {
        async function carregarLeitores() {
            try {
                const response = await axios.get(`/emprestimos/historico/livro/${props.id}`);
                setLeitores(response.data);
            } catch (error) {
                console.error("Erro ao buscar histórico de leitores:", error);
            }
        }

        carregarLeitores();
    }, [props.id]);

    async function excluirLivro() {
        try {
            await axios.delete(`/livros/${detalhesLivro.id}`);
            setConfirmExcluir(false);
            setExibirAlerta(true);
        } catch (error) {
            console.error("Erro ao excluir o livro:", error);
        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white p-10 rounded-2xl w-[80%] h-[80%] shadow-lg pt-16 relative flex"
                >
                    <button
                        className="absolute top-8 right-8 cursor-pointer"
                        onClick={props.onClose}
                    >
                        <X className="text-gray-400" />
                    </button>

                    <div className="flex flex-col gap-6 w-1/3 max-h-full">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[#0292B7] text-xl font-semibold">{detalhesLivro.livro}</h2>
                            <p className="text-base">{detalhesLivro.autor}</p>
                        </div>

                        <div className="bg-[#0292B7] w-fit px-7 py-1 rounded-full flex items-center justify-center">
                            <p className="text-sm text-white">{detalhesLivro.categoria}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="text-sm flex items-center gap-1">
                                <span>Quantidade:</span>
                                <span className="text-[#727272]">{detalhesLivro.quantidade}</span>
                            </div>
                            <div className="text-sm flex items-center gap-1">
                                <span>Reservados:</span>
                                <span className="text-[#727272]">{detalhesLivro.reservados}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-[80%]">
                            <p className="text-sm">Descrição:</p>
                            <p className="text-sm text-[#727272]">{detalhesLivro.descricao}</p>
                        </div>

                        <div className="absolute bottom-10 flex gap-4">
                            <img
                                src="/images/edit-circle.svg"
                                alt="Editar"
                                className="cursor-pointer"
                                onClick={() => setModalEditarOpen(true)}
                            />
                            <img
                                src="/images/delete-circle.svg"
                                alt="Excluir"
                                className="cursor-pointer"
                                onClick={() => setConfirmExcluir(true)}
                            />
                        </div>
                    </div>

                    <div className="w-2/3">
                        <p>Últimos leitores</p>
                        <div className="w-[95%] mt-6 h-9/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar">
                            {leitores.length === 0 ? (
                                <p className="text-sm text-[#727272]">Nenhum leitor encontrado.</p>
                            ) : (
                                leitores
                                    .filter(leitor => leitor?.aluno && leitor?.aluno?.turma)
                                    .map((leitor, index) => (
                                        <UltimosLeitoresListItem key={index} leitor={leitor} />
                                    ))
                            )}
                        </div>
                    </div>
                </motion.div>

                {confirmExcluir && (
                    <ConfirmExcluirLivro
                        onClose={() => setConfirmExcluir(false)}
                        onConfirm={excluirLivro}
                    />
                )}

                {ModalEditarLivroOpen && (
                    <ModalEditarLivro
                        id={detalhesLivro.id}
                        livro={detalhesLivro.livro}
                        autor={detalhesLivro.autor}
                        descricao={detalhesLivro.descricao}
                        quantidade={detalhesLivro.quantidade}
                        categoria={detalhesLivro.categoria}
                        categoriaId={detalhesLivro.categoriaId}
                        onClose={() => setModalEditarOpen(false)}
                        onAtualizar={(dadosAtualizados) => {
                            setDetalhesLivro(dadosAtualizados);
                        }}
                    />
                )}
            </div>

            {exibirAlerta && (
                <AlertSucesso
                    onClose={() => setExibirAlerta(false)}
                    titulo="Livro excluído com sucesso"
                    descricao="O livro foi removido do catálogo e não está mais disponível para empréstimos."
                />
            )}
        </>
    );
}
