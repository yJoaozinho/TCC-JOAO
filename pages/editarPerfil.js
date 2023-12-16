import Styles from "../styles/index.module.css";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";


export default function TesteForm() {

    const [emailUsuario, setEmailUsuario] = useState("");
    const [cpf_cnpj, setCpf_cnpj] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dataDeNascimento, setDataDeNascimento] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("");
    const [estado, setEstado] = useState("");
    const [biografia, setBiografia] = useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token1 = e.target.localStorage
        console.log(token1)

        try {
            const response = await fetch(`http://localhost:2306/user/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                ,
                body: JSON.stringify({
                    biografia,
                    cpf_cnpj,
                    telefone,
                    dataDeNascimento,
                    cep,
                    cidade,
                    bairro,
                    rua,
                    estado
                })
            });

            if (response.status === 204) {
                console.log('Perfil atualizado com sucesso');
                router.push('/perfilUsuario');
            } else {
                const erroData = await response.json();
                throw new Error(erroData.mensagem || 'Erro ao atualizar perfil');

            }
        } catch (error) {
            console.error('Erro:', error);
            
        }
    }


    const onClose = () => {
        router.push('/perfilUsuario');
    };

    const teste = async (e) => {
        e.preventDefault();
        const formData = {
            biografia,
            cpf_cnpj,
            telefone,
            dataDeNascimento,
            cep,
            cidade,
            bairro,
            rua,
            estado
        };
    
      
        const dataToSend = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== "")
        );
    
        if (Object.keys(dataToSend).length === 0) {
            console.log("Nenhum campo preenchido. Não há dados para atualizar.");
            return; 
        }
    
        

        try{
        const response = await fetch(`http://localhost:2306/user/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                ,
                body: JSON.stringify((dataToSend))
            });
            
            if (response.status === 204) {
                console.log('Perfil atualizado com sucesso');
                router.push('/perfilUsuario');
            } else {
                const erroData = await response.json();
                throw new Error(erroData.mensagem || 'Erro ao atualizar perfil');

            }
        } catch (error) {
            console.error('Erro:', error);
            
        }


    }

    return (
        <div className={Styles.pagina}>
            <div className={Styles.modalOverlay}>
                <div className={Styles.modalContent}>
                    <h1 className={Styles.tituloh1}>Editar perfil</h1>
                    <button className={Styles.fechar} onClick={onClose}>X</button>
                    <form onSubmit={teste}>
                        <input
                            className={Styles.inputD}
                            name="biografia"
                            placeholder="Fale um pouco sobre voce"
                            value={biografia} onChange={(e) => setBiografia(e.target.value)}
                        />

                        <input
                            className={Styles.input}
                            name="cpf_cnpj"
                            placeholder="CPF"
                            value={cpf_cnpj} onChange={(e) => setCpf_cnpj(e.target.value)}
                        />
                        <input
                            className={Styles.input}
                            name="telefone"
                            placeholder="Telefone"
                            value={telefone} onChange={(e) => setTelefone(e.target.value)}
                        />
                        <input
                            className={Styles.input}
                            name="dataDeNascimento"
                            placeholder="Idade"
                            value={dataDeNascimento} onChange={(e) => setDataDeNascimento(e.target.value)}
                        />
                        <input
                            className={Styles.input}
                            name="cep"
                            placeholder="CEP"
                            value={cep} onChange={(e) => setCep(e.target.value)}
                        />
                        <input
                            className={Styles.input}
                            name="cidade"
                            placeholder="Cidade"
                            value={cidade} onChange={(e) => setCidade(e.target.value)}
                        />
                        <input
                            className={Styles.input}
                            name="bairro"
                            placeholder="Bairro"
                            value={bairro} onChange={(e) => setBairro(e.target.value)}
                        />
                        <input
                            className={Styles.input}
                            name="rua"
                            placeholder="Rua"
                            value={rua} onChange={(e) => setRua(e.target.value)}
                        />
                        <input
                            className={Styles.input}
                            name="estado"
                            placeholder="Estado"
                            value={estado} onChange={(e) => setEstado(e.target.value)}
                        />


                        <button className={Styles.btnform} type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};


