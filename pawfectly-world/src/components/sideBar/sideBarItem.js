import Link from "next/link";
import Styles from "./sideBar.module.css"

export default function sideBarItem (props){
     
    const { link, text } = props;
    return(
        <li className={Styles.sideBarItem}>
            <Link className={Styles.buttonLink}href={props.link}>{props.text}</Link>
        </li>
    )
}