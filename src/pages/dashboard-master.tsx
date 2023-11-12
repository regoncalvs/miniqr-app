import React, { useState, useEffect } from 'react';
import Layout from '@/app/layout';
import CadastroUsuario from '@/components/cadastro-usuario';

const DashboardLojista: React.FC = () => {
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        // Verificar se estamos no navegador antes de usar o localStorage
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
                            <h1 className="text-5xl font-bold align-top ">Dashboard Master</h1>
                        </div>                        
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/4 p-4">
                            <CadastroUsuario />
                        </div>
                    </div>
                </div>


            </Layout>
        )
    );
};

export default DashboardLojista;
