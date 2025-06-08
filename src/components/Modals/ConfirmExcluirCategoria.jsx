import { motion } from 'framer-motion';

export function ConfirmExcluirCategoria({ onClose, onConfirm }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-10 left-1/2 transform -translate-x-1/2
                       bg-white p-6 rounded-2xl shadow-lg w-[400px] h-64 
                       flex flex-col justify-between gap-3 z-50"
        >
            <img src="/images/remover.svg" alt="Excluir" className="w-12" />
            <div className="flex flex-col gap-2">
                <p className="font-semibold">Remover categoria</p>
                <p className="text-[#727272] text-sm">
                    Você está prestes a remover esta categoria do sistema. Essa operação não poderá ser desfeita.
                </p>
            </div>
            <div className="flex gap-4 w-full">
                <button
                    className="w-1/2 border-[1px] border-[#727272] rounded-[8px] p-2 cursor-pointer"
                    onClick={onClose}
                >
                    Cancelar
                </button>
                <button
                    className="w-1/2 text-white bg-[#F25050] rounded-[8px] p-2 cursor-pointer"
                    onClick={onConfirm}
                >
                    Concluir
                </button>
            </div>
        </motion.div>
    );
}
