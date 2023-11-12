import React, { ReactNode, useState } from 'react';
import { Button, Table } from 'antd';
import { cancelarCobranca } from '@/services/cobrancas-service';

interface CancelarCobrancaListProps {
  cobrancasPagas: any[];
  loadingData: boolean;
  onCobrancaCancelada: () => void;
}


const CancelarCobrancaList: React.FC<CancelarCobrancaListProps> = ({ cobrancasPagas, loadingData, onCobrancaCancelada }) => {
  const [loadingCancelamento, setLoadingCancelamento] = useState(false);

  const columns = [
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      width: '70%', 
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      width: '30%', 
    },
    {
      title: 'Cancelar',
      key: 'cancelar',
      render: (text: any, record: any) : ReactNode => (
        <Button onClick={() => handleCancelarCobranca(record.id)} loading={loadingCancelamento}>
          Cancelar
        </Button>
      ),
    },
  ];
  
  const handleCancelarCobranca = (cobrancaId: string) => {
    setLoadingCancelamento(true);
    cancelarCobranca(cobrancaId).then(() => {
      onCobrancaCancelada();
    });
    setLoadingCancelamento(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800">Cobranças Pagas</h2>
      <Table dataSource={cobrancasPagas} columns={columns} loading={loadingData} rowKey={(record) => record.id} />
    </div>
  );
};

export default CancelarCobrancaList;