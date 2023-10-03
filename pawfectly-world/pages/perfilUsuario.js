import Styles from "../styles/index.module.css"
import SideBar from "../src/components/sideBar/sideBar"
import FotoDePerfil from "../src/components/fotoDePerfil/fotoDePerfil"

export default function perfilUsuario(){

    return(
        <div className={Styles.container}>
            <SideBar/>
            <div className={Styles.perfil}>
            <FotoDePerfil  h= "250" w="300" />
            <div className={Styles.infoUsuario}>
                <div className={Styles.campo}>
                    <strong>Nome:</strong>
                    <span>John Doe</span>
                </div>
                <div className={Styles.campo}>
                    <strong>E-mail:</strong>
                    <span>john.doe@example.com</span>
                </div>
                <div className={Styles.campo}>
                    <strong>Nickname:</strong>
                    <span>johnd</span>
                </div>
                </div>
                
                <div className={Styles.posts}>
                    <strong>posts:</strong>
                    
                </div>
            </div>
        </div>


    )

}