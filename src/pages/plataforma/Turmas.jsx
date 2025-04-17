import { CardTurma } from "../../components/CardTurma";
import { Perfil } from "../../components/Perfil";

export function Turmas() {
    return (
        <div className="h-screen pt-16 pl-16">
            <Perfil />
            <h2 className="text-3xl font-bold text-[#0292B7] mb-10">Turmas</h2>
            <div className="flex gap-4">
                <div className="flex gap-2">
                    <input type="checkbox" />
                    <p className="text-[#727272] text-xs">1° Fundamental</p>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" />
                    <p className="text-[#727272] text-xs">2° Fundamental</p>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" />
                    <p className="text-[#727272] text-xs">Ensino Médio</p>
                </div>
            </div>
            <div className="grid grid-cols-4 w-9/10 gap-6 mt-4">
                <CardTurma />
                <CardTurma />
                <CardTurma />
                <CardTurma />
                <CardTurma />
                <CardTurma />
            </div>





        </div>
    )
}