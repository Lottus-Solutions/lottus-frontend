import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { UltimosLeitoresListItem } from '../UltimosLeitoresListItem';
import { ConfirmExcluirLivro } from './ConfirmExcluirLivro';
import { useState } from 'react';
import { CardLivroAtual } from '../SiteComponents/CardLivroAtual';
import { HistoricoLeituraListItem } from '../HistoricoLeituraListItem';

export function ModalDetalhesAluno(props) {
    const [confirmExcluir, setConfirmExcluir] = useState(false);

    const maximoObrigatorio = 4;

    const totalLimitado = Math.min(4, maximoObrigatorio);
    const lidosLimitado = Math.min(2, maximoObrigatorio);

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
                        <div className='flex items-center gap-4'>
                            <h2 className="text-[#0292B7] text-2xl font-semibold">Matheus Blasco</h2>
                            <span className='text-sm text-black mt-2'>0.00</span>
                        </div>

                        <p className="text-base">CEAD - 1° Ano A</p>
                    </div>

                    <div className='flex gap-4 items-center'>
                        <p>Livros Obrigatórios</p>
                        <div className="flex items-center gap-12">
                            <div className="flex gap-1">
                                {Array.from({ length: totalLimitado }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-7 h-1 rounded-sm ${i < lidosLimitado ? 'bg-[#0292B7]' : 'bg-gray-300'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p>Livro Atual</p>
                        <CardLivroAtual />
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
                    <p>Histórico de Leitura</p>
                    <div className="w-[95%] mt-6 h-9/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar">
                        <HistoricoLeituraListItem />
                    </div>
                </div>
            </motion.div>

            {confirmExcluir && (
                <ConfirmExcluirLivro onClose={() => setConfirmExcluir(false)} />
            )}
        </div>
    );
}
