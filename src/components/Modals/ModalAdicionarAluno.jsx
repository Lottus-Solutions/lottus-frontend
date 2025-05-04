import { X } from "lucide-react";
import { BotaoPrincipal } from "../botoes/BotaoPrincipal";
import { motion } from 'framer-motion';

export function ModalAdicionarAluno(props) {
    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-10 rounded-2xl w-[600px] shadow-lg relative flex flex-col items-center justify-center">
                <button
                    className="absolute top-8 right-8 cursor-pointer"
                    onClick={props.onClose}
                >
                    <X className="text-gray-400" />
                </button>
                <img src="/images/adicionar_livro.svg" alt="Adicionar Livro" className="w-16 mb-5" />
                <div className="mb-6 flex flex-col items-center">
                    <h3 className="text-xl">Adicionar um novo Aluno</h3>
                    <p className="text-[#727272]">Insira as informações do aluno abaixo para cadastrá-lo</p>
                </div>
                <form className="flex flex-col gap-4 w-[80%] mb-6">
                    <p className="text-[#414651]">Nome do aluno*</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-4 py-[5px] text-sm"
                    />
                    <p className="text-[#414651]">Matricula*</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-4 py-[5px] text-sm"
                    />
                    <p className="text-[#414651]">Grau*</p>
                    <div className="flex gap-4 mt-4">
                        <div className="flex gap-2">
                            <input type="checkbox" />
                            <p className="text-[#727272] text-xs">Pré</p>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" />
                            <p className="text-[#727272] text-xs">1° Fundamental</p>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" />
                            <p className="text-[#727272] text-xs">2° Fundamental</p>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" />
                            <p className="text-[#727272] text-xs">Ensino Médio</p>
                        </div>
                    </div>
                    <select name="Turma" className="border border-gray-300 rounded px-4 py-[5px] text-sm outline-0 appearance-none mt-4 mb-4">
                        <option value="">Selecione uma turma</option>
                        <option value="">1° Ano</option>
                        <option value="">2° Ano</option>
                        <option value="">3° Ano</option>
                        <option value="">4° Ano</option>
                    </select>


                </form>

                <BotaoPrincipal nome="Salvar" />
            </motion.div>
        </div>
    )
}
