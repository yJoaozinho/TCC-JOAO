import Link from "next/link";
import { useRouter } from "next/router";
import Styles from "./sideBar.module.css"

export default function SideBarItem(props) {
    const { link, text } = props;
    
    const router = useRouter(); // Obtém a rota atual

    // Verifica se a rota atual é igual ao link do item
    const isActive = router.pathname === link;

    return (
        <li>
            <Link href={link}>
                <span className={`${Styles.buttonLink} ${isActive ? Styles.activeLink : ''}`}>{text}</span>
            </Link>
        </li>
    );
}
