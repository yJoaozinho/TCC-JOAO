import styles from "./logo.module.css"
import Image from "next/image"

export default function logoDoSite (props) {

    return(
        <Image 
        src="/images/logoSemBG.png"
        width={props.w}
        height={props.h}
        />
    )
}