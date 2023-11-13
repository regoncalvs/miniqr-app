import React, { ReactNode, useState } from 'react';
import { Button, Pagination, Table } from 'antd';
import { pagarCobranca } from '@/services/cobrancas-service';

interface PagarCobrancaListProps {
  cobrancasNovas: any[];
  loadingData: boolean;
  onCobrancaPaga: () => void;
}

const PagarCobrancaList: React.FC<PagarCobrancaListProps> = ({ cobrancasNovas, loadingData, onCobrancaPaga }) => {
  const [loadingPagamento, setLoadingPagamento] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tamanhoPagina, setTamanhoPagina] = useState(10);

  const handlePaginacaoChange = (pagina: number, tamanhoPagina?: number) => {
    setPaginaAtual(pagina);
    if (tamanhoPagina) {
      setTamanhoPagina(tamanhoPagina);
    }
  };

  const paginacao = {
    current: paginaAtual,
    pageSize: tamanhoPagina,
    total: cobrancasNovas.length,
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
      width: '50%', 
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      width: '30%', 
    },
    {      
      key: 'pagar',
      width: '20%',       
      render: (text: any, record: any) : ReactNode => (
        <Button className='bg-amber-100' onClick={() => handlePagarCobranca(record.id)} loading={loadingPagamento}>
          Pagar
        </Button>
      ),
    },
  ];

  const paginacaoInfo = (
    <Pagination {...paginacao} style={{ marginTop: '16px', textAlign: 'center' }} />
  );

  const cobrancasPagasPaginadas = cobrancasNovas.slice(
    (paginaAtual - 1) * tamanhoPagina,
    paginaAtual * tamanhoPagina
  );
  
  const handlePagarCobranca = (cobrancaId: string) => {
    setLoadingPagamento(true);
    pagarCobranca(cobrancaId).then(() => {
      onCobrancaPaga();
    }).finally(()=>{
      setLoadingPagamento(false);
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-800">Cobranças Novas</h2>
      <Table 
        className="table-striped-rows sm:py-9"
        dataSource={cobrancasPagasPaginadas} 
        columns={columns} 
        loading={loadingData} 
        scroll={{x: 500}}
        rowKey={(record) => record.id} 
        pagination={false}
      />
      {paginacaoInfo}
    </div>
  );
};

export default PagarCobrancaList;