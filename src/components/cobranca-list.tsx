import React, { useState } from 'react';
import { Table, Pagination } from 'antd';
import { StatusCobranca } from '@/enums/status-cobranca-enum';

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
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tamanhoPagina, setTamanhoPagina] = useState(5);

  const handlePaginacaoChange = (pagina: number, tamanhoPagina?: number) => {
    setPaginaAtual(pagina);
    if (tamanhoPagina) {
      setTamanhoPagina(tamanhoPagina);
    }
  };

  const paginacao = {
    current: paginaAtual,
    pageSize: tamanhoPagina,
    total: cobrancas.length,
    showSizeChanger: true,
    onShowSizeChange: handlePaginacaoChange,
    onChange: handlePaginacaoChange,
    pageSizeOptions: ['5', '10', '20', '50'],
  };

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

  const paginacaoInfo = (
    <Pagination {...paginacao} style={{ marginTop: '16px', textAlign: 'center' }} />
  );

  const cobrancasPaginadas = cobrancas.slice(
    (paginaAtual - 1) * tamanhoPagina,
    paginaAtual * tamanhoPagina
  );

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-800">Cobranças Existentes</h2>
      <Table
        className="table-striped-rows"
        dataSource={cobrancasPaginadas}
        columns={columns}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={false}
      />   
      {paginacaoInfo}
    </div>
  );
};

export default CobrancaList;
