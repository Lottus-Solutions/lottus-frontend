import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import "./index.css";
import { Assistente } from "./pages/Assistente";
import { Emprestimos } from "./pages/Emprestimos";
import { Catalogo } from "./pages/Catalogo";
import { Turmas } from "./pages/Turmas";
import { Categorias } from "./pages/Categorias";
import { Perfil } from "./pages/Perfil";



export function App() {
  return (
    <Router>
      <div className="w-screen h-screen bg-[#f7f7f7] flex">
 
        <div className="w-72">
          <Sidebar />
        </div>

        <div className="flex-1 h-screen">
          <Routes>
            <Route path="/" element={<Assistente />} />
            <Route path="/emprestimos" element={<Emprestimos />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/turmas" element={<Turmas />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </div>
      </div>
    </Router>

  )
}

