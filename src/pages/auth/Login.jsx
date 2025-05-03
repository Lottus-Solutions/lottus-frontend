import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      navigate('/assistente');
    } else {
      console.log('Erro ao Logar');
    }
  };

  return (
    <div className="w-screen h-screen bg-[url('/images/bg_login.png')] backdrop-blur-lg bg-cover bg-no-repeat flex items-center justify-center">
      <div className="bg-white w-[400px] h-[450px] rounded-xl shadow-2xl flex items-center flex-col p-5">
        <img src="/images/logo.svg" alt="Logo" className="w-14 h-14" />
        <h2 className='text-2xl font-semibold'>Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full items-center mt-8">
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

          <div className='w-[90%] flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <input type="checkbox" />
              <p className='text-xs text-[#717171]'>Lembre-se de mim</p>
            </div>
            <a href="" className='text-xs text-[#717171]'>Esqueceu a senha?</a>
          </div>

          <button type="submit" className="bg-[#0292B7] w-[90%] text-white p-2 rounded-[8px] text-sm font-semibold mt-4 cursor-pointer">Entrar</button>

          <div className='flex items-center gap-2 w-[90%]'>
            <div className='w-1/2 h-[0.5px] bg-[#0292B7]'></div>
            <p className='text-[#0292B7] text-sm'>ou</p>
            <div className='w-1/2 h-[0.5px] bg-[#0292B7]'></div>
          </div>

          <button type="submit" className="border-[#0292B7] text-[#0292B7] border-[1px] w-[90%] p-2 rounded-[8px] text-sm cursor-pointer">Criar nova conta</button>
        </form>
      </div>
    </div>
  );
}
