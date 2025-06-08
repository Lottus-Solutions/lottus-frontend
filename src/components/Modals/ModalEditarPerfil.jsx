import { X } from "lucide-react";
import { BotaoPrincipal } from "../botoes/BotaoPrincipal";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import axios from "../../configs/axiosConfig.js";

export function ModalEditarPerfil(props) {
    const [usuario, setUsuario] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [avatar, setAvatar] = useState(1); // 1 = mulher, 2 = homem

    useEffect(() => {
        axios.get('/usuarios/me')
            .then(response => {
                const data = response.data;
                setUsuario(data);
                setNome(data.nome);
                setEmail(data.email);
                setAvatar(data.idAvatar || 1); // padrão mulher
            })
            .catch(error => {
                console.error("Erro ao obter dados do usuário:", error);
            });
    }, []);

    const handleSalvar = async () => {
        if (!usuario) return;

        try {
            const payload = {
                id: usuario.id,
                nome,
                email,
                senha,
                dtRegistro: usuario.dtRegistro, // deve vir no GET
                idAvatar: avatar
            };

            await axios.put(`/usuarios/${usuario.id}`, payload);
            if (props.onPerfilAtualizado) {
                props.onPerfilAtualizado(nome, email, avatar);
            }
            props.onClose();
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-10 rounded-2xl w-[600px] shadow-lg relative flex flex-col items-center justify-center">
                <button className="absolute top-8 right-8 cursor-pointer" onClick={props.onClose}>
                    <X className="text-gray-400" />
                </button>
                <img src="/images/edit-icon.svg" alt="Editar Perfil" className="w-16 mb-5" />
                <div className="mb-6 flex flex-col items-center">
                    <h3 className="text-xl">Editar perfil</h3>
                    <p className="text-[#727272]">Atualize suas informações</p>
                </div>
                <form className="flex flex-col gap-4 w-[80%] mb-6">
                    <p className="text-[#414651]">Avatar</p>
                    <div className="flex gap-4">
                        <img
                            src="/images/male-user.svg"
                            alt="Avatar Homem"
                            className={`w-12 cursor-pointer ${avatar === 2 ? 'ring-2 ring-[#0292B7] rounded-full' : ''}`}
                            onClick={() => setAvatar(2)}
                        />
                        <img
                            src="/images/user.svg"
                            alt="Avatar Mulher"
                            className={`w-12 cursor-pointer ${avatar === 1 ? 'ring-2 ring-[#0292B7] rounded-full' : ''}`}
                            onClick={() => setAvatar(1)}
                        />
                    </div>

                    <p className="text-[#414651]">Alterar nome</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <p className="text-[#414651]">Alterar email</p>
                    <input
                        type="email"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-[#414651]">Nova senha</p>
                    <input
                        type="password"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </form>

                <BotaoPrincipal nome="Salvar" onClick={handleSalvar} />
            </motion.div>
        </div>
    );
}
