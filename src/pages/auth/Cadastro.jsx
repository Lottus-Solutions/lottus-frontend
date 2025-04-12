import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, senha })
    });

    if (response.ok) {
      console.log('Cadastro realizado com sucesso!');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      console.log('Erro ao cadastrar');
    }
  };

  return (
    <form onSubmit={handleCadastro} className="flex flex-col gap-4 max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold">Cadastro</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <button type="submit" className="bg-green-600 text-white p-2 rounded">Cadastrar</button>
    </form>
  );
}
