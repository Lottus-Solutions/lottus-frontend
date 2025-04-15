import { Blend, Book, CircleChevronRight, Repeat2 } from "lucide-react";

export function SessaoSolucoes() {
    return (
        <div>
            <div className="bg-white py-10 mt-30 flex items-center justify-between px-32 scroll-mt-16" id="solucoes">
                <div className="w-[520px] flex flex-col gap-3">
                    <p className="text-[14px] text-[#0292B7] font-semibold">Soluções</p>
                    <h2 className="text-2xl font-bold">Simplifique a gestão, potencialize o saber</h2>
                    <p className="text-[14px] text-[#6D6D6D]">Oferecemos uma série de funcionalidades para otimizar a gestão do acervo, o controle de empréstimos e o acompanhamento da leitura dos alunos. Com recursos intuitivos e automatizados, garantimos mais organização e praticidade no dia a dia da sua instituição de ensino.</p>
                </div>
                <img src="/images/mesa.png" alt="Imagem de uma mesa" className="ml-32 rounded-3xl shadow" />
            </div>
            <div className="w-full h-full flex  items-center justify-center">
                <div className="flex justify-between w-10/12 h-[400px] mt-24 scroll-mt-20">
                    <div className="p-10 w-[400px] rounded-3xl bg-white flex flex-col gap-3">
                        <div>
                            <Book className="mb-3 text-[#0292B7]" />
                            <h2 className="text-2xl font-bold">Acervo Digitalizado</h2>
                        </div>
                        <p className="text-[14px] text-[#6D6D6D] h-10">Explore o catálogo de livros da sua instituição com filtros específicos.</p>
                        <div className="flex flex-col gap-5 mt-4">
                            <div className="flex gap-2 items-start">
                                <CircleChevronRight className="text-[#0292B7]  min-w-6 min-h-6" />
                                <p>Busca por título, autor ou categoria.</p>
                            </div>
                            <div className="flex gap-2 items-start">
                                <CircleChevronRight className="text-[#0292B7]  min-w-6 min-h-6" />
                                <p>Disponibilidade em tempo real.</p>
                            </div>
                            <div className="flex gap-2 items-start">
                                <CircleChevronRight className="text-[#0292B7]  min-w-6 min-h-6" />
                                <p>Acesso remoto ao acervo completo.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-10 w-[400px] rounded-3xl bg-white flex flex-col gap-3">
                        <div>
                            <Repeat2 className="mb-3 text-[#0292B7]" />
                            <h2 className="text-2xl font-bold">Controle de Empréstimos</h2>
                        </div>
                        <p className="text-[14px] text-[#6D6D6D] h-10">O jeito mais simples de gerenciar empréstimos escolares.</p>
                        <div className="flex flex-col gap-5 mt-4">
                            <div className="flex gap-2 items-start">
                                <CircleChevronRight className="text-[#0292B7]  min-w-6 min-h-6" />
                                <p>Gerencie empréstimos e devoluções.</p>
                            </div>
                            <div className="flex gap-2 items-start">
                                <CircleChevronRight className="text-[#0292B7]  min-w-6 min-h-6" />
                                <p>Acesse histórico e renovações por aluno.</p>
                            </div>
                            <div className="flex gap-2 items-start">
                                <CircleChevronRight className="text-[#0292B7]  min-w-6 min-h-6" />
                                <p>Fluxo simplificado para bibliotecários.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-10 w-[400px] rounded-3xl bg-white flex flex-col gap-3">
                        <div>
                            <Blend className="mb-3 text-[#0292B7]" />
                            <h2 className="text-2xl font-bold">Assistente com IA </h2>
                        </div>
                        <p className="text-[14px] text-[#6D6D6D] h-10">Uma IA preparada para responder com precisão e sugerir insights com base nos dados.</p>
                        <div className="flex flex-col gap-5 mt-4">
                            <div className="flex gap-2 items-start">
                                <CircleChevronRight className="text-[#0292B7]  min-w-6 min-h-6" />
                                <p>Tira dúvidas sobre empréstimos e reservas.</p>
                            </div>
                            <div className="flex gap-2 items-start">
                                <CircleChevronRight className="text-[#0292B7] min-w-6 min-h-6" />
                                <p>Integrada aos dados da biblioteca.</p>
                            </div>
                            <div className="flex gap-2 items-start">
                                <CircleChevronRight className="text-[#0292B7]  min-w-6 min-h-6" />
                                <p>Agiliza o acesso a informações essenciais.</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}