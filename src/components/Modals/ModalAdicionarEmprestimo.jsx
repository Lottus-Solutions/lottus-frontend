import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { BotaoPrincipal } from "../botoes/BotaoPrincipal";
import { motion } from 'framer-motion';

export function ModalAdicionarEmprestimo(props) {
    const [dataDevolucao, setDataDevolucao] = useState("");

    useEffect(() => {
        const hoje = new Date();
        hoje.setDate(hoje.getDate() + 15);
        const dataFormatada = hoje.toISOString().split('T')[0]; 
        setDataDevolucao(dataFormatada);
    }, []);

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
                <img src="/images/adicionar_livro.svg" alt="Adicionar Emprestimo" className="w-16 mb-5" />
                <div className="mb-6 flex flex-col items-center">
                    <h3 className="text-xl">Novo Empréstimo</h3>
                    <p className="text-[#727272]">Insira as informações para realizar um novo empréstimo</p>
                </div>
                <form className="flex flex-col gap-4 w-[80%] mb-6">
                    <p className="text-[#414651]">Nome do aluno</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                    />
                    <p className="text-[#414651]">Livro</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                    />
                    <p className="text-[#414651]">Data de devolução</p>
                    <input
                        type="date"
                        value={dataDevolucao}
                        onChange={(e) => setDataDevolucao(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                    />
                </form>

                <BotaoPrincipal nome="Realizar Empréstimo" />
            </motion.div>
        </div>
    );
}
