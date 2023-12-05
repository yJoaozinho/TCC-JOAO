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
                            Nome do Animal:
                        </label>
                        <input
                            className={Styles.input}
                            type="text"
                            id="nomeAnimal"
                            name="nomeAnimal"
                            required
                            onChange={handleInputChange}
                        />

                        <label className={Styles.label} htmlFor="donoAnimal">
                            Username do Dono:
                        </label>
                        <input
                            className={Styles.input}
                            type="text"
                            id="donoAnimal"
                            name="donoAnimal"
                            required
                            onChange={handleInputChange}
                        />

                        <label className={Styles.label} htmlFor="idadeAnimal">
                            Idade do Animal:
                        </label>
                        <input
                            className={Styles.input}
                            type="number"
                            id="idadeAnimal"
                            name="idadeAnimal"
                            required
                            onChange={handleInputChange}
                        />

                        <label className={Styles.label} htmlFor="tipoAnimal">
                            Tipo de Animal:
                        </label>
                        <input
                            className={Styles.input}
                            type="text"
                            id="tipoAnimal"
                            name="tipoAnimal"
                            required
                            onChange={handleInputChange}
                        />

                        <label className={Styles.label} htmlFor="racaAnimal">
                            Raça do Animal:
                        </label>
                        <input
                            className={Styles.input}
                            type="text"
                            id="racaAnimal"
                            name="racaAnimal"
                            required
                            onChange={handleInputChange}
                        />

                        <div className={Styles.checkboxContainer}>
                            <label className={Styles.label}>Gênero do Animal:</label>
                            <div className={Styles.checkboxWrapper}>
                                <input
                                    className={Styles.checkbox}
                                    type="radio"
                                    id="macho"
                                    name="genero"
                                    value="macho"
                                    onChange={handleInputChange}
                                />
                                <label className={Styles.label} htmlFor="macho">
                                    Macho
                                </label>
                            </div>
                            <div className={Styles.checkboxWrapper}>
                                <input
                                    className={Styles.checkbox}
                                    type="radio"
                                    id="femea"
                                    name="genero"
                                    value="femea"
                                    onChange={handleInputChange}
                                />
                                <label className={Styles.label} htmlFor="femea">
                                    Fêmea
                                </label>
                            </div>
                        </div>

                        <div className={Styles.checkboxContainer}>
                            <label className={Styles.label} htmlFor="adocao">
                                Esta para Adoção ?
                            </label>
                            <div className={Styles.checkboxWrapper}>
                                <input
                                    className={Styles.checkbox}
                                    type="checkbox"
                                    id="adocao"
                                    name="adocao"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <label className={Styles.label} htmlFor="descricaoAnimal">
                            Descrição do Animal:
                        </label>
                        <textarea
                            className={Styles.input}
                            id="descricaoAnimal"
                            name="descricaoAnimal"
                            onChange={handleInputChange}
                        ></textarea>

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
