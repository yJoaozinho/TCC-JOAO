import Styles from "../styles/index.module.css"
import SideBar from "../src/components/sideBar/sideBar"
import FotoDePerfil from "../src/components/fotoDePerfil/fotoDePerfil"
import MeusPets from "../src/components/meusPets/meusPets"
import Link from "next/link"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

export default function perfilUsuario() {

    const router = useRouter();

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [perfil, setPerfil] = useState(null);
    const [erro, setErro] = useState('');

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    console.log('toiken normal:', token);
                    console.log('JWT Decodificado:', decoded);
                    console.log('teste id ', decoded.sub)
                    setToken(token);
                    setUserId(decoded.sub);
                } catch (error) {
                    console.error('Erro ao decodificar o token:', error);
                }
            } else {
                console.log('Nenhum token encontrado.');
            }
        }


        // async function buscarPerfil() {
        //     try {
        //       const response = await fetch(`http://localhost:2306/user/${userId}`, {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': `Bearer ${token}`//aqui o jeito q nao deu certo
        //           }
        //       });
      
        //       if (response.status === 401) {
        //         throw new Error('Usuário não logado!');
        //       } else if (response.status === 403) {
        //         throw new Error('Acesso negado!');
        //       } else if (!response.ok) {
        //         throw new Error('Erro ao buscar informações do usuário');
        //       }
      
        //       const dadosPerfil = await response.json();
        //       setPerfil(dadosPerfil);
        //     } catch (error) {
        //       setErro(error.message);
        //     }
        //   }
      
        //   buscarPerfil();

    }, []);

    async function buscarPerfil() {
        try {
          const response = await fetch(`http://localhost:2306/user/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`//aqui o jeito q nao deu certo
              }
          });
  
          if (response.status === 401) {
            throw new Error('Usuário não logado!');
          } else if (response.status === 403) {
            throw new Error('Acesso negado!');
          } else if (!response.ok) {
            throw new Error('Erro ao buscar informações do usuário');
          }
  
          const dadosPerfil = await response.json();
          setPerfil(dadosPerfil);
        } catch (error) {
          setErro(error.message);
        }
      }
  
      buscarPerfil();

    if (erro) {
        return <div>Erro: {erro}</div>;
      }
    
      if (!perfil) {
        return <div>Carregando...</div>;
      }


    const handleEdit = async (e) => {
        router.push('/editarPerfil');
    }

    const handleDonate = async (e) => {
        router.push('/doarAnimal');
    }
    return (
        <div className={Styles.container}>
            <SideBar />
            <div className={Styles.perfil}>
                <div className={Styles.botoesNav}>
                    <button className={Styles.link} onClick={handleEdit}>
                        Editar perfil
                    </button>
                    <button className={Styles.link} onClick={handleDonate}>
                        Adoções e doações
                    </button>

                </div>
                <div className={Styles.vemDeLadinho}>
                    <FotoDePerfil h="110" w="140" />
                    <div className={Styles.infosPrincipais}>
                        <h3 className={Styles.nome}> <strong className={Styles.nickname}>@Raulzinho</strong> - Raul Holanda Lopes</h3>
                        <h4> Garanhuns - PE</h4>
                    </div>
                </div>

                <div className={Styles.infoUsuario}>

                    <div className={Styles.campo}>
                        <strong>Biografia</strong><br></br>
                        <span className={Styles.quebra}>"Raul é um apaixonado por tecnologia e inovação, com formação em Ciência da Computação.
                            Destaca-se no desenvolvimento de software e tem interesse especial por inteligência artificial.
                            Fora do mundo tecnológico, ele aprecia atividades ao ar livre e valoriza o compartilhamento de conhecimento e experiências</span>
                    </div>

                </div>
                <h3><strong>pets:</strong></h3>
                <div className={Styles.posts}>

                    <MeusPets />
                    <MeusPets />
                    <MeusPets />
                    <MeusPets />
                    <MeusPets />
                    <MeusPets />
                </div>
            </div>


        </div>
    )
}
