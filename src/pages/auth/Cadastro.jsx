import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      setError('Nome é obrigatório.');
      return;
    }

    if (!validarEmail(email)) {
      setError('Email inválido.');
      return;
    }

    if (senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }

    setError('');

    try {
      const response = await axios.post('http://localhost:8080/auth/register', {
        nome,
        email,
        senha
      });

      if (response.status === 201 || response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate('/login');
        }, 2000); 
      }
    } catch (erro) {
      setError('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div className="w-screen h-screen bg-[url('/images/bg_login.png')] backdrop-blur-lg bg-cover bg-no-repeat flex items-center justify-center">
      <div className="bg-white w-[440px] h-fit pb-10 rounded-xl shadow-2xl flex items-center flex-col p-5">
        <img src="/images/logo.svg" alt="Logo" className="w-14 h-14" />
        <h2 className='text-2xl font-semibold mb-2'>Cadastro</h2>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-green-50 text-green-700 rounded-xl shadow-lg fixed top-7 z-50 px-9 py-6 mx-auto left-1/2 -translate-x-1/2"
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold text-base">Cadastro realizado com sucesso!</p>
                <p className="text-sm">Você será redirecionado para a página de login.</p>
              </div>
            </div>
          </motion.div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-500 px-4 py-2 rounded w-[90%] text-sm mt-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleCadastro} className="flex flex-col gap-4 w-full items-center mt-6">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border-[1px] rounded-[8px] w-[90%] text-sm h-8 ps-4 outline-0 border-[#0292B7]"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[1px] rounded-[8px] w-[90%] text-sm h-8 ps-4 outline-0 border-[#0292B7]"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border-[1px] rounded-[8px] w-[90%] text-sm h-8 ps-4 pe-4 outline-0 border-[#0292B7]"
            required
          />
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="border-[1px] rounded-[8px] w-[90%] text-sm h-8 ps-4 outline-0 border-[#0292B7]"
            required
          />

          <button type="submit" className="bg-[#0292B7] w-[90%] text-white p-2 rounded-[8px] text-sm font-semibold mt-4 cursor-pointer">
            Criar conta
          </button>

          <div className='flex items-center gap-2 w-[90%]'>
            <div className='w-1/2 h-[0.5px] bg-[#0292B7]'></div>
            <p className='text-[#0292B7] text-sm'>ou</p>
            <div className='w-1/2 h-[0.5px] bg-[#0292B7]'></div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="border-[#0292B7] text-[#0292B7] border-[1px] w-[90%] p-2 rounded-[8px] text-sm cursor-pointer"
          >
            Entrar com sua conta
          </button>
        </form>
      </div>
    </div>
  );
}
