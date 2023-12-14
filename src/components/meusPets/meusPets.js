import Styles from "./meusPets.module.css"
import Image from "next/image"
import {useRouter} from "next/router"
export default function MeusPets() {

    const router = useRouter();

    function irPerfil(e){
        router.push('/perfilPet');
    }


    return (
        <div className={Styles.content}>
           <a className={Styles.a}><strong>Renato</strong></a>

           
            <div className={Styles.foto}>
                <Image src="/gato.jpg" width={170} height={170} />
            </div>

            <button className={Styles.button} onClick={irPerfil}>Ir para Perfil!</button>
        </div>
    )
}