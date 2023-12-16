import SideBar from "../src/components/sideBar/sideBar"
import Styles from "../styles/meusAnimais.module.css"
import MeusPets from "../src/components/meusPets/meusPets"
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

    useEffect(() => {
        async function fetchPetDetails(petId) {
            try {
                const response = await fetch(`http://localhost:2306/animal/${petId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar informações do pet');
                }

                const pet = await response.json();
                console.log(pet); 
                return pet;
            } catch (error) {
                console.error('Erro ao buscar pet:', error);
            }
        }

        async function buscarDetalhesPets() {
            if (userData && userData.pets && userData.pets.length > 0) {
                const promises = userData.pets.map(petId => fetchPetDetails(petId));
                const pets = await Promise.all(promises);
                setPetsData(pets);
                console.log(pets)
            }
        }

        buscarDetalhesPets();
    }, [userData, token]);

    return (
        <div>
            <SideBar/>
            <div className={Styles.container}>
                {petsData.map(pet => (
                    <MeusPets key={pet._id} pet={pet} />
                ))}
            </div>
        </div>
    );
}