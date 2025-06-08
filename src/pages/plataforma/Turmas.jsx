import { useState, useEffect } from "react";
import { CardTurma } from "../../components/CardTurma";
import { Perfil } from "../../components/Perfil";
import axios from "../../configs/axiosConfig";
import { Inbox } from "lucide-react"; // <- novo ícone

export function Turmas() {
    const [turmas, setTurmas] = useState([]);

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

    return (
        <div className="h-screen pt-16 pl-16 pr-8">
            <Perfil />
            <h2 className="text-3xl font-bold text-[#0292B7] mb-10">Turmas</h2>

            {turmas.length > 0 ? (
                <div className="grid grid-cols-4 w-9/10 gap-6 mt-4">
                    {turmas.map((turma, index) => (
                        <CardTurma
                            key={index}
                            id={turma.id}
                            turma={turma.serie}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-3/4 mr-6 mx-auto">
                    <Inbox className="w-8 h-8 text-[#0292B7]" />
                    <div className="flex flex-col items-center gap-1 mt-2">
                        <p className="text-base">Nenhuma turma encontrada!</p>
                        <p className="text-[#727272]">Ainda não há turmas cadastradas na biblioteca.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
