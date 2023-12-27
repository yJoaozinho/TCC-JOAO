import Logo from "../logo/logo"
import Styles from "./sideBar.module.css"
import SideBarItem from "./sideBarItem"
import Link from "next/link"
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function SideBar() {
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const onClose = () => {
    router.push('/')
  }


  return (
    <div className={Styles.sidebar}>
      <div className={Styles.central}>
      <Logo h="150" w="150" />
      </div>

      <ul className={Styles.ul}>
        <SideBarItem link="/home" text="Pagina inicial" />
        <SideBarItem link="/meusAnimais" text="Meus Pets" />
        <SideBarItem link="/doarAnimal" text="Criar pet"/>
        <SideBarItem link="/pets" text="Pets"/>
        <SideBarItem link="/notificacao" text="Notificacoes"/>
        

      </ul>

      <div>
        <div className={Styles.buttonContainer}>
          <a href="perfilUsuario" className={Styles.btnEditar}>Perfil</a>
          <button className={Styles.btnRemover} onClick={() => setShowModal(true)}>Sair</button>
        </div>

        {showModal && (
          <div className={Styles.post}>
            <div className={Styles.modalContent}>
              <span className={Styles.closeBtn} onClick={() => setShowModal(false)}>&times;</span>
              <p className={Styles.p}>Tem certeza que deseja sair?</p>
              <button className={Styles.confirmar} onClick={() => {
                onClose();
                localStorage.removeItem('token');
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


