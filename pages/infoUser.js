import Styles from "../styles/infoUser.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

export default function perfilUsuario() {

    const router = useRouter();

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [erro, setErro] = useState('');
    const [userData, setUserData] = useState({});

    useEffect(() => {

        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                try {
                    const decoded = jwtDecode(storedToken);
                    setUserId(decoded.sub);
                } catch (error) {
                    console.error('Erro ao decodificar o token:', error);
                }
            } else {
                console.log('Nenhum token encontrado.');
            }
        }

        async function buscarPerfil() {
            if (token && userId) {
                try {
                    const response = await fetch(`http://localhost:2306/user/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.status === 401) {
                        throw new Error('Usuário não logado!');
                    } else if (response.status === 403) {
                        throw new Error('Acesso negado!');
                    } else if (!response.ok) {
                        throw new Error('Erro ao buscar informações do usuário');
                    }

                    const dadosPerfil = await response.json();
                    setUserData(dadosPerfil);
                } catch (error) {
                    setErro(error.message);
                }
            }
        }

        buscarPerfil();

    }, [token, userId]);




    const handleEdit = async (e) => {
        router.push('/editarPerfil');
    }

   
    
    return (

        <div className={Styles.container}>
             <button className={Styles.editButton} onClick={handleEdit}>Editar Informações</button>
        <h1 className={Styles.h1}>Dados Pessoais</h1>
        <ul className={Styles.ul}>
            <li className={Styles.li}>
                <span className={Styles.label}>Nome:</span> {userData.nome}
            </li>
            <li className={Styles.li}>
                <span className={Styles.label}>Username:</span> {userData.username}
            </li>
            <li className={Styles.li}>
                <span className={Styles.label}>E-mail:</span> {userData.email}
            </li>
            <li className={Styles.li}>
                <span className={Styles.label}>CPF ou  CNPJ:</span> {userData.cpf_ou_cnpj}
            </li>
            <li className={Styles.li}>
                <span className={Styles.label}>Telefone:</span> {userData.telefone}
            </li>
            <li className={Styles.li}>
                <span className={Styles.label}>Idade:</span> {userData.data_de_nascimento}
            </li>
            <li className={Styles.li}>
                <span className={Styles.label}>Cep:</span> {userData.cep}
            </li>
            <li className={Styles.li}>
                <span className={Styles.label}>Estado:</span> {userData.estado}
            </li>
            <li className={Styles.li}>
                <span className={Styles.label}>Cidade:</span> {userData.cidade}
            </li>
            <li className={Styles.li}>
                <span className={Styles.label}>Bairro:</span> {userData.bairro}
            </li>
            <li className={Styles.li}>
                <span className={Styles.label}>Rua:</span> {userData.rua}
            </li>
            <li className={Styles.li}>
                <span className={Styles.label}>Numero:</span> {userData.numero}
            </li>
            
        </ul>
        
    </div>

    )
}