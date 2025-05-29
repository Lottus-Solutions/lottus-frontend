import { X } from "lucide-react";
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from "../configs/axiosConfig";

export function CardEditarAluno({ aluno, onClose, onAlunoEditado }) {
    const [nome, setNome] = useState(aluno?.nome || "");
    const [salvando, setSalvando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSalvando(true);
        try {
            const response = await axios.put(`/alunos/editar/${aluno.matricula}`, { nome });

            // Atualiza o componente pai com os novos dados
            if (onAlunoEditado) {
                onAlunoEditado(response.data);
            }

            onClose(); // Fecha o modal
        } catch (error) {
            console.error("Erro ao editar aluno:", error);
        } finally {
            setSalvando(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-10 rounded-2xl w-[600px] shadow-lg relative flex flex-col items-center justify-center"
            >
                <button
                    className="absolute top-8 right-8 cursor-pointer"
                    onClick={onClose}
                >
                    <X className="text-gray-400" />
                </button>
                <img src="/images/edit-icon.svg" alt="Editar Aluno" className="w-16 mb-5" />
                <div className="mb-6 flex flex-col items-center">
                    <h3 className="text-xl">Editar Informações do Aluno</h3>
                    <p className="text-[#727272]">Insira as informações que deseja alterar</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[80%] mb-6">
                    <label htmlFor="nome" className="text-[#414651]">Nome do aluno</label>
                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm mb-6"
                    />

                    <button
                        type="submit"
                        disabled={salvando}
                        className={`min-w-30 w-fit h-9 flex items-center justify-center px-4 rounded-full text-white text-xs 
                            ${salvando ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0292B7] border-[#0292B7] border-[1px]'}`}
                    >
                        {salvando ? "Salvando..." : "Salvar"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
