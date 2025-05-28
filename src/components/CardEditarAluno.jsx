import { X } from "lucide-react";
import { motion } from 'framer-motion';
import { BotaoPrincipal } from "./Botoes/BotaoPrincipal";

export function CardEditarAluno(props) {

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
                    onClick={props.onClose}
                >
                    <X className="text-gray-400" />
                </button>
                <img src="/images/edit-icon.svg" alt="Editar Livro" className="w-16 mb-5" />
                <div className="mb-6 flex flex-col items-center">
                    <h3 className="text-xl">Editar Informações do Aluno</h3>
                    <p className="text-[#727272]">Insira as informações que deseja alterar</p>
                </div>

                <form className="flex flex-col gap-4 w-[80%] mb-6">
                    <label htmlFor="nome" className="text-[#414651]">Nome do aluno</label>
                    <input
                        id="nome"
                        type="text"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm mb-6"
                    />

                    <BotaoPrincipal nome="Salvar" type="submit" />
                </form>
            </motion.div>
        </div>
    );
}
