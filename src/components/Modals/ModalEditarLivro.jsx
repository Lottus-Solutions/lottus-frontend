import { X } from "lucide-react";
import { BotaoPrincipal } from "../botoes/BotaoPrincipal";
import { motion } from 'framer-motion';
import axios from "../../configs/axiosConfig";
import { useState } from "react";

export function ModalEditarLivro(props) {
    const [categorias, setCategorias] = useState([]);

    const buscarCategorias = () => {
        axios.get("/categorias")
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar categorias:", error);
            });
    };

    useEffect(() => {
        buscarCategorias();
    }, []);

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
                <img src="/images/edit-icon.svg" alt="Editar Livro" className="w-16 mb-5" />
                <div className="mb-6 flex flex-col items-center">
                    <h3 className="text-xl">Editar informações livro</h3>
                    <p className="text-[#727272]">Atualize as informações para </p>
                </div>
                <form className="flex flex-col gap-4 w-[80%] mb-6">

                    <p className="text-[#414651]">Nome do livro</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                    />
                    <p className="text-[#414651]">Autor</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                    />
                    <p className="text-[#414651]">Categorias</p>
                    <select name="Categoria" className="border border-gray-300 rounded px-2 py-[5px] text-sm outline-0">
                        <option value="">Selecione</option>
                        {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                    </select>
                    <p className="text-[#414651]">Quantidade de livros</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                    />
                </form>

                <BotaoPrincipal nome="Salvar" />
            </motion.div>
        </div>
    )
}
