import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import  axios from "../configs/axiosConfig.js";
import { ModalEditarPerfil } from "./Modals/ModalEditarPerfil.jsx";
import { ModalUpload } from "./Modals/ModalUpload.jsx";

export function Perfil() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState(""); 
    const [emailUsuario, setEmailUsuario] = useState("");
    const [editarPerfilOpen, setEditarPerfilOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    function handleCloseUpload() {
        setEditarPerfilOpen(false); 
    }

    function handleClosePerfil() {
        setEditarPerfilOpen(false); 
    }

    function getDadosUsuario() {
        axios.get('/usuarios/me')
            .then(response => {
                setNomeUsuario(response.data.nome);
                setEmailUsuario(response.data.email);
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
                        className="absolute mt-3 right-0 bg-white rounded-2xl p-6 w-fit min-w-44 h-fit shadow-lg flex flex-col items-start gap-2 z-50"
                    >
                        <p>{nomeUsuario}</p>
                        <p className="text-[#727272] mb-2 text-sm">{emailUsuario}</p>
                        <div className="w-full border-t border-gray-200 my-2" />
                        <p className="text-sm text-[#727272] cursor-pointer hover:text-[#0292B7] transition-colors" onClick={() => setEditarPerfilOpen(true)}>
                            Editar Perfil
                        </p>
                        <p className="text-sm text-[#727272] cursor-pointer hover:text-[#0292B7] transition-colors" onClick={() => setUploadOpen(true)}>
                            Upload de arquivos
                        </p>
                        <p className="text-sm text-[#727272] cursor-pointer hover:text-[#0292B7] transition-colors">
                            Finalizar semestre
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {editarPerfilOpen && (<ModalEditarPerfil onClose={() => handleClosePerfil()}/>)}
            {uploadOpen && (<ModalUpload onClose={() => handleCloseUpload()}/>)}
        </div>
    );
}
