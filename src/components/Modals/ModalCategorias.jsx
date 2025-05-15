import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { CategoriaListItem } from '../SiteComponents/CategoriaListItem';
import { BotaoPrincipal } from '../botoes/BotaoPrincipal';

export function ModalCategorias(props) {
    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-10 rounded-2xl w-[40%] h-[80%] shadow-lg pt-16 relative flex">
                <button
                    className="absolute top-8 right-8 cursor-pointer"
                    onClick={props.onClose}
                >
                    <X className="text-gray-400" />
                </button>
                <div className='flex flex-col gap-6 w-full max-h-full'>
                    <div className='flex flex-col gap-2'>
                        <h2 className="text-[#0292B7] text-2xl font-semibold">Categorias Cadastradas</h2>
                    </div>
                    <div className='w-[100%] mt-6 h-8/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar'>
                        <CategoriaListItem />
                        <CategoriaListItem />
                        <CategoriaListItem />
                        <CategoriaListItem />
                        <CategoriaListItem />
                        <CategoriaListItem />
                        <CategoriaListItem />
                        <CategoriaListItem />
                        <CategoriaListItem />
                        <CategoriaListItem />
                        <CategoriaListItem />
                        <CategoriaListItem />
                        <CategoriaListItem />
                    </div>
                    <BotaoPrincipal nome="Adicionar Categoria"/>
                </div>

            </motion.div>




        </div>
    )
}
