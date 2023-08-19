import Logo from "../logo/logo"
import Styles from "./sideBar.module.css"
import SideBarItem from "./sideBarItem"

export default function SideBar () {

    return (
        <div className={Styles.sidebar}>
          <Logo h= "150" w="150" />
          
          <ul className={Styles.ul}>
            <li className={Styles.li}>
              <SideBarItem link="/" text ="Pagina inicial"/>
            </li>
            <li className={Styles.li}>
              <SideBarItem link="/cadastro" text ="Criar conta"/>
            </li>
            <li className={Styles.li}>
              <SideBarItem link="/login" text ="Entrar em conta"/>
            </li>


          </ul>
      
          
        </div>
      )
    }
        
    
