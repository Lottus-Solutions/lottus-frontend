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

const autenticacao = () => {
  const token = localStorage.getItem('token');
  return true
  // if (token) {
  //   return true;
  // } else {
  //   return false;
  // }
};

function LayoutPrivado() {
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

function RotaPrivada({ children }) {
  return autenticacao() ? children : <Navigate to="/" />;
}

export function App() {
  return (
    <Router>
      <Routes>

        {/* Rotas públicas */}
        <Route path="/" element={<Site />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas privadas com layout e proteção */}
        <Route
          element={
            <RotaPrivada>
              <LayoutPrivado />
            </RotaPrivada>
          }
        >
          <Route path="/assistente" element={<Assistente />} />
          <Route path="/emprestimos" element={<Emprestimos />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/turmas" element={<Turmas />} />
        </Route>
      </Routes>
    </Router>
  );
}
