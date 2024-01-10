import { useEffect, useState } from 'react';
import Coluna from './coluna'; 
import styles from "./carteira.module.css";

export default function Carteira({ id }) {
    const [dados, setDados] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
              setToken(storedToken);
              try {
                const decoded = jwtDecode(storedToken);
                const id = decoded.sub;
                setUserId(id);
              } catch (error) {
                console.error("Erro ao decodificar o token:", error);
              }
            } else {
              console.log("Nenhum token encontrado.");
            }
          }

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:2306/vaccination/${id}`, { 
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setDados(data); 
                } else {
                    console.error('Erro ao buscar dados:', response.status);
                }
            } catch (error) {
                console.error('Erro ao fazer a chamada da API:', error);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token, id]);

    return (
        <div className={styles.carteiraContainer}>
            {dados.map((item, index) => (
                <Coluna 
                    key={index}
                    vacina={item.vacina}
                    revacinacao={item.revacinacao}
                    data={item.data}
                />
            ))}
        </div>
    );
}
