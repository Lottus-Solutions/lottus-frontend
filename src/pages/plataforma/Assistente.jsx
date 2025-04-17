import { Book, ChartColumnStacked, Repeat2, Users } from "lucide-react";
import { Search } from "../../components/Search";
import { Perfil } from "../../components/Perfil";

export function Assistente() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Perfil />
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center mb-12">
                    <p className="text-2xl">Olá Mary!</p>
                    <p className="text-2xl">Como posso ajudar?</p>
                </div>
                <Search placeholder="Faça uma pergunta..." />
                <div className="flex gap-4 mt-8">
                    <div className="flex gap-2 text-[#0292B7] items-center justify-center border-[1px] border-[#0292B7] rounded-full w-36 h-8 cursor-pointer">
                        <Repeat2 className="w-4 h-4"/>
                        <p className="text-xs">Empréstimos</p>
                    </div>
                    <div className="flex gap-2 text-[#8550C9] items-center justify-center border-[1px] border-[#8550C9] rounded-full w-36 h-8 cursor-pointer">
                        <Book className="w-4 h-4"/>
                        <p className="text-xs">Livros</p>
                    </div>
                    <div className="flex gap-2 text-[#B702B1] items-center justify-center border-[1px] border-[#B702B1] rounded-full w-36 h-8 cursor-pointer">
                        <Users className="w-4 h-4"/>
                        <p className="text-xs">Alunos</p>
                    </div>
                    <div className="flex gap-2 text-[#B70247] items-center justify-center border-[1px] border-[#B70247] rounded-full w-36 h-8 cursor-pointer">
                        <ChartColumnStacked className="w-4 h-4"/>
                        <p className="text-xs">Categorias</p>
                    </div>
                </div>
            </div>
        </div>
    )
}