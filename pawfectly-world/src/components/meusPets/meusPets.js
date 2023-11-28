import Styles from "./meusPets.module.css"
import Image from "next/image"
export default function meusPets(){

    return(
        <div className={Styles.content}>
            <div className={Styles.foto}>

            </div>
            <div className={Styles.coisas}>
                <h1> Renato</h1>
                <button className={Styles.button}>Doar</button>
                <button className={Styles.button}>Ir para Perfil!</button>
            </div>
        </div>
    )
}