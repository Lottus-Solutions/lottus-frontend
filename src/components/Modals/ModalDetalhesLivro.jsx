import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { UltimosLeitoresListItem } from '../UltimosLeitoresListItem';

export function ModalDetalhesLivro(props) {
    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-10 rounded-2xl w-[80%] h-[80%] shadow-lg pt-16 relative flex">
                <button
                    className="absolute top-8 right-8 cursor-pointer"
                    onClick={props.onClose}
                >
                    <X className="text-gray-400" />
                </button>
                <div className='flex flex-col gap-6 w-1/3 max-h-full'>
                    <div className='flex flex-col gap-2'>
                        <h2 className="text-[#0292B7] text-xl font-semibold">Harry Potter e a Câmara Secreta</h2>
                        <p className='text-base'>J. K Rowling</p>
                    </div>
                    <div className='bg-[#0292B7] w-fit px-7 py-1 rounded-full flex items-center justify-center'>
                        <p className='text-sm text-white'>Aventura</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm flex items-center gap-1'>Quantidade: <p className='text-sm text-[#727272]'>3</p></p>
                        <p className='text-sm flex items-center gap-1'>Reservado: <p className='text-sm text-[#727272]'>2/3</p></p>
                    </div>
                    <div className='flex flex-col gap-2 w-[80%]'>
                        <p className='text-sm'>Descrição:</p>
                        <p className='text-sm text-[#727272]'>Harry Potter e a Câmara Secreta é o segundo livro da série escrita por J.K. Rowling. Nele, Harry retorna a Hogwarts para seu segundo ano, mas logo eventos estranhos começam a acontecer: alunos estão sendo petrificados e uma mensagem assustadora aparece nas paredes do castelo, alertando sobre a abertura da lendária Câmara Secreta. Com a ajuda de Rony e Hermione, Harry investiga a origem do perigo e precisa enfrentar um grande mistério que envolve monstros, magia antiga e segredos do passado da escola.
                        </p>
                    </div>

                </div>
                <div className='w-2/3'>
                    <p>Últimos leitores</p>
                    <div className="w-[95%] mt-6 h-9/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar">
                        <UltimosLeitoresListItem />
                        <UltimosLeitoresListItem />
                        <UltimosLeitoresListItem />
                        <UltimosLeitoresListItem />
                        <UltimosLeitoresListItem />
                        <UltimosLeitoresListItem />
                        <UltimosLeitoresListItem />
                        <UltimosLeitoresListItem />
                        <UltimosLeitoresListItem />
                        <UltimosLeitoresListItem />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
