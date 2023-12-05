import SideBar from "../src/components/sideBar/sideBar"
import Styles from "../styles/meusAnimais.module.css"
import MeusPets from "../src/components/meusPets/meusPets"

export default function meusAnimais(){

    return(
        <div>
            <SideBar/>
            <div className={Styles.container}>
                <MeusPets/>
                <MeusPets/>
            </div>
        </div>
    )
}