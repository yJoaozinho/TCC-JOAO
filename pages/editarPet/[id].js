import Styles from "../../styles/index.module.css";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import Input from "../../src/components/input/input";


export default function editarPets() {

    const router = useRouter();
    const [token, setToken] = useState(null);
    const { id } = router.query;

    const [nome, setNome] = useState("")
    const [idade, setIdade] = useState("")
    const [tipo, setTipo] = useState("")
    const [raca, setRaca] = useState("")
    const [sexo, setSexo] = useState("")
    const [adocao, setAdocao] = useState("")
    const [descricao, setDescricao] = useState("")


    useEffect(() => {

        
        
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    console.log('a porra do token :', token)
                    setToken(token)
                    

                } catch (error) {
                    console.error('Erro ao decodificar o token:', error);
                }
            } else {
                console.log('Nenhum token encontrado.');
            }
        }
        

    }, [id]);

    


    const onClose = () => {
        router.push('/meusAnimais');
    };

    const teste = async (e) => {
        e.preventDefault();
        const formData = {
            nome,
            idade,
            tipo,
            raca,
            sexo,
            adocao,
            descricao
        };


        const dataToSend = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== "")
        );

        if (Object.keys(dataToSend).length === 0) {
            console.log("Nenhum campo preenchido. Não há dados para atualizar.");
            return;
        }



        try {
            
            const response = await fetch(`http://localhost:2306/animal/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dataToSend)
            });
        
            if (response.status === 200) {
                console.log('Pet atualizado com sucesso');
                router.push('/meusAnimais');
            } else {
                const erroData = await response.json();
                console.error('Erro de status:', response.status);
                console.error('Mensagem de erro:', erroData.mensagem || 'Erro ao atualizar pet');
            }
        } catch (error) {
            console.error('Erro:', error.message);
        }
        


    }

    return (
        <div className={Styles.pagina}>
            <div className={Styles.modalOverlay}>
                <div className={Styles.modalContent}>
                    <h1 className={Styles.tituloh1}>Editar pet</h1>
                    <button className={Styles.fechar} onClick={onClose}>X</button>
                    <form onSubmit={teste}>
                        <input
                            className={Styles.input}
                            name="nome"
                            placeholder="Nome"
                            value={nome} onChange={(e) => setNome(e.target.value)}
                        />

                        <input
                            className={Styles.input}
                            name="idade"
                            placeholder="Idade"
                            value={idade} onChange={(e) => setIdade(e.target.value)}
                        />
                        <input
                            className={Styles.input}
                            name="tipo"
                            placeholder="Tipo"
                            value={tipo} onChange={(e) => setTipo(e.target.value)}
                        />
                        <input
                            className={Styles.input}
                            name="raca"
                            placeholder="Raca"
                            value={raca} onChange={(e) => setRaca(e.target.value)}
                        />
                        <input
                            className={Styles.input}
                            name="sexo"
                            placeholder="Sexo"
                            value={sexo} onChange={(e) => setSexo(e.target.value)}
                        />
                        <input
                            className={Styles.input}
                            name="descricao"
                            placeholder="Descricao"
                            value={descricao} onChange={(e) => setDescricao(e.target.value)}
                        />
                        
                        <div className={Styles.checkboxContainer}>
                            <label className={`${Styles.label} ${Styles.labelCentered}`} htmlFor="adocao">
                                Esta para Adoção ?
                            </label>
                            <div className={Styles.checkboxWrapper}>
                                <input
                                type="checkbox"
                                name="adocao"
                                placeholder="Adocao ativa" 
                                checked={adocao} onChange={(e) => setAdocao(e.target.checked)} />
                            </div>
                        </div>


                        <button className={Styles.btnform} type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};




