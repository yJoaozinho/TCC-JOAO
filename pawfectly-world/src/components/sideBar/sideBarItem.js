import Link from "next/link";
import Styles from "./sideBar.module.css"

export default function sideBarItem (props){
     
    const { link, text } = props;
    return(
        <div>
            <Link className={Styles.link}href={props.link}>{props.text}</Link>
        </div>
    )
}