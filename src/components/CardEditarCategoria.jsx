import { X, Check } from "lucide-react";
import { motion } from 'framer-motion';
import { BotaoPrincipal } from "./Botoes/BotaoPrincipal";
import { useEffect, useState } from "react";
import axios from "../configs/axiosConfig";

export function CardEditarCategoria(props) {
    const [selectedColor, setSelectedColor] = useState("#0292B7");
    const [nome, setNome] = useState("");

    useEffect(() => {
        setNome(props.nomeInicial || "");
        setSelectedColor(props.corInicial || "#0292B7");
    }, [props.nomeInicial, props.corInicial]);

    const coresDisponiveis = [
        "#D7263D", "#F94144", "#FF4D6D", "#F9C74F", "#90BE6D",
        "#43AA8B", "#577590", "#277DA1", "#9B5DE5", "#8338EC"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/categorias/${props.id}`, {
                nome: nome,
                cor: selectedColor
            })



            props.onCategoriasAtualizadas(); // atualiza a lista

            props.onClose();

        } catch (error) {
            console.error("Erro ao editar categoria:", error);
            alert("Erro ao editar categoria.");
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
                <button className="absolute top-8 right-8 cursor-pointer" onClick={props.onClose}>
                    <X className="text-gray-400" />
                </button>

                <img src="/images/edit-icon.svg" alt="Editar Categoria" className="w-16 mb-5" />

                <div className="mb-6 flex flex-col items-center">
                    <h3 className="text-xl font-semibold">Editar Categoria</h3>
                    <p className="text-[#727272]">Atualize as informações desejadas</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[80%] mb-6">
                    <label className="text-[#414651]">
                        Nome da categoria
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-[6px] text-sm w-full mt-1"
                            required
                        />
                    </label>

                    <label className="text-[#414651] mt-4">
                        Selecione uma cor
                        <div className="flex gap-3 mt-2 mb-8">
                            {coresDisponiveis.map((cor) => (
                                <div
                                    key={cor}
                                    onClick={() => setSelectedColor(cor)}
                                    className={`w-8 h-8 rounded-full cursor-pointer border-2 flex items-center justify-center transition
                    ${selectedColor === cor ? 'border-black' : 'border-transparent'}
                    hover:scale-110`}
                                    style={{ backgroundColor: cor }}
                                >
                                    {selectedColor === cor && (
                                        <Check className="w-4 h-4 text-white" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </label>

                    <BotaoPrincipal nome="Salvar" type="submit" />
                </form>
            </motion.div>
        </div>
    );
}
