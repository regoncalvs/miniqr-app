import React, { useEffect, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi'
import { LiaTimesCircle } from 'react-icons/lia'

interface SenhaRulesProps {
    senha: string;
}
interface Regra {
    check: boolean,
    descricao: string
}
const RegrasSenha: React.FC<SenhaRulesProps> = ({ senha }) => {
    const [regras, setRegras] = useState<Regra[]>([]);
    const [senhaValida, setSenhaValida] = useState(false);

    const validateSenha = (value: string) => {
        const regras: Regra[] = [];

        if (value.length >= 8) {
            regras.push({ check: true, descricao: '8 caracteres.' });
        } else {
            regras.push({ check: false, descricao: '8 caracteres.' });
        }

        if (/[A-Z]/.test(value)) {
            regras.push({ check: true, descricao: 'Uma letra maiúscula.' });
        } else {
            regras.push({ check: false, descricao: 'Uma letra maiúscula.' });
        }

        if (/\d/.test(value)) {
            regras.push({ check: true, descricao: 'Um número.' });
        } else {
            regras.push({ check: false, descricao: 'Um número.' });
        }

        if (/[@$!%*?&]/.test(value)) {
            regras.push({ check: true, descricao: 'Um caractere especial.' });
        } else {
            regras.push({ check: false, descricao: 'Um caractere especial.' });
        }


        setRegras(regras);
    };

    useEffect(() => {
        validateSenha(senha);
    }, [senha])


    useEffect(() => {
        if (regras.some(r => !r.check)) setSenhaValida(false);
        else setSenhaValida(true);
    }, [regras])

    return (
        <div className={`text-sm mb-4 ${senhaValida? ' -mt-5 ' : ' -mt-10 '}`}>
            <ul>
                {regras.map((regra, index) => (
                    <li key={index} className={regra.check ? 'text-green-500' : 'text-red-500'}>
                        <div className='flex items-center'>
                            {regra.check ? <FiCheckCircle /> : <LiaTimesCircle />}
                            <div className='ml-2 text-xs'>{regra.descricao}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RegrasSenha;
