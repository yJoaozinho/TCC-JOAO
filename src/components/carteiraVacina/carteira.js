import { useEffect, useState } from 'react';
import Coluna from './Coluna';
import styles from "./carteira.module.css";

export default function Carteira({ id }) {
    const [dados, setDados] = useState([]);

    const fetchVacinaData = async (vacinaId, token) => {
        console.log(`Buscando dados da vacina com ID: ${vacinaId}`);
        try {
            const response = await fetch(`http://localhost:2306/vaccination/vacina/${vacinaId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Dados da vacina recebidos:', data);
                return data;
            } else {
                console.error('Erro ao buscar dados da vacina:', response.status);
            }
        } catch (error) {
            console.error('Erro ao fazer a chamada da API para vacina:', error);
        }
    };

    const fetchData = async (token) => {
        console.log(`Buscando dados de vacinação com ID: ${id}`);
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
                console.log('Dados de vacinação recebidos:', data);
                const vacinasPromises = data.map(item => 
                    Promise.all(item.vacina.map(vacinaId => fetchVacinaData(vacinaId, token)))
                );
                const vacinas = (await Promise.all(vacinasPromises)).flat();
                console.log('Dados de todas as vacinas:', vacinas);
                setDados(vacinas.filter(v => v != null));
            } else {
                console.error('Erro ao buscar dados:', response.status);
            }
        } catch (error) {
            console.error('Erro ao fazer a chamada da API:', error);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                console.log('Token encontrado:', storedToken);
                fetchData(storedToken);
            } else {
                console.log('Nenhum token encontrado.');
            }
        }
    }, [id]); // Dependência id adicionada

    const containerClass = dados.length > 0 
        ? styles.carteiraContainer 
        : `${styles.carteiraContainer} ${styles.vazio}`;

    console.log('Renderizando componente, dados:', dados);

    return (
        <div className={containerClass}>
            <div><h1>Vacinas</h1></div>
            {dados.length > 0 ? (
                dados.map((vacina, index) => (
                    <Coluna 
                        key={vacina._id || index} // Usando o _id da vacina como chave, se disponível
                        vacina={vacina.vacina} // Substitua 'nome' pela propriedade correta da sua vacina
                        revacinacao={vacina.revacinacao} // Substitua 'revacinacao' pela propriedade correta da sua vacina
                        data={vacina.data} // Substitua 'data' pela propriedade correta da sua vacina
                    />
                ))
            ) : (
                <div>Nenhuma informação disponível</div>
            )}
        </div>
    );
}
