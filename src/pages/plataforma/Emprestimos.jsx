import { useEffect, useState } from "react";
import { EmprestimoListItem } from "../../components/EmprestimoListItem";
import { Perfil } from "../../components/Perfil";
import { Search } from "../../components/Search";
import '../../index.css';
import axios from "../../configs/axiosConfig";
import { CircleAlert, Inbox } from "lucide-react";

export function Emprestimos() {
    const [emprestimos, setEmprestimos] = useState([]);
    const [mostrarAtrasados, setMostrarAtrasados] = useState(false);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        if (busca.trim() !== "") {
            buscarEmprestimos();
        } else {
            getEmprestimos();
        }
    }, [mostrarAtrasados, busca]);

    function getEmprestimos() {
        let endpoint = '/emprestimos'
        if (mostrarAtrasados) {
            endpoint = "/emprestimos/atrasados"
        }

        axios.get(endpoint)
            .then(response => {
                setEmprestimos(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar empréstimos:", error);
            });
    }

    function buscarEmprestimos() {
        axios.get(`/emprestimos/buscar?valor=${encodeURIComponent(busca)}`)
            .then(response => {
                setEmprestimos(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar empréstimos:", error);
            });
    }

    function handleToggleAtrasados() {
        if (mostrarAtrasados) {
            setMostrarAtrasados(false);
        } else {
            setMostrarAtrasados(true);
        }
    }

    return (
        <div className="h-screen pt-16 pl-16">
            <Perfil />
            <h2 className="text-3xl font-bold text-[#0292B7] mb-10">Empréstimos</h2>
            <div className="flex justify-between w-9/10">
                <Search
                    placeholder="Busque por aluno ou livro"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
                <div className="flex items-center justify-center gap-5 mr-8 w-36 px-4 h-9 border-[#727272] border-[1px] rounded-full">
                    <p className="text-[#727272] text-xs">Em atraso</p>
                    <input
                        type="checkbox"
                        checked={mostrarAtrasados}
                        onChange={handleToggleAtrasados}
                        disabled={busca.trim() !== ""} // Desabilita o filtro quando estiver buscando
                    />
                </div>
            </div>
            <div className="mt-12 w-9/10 h-7/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar">
                {emprestimos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-3 mb-20">
                        <Inbox className="w-8 h-8 text-[#0292B7] " />
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-base">Nenhum empréstimo ativo!</p>
                            <p className="text-[#727272]">Nenhum empréstimo em andamento foi localizado. </p>
                        </div>
                    </div>
                ) : (
                    emprestimos.map((emprestimo, index) => (
                        <EmprestimoListItem
                            key={index}
                            id={emprestimo.id}
                            aluno={emprestimo.aluno?.nome || 'Nome do Aluno'}
                            livro={emprestimo.livro?.nome || 'Nome do Livro'}
                            dataDevolucao={emprestimo.dataDevolucaoPrevista}
                            diasAtraso={emprestimo.diasAtrasados}
                            atualizarLista={getEmprestimos}
                        />
                    ))
                )}
            </div>

        </div>
    );
}
