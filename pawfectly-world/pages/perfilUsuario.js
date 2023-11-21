import Styles from "../styles/index.module.css"
import SideBar from "../src/components/sideBar/sideBar"
import FotoDePerfil from "../src/components/fotoDePerfil/fotoDePerfil"
import Link from "next/link"
import { useRouter } from 'next/router';


export default function perfilUsuario() {

    const router = useRouter();

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
                    <h3 className={Styles.nome}> <strong className={Styles.nickname}>Raulzinho</strong> - Raul Holanda Lopes</h3>

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

                <div className={Styles.posts}>
                    <strong>posts:</strong>
                </div>
            </div>
           

        </div>
    )
}
