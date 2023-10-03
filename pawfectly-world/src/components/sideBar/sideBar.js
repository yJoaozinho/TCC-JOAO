import Logo from "../logo/logo"
import Styles from "./sideBar.module.css"
import SideBarItem from "./sideBarItem"
import Link from "next/link"

export default function SideBar () {

    return (
        <div className={Styles.sidebar}>
          <Logo h= "150" w="150" />
          
          <ul className={Styles.ul}>
          <SideBarItem link="/" text ="Pagina inicial"/>
          <SideBarItem link="/login" text ="Login"/>
          <SideBarItem link="/cadastro" text ="Cadastro"/>
          <SideBarItem link="/perfilUsuario" text ="Meu Perfil"/>
          <SideBarItem link="/meusAnimais" text ="Meus Pets"/>
        
          </ul>
      
          <div className={Styles.buttonContainer}>
            <a href="editarUsuario" className={Styles.btnEditar}>Editar</a>
            <a href="logOut" className={Styles.btnRemover}>Sair</a>
          </div>
        </div>
      )
    }
        
    
