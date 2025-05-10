import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import "./index.css";

import { Assistente } from "./pages/plataforma/Assistente";
import { Emprestimos } from "./pages/plataforma/Emprestimos";
import { Catalogo } from "./pages/plataforma/Catalogo";
import { Turmas } from "./pages/plataforma/Turmas";
import { Site } from "./Site";
import { Login } from "./pages/auth/Login";
import { Cadastro } from "./pages/auth/Cadastro";
import { Alunos } from "./pages/plataforma/Alunos";

const autenticacao = () => {
  const token = localStorage.getItem('token');
  // if (token) {
  //   return true;
  // } else {
  //   return false;
  // }
  return true;
};

function LayoutPrivado() {
  if (!autenticacao()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-screen h-screen bg-[#f7f7f7] flex">
      <div className="w-72">
        <Sidebar />
      </div>
      <div className="flex-1 h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export function App() {
  return (
    <Router>
      <Routes>

        {/* Rotas públicas */}
        <Route path="/" element={<Site />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas privadas */}
        <Route element={<LayoutPrivado />}>
          <Route path="/assistente" element={<Assistente />} />
          <Route path="/emprestimos" element={<Emprestimos />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/turmas" element={<Turmas />} />
          <Route path="/alunos" element={<Alunos />} />
        </Route>

      </Routes>
    </Router>
  );
}
