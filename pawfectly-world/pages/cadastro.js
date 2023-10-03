import styles from '../styles/login.module.css';
import LoginCard from "../src/components/loginCards/loginCard";
import Input from '../src/components/input/input';
import Button from '../src/components/button/button';
import Link from 'next/link';
import Logo from "../src/components/logo/logo";
import SideBar from '../src/components/sideBar/sideBar';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CadastroPage() {

    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCadastro = async (e) => {
        e.preventDefault();

        try {
            const response = await cadastrar(username, email, password);
            if (response.status === 201) {
                router.push('/index');
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error.message); 
        }
    };

    const cadastrar = async (username, email, password) => {
        const response = await fetch('http://localhost:2306/user/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.status !== 201) {
            const errorData = await response.json();
            throw new Error(errorData.mensagem);
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
                    <p>Bem-vindo ao nosso site de adoção de animais! Encontre seu companheiro perfeito e espalhe amor. Adote hoje!</p>
                </div>

                <div className={styles.cardLogin}>
                    <h3> Cadastro </h3>
                    <form className={styles.form} onSubmit={handleCadastro}>
                        <Input type="text" placeholder="Seu username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input type="email" placeholder="Seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <Button type="submit">Cadastrar</Button>
                    </form>

                    <Link className={styles.link} href={"/login"}>Já possui uma conta?</Link>
                </div>
            </LoginCard>
        </div>
    )
}
