import React, { useState, useEffect } from 'react';
import Layout from '@/app/layout';
import CadastroUsuario from '@/components/cadastro-usuario';
import { obterCobrancas } from '@/services/cobrancas-service';
import PagarCobrancaList from '@/components/pagar-cobranca-list';
import StatusResumo from '@/components/status-resumo';
import { TbReload } from 'react-icons/tb';

const DashboardLojista: React.FC = () => {
    const [token, setToken] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [cobrancasNovas, setCobrancasNovas] = useState<any[]>([]);
    const [cobrancas, setCobrancas] = useState<any[]>([]);
    const [rotate, setRotate] = useState(false);

    const fetchCobrancasPagamento = async () => {
        setLoading(true);
        const response = await obterCobrancas();
        setCobrancas(response);
        setCobrancasNovas(response.filter((cobranca: any) => cobranca.status === 'N'));
        setTimeout(() => {            
            setLoading(false);
        }, 500);
    };

    const handleClick = () => {
        setRotate(true);
        setTimeout(() => {
            setRotate(false);
        }, 500);
        fetchCobrancasPagamento();
    };

    useEffect(() => {
        if (!!token) fetchCobrancasPagamento();
    }, [token]);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token') || '';
            setToken(storedToken);
        }
    }, []);

    return (
        !!token && (
            <Layout>
                <div className="container mx-auto p-8">
                <div className="flex items-center  mb-4">
                        <div className="flex items-center">
                            <h1 className="sm:text-5xl text-2xl font-bold align-top ">Dashboard Master</h1>
                        </div>
                        <TbReload
                            className={`cursor-pointer text-indigo-500 ml-2 ${rotate ? 'rotate' : ''}`}                      
                            size={50}
                            onClick={handleClick}
                        />
                    </div>

                    <div className="flex flex-wrap">
                        <div className="xl:w-1/4 md:w-1/2 w-full p-4">
                            <CadastroUsuario />
                        </div>

                        <div className="xl:w-1/4 md:w-1/2 w-full p-4">
                            <StatusResumo cobrancas={cobrancas} vertical={true} />
                        </div>

                        <div className="xl:w-1/2 w-full p-4">
                            <PagarCobrancaList loadingData={loading} cobrancasNovas={cobrancasNovas} onCobrancaPaga={fetchCobrancasPagamento} />
                        </div>
                    </div>
                </div>


            </Layout>
        )
    );
};

export default DashboardLojista;
