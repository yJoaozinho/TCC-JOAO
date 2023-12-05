import Styles from "./meusPets.module.css"
import Image from "next/image"
export default function MeusPets() {

    return (
        <div className={Styles.content}>
           <a className={Styles.a}><strong>Renato</strong></a>

           
            <div className={Styles.foto}>
                <Image src="/gato.jpg" width={170} height={170} />
            </div>

            <button className={Styles.button}>Ir para Perfil!</button>
        </div>
    )
}