import { useEffect, useState } from 'react';
import axios from "../../configs/axiosConfig";
import { HistoricoLeituraListItem } from '../HistoricoLeituraListItem';
import { ConfirmExcluirAluno } from './ConfirmExcluirAluno';
import { CardLivroAtual } from '../CardLivroAtual';
import { CardEditarAluno } from '../CardEditarAluno';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export function ModalDetalhesAluno({ onClose, matricula, turma, atualizarAlunoNaLista, onExclusaoFeito }) {
    const [confirmExcluir, setConfirmExcluir] = useState(false);
    const [historico, setHistorico] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [dadosAluno, setDadosAluno] = useState(null); // Será preenchido após o GET
    const [refresh, setRefresh] = useState(false);
    const [perfil, setPerfil] = useState(null);

    
    // Buscar os dados completos do aluno pela matrícula
    useEffect(() => {
        async function fetchAluno() {
            if (!matricula) return;
            try {
                const response = await axios.get(`/alunos/${matricula}`);
                setDadosAluno(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados do aluno:", error);
            }
        }

        fetchAluno();
    }, [matricula, refresh]);

    // Buscar o histórico de leitura
    useEffect(() => {
        async function fetchHistorico() {
            if (!dadosAluno?.matricula) return;
            try {
                const response = await axios.get(`/emprestimos/historico/aluno/${dadosAluno.matricula}`);
                setHistorico(response.data);
            } catch (error) {
                console.error("Erro ao buscar histórico de leitura:", error);
            }
        }

        fetchHistorico();
    }, [dadosAluno]);

    useEffect(() => {
        async function fetchPerfilAluno() {
            if (!matricula) return;
            try {
                const response = await axios.get(`/alunos/perfil/${matricula}`);
                setPerfil(response.data);
            } catch (error) {
                console.error("Erro ao buscar perfil do aluno:", error);
            }
        }

        fetchPerfilAluno();
    }, [matricula, refresh]);

    if (!dadosAluno) return null;

    const maximoObrigatorio = 4;
    const totalLimitado = Math.min(4, maximoObrigatorio);
    const lidosLimitado = Math.min(dadosAluno.qtdLivrosLidos || 0, maximoObrigatorio);

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-10 rounded-2xl w-[80%] h-[80%] shadow-lg pt-16 relative flex"
            >
                <button className="absolute top-8 right-8 cursor-pointer" onClick={onClose}>
                    <X className="text-gray-400" />
                </button>

                {/* LADO ESQUERDO */}
                <div className="flex flex-col gap-6 w-1/3 max-h-full">
                    <div className="flex flex-col gap-2">
                        <div className='flex items-center gap-4'>
                            <h2 className="text-[#0292B7] text-2xl font-semibold">{dadosAluno.nome}</h2>
                            <span className='text-sm text-black mt-2'>{dadosAluno.qtdBonus?.toFixed(2) || "0.00"}</span>
                        </div>
                        <p className="text-base">{turma}</p>
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
                        <CardLivroAtual
                            livro={perfil?.livro}
                            dataDevolucao={perfil?.dataDevolucao}
                            isAtrasado={perfil?.atualIsAtrasado}
                        />
                    </div>

                    <div className="absolute bottom-10 flex gap-4">
                        <img
                            src="/images/edit-circle.svg"
                            alt="Editar"
                            className="cursor-pointer"
                            onClick={() => setModalEditar(true)}
                        />
                        <img
                            src="/images/delete-circle.svg"
                            alt="Excluir"
                            className="cursor-pointer"
                            onClick={() => setConfirmExcluir(true)}
                        />
                    </div>
                </div>

                {/* LADO DIREITO - HISTÓRICO */}
                <div className="w-2/3">
                    <p>Histórico de Leitura</p>
                    <div className="w-[95%] mt-6 h-9/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar">
                        {historico.length === 0 ? (
                            <p className="text-sm text-gray-500">Nenhum histórico encontrado.</p>
                        ) : (
                            historico.map((item) => (
                                <HistoricoLeituraListItem key={item.id} item={item} />
                            ))
                        )}
                    </div>
                </div>
            </motion.div>

            {confirmExcluir && (
                <ConfirmExcluirAluno

                    onClose={() => setConfirmExcluir(false)}
                    onConfirm={async () => {
                        try {
                            await axios.delete(`/alunos/remover/${dadosAluno.matricula}`);
                            setConfirmExcluir(false);
                            onClose();
                            onExclusaoFeito && onExclusaoFeito();
                        } catch (error) {
                            console.error("Erro ao remover aluno:", error);
                        }
                    }}
                />
            )}

            {modalEditar && (
                <CardEditarAluno
                    aluno={dadosAluno}
                    onClose={() => setModalEditar(false)}
                    onAlunoEditado={(alunoAtualizado) => {
                        if (atualizarAlunoNaLista) atualizarAlunoNaLista(alunoAtualizado);
                        setDadosAluno(alunoAtualizado);
                        setModalEditar(false);
                        setRefresh(prev => !prev);
                    }}
                />
            )}
        </div>
    );
}
