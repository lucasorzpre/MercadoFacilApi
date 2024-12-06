import { useState } from "react";
import { LoginData } from "../../Interfaces/LoginData";
import { ListarUsuarios, LoginAPI } from "../../Servicos/MercadoFacilAPI";

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await LoginAPI(loginData);
      if (response.data && response.status === 200) {
        sessionStorage.setItem('token', response.data.token);
      } else {
        alert('Falha no login');
      }
    } catch (error) {
      console.error('Falha no login: ', error);
    } finally {
      await handlePostLoginActions();
    }
  };

  const handlePostLoginActions = async () => {
    try {
      const response = await ListarUsuarios();
      const usuario = response.find((user: any) => user.email === loginData.email);
      if (usuario) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        handleFavoriteActions(usuario);
      } else {
        console.warn('Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
    }
  };

  const handleFavoriteActions = (usuario: any) => {
    if (usuario.observedShares) {
      const acoesFavoritas = usuario.observedShares.split(',').map((acao: string) => acao.trim());
      localStorage.setItem('favorites', JSON.stringify(acoesFavoritas));
    } else {
      console.warn('Usuário não possui ações favoritas (observedShares).');
    }
  };

  return (
    <div className="flex items-center justify-center h-96 w-96 bg-gray-900">
      <form
        className="bg-gray-800 text-white p-10 rounded-lg shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-left font-medium text-gray-300">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm p-4 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm text-left font-medium text-gray-300">Senha</label>
          <input
            id="password"
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm p-4 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
