import React, { useState } from 'react';
import Styles from '../styles/notifications.module.css';
import SideBar from '../src/components/sideBar/sideBar';
import NotList from '../src/components/notification/notList';

export default function Notificacoes() {
    const [selecao, setSelecao] = useState('naoRespondidas');

    return (
        <div className={Styles.pageContainer}>
            <SideBar />
            <div  className={Styles.container}>
                <NotList/>
            </div>
        </div>

    );
}
