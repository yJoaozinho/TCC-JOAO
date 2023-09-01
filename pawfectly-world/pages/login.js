import { useState } from 'react'
import LoginCard from "../src/components/loginCards/loginCard"
import styles from '../styles/login.module.css'
import Input from '../src/components/input/input'
import Button from '../src/components/button/button'
import Link from "next/link"
import Logo from "../src/components/logo/logo"
import SideBar from "../src/components/sideBar/sideBar"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/router'

export default function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    // Verifica se os campos de login não estão vazios
    if (!email || !password) {
      return; // Não faz nada se os campos estiverem vazios
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        // Não faça nada em caso de erro
        return;
      }

      router.replace('/cadastro');
    } catch (error) {
      // Não faça nada em caso de erro
    }
  }

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
          <Link className={styles.link} href='/cadastro'>Nao possui uma conta?</Link>
        </div>

      </LoginCard> 
    </div>
  );
}
