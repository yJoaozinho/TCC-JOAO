import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import LoginCard from "../src/components/loginCards/loginCard";
import styles from '../styles/login.module.css';
import Input from '../src/components/input/input';
import Button from '../src/components/button/button';
import Logo from "../src/components/logo/logo";


export default function LoginPage() {
  const [email_ou_username, setEmail_ou_username] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handlelogin = async (e) => {
    e.preventDefault();

    try {
        const response = await logar(email_ou_username, senha);
        if (response.status === 200) {
           
            const token = response.headers.get('Authorization');

            if (token) {
                
                const jwt = token.replace('Bearer ', '');

                
                localStorage.setItem('jwt', jwt);
            }
            
            router.push('/home');
        }
    } catch (error) {
        console.error('Erro ao logar:', error.message);
    }
};

const logar = async (email_ou_username, senha) => {
    try {
        const response = await fetch('http://localhost:2306/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email_ou_username, senha })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Erro ao logar: ${errorData} (status: ${response.status})`);
        }

        return response;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};
  /*const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(username_ou_email, password);
      const token = response.headers.get('Authorization').replace('Bearer ', '')
      if (token) {
        localStorage.setItem('jwt', token)
        router.push('/home');
      } else {
        setError('Erro ao fazer login. Verifique suas credenciais.');
      }
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
      console.log(error);
    }
  };

  const login = async (username_ou_email, password) => {
    const response = await fetch('http://localhost:2306/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username_ou_email, password })
    });

    if (!response.ok) {
      throw new Error('Erro na autenticação');
    }

    return response.json();
  };*/

  return (
    <div className={styles.background}>
      

      <LoginCard>
        <div className={styles.cardInfo}>
          <h1>Pawfectly World!</h1>
          <Logo h="200" w="200" />
        </div>

        <div className={styles.cardLogin}>
          <h2> Login </h2>
          <form className={styles.form} onSubmit={handlelogin}>
            <Input
              type="text"
              placeholder="Email ou Username"
              name="email"
              onChange={(e) => setEmail_ou_username(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Senha"
              name="password"
              onChange={(e) => setSenha(e.target.value)}
            />
            <Button type="submit">Entrar</Button>
          </form>
          <Link className={styles.link} href='/cadastro'>Não possui uma conta?</Link>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </LoginCard>
    </div>
  );
}