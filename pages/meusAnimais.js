import SideBar from "../src/components/sideBar/sideBar"
import Styles from "../styles/meusAnimais.module.css"
import PetCard from "./perfilPet";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function meusAnimais(){

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [erro, setErro] = useState('');
    const [userData, setUserData] = useState({});
    const [petsData, setPetsData] = useState([]);
    

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
                    console.log(dadosPerfil)
                } catch (error) {
                    setErro(error.message);
                }
            }
        }

        buscarPerfil();

        

    }, [token, userId]);

    const animal = {
        nome: 'Fido',
        idade: '5 anos',
        tipo: 'Cachorro',
        raca: 'Vira-lata',
        sexo: 'Masculino',
        adocao: 'Disponível para adoção',
        descricao: 'Fido é um cãozinho muito brincalhão e amoroso, adora passear e está procurando um lar para chamar de seu!',
      };

    return (
        <div>
            <SideBar/>
            <div className={Styles.container}>
            <PetCard {...animal} />
            </div>
        </div>
    );
}