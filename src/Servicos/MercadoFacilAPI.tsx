import axios from 'axios';
import { LoginData } from '../Interfaces/LoginData';
import { Usuario } from '../Interfaces/Usuario';

const apiClient = axios.create({
    baseURL: 'https://tcwhl22p-5165.brs.devtunnels.ms',
    headers: {
        'Content-Type': 'application/json'
    }
});

const getAuthToken = () => `Bearer ${sessionStorage.getItem('token')}`;

const apiGet = async (url: string) => {
    try {
        const response = await apiClient.get(url, {
            headers: {
                'Authorization': getAuthToken()
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Erro ao obter dados de ${url}: `, error);
        throw error;
    }
};

const apiPost = async (url: string, data: any) => {
    try {
        const response = await apiClient.post(url, data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao enviar dados para ${url}: `, error);
        throw error;
    }
};

const apiPut = async (url: string, data: any) => {
    try {
        const response = await apiClient.put(url, data, {
            headers: {
                'Authorization': getAuthToken()
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar dados em ${url}: `, error);
        throw error;
    }
};

const apiDelete = async (url: string) => {
    try {
        const response = await apiClient.delete(url, {
            headers: {
                'Authorization': getAuthToken()
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar dados de ${url}: `, error);
        throw error;
    }
};

export const LoginAPI = (loginData: LoginData) => {
    return apiPost('/api/Login/login', loginData);
};

export const CriarUsuario = (dadosUsuario: Usuario) => {
    return apiPost('/User', dadosUsuario);
};

export const AtualizarUsuario = (dadosUsuario: Usuario) => {
    return apiPut("/User", dadosUsuario);
};

export const DeletarUsuario = (id: string) => {
    return apiDelete(`/UserController/DeleteUser/${id}`);
};

export const ListarUsuarios = () => {
    return apiGet("/User");
};

export const getAcaoPorCodigo = (symbol: string) => {
    return apiGet(`/Share/${symbol}`);
};

export const buscarAcoes = (page: number, resultsByPage: number) => {
    return apiGet(`/Share/${page}, ${resultsByPage}`);
};

export const buscarAcoesFavoritas = (page: number, resultsByPage: number) => {
    return apiGet(`/Share/${page}, ${resultsByPage}`);
};
