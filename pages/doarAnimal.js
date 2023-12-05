import SideBar from "../src/components/sideBar/sideBar";
import Styles from "../styles/doar.module.css";
import { useState, useEffect } from "react";
import Input from "../src/components/input/input";

export default function doarAnimal() {
    const [isModalOpen, setModalOpen] = useState(false);
    
    const [dono, setDono] = useState('');//username
    const [nome, setNome] = useState('');//string
    const [idade, setIdade] = useState('');//string
    const [tipo, setTipo] = useState('');//string
    const [sexo, setSexo] = useState('');//string
    const [adocao, setAdocao] = useState('');//boolean
    const [descricao, setDescricao] = useState('');//string
    

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
         handleOpenModal();
    }, []);

   

    function Modal({ isOpen, onClose }) {
        if (!isOpen) return null;

        return (
            <div className={Styles.modalOverlay}>
                <div className={Styles.modalContent}>
                    <form className={Styles.form} >
                        <label className={Styles.label} htmlFor="nomeAnimal">
                            Username do Dono:
                        </label>
                        <Input type="text" placeholder="Dono do animal" value={dono} onChange={(e) => setDono(e.target.value)} />

                        <label className={Styles.label} htmlFor="donoAnimal">
                            Nome do animal:
                        </label>
                        <Input type="text" placeholder="Nome do Animal" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label className={Styles.label} htmlFor="idadeAnimal">
                            Idade do Animal:
                        </label>
                        <Input type="text" placeholder="Idade do Animal" value={idade} onChange={(e) => setIdade(e.target.value)} />

                        <label className={Styles.label} htmlFor="tipoAnimal">
                            Tipo de Animal:
                        </label>
                        <Input type="text" placeholder="Tipo do Animal" value={tipo} onChange={(e) => setTipo(e.target.value)} />

                        <label className={Styles.label} htmlFor="tipoAnimal">
                            Genero do Animal:
                        </label>
                        <Input type="text" placeholder="Genero do Animal" value={sexo} onChange={(e) => setSexo(e.target.value)} />
                        
                        <div className={Styles.checkboxContainer}>
                            <label className={Styles.label} htmlFor="adocao">
                                Esta para Adoção ?
                            </label>
                            <div className={Styles.checkboxWrapper}>
                            <Input type="checkbox" placeholder="Adocao ativa" value={adocao} onChange={(e) => setAdocao(e.target.value)} />
                            </div>
                        </div>

                        <label className={Styles.label} htmlFor="descricaoAnimal">
                            Descrição do Animal:
                        </label>
                        <Input type="text" placeholder="Descricao do Animal" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

                        <div>
                            <button
                                className={Styles.button}
                                type="button"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                            <button className={Styles.button} type="submit">
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div>
            <SideBar />
            <div className={Styles.content}>
                <button
                    className={Styles.addButton}
                    onClick={handleOpenModal}
                >
                    <span className={Styles.plusSymbol}>+</span>
                </button>

                <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
        </div>
    );
}
