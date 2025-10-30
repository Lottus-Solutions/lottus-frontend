import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false); // controla exibição da senha

  const navigate = useNavigate();

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const fazerLogin = async (e) => {
    e.preventDefault();

    const emailTrim = email.trim();
    const senhaTrim = senha.trim();

    if (!validarEmail(emailTrim)) {
      setError('Email inválido.');
      return;
    }

    if (senhaTrim.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setError('');

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email: emailTrim,
        senha: senhaTrim
      });

      localStorage.setItem('token', response.data.token);
      setSuccess(true);

      setTimeout(() => {
        navigate('/assistente');
      }, 3000);
    } catch (erro) {
      if (erro.response) {
        setError('Email ou senha incorretos.');
      } else {
        setError('Erro ao conectar com o servidor.');
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-[url('/images/bg_login.png')] backdrop-blur-lg bg-cover bg-no-repeat flex items-center justify-center">
      <div className="bg-white w-[440px] h-fit pb-10 rounded-xl shadow-2xl flex items-center flex-col p-5 ">
        <img src="/images/logo.svg" alt="Logo" className="w-14 h-14" />
        <h2 className='text-2xl font-semibold mb-2'>Login</h2>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-green-50 text-green-700 rounded-xl shadow-lg fixed top-7 z-50 px-9 py-6 mx-auto left-1/2 -translate-x-1/2"
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold text-base">Login realizado com sucesso!</p>
                <p className="text-sm">Bem-vindo a Lottus</p>
              </div>
            </div>
          </motion.div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-500 px-4 py-2 rounded w-[90%] text-sm mt-5">
            {error}
          </div>
        )}

        <form onSubmit={fazerLogin} className="flex flex-col gap-4 w-full items-center mt-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[1px] rounded-[8px] w-[90%] text-sm h-8 ps-4 outline-0 border-[#0292B7]"
            required
          />

          <div className="relative w-[90%]">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border-[1px] rounded-[8px] w-full text-sm h-8 ps-4 pe-10 outline-0 border-[#0292B7]"
              required
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#0292B7] hover:text-[#027799]"
              tabIndex={-1} // para não focar no botão com tab
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {mostrarSenha ? (
                // Ícone olho aberto
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                // Ícone olho fechado
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.965 9.965 0 012.502-4.204m1.373-1.373A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.115 2.451M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>

          <div className='w-[90%] flex justify-between items-center'>
            <a href="#" className='text-xs text-[#717171]'>Esqueceu a senha?</a>
          </div>

          <button type="submit" className="bg-[#0292B7] w-[90%] text-white p-2 rounded-[8px] text-sm font-semibold mt-4 cursor-pointer">
            Entrar
          </button>

          <div className='flex items-center gap-2 w-[90%]'>
            <div className='w-1/2 h-[0.5px] bg-[#0292B7]'></div>
            <p className='text-[#0292B7] text-sm'>ou</p>
            <div className='w-1/2 h-[0.5px] bg-[#0292B7]'></div>
          </div>

          <button type="button" onClick={() => navigate('/cadastro')} className="border-[#0292B7] text-[#0292B7] border-[1px] w-[90%] p-2 rounded-[8px] text-sm cursor-pointer">
            Criar nova conta
          </button>
        </form>
      </div>
    </div>
  );
}
