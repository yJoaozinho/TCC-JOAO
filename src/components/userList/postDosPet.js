import React, { useState, useEffect } from 'react';
import Bizarro from "./bizarro"
import Styles from "./postList.module.css"

export default function PostDosPet({id}) {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');


    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                try {
                    console.log('Token encontrado:', storedToken);
                    setToken(storedToken);
                } catch (error) {
                    console.error('Erro ao decodificar o token:', error);
                }
            } else {
                console.log('Nenhum token encontrado.');
            }
        }
    }, []);

    useEffect(() => {
        

        fetch(`http://localhost:2306/post/petposts/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                console.log(response)
                return response.json();
                
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setPosts(data);
                    console.log('post aquis',data)
                } else {
                    console.error('A resposta da API não é um array:', data);
                }
            })
            .catch((error) => console.error('Erro ao buscar posts:', error));
    }, [token,id]);

    return (
        <div className={Styles.es}>
            {posts.map((post) => (
                <Bizarro
                    key={post.id}
                    _id={post._id}
                    nome={post.nome}
                    username={post.username}
                    descricao={post.descricao}
                />
            ))}
        </div>
    );
}
