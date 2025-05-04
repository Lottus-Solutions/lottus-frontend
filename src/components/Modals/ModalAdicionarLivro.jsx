import { X } from "lucide-react";
import { BotaoPrincipal } from "../botoes/BotaoPrincipal";
import { motion } from 'framer-motion';

export function ModalAdicionarLivro(props) {
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
                    <h3 className="text-xl">Adicionar um novo livro</h3>
                    <p className="text-[#727272]">Insira as informações do livro abaixo para cadastrá-lo</p>
                </div>
                <form className="flex flex-col gap-4 w-[80%] mb-6">
                    <p className="text-[#414651]">ISBN</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-4 py-[5px] text-sm"
                    />
                    <p className="text-[#414651]">Nome do livro*</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-4 py-[5px] text-sm"
                    />
                    <p className="text-[#414651]">Autor do livro*</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-4 py-[5px] text-sm"
                    />
                    <p className="text-[#414651]">Categoria*</p>
                    <select name="Categoria" className="border border-gray-300 rounded px-4 py-[5px] text-sm outline-0 appearance-none">
                        <option value="">Aventura</option>
                        <option value="">Terror</option>
                        <option value="">Ficção</option>
                        <option value="">Infantil</option>
                    </select>
                    <p className="text-[#414651]">Quantidade de livros*</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-4 py-[5px] text-sm"
                    />
                </form>

                <BotaoPrincipal nome="Salvar" />
            </motion.div>
        </div>
    )
}
