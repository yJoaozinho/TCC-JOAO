import LoginCard from "../src/components/loginCards/loginCard"
import styles from '../styles/login.module.css'
import Input from '../src/components/input/input'
import Button from '../src/components/button/button'
import Link from "next/link"
import Logo from "../src/components/logo/logo"
import SideBar from "../src/components/sideBar/sideBar"
import { useState } from 'react'
import { login } from './api/api';

export default function LoginPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await login(email, password);
     
        router.push('/inndex');
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className={styles.background}>
      <SideBar/>

      <LoginCard>
        <div className={styles.cardInfo}>
          <h1>Pawfectly World!</h1>
          <Logo h="200" w="200"/>
        </div>

        <div className={styles.cardLogin}>
          <h2> Login </h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Email ou Username"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
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
