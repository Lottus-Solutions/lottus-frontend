import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { BotaoPrincipal } from "../botoes/BotaoPrincipal";
import { motion } from 'framer-motion';
import axios from "../../configs/axiosConfig";


export function ModalAdicionarEmprestimo(props) {
    const [dataDevolucao, setDataDevolucao] = useState("");
    const [turmas, setTurmas] = useState([]);
    const [turmaId, setTurmaId] = useState("");
    const [nomeAluno, setNomeAluno] = useState("");
    const [alunos, setAlunos] = useState([]);
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const debounceRef = useRef(null);
    const [error, setError] = useState("");


    useEffect(() => {
        getTurmas();
        const hoje = new Date();
        hoje.setDate(hoje.getDate() + 15);
        const dataFormatada = hoje.toLocaleDateString('pt-BR'); // Formato DD/MM/AAAA
        setDataDevolucao(dataFormatada);
    }, []);

    useEffect(() => {
        if (turmaId && nomeAluno.trim() !== "") {
            if (debounceRef.current) clearTimeout(debounceRef.current);

            debounceRef.current = setTimeout(() => {
                buscarAlunos();
            }, 500);

            return () => clearTimeout(debounceRef.current);
        } else {
            setAlunos([]);
        }
    }, [nomeAluno, turmaId]);

    function getTurmas() {
        axios.get("/alunos/listar-turmas")
            .then(response => setTurmas(response.data))
            .catch(error => console.error("Erro ao buscar turmas:", error));
    }

    function buscarAlunos() {
        axios.get(`/alunos/buscar-aluno-nome-turma/${turmaId}/${nomeAluno}`)
            .then(response => {
                setAlunos(response.data);
                setShowDropdown(true);
            })
            .catch(error => console.error("Erro ao buscar alunos:", error));
    }

    function handleSelectAluno(aluno) {
        setAlunoSelecionado(aluno);
        setNomeAluno(aluno.nome);
        setShowDropdown(false);
    }

    function realizarEmprestimo() {
        console.log(alunoSelecionado)
        if (!alunoSelecionado || !props.livroId) {
            setError("Selecione um aluno antes de realizar o empréstimo.");
            return;
        }

        const payload = {

            matriculaAluno: alunoSelecionado.matricula,
            fk_livro: props.livroId,
            dataEmprestimo: new Date().toISOString().split("T")[0]
        };

        axios.post("/emprestimos", payload)
            .then(() => {
                props.onClose();
                props.onEmprestimoFeito && props.onEmprestimoFeito();
            })
            .catch((err) => {
                setError("Selecione um aluno antes de realizar o empréstimo.");
                
            });
    }

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
                    <p className="text-[#414651]">Livro</p>
                    <p>{props.livro}</p>

                    <p className="text-[#414651]">Turma</p>
                    <select
                        value={turmaId}
                        onChange={(e) => {
                            setTurmaId(e.target.value);
                            setAlunoSelecionado(null);
                            setNomeAluno("");
                        }}
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm outline-0"
                    >
                        <option value="">Selecione uma turma</option>
                        {turmas.map((turma) => (
                            <option key={turma.id} value={turma.id}>{turma.serie}</option>
                        ))}
                    </select>

                    <p className="text-[#414651]">Nome do aluno</p>
                    <div className="relative">
                        <input
                            type="text"
                            value={nomeAluno}
                            onChange={(e) => {
                                setNomeAluno(e.target.value);
                                setAlunoSelecionado(null);
                            }}
                            onFocus={() => alunos.length > 0 && setShowDropdown(true)}
                            className="border border-gray-300 rounded px-2 py-[5px] text-sm w-full"
                            placeholder="Digite para buscar..."
                        />
                        {showDropdown && alunos.length > 0 && (
                            <ul className="absolute z-50 bg-white border border-gray-300 rounded mt-1 w-full max-h-40 overflow-y-auto">
                                {alunos.map((aluno) => (
                                    <li
                                        key={aluno.id}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSelectAluno(aluno)}
                                    >
                                        {aluno.nome}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-500 px-4 py-2 rounded w-full text-sm mt-3">
                            {error}
                        </div>
                    )}

                    <p className="text-[#414651]">Data de devolução</p>
                    <p>{dataDevolucao}</p>
                </form>

                <BotaoPrincipal nome="Realizar Empréstimo" onClick={realizarEmprestimo} />
            </motion.div>
        </div>
    );
}