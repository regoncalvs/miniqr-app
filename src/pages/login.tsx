import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { login } from '@/services/usuarios-service';
import { useRouter } from 'next/router';
import '../app/globals.css'

interface LoginFormValues {
  email: string;
  senha: string;
}

const LoginPage: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    login(values).then(() => {
      let role = localStorage.getItem('role');
      router.push(`/dashboard-${role}`);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap" rel="stylesheet"></link>
      <div className="min-h-screen flex items-center justify-center bg-indigo-100">
        <div className="bg-white p-8 rounded-3xl shadow-md max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">Login</h1>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            labelCol={{ span: 24 }}
            className="w-72 mx-auto"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
            >
              <Input className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-800" />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="senha"
              rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
            >
              <Input.Password className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-800" />
            </Form.Item>

            <Form.Item>
              <Button className='bg-amber-500 w-full' type="primary" htmlType="submit" loading={loading}>
                Entrar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
