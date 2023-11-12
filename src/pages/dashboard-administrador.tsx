import React, { useState, useEffect } from 'react';
import CobrancaList from '../components/cobranca-list';
import StatusSummary from '../components/status-resumo';
import { obterCobrancasAdmin } from '@/services/cobrancas-service';
import Layout from '@/app/layout';
import { TbReload } from 'react-icons/tb'
import CancelarCobrancaList from '@/components/cancelar-cobranca-list';

const DashboardAdministrador: React.FC = () => {
    const [token, setToken] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [cobrancasPagas, setCobrancasPagas] = useState<any[]>([]);
    const [cobrancas, setCobrancas] = useState<any[]>([]);
    const [rotate, setRotate] = useState(false);

    const handleClick = () => {
        setRotate(true);
        setTimeout(() => {
            setRotate(false);
        }, 500);
        fetchCobrancasCancelamento();
    };

    const fetchCobrancasCancelamento = async () => {
        setLoading(true);
        const response = await obterCobrancasAdmin();
        setCobrancas(response);
        setCobrancasPagas(response.filter((cobranca: any) => cobranca.status === 'P'));
        setTimeout(() => {            
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        // Verificar se estamos no navegador antes de usar o localStorage
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token') || '';
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (!!token) fetchCobrancasCancelamento();
    }, [token]);

    return (
        !!token && (
            <Layout>
                <div className="container mx-auto p-8">
                    <div className="flex items-center  mb-4">
                        <div className="flex items-center">
                            <h1 className="text-5xl font-bold align-top ">Dashboard do Administrador</h1>
                        </div>
                        <TbReload
                            className={`cursor-pointer text-indigo-500 ml-2 ${rotate ? 'rotate' : ''}`}
                            size={50}
                            onClick={handleClick}
                        />
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/4 p-4">
                            <StatusSummary cobrancas={cobrancas} />
                        </div>

                        <div className="w-full sm:w-full lg:w-full xl:w-1/2 p-4">
                            <CancelarCobrancaList loadingData={loading} cobrancasPagas={cobrancasPagas} onCobrancaCancelada={fetchCobrancasCancelamento} />
                        </div>
                    </div>
                </div>


            </Layout>
        )
    );
};

export default DashboardAdministrador;
