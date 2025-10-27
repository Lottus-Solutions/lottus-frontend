// ...existing code...
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import endOfDay from "date-fns/endOfDay";
import ptBR from "date-fns/locale/pt-BR";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import axios from "../../configs/axiosConfig.js";

function EventDetailsCard({ event, onClose }) {
    if (!event) return null;

    const formatEventDate = (start, end) => {
        // Verifica se a diferença é de quase 24h, indicando um evento de dia inteiro
        const isAllDay = end.getTime() - start.getTime() >= 23 * 60 * 60 * 1000;

        if (isAllDay) {
            return format(start, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
        }

        const startStr = format(start, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
        // Se a data de término for no mesmo dia, mostre apenas o horário
        if (format(start, 'yyyy-MM-dd') === format(end, 'yyyy-MM-dd')) {
            const endStr = format(end, "HH:mm", { locale: ptBR });
            return `${startStr} - ${endStr}`;
        }
        // Se for em dias diferentes, mostre a data completa
        return `${startStr} até ${format(end, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`;
    };

    return (
        <div
            className="absolute inset-0 bg-black/30 flex items-center justify-center z-10 rounded-2xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    onClick={onClose}
                    aria-label="Fechar detalhes"
                >
                    <X className="h-5 w-5" />
                </button>

                <h3 className="text-lg font-bold text-gray-800 mb-4 pr-8">
                    {event.raw.nomeLivro || "Detalhes do Empréstimo"}
                </h3>

                <div className="space-y-3 text-sm text-gray-700">
                    <p>
                        <strong className="font-semibold text-gray-900">Aluno:</strong> {event.raw.nomeAluno || "Não informado"}
                    </p>
                    <p>
                        <strong className="font-semibold text-gray-900">Turma:</strong> {event.desc.replace('Turma: ', '') || "Não informada"}
                    </p>
                    <p>
                        <strong className="font-semibold text-gray-900">Data Prevista de Devolução:</strong> {formatEventDate(event.start, event.end)}
                    </p>
                    <p>
                        <strong className="font-semibold text-gray-900">Status:</strong> <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">{event.raw.status || "Ativo"}</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

const locales = {
    "pt-BR": ptBR,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function CustomToolbar({ toolbar, setCurrentDate, currentView, setCurrentView }) {
    const goToBack = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            if (currentView === 'month') {
                newDate.setMonth(newDate.getMonth() - 1);
            } else if (currentView === 'week') {
                newDate.setDate(newDate.getDate() - 7);
            } else if (currentView === 'day') {
                newDate.setDate(newDate.getDate() - 1);
            } else if (currentView === 'agenda') {
                newDate.setMonth(newDate.getMonth() - 1); // Para agenda, assume mês
            }
            return newDate;
        });
    };

    const goToNext = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            if (currentView === 'month') {
                newDate.setMonth(newDate.getMonth() + 1);
            } else if (currentView === 'week') {
                newDate.setDate(newDate.getDate() + 7);
            } else if (currentView === 'day') {
                newDate.setDate(newDate.getDate() + 1);
            } else if (currentView === 'agenda') {
                newDate.setMonth(newDate.getMonth() + 1); // Para agenda, assume mês
            }
            return newDate;
        });
    };

    const goToToday = () => setCurrentDate(new Date());
    const setView = (v) => setCurrentView(v);

    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
                <button
                    onClick={goToBack}
                    className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 text-sm"
                    aria-label="Mês anterior"
                >
                    ‹
                </button>
                <button
                    onClick={goToToday}
                    className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 text-sm"
                >
                    Hoje
                </button>
                <button
                    onClick={goToNext}
                    className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 text-sm"
                    aria-label="Próximo mês"
                >
                    ›
                </button>
            </div>

            <div className="text-sm font-medium">{toolbar.label}</div>

            <div className="flex gap-2">
                <button
                    onClick={() => setView("month")}
                    className={`px-3 py-1 rounded text-sm ${currentView === "month" ? "bg-[#0292B7] text-white" : "border border-gray-200"}`}
                >
                    Mês
                </button>
                <button
                    onClick={() => setView("week")}
                    className={`px-3 py-1 rounded text-sm ${currentView === "week" ? "bg-[#0292B7] text-white" : "border border-gray-200"}`}
                >
                    Semana
                </button>
                <button
                    onClick={() => setView("day")}
                    className={`px-3 py-1 rounded text-sm ${currentView === "day" ? "bg-[#0292B7] text-white" : "border border-gray-200"}`}
                >
                    Dia
                </button>
                <button
                    onClick={() => setView("agenda")}
                    className={`px-3 py-1 rounded text-sm ${currentView === "agenda" ? "bg-[#0292B7] text-white" : "border border-gray-200"}`}
                >
                    Agenda
                </button>
            </div>
        </div>
    );
}

export function ModalCalendario(props) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState('month');

    useEffect(() => {
        let mounted = true;

        async function fetchEmprestimos() {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                params.append("pagina", "0");
                params.append("tamanho", "100");

                const resp = await axios.get(`/emprestimos?${params.toString()}`);
                const raw = resp.data.content || resp.data || [];

                const mapped = raw
                    .map((e) => {
                        const startRaw = e.dataDevolucaoPrevista || e.dataEmprestimo || e.dataRetirada || null;
                        if (!startRaw) return null;

                        let start = null;

                        if (typeof startRaw === "string") {
                            if (/\d{1,2}\/\d{1,2}\/\d{4}/.test(startRaw)) {
                                const hasTime = /\d{1,2}:\d{2}/.test(startRaw);
                                const fmt = hasTime ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy";
                                try {
                                    const parsed = parse(startRaw, fmt, new Date());
                                    if (!isNaN(parsed.getTime())) start = parsed;
                                } catch (err) {
                                    const iso = new Date(startRaw);
                                    if (!isNaN(iso.getTime())) start = iso;
                                }
                            } else {
                                const iso = new Date(startRaw);
                                if (!isNaN(iso.getTime())) start = iso;
                            }
                        } else if (startRaw instanceof Date) {
                            start = startRaw;
                        }

                        if (!start) return null;

                        let end;
                        if (typeof (e.dataDevolucaoPrevista) === "string" && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(e.dataDevolucaoPrevista)) {
                            end = endOfDay(start);
                        } else if (e.dataPrevistaFim) {
                            const parsedEnd = new Date(e.dataPrevistaFim);
                            end = !isNaN(parsedEnd.getTime()) ? parsedEnd : new Date(start.getTime() + 60 * 60 * 1000);
                        } else {
                            end = new Date(start.getTime() + 60 * 60 * 1000);
                        }

                        const titleParts = [];
                        if (e.nomeLivro) titleParts.push(e.nomeLivro);
                        if (e.nomeAluno) titleParts.push(`— ${e.nomeAluno}`);
                        const title = titleParts.join(" ");

                        return {
                            id: e.id,
                            title: title || `Empréstimo #${e.id}`,
                            start,
                            end,
                            desc: `Turma: ${e.turmaAluno || e.turma || "—"}`,
                            raw: e
                        };
                    })
                    .filter(Boolean);

                if (mounted && mapped.length > 0) {
                    setEvents(mapped);
                }
            } catch (err) {
                console.error("Erro ao buscar empréstimos para o calendário:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchEmprestimos();

        return () => {
            mounted = false;
        };
    }, []);

    // Adiciona navegação por teclado (setas esquerda e direita)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                setCurrentDate(prev => {
                    const newDate = new Date(prev);
                    if (currentView === 'month') {
                        newDate.setMonth(newDate.getMonth() - 1);
                    } else if (currentView === 'week') {
                        newDate.setDate(newDate.getDate() - 7);
                    } else if (currentView === 'day') {
                        newDate.setDate(newDate.getDate() - 1);
                    } else if (currentView === 'agenda') {
                        newDate.setMonth(newDate.getMonth() - 1);
                    }
                    return newDate;
                });
            } else if (e.key === 'ArrowRight') {
                setCurrentDate(prev => {
                    const newDate = new Date(prev);
                    if (currentView === 'month') {
                        newDate.setMonth(newDate.getMonth() + 1);
                    } else if (currentView === 'week') {
                        newDate.setDate(newDate.getDate() + 7);
                    } else if (currentView === 'day') {
                        newDate.setDate(newDate.getDate() + 1);
                    } else if (currentView === 'agenda') {
                        newDate.setMonth(newDate.getMonth() + 1);
                    }
                    return newDate;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentView]);

    return (
        <div
            className="fixed inset-0 bg-black/10 flex items-start justify-center z-50 pt-20"
            onClick={props.onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.18 }}
                className="bg-white p-6 rounded-2xl w-[90%] max-w-[900px] shadow-lg relative flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100"
                    onClick={props.onClose}
                    aria-label="Fechar"
                >
                    <X className="text-gray-600" />
                </button>

                <h2 className="text-lg font-semibold mb-4">Calendário de Empréstimos</h2>

                <div className="w-full relative">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 520 }}
                        culture="pt-BR"
                        messages={{
                            next: "Próximo",
                            previous: "Anterior",
                            today: "Hoje",
                            month: "Mês",
                            week: "Semana",
                            day: "Dia",
                            agenda: "Agenda",
                        }}
                        onSelectEvent={(event) => {
                            setSelectedEvent(event);
                        }}
                        views={["month", "week", "day", "agenda"]}
                        components={{
                            toolbar: (toolbar) => (
                                <CustomToolbar
                                    toolbar={toolbar}
                                    setCurrentDate={setCurrentDate}
                                    currentView={currentView}
                                    setCurrentView={setCurrentView}
                                />
                            )
                        }}
                        date={currentDate}
                        onNavigate={setCurrentDate}
                        view={currentView}
                        onView={setCurrentView}
                    />

                    {loading && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                            <p className="text-sm text-gray-600">Carregando eventos...</p>
                        </div>
                    )}
                </div>

                {selectedEvent && (
                    <EventDetailsCard
                        event={selectedEvent}
                        onClose={() => setSelectedEvent(null)}
                    />
                )}
            </motion.div>
        </div>
    );
}
