import SideBar from "../src/components/sideBar/sideBar";
import Styles from "../styles/doar.module.css";
import { useState, useEffect } from "react";

export default function doarAnimal() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nomeAnimal: "",
        donoAnimal: "",
        idadeAnimal: "",
        tipoAnimal: "",
        racaAnimal: "",
        genero: "",
        adocao: false,
        descricaoAnimal: "",
    });

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
         handleOpenModal();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    function Modal({ isOpen, onClose }) {
        if (!isOpen) return null;

        const handleSubmit = (e) => {
            e.preventDefault();
            const formDataJSON = JSON.stringify(formData);
            console.log(formDataJSON);

            
            onClose();
        };

        return (
            <div className={Styles.modalOverlay}>
                <div className={Styles.modalContent}>
                    <form className={Styles.form} onSubmit={handleSubmit}>
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
