import Styles from "./fotoDePerfil.module.css"
import Image from "next/image"
import fPerfil from "../../../public/do-utilizador.png"

export default function logoDoSite (props) {

    return(
        <div className={Styles.cotainer}>
        <Image className={Styles.fotoDePerfil}
        src={fPerfil}
        alt='foto de perfis'
        width={props.w}
        height={props.h}
        />
        </div>
    )
}