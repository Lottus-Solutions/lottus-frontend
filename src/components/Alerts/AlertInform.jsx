
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export function AlertInform({ onClose, titulo, descricao }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg w-[400px] h-fit flex flex-col justify-between gap-3
                       fixed top-5 right-5 z-50"
        >
            <img src="/images/Featured-error.svg" alt="Sucesso" className="w-12" />
            <p className='font-semibold'>{titulo}</p>
            <p className='text-sm text-[#727272]'>{descricao}</p>
        </motion.div>
    );
}
