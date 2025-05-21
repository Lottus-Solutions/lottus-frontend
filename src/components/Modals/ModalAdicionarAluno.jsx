import { X } from "lucide-react";
import { BotaoPrincipal } from "../botoes/BotaoPrincipal";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import axios from "../../configs/axiosConfig";
import { AlertSucesso } from "../Alerts/AlertSucesso";

export function ModalAdicionarAluno(props) {
    const [turmas, setTurmas] = useState([]);
    const [nome, setNome] = useState("");
    const [turmaId, setTurmaId] = useState("");
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        getTurmas();
    }, []);


    function getTurmas() {
        axios.get("/alunos/listar-turmas")
            .then(response => {
                setTurmas(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar turmas:", error);
            });
    }

    function cadastrarAluno(e) {
        e.preventDefault();

        if (!nome.trim() || !turmaId) {
            alert("Preencha todos os campos.");
            return;
        }

        const novoAluno = {
            nome,
            qtd_bonus: 0,
            turma_id: Number(turmaId),
            qtd_livros_lidos: 0
        };

        axios.post("/alunos/cadastrar", novoAluno)
            .then(response => {
                setAlert(true);

                setTimeout(() => {
                    setAlert(false);
                    props.onClose();
                    if (props.atualizarLista) props.atualizarLista();
                },1000); // Espera 2 segundos para mostrar o alerta
            })
            .catch(error => {
                console.error("Erro ao cadastrar aluno:", error);
                alert("Erro ao cadastrar aluno.");
            });
    }

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            {alert && (
                <AlertSucesso
                    onClose={() => setAlert(false)}
                    titulo="Aluno cadastrado no sistema."
                    descricao="Agora você pode registrar seus empréstimos e analisar seu histórico de leituras."
                />

            )}
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
                <img src="/images/adicionar_livro.svg" alt="Adicionar Aluno" className="w-16 mb-5" />
                <div className="mb-6 flex flex-col items-center">
                    <h3 className="text-xl">Adicionar um novo Aluno</h3>
                    <p className="text-[#727272]">Insira as informações do aluno abaixo para cadastrá-lo</p>
                </div>
                <form onSubmit={cadastrarAluno} className="flex flex-col gap-4 w-[80%] mb-6">
                    <p className="text-[#414651]">Nome do aluno*</p>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                    />
                    <select
                        value={turmaId}
                        onChange={(e) => setTurmaId(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm outline-0 mt-4 mb-4"
                    >
                        <option value="">Selecione uma turma</option>
                        {turmas.map((turma, index) => (
                            <option key={index} value={turma.id}>
                                {turma.serie}
                            </option>
                        ))}
                    </select>

                    <BotaoPrincipal nome="Salvar" type="submit" />
                </form>
            </motion.div>
        </div>
    );
}
