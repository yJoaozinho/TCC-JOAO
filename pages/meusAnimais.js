import SideBar from "../src/components/sideBar/sideBar"
import Styles from "../styles/meusAnimais.module.css"
import PetCard from "../src/components/petCard/petCard"
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function meusAnimais() {

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [erro, setErro] = useState('');
    const router = useRouter();

    const [pets, setPets] = useState([]);

    const botaoEdit = ()=>{
        router.push('/editarPet/${pet._id}')
    }


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

        async function fetchPets() {
            if (token) {
                try {
                    const response = await fetch(`http://localhost:2306/animal/mypets`, {
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
                        throw new Error('Erro ao buscar pets');
                    }

                    const petiscos = await response.json();
                    setPets(petiscos)
                } catch (error) {
                    setErro(error.message);
                }
            }
        }
        fetchPets()




    }, [token, pets]);





    return (
        <div>
            <SideBar />
            <div className={Styles.container}>
                {pets?.map((pet) => (
                    <div key={pet._id}>
                        <PetCard {...pet} />
                        <Link href={`/editarPet/${pet._id}`}>
                            Editar Animal
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}