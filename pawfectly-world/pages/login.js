import LoginCard from "../src/components/loginCards/loginCard"
import styles from '../styles/login.module.css'
import Input from '../src/components/input/input'
import Button from '../src/components/button/button'
import Link from "next/link"
import Logo from "../src/components/logo/logo"
import SideBar from "../src/components/sideBar/sideBar"
import { useState } from 'react';
import { signIn } from 'next-auth/react';



export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      username,
      password,
      callbackUrl: '/dashboard' 
    });

    if (result?.error) {
      
    }
  };

    return(
        <div className={styles.background}>
            <SideBar/>

            <LoginCard>
                <div className={styles.cardInfo}>
                    <h1>Pawfectly World!</h1>
                    <Logo h="200" w="200"/>
                </div>

                <div className={styles.cardLogin}>
                    <h2> Login </h2>
                    <form className={styles.form} onSubmit={handleSubmit} >  
                        <Input type = "text" placeholder = "Email ou Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <Input type = "password" placeholder = "Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <Button type ="submit"> Entrar</Button>
                    </form>
                    <Link className={styles.link} href='/cadastro'>Nao possui uma conta?</Link>
                </div>

            </LoginCard> 
        </div>
    )
}