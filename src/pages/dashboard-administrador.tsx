import React, { useState, useEffect } from 'react';
import StatusResumo from '../components/status-resumo';
import { obterCobrancas } from '@/services/cobrancas-service';
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
        const response = await obterCobrancas();
        setCobrancas(response);
        setCobrancasPagas(response.filter((cobranca: any) => cobranca.status === 'P'));
        setTimeout(() => {            
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
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
                <div className="container mx-auto py-8 px-8 2xl:px-32">
                    <div className="flex items-center  mb-4">
                        <div className="flex items-center">
                            <h1 className="sm:text-5xl text-2xl font-bold align-top ">Dashboard do Administrador</h1>
                        </div>
                        <TbReload
                            className={`cursor-pointer text-indigo-500 ml-2 ${rotate ? 'rotate' : ''}`}                      
                            size={50}
                            onClick={handleClick}
                        />
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-full sm:w-full lg:w-full xl:w-1/3 p-4">
                            <StatusResumo cobrancas={cobrancas} />
                        </div>

                        <div className="w-full sm:w-full lg:w-full xl:w-2/3 p-4">
                            <CancelarCobrancaList loadingData={loading} cobrancasPagas={cobrancasPagas} onCobrancaCancelada={fetchCobrancasCancelamento} />
                        </div>
                    </div>
                </div>


            </Layout>
        )
    );
};

export default DashboardAdministrador;
