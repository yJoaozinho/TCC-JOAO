import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";

import LoginCard from "../src/components/loginCards/loginCard";
import styles from '../styles/login.module.css';
import Input from '../src/components/input/input';
import Button from '../src/components/button/button';
import Logo from "../src/components/logo/logo";
import SideBar from "../src/components/sideBar/sideBar";

export default function LoginPage() {
  const [username_ou_email, setUsername_ou_email] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(username_ou_email, password);
      if (response.token) {
        router.push('/index');
      } else {
        setError('Erro ao fazer login. Verifique suas credenciais.');
      }
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
      console.log(error);
    }
  };

  const login = async (email, password) => {
    const response = await fetch('http://localhost:2306/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });

    if (!response.ok) {
      throw new Error('Erro na autenticação');
    }

    return response.json();
  };

  return (
    <div className={styles.background}>
      <SideBar />

      <LoginCard>
        <div className={styles.cardInfo}>
          <h1>Pawfectly World!</h1>
          <Logo h="200" w="200" />
        </div>

        <div className={styles.cardLogin}>
          <h2> Login </h2>
          <form className={styles.form} onSubmit={handleSubmit}>
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
              onChange={(e) => setPassword(e.target.value)}
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
