import { motion } from 'framer-motion';

export function ConfirmEditarAluno({ onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg mt-5 absolute top-0 left-4/10 w-[400px] h-64 flex flex-col justify-between gap-3"
        >
            <img src="/images/finalizar-emprestimo-icon.svg" alt="Icone de finalização" className="w-12" />
            <div className="flex flex-col gap-2">
                <p className='font-semibold'>Editar Informações</p>
                <p className="text-[#727272] text-sm">Você tem certeza que deseja modificar os dados do Aluno Matheus Blasco?</p>
            </div>
            <div className="flex gap-4 w-full">
                <button className="w-1/2 border-[1px] border-[#727272] rounded-[8px] p-2 cursor-pointer" onClick={onClose}> Cancelar</button>
                <button className="w-1/2 text-white bg-[#0292B7] rounded-[8px] p-2 cursor-pointer">
                    Concluir
                </button>
            </div>
        </motion.div>
    );
}
