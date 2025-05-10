import { Book, ChartColumnStacked, Repeat2, SendHorizonal, Sparkles, Users } from "lucide-react";
import { Perfil } from "../../components/Perfil";
import { SugestaoPerguntas } from "../../components/sugestaoPerguntas";
import { useEffect, useState } from "react";
import axios from "../../configs/axiosConfig.js";

export function Assistente() {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [perguntas, setPerguntas] = useState([]);
    const [inputValue, setInputValue] = useState("");  
    const [botaoAtivo, setBotaoAtivo] = useState(""); 
  
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
  
    const perguntasEmprestimos = [
      "Quais são os empréstimos ativos?",
      "Quais são os empréstimos em atraso?",
      "Tem empréstimos com a data de devolução para hoje?",
      "Tem empréstimos com a data de devolução para amanhã?",
    ];
  
    const perguntasLivros = [
      "Quais livros do acervo nunca foram emprestados?",
      "Quais livros foram mais lidos por cada turma?",
      "Quais livros estão com maior demanda neste semestre?",
      "Quando foi feita a última atualização do catálogo?",
    ];
  
    const perguntasAlunos = [
      "Quantos alunos de cada turma ainda não retiraram os livros obrigatórios?",
      "Quais alunos têm histórico de atrasos frequentes?",
      "Qual a quantidade de bônus que os alunos têm, dividida por turma?",
      "Quando foi feita a última atualização do catálogo?",
    ];
  
    const perguntasCategorias = [
      "Quais categorias de livros têm mais empréstimos?",
      "Quais categorias são menos procuradas?",
      "Quantos livros há em cada categoria?",
      "Quais categorias tiveram aumento no número de empréstimos recentemente?",
    ];
  
    const handleClickButton = (categoria) => {
      setBotaoAtivo(categoria); 
      if (categoria === "Empréstimos") setPerguntas(perguntasEmprestimos);
      if (categoria === "Livros") setPerguntas(perguntasLivros);
      if (categoria === "Alunos") setPerguntas(perguntasAlunos);
      if (categoria === "Categorias") setPerguntas(perguntasCategorias);
    }
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Perfil />
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="flex flex-col items-center justify-center mb-12">
            <p className="text-2xl">Olá, {nomeUsuario}!</p>
            <p className="text-2xl">Como posso ajudar?</p>
          </div>
  
          <div className="relative w-4xl flex-1 mr-4">
            <Sparkles className="absolute left-4 top-1/2 w-4 transform -translate-y-1/2 text-[#727272]" /> 
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}  
              placeholder="Faça uma pergunta..."
              className="flex items-center text-xs border w-full h-9 rounded-full ps-10 pe-12 border-[#727272] focus:outline-none placeholder:text-xs"  
            />
            <SendHorizonal className="absolute right-4 top-1/2 w-4 transform -translate-y-1/2 text-[#727272]" />
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
  
  