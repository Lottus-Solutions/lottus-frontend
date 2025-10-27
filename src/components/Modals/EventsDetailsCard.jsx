// EventDetailsCard.jsx (pode ser no mesmo arquivo ou em um novo)
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { format as formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";

function EventDetailsCard({ event, onClose }) {
    if (!event) return null;

    // Função para formatar a data, tratando eventos de dia inteiro e com horário
    const formatEventDate = (start, end) => {
        const isAllDay =
            start.getHours() === 0 &&
            start.getMinutes() === 0 &&
            end.getHours() === 23 &&
            end.getMinutes() === 59;

        if (isAllDay) {
            return formatDate(start, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
        }

        const startStr = formatDate(start, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
        const endStr = formatDate(end, "HH:mm", { locale: ptBR });

        return `${startStr} - ${endStr}`;
    };

    return (
        // Overlay
        <div
            className="absolute inset-0 bg-black/30 flex items-center justify-center z-10"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
                    onClick={onClose}
                    aria-label="Fechar detalhes"
                >
                    <X className="text-gray-500 h-5 w-5" />
                </button>

                <h3 className="text-lg font-bold text-gray-800 mb-4 pr-8">
                    {event.raw.nomeLivro || "Detalhes do Empréstimo"}
                </h3>

                <div className="space-y-3 text-sm text-gray-600">
                    <p>
                        <strong className="font-semibold text-gray-700">Aluno:</strong> {event.raw.nomeAluno || "Não informado"}
                    </p>
                    <p>
                        <strong className="font-semibold text-gray-700">Turma:</strong> {event.desc.replace('Turma: ', '') || "Não informada"}
                    </p>
                    <p>
                        <strong className="font-semibold text-gray-700">Data Prevista de Devolução:</strong> {formatEventDate(event.start, event.end)}
                    </p>
                    <p>
                        <strong className="font-semibold text-gray-700">Status:</strong> {event.raw.status || "Ativo"}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}