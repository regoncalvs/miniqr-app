import React, { ReactNode, useState } from 'react';
import { Button, Pagination, Table } from 'antd';
import { cancelarCobranca } from '@/services/cobrancas-service';

interface CancelarCobrancaListProps {
  cobrancasPagas: any[];
  loadingData: boolean;
  onCobrancaCancelada: () => void;
}

const CancelarCobrancaList: React.FC<CancelarCobrancaListProps> = ({ cobrancasPagas, loadingData, onCobrancaCancelada }) => {
  const [loadingCancelamento, setLoadingCancelamento] = useState(false);
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
    total: cobrancasPagas.length,
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
      key: 'cancelar',
      width: '20%',       
      render: (text: any, record: any) : ReactNode => (
        <Button className='bg-amber-100' onClick={() => handleCancelarCobranca(record.id)} loading={loadingCancelamento}>
          Cancelar
        </Button>
      ),
    },
  ];

  const paginacaoInfo = (
    <Pagination {...paginacao} style={{ marginTop: '16px', textAlign: 'center' }} />
  );

  const cobrancasPagasPaginadas = cobrancasPagas.slice(
    (paginaAtual - 1) * tamanhoPagina,
    paginaAtual * tamanhoPagina
  );
  
  const handleCancelarCobranca = (cobrancaId: string) => {
    setLoadingCancelamento(true);
    cancelarCobranca(cobrancaId).then(() => {
      onCobrancaCancelada();
    }).finally(()=>{
      setLoadingCancelamento(false);
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-800">Cobranças Pagas</h2>
      <Table 
        className="table-striped-rows"
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

export default CancelarCobrancaList;