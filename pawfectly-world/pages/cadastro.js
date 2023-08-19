import styles from '../styles/login.module.css'
import LoginCard from "../src/components/loginCards/loginCard"
import Input from '../src/components/input/input'
import Button from '../src/components/button/button'
import Link from 'next/link'
import Logo from "../src/components/logo/logo"
import SideBar from '../src/components/sideBar/sideBar'

export default function CadastroPage() {
    return(
        <div className={styles.background}>
            <SideBar/>
            <LoginCard>
                <div className={styles.cardInfo}>
                    <h1>Pawfectly World!</h1>

                    <Logo h="200" w="200"/>                        
                    <p>Bem-vindo ao nosso site de adoção de animais! Encontre seu companheiro perfeito e espalhe amor. Adote hoje!</p> 

                </div>

                <div className={styles.cardLogin}>
                    <h3> Cadastro </h3>
                    <form className={styles.form}>  
                        <Input type = "text" placeholder = "Seu nome"/>   
                        <Input type = "email" placeholder = "Seu email"/>
                        <Input type = "password" placeholder = "Sua senha"/>
                        
                        

                        <Button>Cadastrar</Button>
                    </form>

                    <Link className={styles.link} href={"/login"}>Ja possui uma conta?</Link>
                    
                </div>

            </LoginCard> 
        </div>
    )
}