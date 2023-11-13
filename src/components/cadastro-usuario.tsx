import React, { useState } from 'react';
import { Form, Input, Button, message, Radio } from 'antd';
import { cadastrarUsuario } from '@/services/usuarios-service';
import RegrasSenha from './regras-senha';

const CadastroUsuario: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaFocus, setSenhaFocus] = useState(false);

  const cadastrar = async (values: {
    nome: string;
    email: string;
    password: string;
    rePassword: string;
    role: string;
  }) => {
    setLoading(true);
    await cadastrarUsuario(values).then(() => {
      message.success('Usuário cadastrado com sucesso!')
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="sm:text-2xl text-xl font-bold mb-4 text-indigo-800">Cadastro de Usuário</h1>
      <Form name="cadastroUsuario" onFinish={cadastrar} labelCol={{ span: 24 }} className='sm:py-7'>
        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
        >
          <Input placeholder="Digite o nome" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-800" />
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: 'Por favor, insira o e-mail!' }]}
        >
          <Input type="email" placeholder="Digite o e-mail" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-800" />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[
            {
              validator: (_: any, value: string) => {
                const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (passwordRegex.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject();
                }
              },
            },
          ]}
        >
          <Input.Password
            onFocus={() => { setSenhaFocus(true) }}
            onChange={(senha) => { setSenhaAtual(senha.target.value) }}
            placeholder="Digite a senha"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-800"
          />
        </Form.Item>
        {senhaFocus && <RegrasSenha senha={senhaAtual} />}
        <Form.Item
          label="Repita a Senha"
          name="rePassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Por favor, repita a senha!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('As senhas não coincidem!');
              },
            }),
          ]}
        >
          <Input.Password placeholder="Repita a senha" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-800" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Por favor, selecione a role!' }]}
        >
          <Radio.Group>
            <Radio value="administrador">Administrador</Radio>
            <Radio value="lojista">Lojista</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-amber-500">
            Cadastrar Usuário
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CadastroUsuario;
