import { X } from "lucide-react";
import { BotaoPrincipal } from "../botoes/BotaoPrincipal";
import { motion } from 'framer-motion';

export function ModalEditarPerfil(props) {
    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-10 rounded-2xl w-[600px] shadow-lg relative flex flex-col items-center justify-center">
                <button
                    className="absolute top-8 right-8 cursor-pointer"
                    onClick={props.onClose}
                >
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
                        <img src="/images/male-user.svg" alt="Male User" className="w-12 hover:scale-103 cursor-pointer"/>
                        <img src="/images/user.svg" alt="Female User" className="w-12 hover:scale-103 cursor-pointer"/>
                    </div>
                    <p className="text-[#414651]">Alterar nome</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                    />
                    <p className="text-[#414651]">Alterar email</p>
                    <input
                        type="email"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                    />

                    <p className="text-[#414651]">Alterar senha</p>
                    <input
                        type="password"
                        className="border border-gray-300 rounded px-2 py-[5px] text-sm"
                    />
                </form>

                <BotaoPrincipal nome="Salvar" />
            </motion.div>
        </div>
    )
}
