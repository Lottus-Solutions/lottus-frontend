import { useState, useEffect } from "react";
import { CardTurma } from "../../components/CardTurma";
import { Perfil } from "../../components/Perfil";
import axios from "../../configs/axiosConfig";

export function Turmas() {
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
            getTurmas();
        }, []);
    
        function getTurmas() {
            axios.get("/alunos/listar-turmas")
                .then(response => {
                    setTurmas(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("Erro ao buscar turmas:", error);
                });
        }

    return (
        <div className="h-screen pt-16 pl-16">
            <Perfil />
            <h2 className="text-3xl font-bold text-[#0292B7] mb-10">Turmas</h2>
            
            <div className="grid grid-cols-4 w-9/10 gap-6 mt-4">
            
                {turmas.map((turmas, index) => (
                    <CardTurma
                        key={index}
                        id={turmas.id}
                        turma={turmas.serie}
                    />
                ))}
            </div>
        </div>
    )
}