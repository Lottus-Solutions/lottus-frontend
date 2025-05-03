import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import  axios from "../configs/axiosConfig.js";

export function Perfil() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState(""); 

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

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

    return (
        <div className="absolute top-14 right-14">
            <img
                src="/images/user.svg"
                alt="Icone de usuario"
                className="w-10 h-10 rounded-full shadow cursor-pointer hover:scale-103 transition-transform"
                onClick={toggleDropdown}
            />

            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.1 }}
                        className="absolute mt-2 right-0 bg-white rounded-2xl p-4 w-44 h-fit shadow-lg flex flex-col items-start gap-2 z-50"
                    >
                        <p>Olá, {nomeUsuario}</p>
                        <p className="text-sm text-[#727272] cursor-pointer hover:text-[#0292B7] transition-colors">
                            Perfil
                        </p>
                        <p className="text-sm text-[#727272] cursor-pointer hover:text-[#0292B7] transition-colors">
                            Upload de arquivos
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
