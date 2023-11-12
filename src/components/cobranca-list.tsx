import React from 'react';
import { Table } from 'antd';
import { StatusCobranca } from '@/enums/StatusCobranca';

interface CobrancaListProps {
  cobrancas: any[];
  loading: boolean;
}

const getStatusText = (status: StatusCobranca) => {
  switch (status) {
    case StatusCobranca.Nova:
      return 'Nova';
    case StatusCobranca.Paga:
      return 'Paga';
    case StatusCobranca.Cancelada:
      return 'Cancelada';
    default:
      return '';
  }
};

const CobrancaList: React.FC<CobrancaListProps> = ({ cobrancas, loading }) => {
  const columns = [
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      width: '70%', 
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '30%', 
      render: (status: StatusCobranca) => getStatusText(status),
    },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800">Cobranças Existentes</h2>
      <Table dataSource={cobrancas} columns={columns} loading={loading} rowKey={(record) => record.id} />
    </div>
  );
};

export default CobrancaList;