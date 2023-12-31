import React, { useState, useEffect } from 'react';
import NovaCobrancaForm from '../components/nova-cobranca';
import CobrancaList from '../components/cobranca-list';
import StatusSummary from '../components/status-resumo';
import { obterCobrancas } from '@/services/cobrancas-service';
import Layout from '@/app/layout';
import { TbReload } from 'react-icons/tb'

const DashboardLojista: React.FC = () => {
    const [token, setToken] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [cobrancas, setCobrancas] = useState<any[]>([]);
    const [rotate, setRotate] = useState(false);

    const handleClick = () => {
        setRotate(true);
        setTimeout(() => {
            setRotate(false);
        }, 500);
        fetchCobrancas();
    };

    const fetchCobrancas = async () => {
        setLoading(true);
        const response = await obterCobrancas();
        setCobrancas(response);
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
        if (!!token) fetchCobrancas();
    }, [token]);

    return (
        !!token && (
            <Layout>
                <div className="container mx-auto p-8">
                    <div className="flex items-center  mb-4">
                        <div className="flex items-center">
                            <h1 className="sm:text-5xl text-2xl font-bold align-top ">Dashboard do Lojista</h1>
                        </div>
                        <TbReload
                            className={`cursor-pointer text-indigo-500 ml-2 ${rotate ? 'rotate' : ''}`}
                            size={50}
                            onClick={handleClick}                        
                        />
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/4 p-4">
                            <NovaCobrancaForm onCobrancaAdicionada={fetchCobrancas} />
                        </div>

                        <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-7/20 py-4 px-4 2xl:px-12">
                            <StatusSummary cobrancas={cobrancas} />
                        </div>

                        <div className="w-full sm:w-full lg:w-full xl:w-2/5 p-4">
                            <CobrancaList loading={loading} cobrancas={cobrancas} />
                        </div>
                    </div>
                </div>


            </Layout>
        )
    );
};

export default DashboardLojista;
