import { Book, ChartColumnStacked, Repeat2, SendHorizonal, Sparkles, Users, Loader2 } from "lucide-react";
import { Perfil } from "../../components/Perfil";
import { SugestaoPerguntas } from "../../components/sugestaoPerguntas";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../configs/axiosConfig.js";
import { MarkdownText } from "../../components/MarkdownText.jsx";
import { Calendario } from "../../components/Calendario.jsx";


export function Assistente() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [perguntas, setPerguntas] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [botaoAtivo, setBotaoAtivo] = useState("");
  const [chat, setChat] = useState([]);
  const [chatAtivo, setChatAtivo] = useState(false);
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);

  function getDadosUsuario() {
    axios.get('/usuarios/me')
      .then(response => {
        setNomeUsuario(response.data.nome);
      })
      .catch(error => {
        console.error("Erro ao obter dados do usuário:", error);
      });
  }

  useEffect(() => {
    getDadosUsuario();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat, loading]);

  const perguntasEmprestimos = [
    "Quais são os empréstimos ativos?",
    "Quais são os empréstimos em atraso?",
    "Tem empréstimos com a data de devolução para hoje?",
    "Tem empréstimos com a data de devolução para amanhã?",
  ];

  const perguntasLivros = [
    "Quais livros do acervo estão reservados?",
    "Quais livros foram mais lidos por cada turma?",
    "Quais livros estão com maior demanda neste semestre?",
    "Quantos livros temos no acervo?",
  ];

  const perguntasAlunos = [
    "Quantos alunos de cada turma ainda não retiraram os livros obrigatórios?",
    "Quais alunos têm histórico de atrasos frequentes?",
    "Qual a quantidade de bônus que os alunos têm, dividida por turma?",
    "Quais alunos estão com livros em atraso?",
  ];

  const perguntasCategorias = [
    "Quais categorias de livros têm mais empréstimos?",
    "Quais categorias são menos procuradas?",
    "Quantos livros há em cada categoria?",
    "Quais categorias tiveram aumento no número de empréstimos recentemente?",
  ];

  const handleClickButton = (categoria) => {
    if (botaoAtivo === categoria) {
      setBotaoAtivo("");
      setPerguntas([]);
    } else {
      setBotaoAtivo(categoria);
      if (categoria === "Empréstimos") setPerguntas(perguntasEmprestimos);
      if (categoria === "Livros") setPerguntas(perguntasLivros);
      if (categoria === "Alunos") setPerguntas(perguntasAlunos);
      if (categoria === "Categorias") setPerguntas(perguntasCategorias);
    }
  };

  const enviarPergunta = () => {
    if (!inputValue.trim()) return;

    const pergunta = inputValue.trim();

    if (!chatAtivo) {
      setChatAtivo(true);
    }

    setChat(prev => [...prev, { tipo: 'pergunta', texto: pergunta }]);
    setInputValue("");
    setLoading(true); // Inicia loading

    axios.post('http://127.0.0.1:5000/perguntar', { pergunta })
      .then(response => {
        const resposta = response.data.resposta;
        setChat(prev => [...prev, { tipo: 'resposta', texto: resposta }]);
      })
      .catch(error => {
        console.error("Erro ao enviar pergunta:", error);
        setChat(prev => [...prev, { tipo: 'resposta', texto: "Ocorreu um erro ao obter a resposta." }]);
      })
      .finally(() => {
        setLoading(false); // Finaliza loading
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      enviarPergunta();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

      <Calendario />
      <Perfil />

      <div className="flex flex-col items-center justify-center mt-10">

        {!chatAtivo && (
          <div className="flex flex-col items-center justify-center mb-12 mt-12">
            <p className="text-2xl">Olá, {nomeUsuario}!</p>
            <p className="text-2xl">Como posso ajudar?</p>
          </div>
        )}

        {chatAtivo && (
          <div
            ref={chatContainerRef}
            className={`relative w-full ${perguntas.length > 0 ? "h-72" : "h-96"
              } overflow-y-auto custom-scrollbar scrollbar-gutter mb-3 p-4 transition-all duration-300`}
          >

            <AnimatePresence>
              {chat.map((mensagem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${mensagem.tipo === "pergunta" ? "justify-end" : "justify-start"
                    } mb-2`}
                >
                  <div
                    className={`max-w-xl px-4 py-2 rounded-2xl text-sm ${mensagem.tipo === "pergunta"
                      ? "bg-[#0292B7] text-white"
                      : "bg-gray-200 text-black"
                      }`}
                  >
                    {mensagem.tipo === "resposta" ? (
                      <MarkdownText>{mensagem.texto}</MarkdownText>
                    ) : (
                      mensagem.texto
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}


        <div className="relative w-4xl flex-1 mr-4">
          {loading && (
            <div className="absolute bottom-12 left-2 flex items-center gap-1 px-2 py-1 rounded-full">
              <Loader2 className="animate-spin w-4 h-4 text-[#727272]" />
              <span className="text-xs text-[#727272]">Criando...</span>
            </div>
          )}
          <Sparkles className="absolute left-4 top-1/2 w-4 transform -translate-y-1/2 text-[#727272]" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Faça uma pergunta..."
            className="flex items-center text-xs border w-full h-9 rounded-full ps-10 pe-12 border-[#727272] focus:outline-none placeholder:text-xs"
            disabled={loading}
          />

          <SendHorizonal
            onClick={enviarPergunta}
            className={`absolute right-4 top-1/2 w-4 transform -translate-y-1/2 text-[#727272] cursor-pointer ${loading ? "pointer-events-none opacity-50" : ""}`}
          />
        </div>

        <div className="flex gap-4 mt-8">
          <button
            className={`flex gap-2 items-center justify-center border-[1px] rounded-full w-36 h-8 cursor-pointer 
              ${botaoAtivo === "Empréstimos" ? "bg-[#0292B7] text-white border-[#0292B7]" : "text-[#0292B7] border-[#0292B7]"}`}
            onClick={() => handleClickButton("Empréstimos")}
          >
            <Repeat2 className="w-4 h-4" />
            <p className="text-xs">Empréstimos</p>
          </button>

          <button
            className={`flex gap-2 items-center justify-center border-[1px] rounded-full w-36 h-8 cursor-pointer 
              ${botaoAtivo === "Livros" ? "bg-[#8550C9] text-white border-[#8550C9]" : "text-[#8550C9] border-[#8550C9]"}`}
            onClick={() => handleClickButton("Livros")}
          >
            <Book className="w-4 h-4" />
            <p className="text-xs">Livros</p>
          </button>

          <button
            className={`flex gap-2 items-center justify-center border-[1px] rounded-full w-36 h-8 cursor-pointer 
              ${botaoAtivo === "Alunos" ? "bg-[#B702B1] text-white border-[#B702B1]" : "text-[#B702B1] border-[#B702B1]"}`}
            onClick={() => handleClickButton("Alunos")}
          >
            <Users className="w-4 h-4" />
            <p className="text-xs">Alunos</p>
          </button>

          <button
            className={`flex gap-2 items-center justify-center border-[1px] rounded-full w-36 h-8 cursor-pointer 
              ${botaoAtivo === "Categorias" ? "bg-[#B70247] text-white border-[#B70247]" : "text-[#B70247] border-[#B70247]"}`}
            onClick={() => handleClickButton("Categorias")}
          >
            <ChartColumnStacked className="w-4 h-4" />
            <p className="text-xs">Categorias</p>
          </button>
        </div>

        <div className="mt-2 w-full max-w-xl">
          <SugestaoPerguntas perguntas={perguntas} setInputValue={setInputValue} />
        </div>

      </div>
    </div>
  );
}
