import SideBar from "../src/components/sideBar/sideBar";
import Styles from "../styles/doar.module.css";
import { useState, useEffect } from "react";
import Input from "../src/components/input/input";
import { useRouter } from 'next/router';


export default function doarAnimal() {
    const [isModalOpen, setModalOpen] = useState(false);

    const [nome, setNome] = useState('');//string
    const [idade, setIdade] = useState('');//string
    const [tipo, setTipo] = useState('');//string
    const [sexo, setSexo] = useState('');//string
    const [adocao, setAdocao] = useState(false);//boolean
    const [descricao, setDescricao] = useState('');//string


    const router = useRouter();

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);




    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('token');
            
            if (token) {
                try {
                    console.log('a porra do token :', token)
                    setToken(token)
                    const decoded = jwtDecode(token);
                    const id = decoded.sub;
                    console.log('teste id : ', id)
                    setUserId(id)
                    console.log('teste id 2: ', userId)

                } catch (error) {
                    console.error('Erro ao decodificar o token:', error);
                }
            } else {
                console.log('Nenhum token encontrado.');
            }
        }

    }, []);

    const handleCadastroPet = async (e) => {
        e.preventDefault();

        try {
            const response = await cadastrar(nome, idade, tipo, sexo, adocao, descricao);
            if (response.status === 201) {
                console.log('animal Criado com sucesso')
                router.push('/meusAnimais');
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error.message);
        }
    };

    const cadastrar = async (nome, idade, tipo, sexo, adocao, descricao) => {
        try {
            const response = await fetch('http://localhost:2306/animal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ nome, idade, tipo, sexo, adocao, descricao })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Erro ao cadastrar: ${errorData} (status: ${response.status})`);
            }

            return response;
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    };



    return (

        <div className={Styles.central}>

            <SideBar />


            <div className={Styles.Content}>
                <form className={Styles.form} onSubmit={handleCadastroPet}>
                    <label className={Styles.label} htmlFor="nomeAnimal">
                        <h1> Cadastrar novo pet</h1>
                    </label>


                    
                    <Input type="text" placeholder="Nome " value={nome} onChange={(e) => setNome(e.target.value)} />

                    <label className={Styles.label} htmlFor="nome">

                    </label>
                    <Input type="text" placeholder="Idade " value={idade} onChange={(e) => setIdade(e.target.value)} />

                    <label className={Styles.label} htmlFor="idade">

                    </label>
                    <Input type="text" placeholder="Tipo " value={tipo} onChange={(e) => setTipo(e.target.value)} />

                    <label className={Styles.label} htmlFor="tipo">

                    </label>
                    <Input type="text" placeholder="Genero " value={sexo} onChange={(e) => setSexo(e.target.value)} />



                    <label className={Styles.label} htmlFor="sexo">

                    </label>
                    <Input type="text" placeholder="Descricao " value={descricao} onChange={(e) => setDescricao(e.target.value)} />

                    <div>
                        <div className={Styles.checkboxContainer}>
                            <label className={`${Styles.label} ${Styles.labelCentered}`} htmlFor="adocao">
                                Esta para Adoção ?
                            </label>
                            <div className={Styles.checkboxWrapper}>
                                <Input type="checkbox" placeholder="Adocao ativa" checked={adocao} onChange={(e) => setAdocao(e.target.checked)} />
                            </div>
                        </div>

                        <button className={Styles.button} type="submit">
                            Salvar
                        </button>

                    </div>
                </form>
            </div>

        </div>
    );
}

