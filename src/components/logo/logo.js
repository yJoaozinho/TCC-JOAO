
import Image from "next/image"

export default function logoDoSite (props) {

    return(
        <Image 
        src="/logoSemBG.png"
        width={props.w}
        height={props.h}
        />
    )
}