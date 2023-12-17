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

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:2306/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email_ou_username,
            senha
          })
        });
        if (response.ok) {
          
          const token = response.headers.get("Authorization").toString();
          localStorage.setItem('token', token);
          console.log('Auth recebido:', token);
          console.log('Login realizado com sucesso!');
          router.push('/home')
        } else {
          console.error('Erro ao fazer a solicitação HTTP.');
        }
     } catch (error) {
       console.error('Erro ao fazer a solicitação HTTP:', error);
     }
   };

  const handleSubmit1 = (e) => {
    e.preventDefault(); 
    fetchData(); 
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
};

return (
  <div className={styles.background}>


    <LoginCard>
      <div className={styles.cardInfo}>
        <h1>Pawfectly World!</h1>
        <Logo h="200" w="200" />
      </div>

      <div className={styles.cardLogin}>
        <h2> Login </h2>
        <form className={styles.form} onSubmit={handleSubmit1}>
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