import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { BotaoPrincipal } from "../botoes/BotaoPrincipal";
import { motion } from 'framer-motion';
import axios from "../../configs/axiosConfig";


export function ModalAdicionarLivro(props) {
    const [isbn, setIsbn] = useState("");
    const [nome, setNome] = useState("");
    const [autor, setAutor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [quantidade, setQuantidade] = useState("");



    const debounceRef = useRef(null);

    useEffect(() => {
        axios.get("/categorias")
            .then(response => setCategorias(response.data))
            .catch(error => console.error("Erro ao buscar categorias:", error));
    }, []);

    // Função para buscar dados no Google Books
    const buscarLivroPorIsbn = async (isbn) => {
        if (!isbn) return;
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
            const data = await response.json();
            if (data.totalItems > 0) {
                const livro = data.items[0].volumeInfo;
                setNome(livro.title || "");
                setAutor(livro.authors ? livro.authors.join(", ") : "");
            }
        } catch (error) {
            console.error("Erro ao buscar livro no Google Books:", error);
        }
    };

    useEffect(() => {
        if (isbn.length === 10 || isbn.length === 13) {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                buscarLivroPorIsbn(isbn);
            }, 500);
        }

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [isbn]);

    // Salvar livro no banco
    const handleSalvar = (e) => {
        e.preventDefault();

        const novoLivro = {
            nome: nome.trim(),
            autor: autor.trim(),
            quantidade: parseInt(quantidade),
            categoriaId: parseInt(categoriaSelecionada),
            descricao: descricao.trim(),
        };

        axios.post("/livros", novoLivro)
            .then(() => {
                if (props.onLivroAdicionado) props.onLivroAdicionado(); // ativa o alerta no Catalogo
                props.onClose(); // fecha o modal
                if (props.atualizarLista) props.atualizarLista();
            })
            .catch(error => console.error("Erro ao adicionar livro:", error));
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
                <img src="/images/adicionar_livro.svg" alt="Adicionar Livro" className="w-16 mb-5" />
                <div className="mb-6 flex flex-col items-center">
                    <h3 className="text-xl">Adicionar um novo livro</h3>
                    <p className="text-[#727272]">Insira as informações do livro abaixo para cadastrá-lo</p>
                </div>

                <form className="flex flex-col gap-4 w-[80%] mb-6" onSubmit={handleSalvar}>
                    <p className="text-[#414651]">ISBN</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        placeholder="Digite o ISBN"
                    />
                    <p className="text-[#414651]">Nome do livro*</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <p className="text-[#414651]">Autor do livro*</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        required
                    />
                    <p className="text-[#414651]">Descrição*</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                    <p className="text-[#414651]">Categoria*</p>
                    <select
                        value={categoriaSelecionada}
                        onChange={(e) => setCategoriaSelecionada(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm outline-0"
                        required
                    >
                        <option value="">Selecione</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>
                    <p className="text-[#414651]">Quantidade de livros*</p>
                    <input
                        type="number"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                        min="1"
                    />

                    <BotaoPrincipal nome="Salvar" />
                </form>
            </motion.div>
        </div>
    );
}
