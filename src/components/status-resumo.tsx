
import React, { useEffect, useState } from 'react';

interface StatusResumoProps {
  cobrancas: any[];
}

const StatusResumo: React.FC<StatusResumoProps> = ({ cobrancas }) => {
  const [statusCounts, setStatusCounts] = useState({ nova: 0, paga: 0, cancelada: 0, total: 0 });

  useEffect(() => {
    if(!!cobrancas) {
    const novaCount = cobrancas.filter((cobranca) => cobranca.status === 'N').length;
    const pagaCount = cobrancas.filter((cobranca) => cobranca.status === 'P').length;
    const canceladaCount = cobrancas.filter((cobranca) => cobranca.status === 'C').length;
    const totalCount = cobrancas.length;


    setStatusCounts({ nova: novaCount, paga: pagaCount, cancelada: canceladaCount, total: totalCount });}
  }, [cobrancas]);

  return (
    <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center max-w-md mx-auto mt-8 p-6">
  <div className="flex flex-col text-center bg-indigo-200 rounded-xl px-4 py-8 m-2 w-full sm:w-32 h-32">
    <div className="text-4xl font-bold text-indigo-800 text-primary">{statusCounts.nova}</div>
    <div className="text-sm font-semibold text-gray-500">Novas</div>
  </div>
  <div className="flex flex-col text-center bg-indigo-200 rounded-xl px-4 py-8 m-2 w-full sm:w-32 h-32">
    <div className="text-4xl font-bold text-indigo-800 text-success">{statusCounts.paga}</div>
    <div className="text-sm font-semibold text-gray-500">Pagas</div>
  </div>
  <div className="flex flex-col text-center bg-indigo-200 rounded-xl px-4 py-8 m-2 w-full sm:w-32 h-32">
    <div className="text-4xl font-bold text-indigo-800 text-error">{statusCounts.cancelada}</div>
    <div className="text-sm font-semibold text-gray-500">Canceladas</div>
  </div>
  <div className="flex flex-col text-center bg-indigo-200 rounded-xl px-4 py-8 m-2 w-full sm:w-32 h-32">
    <div className="text-4xl font-bold text-indigo-800 text-error">{statusCounts.total}</div>
    <div className="text-sm font-semibold text-gray-500">Total</div>
  </div>
</div>

  


  );
};

export default StatusResumo;
