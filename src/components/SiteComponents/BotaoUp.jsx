import { ChevronUp } from "lucide-react";

export function BotaoUp() {
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 bg-white text-[#0292B7] p-2 rounded-full shadow-lg cursor-pointer hover:transition duration-300"
            title="Voltar ao topo"
        >
            <ChevronUp />
        </button>
    )
}