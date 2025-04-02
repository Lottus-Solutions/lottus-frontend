import { Blend, Repeat2, Book, Users, ChartBarStacked, LogOut, CircleUser } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Sidebar() {
  const [ativo, setAtivo] = useState('Assistente');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  const handleNavigation = (rota, botao) => {
    setAtivo(botao);
    navigate(rota);
  };

  return (
    <div className="fixed top-0 left-0 h-full w-72 bg-white shadow flex flex-col">
      <div className="flex flex-col items-center mb-10">
        <img src="/images/logo.svg" alt="Logo da Lottus" className="h-16 w-16 mt-10" />
        <h1 className="bg-gradient-to-r from-[#0292B7] to-[#98E2FA] bg-clip-text text-transparent text-3xl">Lottus</h1>
      </div>

      <div className='w-full'>
        <p className="font-semibold text-zinc-400 text-[10px] mb-4 pl-10">HOME</p>

        <div className='flex flex-col gap-1'>
          <button onClick={() => handleNavigation('/', 'Assistente')} className={`flex gap-4 w-[104%] rounded-r-lg pl-10 h-11 items-center hover:cursor-pointer ${ativo === 'Assistente' ? 'bg-[#0292B7] shadow' : 'bg-transparent'}`}> 
            <Blend className={`h-4 w-4 mb-[2px] ${ativo === 'Assistente' ? 'text-white' : 'text-[#555555]'}`} />
            <p className={`text-[14px] ${ativo === 'Assistente' ? 'text-white' : 'text-[#555555]'}`}>Assistente</p>
          </button>

          <button onClick={() => handleNavigation('/emprestimos', 'Empréstimos')} className={`flex gap-4 w-[104%] rounded-r-lg pl-10 h-11 items-center hover:cursor-pointer ${ativo === 'Empréstimos' ? 'bg-[#0292B7] shadow' : 'bg-transparent'}`}>
            <Repeat2 className={`h-4 w-4 mb-[2px] ${ativo === 'Empréstimos' ? 'text-white' : 'text-[#555555]'}`} />
            <p className={`text-[14px] ${ativo === 'Empréstimos' ? 'text-white' : 'text-[#555555]'}`}>Empréstimos</p>
          </button>

          <button onClick={() => handleNavigation('/catalogo', 'Catálogo')} className={`flex gap-4 w-[104%] rounded-r-lg pl-10 h-11 items-center hover:cursor-pointer ${ativo === 'Catálogo' ? 'bg-[#0292B7] shadow' : 'bg-transparent'}`}>
            <Book className={`h-4 w-4 mb-[2px] ${ativo === 'Catálogo' ? 'text-white' : 'text-[#555555]'}`} />
            <p className={`text-[14px] ${ativo === 'Catálogo' ? 'text-white' : 'text-[#555555]'}`}>Catálogo</p>
          </button>

          <button onClick={() => handleNavigation('/turmas', 'Turmas')} className={`flex gap-4 w-[104%] rounded-r-lg pl-10 h-11 items-center hover:cursor-pointer ${ativo === 'Turmas' ? 'bg-[#0292B7] shadow' : 'bg-transparent'}`}>
            <Users className={`h-4 w-4 mb-[2px] ${ativo === 'Turmas' ? 'text-white' : 'text-[#555555]'}`} />
            <p className={`text-[14px] ${ativo === 'Turmas' ? 'text-white' : 'text-[#555555]'}`}>Turmas</p>
          </button>
        </div>

        <p className="font-semibold text-zinc-400 text-[10px] mb-4 pl-10 mt-5">CONFIGURAÇÕES</p>

        <div className='flex flex-col gap-1'>
          <button onClick={() => handleNavigation('/categorias', 'Categorias')} className={`flex gap-4 w-[104%] rounded-r-lg pl-10 h-11 items-center hover:cursor-pointer ${ativo === 'Categorias' ? 'bg-[#0292B7] shadow' : 'bg-transparent'}`}>
            <ChartBarStacked className={`h-4 w-4 mb-[2px] ${ativo === 'Categorias' ? 'text-white' : 'text-[#555555]'}`} />
            <p className={`text-[14px] ${ativo === 'Categorias' ? 'text-white' : 'text-[#555555]'}`}>Categorias</p>
          </button>

          <button onClick={() => handleNavigation('/perfil', 'Perfil')} className={`flex gap-4 w-[104%] rounded-r-lg pl-10 h-11 items-center hover:cursor-pointer ${ativo === 'Perfil' ? 'bg-[#0292B7] shadow' : 'bg-transparent'}`}>
            <CircleUser className={`h-4 w-4 mb-[2px] ${ativo === 'Perfil' ? 'text-white' : 'text-[#555555]'}`} />
            <p className={`text-[14px] ${ativo === 'Perfil' ? 'text-white' : 'text-[#555555]'}`}>Perfil</p>
          </button>
        </div>

        <button className='flex items-center gap-4 pl-10 absolute bottom-10 hover:cursor-pointer' onClick={() => navigate('/logout')}>
          <LogOut className='h-4 w-4 mb-[1px] text-[#555555]' />
          <p className='text-[#555555] text-[14px]'>Sair</p>
        </button>
      </div>
    </div>
  );
}
