import {
  Blend,
  Repeat2,
  Book,
  Users,
  ChartBarStacked,
  LogOut,
  CircleUser,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const rotasPublicas = ["/", "/login", "/cadastro"];
  if (rotasPublicas.includes(location.pathname)) {
    return null; 
  }

  const navegar = (rota) => {
    navigate(rota); 
  };

  const handleLogout = () => {
    localStorage.removeItem("auth"); 
    navigate("/login"); 
  };

  return (
    <div className="fixed top-0 left-0 h-full w-72 bg-white shadow flex flex-col z-10">
      <div className="flex flex-col items-center mb-10">
        <img
          src="/images/logo.svg"
          alt="Logo da Lottus"
          className="h-16 w-16 mt-10"
        />
        <h1 className="bg-gradient-to-r from-[#0292B7] to-[#98E2FA] bg-clip-text text-transparent text-3xl">
          Lottus
        </h1>
      </div>

      <div className="w-full">
        <p className="font-semibold text-zinc-400 text-[10px] mb-4 pl-10">
          HOME
        </p>

        <div className="flex flex-col gap-1">
          <SidebarButton
            nome="Assistente"
            rota="/assistente"
            Icon={Blend}
            ativo={location.pathname === "/assistente"}
            onClick={navegar}
          />
          <SidebarButton
            nome="Empréstimos"
            rota="/emprestimos"
            Icon={Repeat2}
            ativo={location.pathname === "/emprestimos"}
            onClick={navegar}
          />
          <SidebarButton
            nome="Catálogo"
            rota="/catalogo"
            Icon={Book}
            ativo={location.pathname === "/catalogo"}
            onClick={navegar}
          />
          <SidebarButton
            nome="Turmas"
            rota="/turmas"
            Icon={Users}
            ativo={location.pathname === "/turmas" || location.pathname === "/alunos"}
            onClick={navegar}
          />
        </div>
        <button
          className="flex items-center gap-4 pl-10 absolute bottom-10 hover:cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mb-[1px] text-[#555555]" />
          <p className="text-[#555555] text-[14px]">Sair</p>
        </button>
      </div>
    </div>
  );
}

function SidebarButton({ nome, rota, Icon, ativo, onClick }) {
  return (
    <button
      onClick={() => onClick(rota)}
      className={`flex gap-4 w-[104%] rounded-r-lg pl-10 h-11 items-center hover:cursor-pointer ${
        ativo ? "bg-[#0292B7] shadow" : "bg-transparent"
      }`}
    >
      <Icon
        className={`h-4 w-4 mb-[2px] ${ativo ? "text-white" : "text-[#555555]"}`}
      />
      <p
        className={`text-[14px] ${ativo ? "text-white" : "text-[#555555]"}`}
      >
        {nome}
      </p>
    </button>
  );
}
