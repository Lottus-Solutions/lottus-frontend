import { X } from "lucide-react";
import { BotaoPrincipal } from "../botoes/BotaoPrincipal";
import { motion } from 'framer-motion';
import axios from "../../configs/axiosConfig";
import { useEffect, useState } from "react";

export function ModalEditarLivro(props) {
    const [categorias, setCategorias] = useState([]);

    // Estados dos campos do formulário
    const [livro, setLivro] = useState('');
    const [autor, setAutor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [categoriaId, setCategoriaId] = useState('');

    useEffect(() => {
        axios.get("/categorias")
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar categorias:", error);
            });
    }, []);

    // Quando props mudarem (ex: ao abrir o modal), setar os campos com os valores recebidos
    useEffect(() => {
        if (props.livro) setLivro(props.livro);
        if (props.autor) setAutor(props.autor);
        if (props.descricao) setDescricao(props.descricao);
        if (props.quantidade) setQuantidade(props.quantidade);
        if (props.categoriaId) setCategoriaId(props.categoriaId);
    }, [props]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoriaIdNum = Number(categoriaId);
        const quantidadeNum = Number(quantidade);

        if (!livro || !autor || !descricao || !categoriaIdNum || isNaN(quantidadeNum)) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        try {
            await axios.put(`/livros/${props.id}`, {
                nome: livro,
                autor,
                quantidade: quantidadeNum,
                categoriaId: categoriaIdNum,
                descricao
            });

            // Atualiza detalhes no modal anterior
            if (props.onAtualizar) {
                props.onAtualizar({
                    id: props.id,
                    livro: livro,
                    autor,
                    quantidade: quantidadeNum,
                    categoria: categorias.find(c => c.id === categoriaIdNum)?.nome || "",
                    categoriaId: categoriaIdNum,
                    descricao
                });
            }

            props.onClose();
        } catch (error) {
            console.error("Erro ao atualizar livro:", error);
            alert("Erro ao atualizar livro.");
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
                >
                    <X className="text-gray-400" />
                </button>
                <img src="/images/edit-icon.svg" alt="Editar Livro" className="w-16 mb-5" />
                <div className="mb-6 flex flex-col items-center">
                    <h3 className="text-xl">Editar informações do livro</h3>
                    <p className="text-[#727272]">Atualize as informações desejadas</p>
                </div>

                <form className="flex flex-col gap-4 w-[80%] mb-6" onSubmit={handleSubmit}>
                    <label htmlFor="nome" className="text-[#414651]">Nome do livro</label>
                    <input
                        id="nome"
                        type="text"
                        value={livro}
                        onChange={(e) => setLivro(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                    />

                    <label htmlFor="autor" className="text-[#414651]">Autor</label>
                    <input
                        id="autor"
                        type="text"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                    />

                    <label htmlFor="categoria" className="text-[#414651]">Categorias</label>
                    <select
                        id="categoria"
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm outline-0"
                    >
                        <option value="">Selecione</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="quantidade" className="text-[#414651]">Quantidade de livros</label>
                    <input
                        id="quantidade"
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                    />

                    <label htmlFor="descricao" className="text-[#414651]">Descrição</label>
                    <textarea
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                        rows={3}
                    />
                    
                    <BotaoPrincipal nome="Salvar" type="submit" />
                </form>
            </motion.div>
        </div>
    );
}
