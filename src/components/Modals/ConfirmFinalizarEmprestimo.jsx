import { motion } from 'framer-motion';

export function ConfirmFinalizarEmprestimo({ onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-lg mt-5 absolute top-0 left-4/10 w-[400px] h-64 flex flex-col justify-between gap-3"
            >
                <img src="/images/finalizar-emprestimo-icon.svg" alt="Icone de finalização" className="w-12" />
                <div className="flex flex-col gap-2">
                    <p className='font-semibold'>Finalizar Empréstimo?</p>
                    <p className="text-[#727272] text-sm">Tem certeza de que deseja finalizar este empréstimo? Essa ação não poderá ser desfeita.</p>
                </div>
                <div className="flex gap-4 w-full">
                    <button className="w-1/2 border border-[#727272] rounded-[8px] p-2" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="w-1/2 bg-[#0292B7] text-white rounded-[8px] p-2" onClick={onConfirm}>
                        Concluir
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

