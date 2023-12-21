import React, { useState, useEffect } from 'react';
import PostUser from './postUser';
import Styles from "./postList.module.css"

export default function UserList() {
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
        if (!token) {
            
            return;
        }

        fetch('http://localhost:2306/post/myposts', {
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
    }, [token]);

    return (
        <div className={Styles.es}>
            {posts.map((post) => (
                <PostUser
                    key={post.id}
                    petId={post.pet}
                    nome={post.nome}
                    username={post.username}
                    descricao={post.descricao}
                />
            ))}
        </div>
    );
}
