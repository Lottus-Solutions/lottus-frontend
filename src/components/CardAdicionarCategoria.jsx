import { X, Check } from "lucide-react";
import { motion } from 'framer-motion';
import { BotaoPrincipal } from "./Botoes/BotaoPrincipal";
import { useState } from "react";
import axios from '../configs/axiosConfig';

export function CardAdicionarCategoria(props) {
    const [selectedColor, setSelectedColor] = useState("#0292B7");
    const [nome, setNome] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const coresDisponiveis = [
        "#D7263D",
        "#F94144",
        "#FF4D6D",
        "#F9C74F",
        "#90BE6D",
        "#43AA8B",
        "#577590",
        "#277DA1",
        "#9B5DE5",
        "#8338EC"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const novoId = Date.now();

        const payload = {
            
            nome: nome,
            cor: selectedColor
        };

        try {
            const response = await axios.post('/categorias', payload);

            // Callback para atualizar lista no componente pai
            if (props.onCategoriasAtualizadas) {
                props.onCategoriasAtualizadas();
            }

            props.onClose();

        } catch (err) {
            // Se err.response existir, pega a mensagem do backend, senão mensagem padrão
            setError(err.response?.data?.message || 'Erro ao adicionar categoria.');
        } finally {
            setLoading(false);
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
                    onClick={props.onClose}
                    disabled={loading}
                >
                    <X className="text-gray-400" />
                </button>

                <img src="/images/adicionar_livro.svg" alt="Adicionar Livro" className="w-16 mb-5" />

                <div className="mb-6 flex flex-col items-center">
                    <h3 className="text-xl font-semibold">Adicionar Categoria</h3>
                    <p className="text-[#727272]">Insira as informações abaixo para cadastrar uma nova categoria</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 w-[80%] mb-6"
                >
                    <label className="text-[#414651]">
                        Nome da categoria
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-[6px] text-sm w-full mt-1"
                            required
                            disabled={loading}
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

                    {error && <p className="text-red-600 mb-2">{error}</p>}

                    <BotaoPrincipal nome={loading ? "Salvando..." : "Salvar"} type="submit" disabled={loading} />
                </form>
            </motion.div>
        </div>
    );
}
