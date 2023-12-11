import Styles from "../styles/index.module.css"
import SideBar from "../src/components/sideBar/sideBar"
import FotoDePerfil from "../src/components/fotoDePerfil/fotoDePerfil"
import MeusPets from "../src/components/meusPets/meusPets"
import Link from "next/link"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function perfilUsuario() {

    const router = useRouter();
    const [dadosDoUsuario, setDadosDoUsuario] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        
    }, []);

    async function buscarDadosDoUsuario() {
        try {
            const response = await fetch(`https://sua-api.com/auth`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar informações do usuário');
            }

            return await response.json();
            console.log(response)
        } catch (error) {
            console.error('Erro:', error);
            return null;
        }
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
                        <span>"Raul é um apaixonado por tecnologia e inovação, com formação em Ciência da Computação.<br></br>
                            Destaca-se no desenvolvimento de software e tem interesse especial por inteligência artificial.<br></br>
                            Fora do mundo tecnológico, ele aprecia atividades ao ar livre e valoriza o compartilhamento de conhecimento e experiências</span>
                    </div>

                </div>
                <h3><strong>pets:</strong></h3>
                <div className={Styles.posts}>  
                
                <MeusPets/>
                <MeusPets/>
                <MeusPets/>



                </div>
            </div>


        </div>
    )
}
