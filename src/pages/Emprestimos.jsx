import { EmprestimoListItem } from "../components/EmprestimoListItem";
import { Search } from "../components/Search";
import '../index.css'

export function Emprestimos() {
    return (
        <div className="h-screen pt-16 pl-16">
            <h2 className="text-3xl font-bold text-[#0292B7] mb-10">Empréstimos</h2>
            <div className="flex justify-between w-9/10">
                <Search />
                <div className="flex items-center justify-center gap-5 mr-8 w-40 px-4 h-10 border-[#727272] border-[1px] rounded-full">
                    <p className="text-[#727272]">Em atraso</p>
                    <input type="checkbox"/>
                </div>
            </div>
            <div className="mt-12 w-9/10 h-7/10 flex flex-col gap-8 overflow-y-scroll pr-8 custom-scrollbar">

                <EmprestimoListItem
                    aluno='Caio Viveiros'
                    livro='Romeu e Julieta'
                    dataDevolucao='17/01/2006'
                    diasAtraso='3 dias'
                />
                <EmprestimoListItem
                    aluno='Sergio Emiliano'
                    livro='Harry Potter'
                    dataDevolucao='17/01/2006'
                    diasAtraso='1 dias'
                />
                <EmprestimoListItem
                    aluno='Sophia Balboni'
                    livro='O poder do habito'
                    dataDevolucao='17/01/2006'
                    diasAtraso='0 dias'
                />
                <EmprestimoListItem
                    aluno='Sophia Balboni'
                    livro='O poder do habito'
                    dataDevolucao='17/01/2006'
                    diasAtraso='0 dias'
                />
                <EmprestimoListItem
                    aluno='Sophia Balboni'
                    livro='O poder do habito'
                    dataDevolucao='17/01/2006'
                    diasAtraso='0 dias'
                />
            </div>
        </div>
    )
}