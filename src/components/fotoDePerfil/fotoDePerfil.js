import Styles from "./fotoDePerfil.module.css"
import Image from "next/image"

export default function logoDoSite (props) {

    return(
        <div className={Styles.cotainer}>
        <Image className={Styles.fotoDePerfil}
        src="/peraul.jpg"
        alt='foto de perfis'
        width={props.w}
        height={props.h}
        />
        </div>
    )
}