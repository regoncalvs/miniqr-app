import React, { useState } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import { novaCobranca } from '@/services/cobrancas-service';

interface NovaCobrancaFormProps {
  onCobrancaAdicionada: () => void;
}

const NovaCobrancaForm: React.FC<NovaCobrancaFormProps> = ({ onCobrancaAdicionada }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    novaCobranca(values).then(() => {
      onCobrancaAdicionada();
      setLoading(false);
    })
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-indigo-800">Nova Cobrança</h1>
      <Form name="novaCobranca" className='py-4' onFinish={onFinish} labelCol={{ span: 24 }}>
        <Form.Item
          label="Descrição"
          name="descricao"
          rules={[{ required: true, message: 'Por favor, insira a descrição!' }]}
        >
          <Input placeholder="Digite a descrição" className='w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-800' />
        </Form.Item>

        <Form.Item
          label="Valor"
          name="valor"
          rules={[{ required: true, message: 'Por favor, insira o valor!' }]}
        >
          <InputNumber className='w-full border h-10 rounded focus:outline-none focus:border-indigo-800' />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="w-full mt-5 bg-amber-500">
            Criar Cobrança
          </Button>
        </Form.Item>
      </Form>
    </div>

  );
};

export default NovaCobrancaForm;
