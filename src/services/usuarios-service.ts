import api from "@/utils/api-middleware";
import { decodeToken } from "@/utils/auth";
import { criptografar } from "./criptografia-service";

const rotaUsuarios = '/usuarios'

export const cadastrarUsuario = async (values: { nome: string, email: string; password: string; rePassword: string; role: string }) => {
    values.password = await criptografar(values.password);
    values.rePassword = await criptografar(values.rePassword);
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await api.post(`${rotaUsuarios}/cadastro`, values, config);
}

export const login = async (values: { email: string; senha: string }) => {
    values.senha = await criptografar(values.senha);
    await api.post(`${rotaUsuarios}/login`, values).then((response) => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        const decodedToken = decodeToken(token);
        localStorage.setItem('role', decodedToken.role);
    })
}

export const logout = async () => {
    api.post(`${rotaUsuarios}/logout`)
        .then(() => {
            localStorage.removeItem('token');
        });
}