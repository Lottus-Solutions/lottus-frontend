import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { ModalCalendario } from "./Modals/ModalCalendario";

export function Calendario() {
    const [isModalCalendarioOpen, setIsModalCalendarioOpen] = useState(false);

    const toggleCalendario = () => {
        setIsModalCalendarioOpen(!isModalCalendarioOpen);
    };

    return (
        <div className="absolute top-14 right-32">
            <div
                alt="Ícone de Calendário"
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#0292B7] shadow cursor-pointer hover:scale-103 transition-transform"
                onClick={toggleCalendario}
            >
                <CalendarIcon className="w-9 h-9 p-2 text-[#0292B7]" />
            </div>

            {isModalCalendarioOpen && (
                <ModalCalendario onClose={toggleCalendario} />
            )}
        </div>
    );
}