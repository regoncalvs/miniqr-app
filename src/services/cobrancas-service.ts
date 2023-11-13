import api from "@/utils/api-middleware";
import { message } from "antd";

const rotaCobrancas = '/cobrancas';

export const obterStatusCobrancas = async () => {
    const config = obterConfig();
    const response = await api.get(`${rotaCobrancas}/lojista`, config);
    return response.data;
};

export const obterCobrancas = async () => {
    const config = obterConfig();
    const response = await api.get(rotaCobrancas, config);
    return response.data;
};

export const novaCobranca = async (values: { descricao: string, valor: number }) => {
    const config = obterConfig();
    await api.post(rotaCobrancas, values, config).then(() => {
        message.success('Cobrança criada com sucesso!');
    }).catch((error) => {
        if(error?.response?.status === 400) message.error(error.response.data.detail);       
    });
}

export const cancelarCobranca = async (cobrancaId: string) => {
    const config = obterConfig();
    await api.post(`${rotaCobrancas}/${cobrancaId}/cancelar`, config).then(() => {
        message.success('Cobrança cancelada com sucesso!');
    });
}

export const pagarCobranca = async (cobrancaId: string) => {
    const config = obterConfig();
    await api.post(`${rotaCobrancas}/${cobrancaId}/pagar`, config).then(() => {
        message.success('Cobrança paga com sucesso!');
    });
}

function obterConfig() {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return config;
}
