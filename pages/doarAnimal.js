import SideBar from "../src/components/sideBar/sideBar";
import Styles from "../styles/doar.module.css";
import { useState, useEffect } from "react";
import Input from "../src/components/input/input";
import { useRouter } from 'next/router';

export default function doarAnimal() {
    const [isModalOpen, setModalOpen] = useState(false);

    const [dono, setDono] = useState('');//username
    const [nome, setNome] = useState('');//string
    const [idade, setIdade] = useState('');//string
    const [tipo, setTipo] = useState('');//string
    const [sexo, setSexo] = useState('');//string
    const [adocao, setAdocao] = useState('');//boolean
    const [descricao, setDescricao] = useState('');//string


    const router = useRouter();





    return (

        <div className={Styles.central}>

            <SideBar />

            
                <div className={Styles.Content}>
                    <form className={Styles.form} >
                        <label className={Styles.label} htmlFor="nomeAnimal">
                            <h1> Cadastrar novo pet</h1>
                        </label>


                        <label className={Styles.label} htmlFor="donoAnimal">
                            Nome:
                        </label>
                        <Input type="text" placeholder="Nome do Animal" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label className={Styles.label} htmlFor="idadeAnimal">
                            Idade:
                        </label>
                        <Input type="text" placeholder="Idade do Animal" value={idade} onChange={(e) => setIdade(e.target.value)} />

                        <label className={Styles.label} htmlFor="tipoAnimal">
                            Tipo de pet
                        </label>
                        <Input type="text" placeholder="Tipo do Animal" value={tipo} onChange={(e) => setTipo(e.target.value)} />

                        <label className={Styles.label} htmlFor="tipoAnimal">
                            Genero do pet:
                        </label>
                        <Input type="text" placeholder="Genero do Animal" value={sexo} onChange={(e) => setSexo(e.target.value)} />

                        

                        <label className={Styles.label} htmlFor="descricaoAnimal">
                            Descrição do Pet:
                        </label>
                        <Input type="text" placeholder="Descricao do Animal" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

                        <div>
                        <div className={Styles.checkboxContainer}>
                            <label className={`${Styles.label} ${Styles.labelCentered}`} htmlFor="adocao">
                                Esta para Adoção ?
                            </label>
                            <div className={Styles.checkboxWrapper}>
                                <Input type="checkbox" placeholder="Adocao ativa" value={adocao} onChange={(e) => setAdocao(e.target.value)} />
                            </div>
                        </div>

                            <button className={Styles.button} type="submit">
                                Salvar
                            </button>
                            <button className={Styles.button} onClick={() => router.push('/meusAnimais')}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
           
        </div>
    );
}

