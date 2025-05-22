import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { UltimosLeitoresListItem } from '../UltimosLeitoresListItem';
import { ConfirmExcluirLivro } from './ConfirmExcluirLivro';
import { useState } from 'react';
import { ModalEditarLivro } from './ModalEditarLivro';

export function ModalDetalhesLivro(props) {
    const [confirmExcluir, setConfirmExcluir] = useState(false);
    const [ModalEditarLivroOpen, setModalEditarOpen] = useState(false);

    // Estado local dos dados do livro
    const [livroData, setLivroData] = useState({
        id: props.id,
        livro: props.livro,
        autor: props.autor,
        quantidade: props.quantidade,
        categoria: props.categoria,
        categoriaId: props.categoriaId,
        descricao: props.descricao
    });

    // Atualiza os dados quando o livro for editado
    const handleAtualizacaoLivro = (novoLivro) => {
        setLivroData(novoLivro);
        setModalEditarOpen(false); // Fecha o modal de edição
    };

    return (
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
                        <h2 className="text-[#0292B7] text-xl font-semibold">{props.livro}</h2>
                        <p className="text-base">{props.autor}</p>
                    </div>

                    <div className="bg-[#0292B7] w-fit px-7 py-1 rounded-full flex items-center justify-center">
                        <p className="text-sm text-white">{props.categoria}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="text-sm flex items-center gap-1">
                            <span>Quantidade:</span>
                            <span className="text-[#727272]">{props.quantidade}</span>
                        </div>
                        <div className="text-sm flex items-center gap-1">
                            <span>Reservados:</span>
                            <span className="text-[#727272]">{props.reservados}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-[80%]">
                        <p className="text-sm">Descrição:</p>
                        <p className="text-sm text-[#727272]">{props.descricao}</p>
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
                        <UltimosLeitoresListItem />
                        {/* outros leitores... */}
                    </div>
                </div>
            </motion.div>

            {confirmExcluir && (
                <ConfirmExcluirLivro onClose={() => setConfirmExcluir(false)} />
            )}

            {ModalEditarLivroOpen && (
                <ModalEditarLivro
                    onClose={() => setModalEditarOpen(false)}
                    onAtualizar={handleAtualizacaoLivro}
                    id={props.id}
                    livro={props.livro}
                    autor={props.autor}
                    quantidade={props.quantidade}
                    categoriaId={props.categoriaId}
                    descricao={props.descricao}
                />
            )}
        </div>
    );
}
