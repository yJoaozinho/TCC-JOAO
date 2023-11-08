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
    const [nome, setNome] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    

    const handleCadastro = async (e) => {
        e.preventDefault();
    
        try {
            const response = await cadastrar(nome, username, email, senha);
            if (response.status === 201) {
               
                const token = response.headers.get('Authorization');
    
                if (token) {
                    
                    const jwt = token.replace('Bearer ', '');
    
                    
                    localStorage.setItem('jwt', jwt);
                }
    
                router.push('/home');
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error.message);
        }
    };

    const cadastrar = async (nome, username, email, senha) => {
        try {
            const response = await fetch('http://localhost:2306/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, username, email, senha })
            });
    
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Erro ao cadastrar: ${errorData} (status: ${response.status})`);
            }
    
            return response;
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    };
        /*const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:2306/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome,
            username,
            email,
            senha,
            role
          })
        });
        if (response.ok) {
          const auth = response.headers.get("Authorization").toString();
          localStorage.setItem('Authorization', auth);
          console.log('Login realizado com sucesso!');
          router.push('/home')
        } else {
          console.error('Erro ao fazer a solicitação HTTP.');
        }
     } catch (error) {
       console.error('Erro ao fazer a solicitação HTTP:', error);
     }
   };

   const handleSubmit = (e) => {
    e.preventDefault(); 
    fetchData(); 
  };*/

    return (
        <div className={styles.background}>
            
            <LoginCard>
                <div className={styles.cardInfo}>
                    <h1>Pawfectly World!</h1>
                    <Logo h="200" w="200" />
                    <p>Bem-vindo ao nosso site de adoção de animais! Encontre seu companheiro perfeito e espalhe amor. Adote hoje!</p>
                </div>

                <div className={styles.cardLogin}>
                    <h3> Cadastro </h3>
                    <form className={styles.form} onSubmit={handleCadastro}>
                        <Input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <Input type="text" placeholder="Seu username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input type="email" placeholder="Seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input type="password" placeholder="Sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        <Button type="submit">Cadastrar</Button>
                    </form>

                    <Link href="/"className={styles.link}>Já possui uma conta?</Link> 
                </div>
            </LoginCard>
        </div>
    )
}
