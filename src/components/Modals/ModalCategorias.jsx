import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { BotaoPrincipal } from '../botoes/BotaoPrincipal';
import { useEffect, useState } from 'react';
import axios from '../../configs/axiosConfig';
import { CardAdicionarCategoria } from '../CardAdicionarCategoria';
import { CategoriaListItem } from '../CategoriaListItem';


export function ModalCategorias(props) {
    const [categorias, setCategorias] = useState([]);
    const [isAdicionando, setIsAdicionando] = useState(false);

    const buscarCategorias = () => {
        axios.get("/categorias")
            .then((response) => {
                setCategorias(response.data);
                
            })
            .catch((error) => {
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
                className="bg-white p-10 rounded-2xl w-[40%] h-[80%] shadow-lg pt-16 relative flex"
            >
                <button
                    className="absolute top-8 right-8 cursor-pointer"
                    onClick={props.onClose}
                >
                    <X className="text-gray-400" />
                </button>

                <div className="flex flex-col gap-6 w-full max-h-full">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[#0292B7] text-2xl font-semibold">
                            Categorias Cadastradas
                        </h2>
                    </div>

                    <div className="w-full mt-6 h-8/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar">
                        {categorias.map((categoria) => (
                            <CategoriaListItem
                                key={categoria.id}
                                id={categoria.id}
                                nome={categoria.nome}
                                descricao={categoria.descricao}
                                categoriaCor={categoria.cor}
                                onCategoriasAtualizadas={buscarCategorias}
                                qtdLivrosCadastrados={categoria.qtdLivrosCadastrados}
                            />

                        ))}
                    </div>

                    <BotaoPrincipal
                        nome="Adicionar Categoria"
                        onClick={() => setIsAdicionando(true)}
                    />
                </div>

                {isAdicionando && (
                    <CardAdicionarCategoria
                        onClose={() => setIsAdicionando(false)}
                        onCategoriasAtualizadas={() => {
                            buscarCategorias(); // continua atualizando a lista local
                            props.onCategoriasAtualizadas(); // notifica o Catalogo
                            setIsAdicionando(false); // fecha o card
                        }}
                    />

                )}

            </motion.div>
        </div>
    );
}
