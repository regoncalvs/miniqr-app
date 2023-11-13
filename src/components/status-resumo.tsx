import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

interface StatusResumoProps {
    cobrancas: any[];
    vertical?: boolean;
}

const StatusResumo: React.FC<StatusResumoProps> = ({ cobrancas, vertical = false }) => {
    const [statusCounts, setStatusCounts] = useState({ nova: 0, paga: 0, cancelada: 0, total: 0 });
    const triggerCountAnimationRefs = useRef<Array<(() => void)>>([]);

    useEffect(() => {
        if (!!cobrancas) {
            const novaCount = cobrancas.filter((cobranca) => cobranca.status === 'N').length;
            const pagaCount = cobrancas.filter((cobranca) => cobranca.status === 'P').length;
            const canceladaCount = cobrancas.filter((cobranca) => cobranca.status === 'C').length;
            const totalCount = cobrancas.length;

            setStatusCounts({ nova: novaCount, paga: pagaCount, cancelada: canceladaCount, total: totalCount });
            triggerCountAnimationRefs.current.forEach((start) => start());
        }
    }, [cobrancas]);

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-indigo-800">Número por status</h2>
            <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center max-w-md mx-auto py-2 px-4">
                <div className={`flex flex-col text-center bg-indigo-200 rounded-xl px-4 py-8 m-2 w-full ${vertical? " " : " sm:w-32 "} h-32`}>
                    <div className="text-4xl font-bold text-indigo-800 text-primary">
                        <CountUp duration={1} end={statusCounts.nova}>
                            {({ countUpRef, start }) => {
                                triggerCountAnimationRefs.current.push(start);
                                return <span ref={countUpRef} />;
                            }}
                        </CountUp>
                    </div>
                    <div className="text-sm font-semibold text-gray-500">Novas</div>
                </div>
                <div className={`flex flex-col text-center bg-indigo-200 rounded-xl px-4 py-8 m-2 w-full ${vertical? " " : " sm:w-32 "} h-32`}>
                    <div className="text-4xl font-bold text-indigo-800 text-success">
                        <CountUp duration={1} end={statusCounts.paga}>
                            {({ countUpRef, start }) => {
                                triggerCountAnimationRefs.current.push(start);
                                return <span ref={countUpRef} />;
                            }}
                        </CountUp>
                    </div>
                    <div className="text-sm font-semibold text-gray-500">Pagas</div>
                </div>
                <div className={`flex flex-col text-center bg-indigo-200 rounded-xl px-4 py-8 m-2 w-full ${vertical? " " : " sm:w-32 "} h-32`}>
                    <div className="text-4xl font-bold text-indigo-800 text-error">
                        <CountUp duration={1} end={statusCounts.cancelada}>
                            {({ countUpRef, start }) => {
                                triggerCountAnimationRefs.current.push(start);
                                return <span ref={countUpRef} />;
                            }}
                        </CountUp>
                    </div>
                    <div className="text-sm font-semibold text-gray-500">Canceladas</div>
                </div>
                <div className={`flex flex-col text-center bg-indigo-200 rounded-xl px-4 py-8 m-2 w-full ${vertical? " " : " sm:w-32 "} h-32`}>
                    <div className="text-4xl font-bold text-indigo-800 text-error">
                        <CountUp duration={1} end={statusCounts.total}>
                            {({ countUpRef, start }) => {
                                triggerCountAnimationRefs.current.push(start);
                                return <span ref={countUpRef} />;
                            }}
                        </CountUp>
                    </div>
                    <div className="text-sm font-semibold text-gray-500">Total</div>
                </div>
            </div>
        </div>
    );
};

export default StatusResumo;
