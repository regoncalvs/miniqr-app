import React, { useState, useEffect } from 'react';
import Layout from '@/app/layout';
import CadastroUsuario from '@/components/cadastro-usuario';

const DashboardLojista: React.FC = () => {
    const [token, setToken] = useState<string>('');

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
                    <div className="flex items-center justify-center mb-4">
                        <div className="text-center">
                            <h1 className="sm:text-5xl text-2xl font-bold">Dashboard Master</h1>
                        </div>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-full p-4">
                            <CadastroUsuario />
                        </div>
                    </div>
                </div>


            </Layout>
        )
    );
};

export default DashboardLojista;
