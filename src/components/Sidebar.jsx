import { Blend, Repeat2, Book, Users, ChartBarStacked, LogOut, CircleUser } from 'lucide-react'

import { useState } from "react"

export function Sidebar() {
  const [ativo, setAtivo] = useState("Assistente");

  const toggleAtivo = (botao) => {
    setAtivo(botao);
  };

  return (
    <div className="fixed top-0 left-0 h-full w-72 bg-white shadow flex flex-col">
      <div className="flex flex-col items-center mb-16">
        <img src="/images/logo.svg" alt="Logo da Lottus" className="h-20 w-20 mt-10" />
        <h1 className="bg-gradient-to-r from-[#0292B7] to-[#98E2FA] bg-clip-text text-transparent text-4xl">Lottus</h1>
      </div>

      <div className='w-full'>
        <p className="font-semibold text-zinc-400 text-xs mb-4 pl-10">HOME</p>

        <div className=' flex flex-col gap-1'>

          <button onClick={() => toggleAtivo('Assistente')} className={`flex gap-4 w-[104%] rounded-r-lg pl-10 h-14 hover:cursor-pointer items-center ${ativo === 'Assistente' ? 'bg-[#0292B7] shadow' : 'bg-transparent'}`}>
            <Blend className={`text-[#555555] h-5 w-5 mb-[2px] ${ativo === 'Assistente' ? 'text-white' : 'text-[#555555]'}`} />
            <p className={`text-[#555555] ${ativo === 'Assistente' ? 'text-white' : 'text-[#555555]'}`}>Assistente</p>
          </button>

          <button onClick={() => toggleAtivo('Empréstimos')} className={`flex gap-4 w-[104%] rounded-r-lg pl-10 h-14 hover:cursor-pointer items-center ${ativo === 'Empréstimos' ? 'bg-[#0292B7] shadow' : 'bg-transparent'}`}>
            <Repeat2 className={`text-[#555555] h-5 w-5 mb-[2px] ${ativo === 'Empréstimos' ? 'text-white' : 'text-[#555555]'}`} />
            <p className={`text-[#555555] ${ativo === 'Empréstimos' ? 'text-white' : 'text-[#555555]'}`}>Empréstimos</p>
          </button>

          <button onClick={() => toggleAtivo('Catálogo')} className={`flex gap-4 w-[104%] rounded-r-lg pl-10 h-14 hover:cursor-pointer items-center ${ativo === 'Catálogo' ? 'bg-[#0292B7] shadow' : 'bg-transparent'}`}>
            <Book className={`text-[#555555] h-5 w-5 mb-[2px] ${ativo === 'Catálogo' ? 'text-white' : 'text-[#555555]'}`} />
            <p className={`text-[#555555] ${ativo === 'Catálogo' ? 'text-white' : 'text-[#555555]'}`}>Catálogo</p>
          </button>

          <button onClick={() => toggleAtivo('Turmas')} className={`flex gap-4 w-[104%] rounded-r-lg pl-10 h-14 hover:cursor-pointer items-center ${ativo === 'Turmas' ? 'bg-[#0292B7] shadow' : 'bg-transparent'}`}>
            <Users className={`text-[#555555] h-5 w-5 mb-[2px] ${ativo === 'Turmas' ? 'text-white' : 'text-[#555555]'}`} />
            <p className={`text-[#555555] ${ativo === 'Turmas' ? 'text-white' : 'text-[#555555]'}`}>Turmas</p>
          </button>

        </div>
        <p className="font-semibold text-zinc-400 text-xs mb-4 pl-10 mt-5">CONFIGURAÇÕES</p>

        <div className=' flex flex-col gap-1'>

          <button onClick={() => toggleAtivo('Categorias')} className={`flex gap-4 w-[104%] rounded-r-lg pl-10 h-14 hover:cursor-pointer items-center ${ativo === 'Categorias' ? 'bg-[#0292B7] shadow' : 'bg-transparent'}`}>
            <ChartBarStacked className={`text-[#555555] h-5 w-5 mb-[2px] ${ativo === 'Categorias' ? 'text-white' : 'text-[#555555]'}`} />
            <p className={`text-[#555555] ${ativo === 'Categorias' ? 'text-white' : 'text-[#555555]'}`}>Categorias</p>
          </button>

          <button onClick={() => toggleAtivo('Perfil')} className={`flex gap-4 w-[104%] rounded-r-lg pl-10 h-14 hover:cursor-pointer items-center ${ativo === 'Perfil' ? 'bg-[#0292B7] shadow' : 'bg-transparent'}`}>
            <CircleUser className={`text-[#555555] h-5 w-5 mb-[2px] ${ativo === 'Perfil' ? 'text-white' : 'text-[#555555]'}`} />
            <p className={`text-[#555555] ${ativo === 'Perfil' ? 'text-white' : 'text-[#555555]'}`}>Perfil</p>
          </button>
        </div>

        <button className='flex items-center gap-4 pl-10 absolute bottom-10 hover:cursor-pointer '>
          <LogOut className='h-5 w-5 mb-[1px] text-[#555555]'/>
          <p className='text-[#555555]'>Sair</p>
        </button>
        
      </div>
    </div>

  );
}










