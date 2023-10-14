import Logo from "../logo/logo"
import Styles from "./sideBar.module.css"
import SideBarItem from "./sideBarItem"
import Link from "next/link"
import React, { useState } from 'react';

export default function SideBar() {
  const [showModal, setShowModal] = useState(false);
  

  return (
    <div className={Styles.sidebar}>
      <Logo h="150" w="150" />

      <ul className={Styles.ul}>
        <SideBarItem link="/" text="Pagina inicial" />
        <SideBarItem link="/perfilUsuario" text="Meu Perfil" />
        <SideBarItem link="/meusAnimais" text="Meus Pets" />
        <SideBarItem link="/doarAnimal" text="Doar Animal"/>
        <SideBarItem link="/login" text="Login" />

      </ul>

      <div>
        <div className={Styles.buttonContainer}>
          <a href="perfilUsuario" className={Styles.btnEditar}>Perfil</a>
          <button className={Styles.btnRemover} onClick={() => setShowModal(true)}>Sair</button>
        </div>

        {showModal && (
          <div className={Styles.modal}>
            <div className={Styles.modalContent}>
              <span className={Styles.closeBtn} onClick={() => setShowModal(false)}>&times;</span>
              <p className={Styles.p}>Tem certeza que deseja sair?</p>
              <button className={Styles.confirmar} onClick={() => {
                
                console.log('Saindo...');
                setShowModal(false);
              }}>Sim</button>
              <button className={Styles.cancelar} onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


