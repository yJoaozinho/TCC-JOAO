import LoginCard from "../src/components/loginCards/loginCard"
import styles from '../styles/login.module.css'
import Input from '../src/components/input/input'
import Button from '../src/components/button/button'
import Link from "next/link"
import Logo from "../src/components/logo/logo"
import SideBar from "../src/components/sideBar/sideBar"

export default function LoginPage() {
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
                    <form className={styles.form}>  
                        <Input type = "text" placeholder = "Email"/>
                        <Input type = "password" placeholder = "Senha"/>
                        <Button> Entrar</Button>
                    </form>
                    <Link className={styles.link} href='/cadastro'>Nao possui uma conta?</Link>
                </div>

            </LoginCard> 
        </div>
    )
}