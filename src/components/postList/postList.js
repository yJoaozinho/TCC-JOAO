import React, { useState, useEffect } from 'react';
import Post from '../posts/post';
import Styles from "../postList/postList.module.css"

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');
    const [isVisivel, setIsVisivel] = useState(true);
    const [divVisivel, setDivVisivel] = useState(false);
    const [isConditionMet, setIsConditionMet] = useState(false);
    let n = 0

    const handleScroll = (event) => {
        let height = window.scrollY;
        console.log(height);

        if (height >= 354 && n == 0) {
            setDivVisivel();
            setDivVisivel(true);
            document.body.style.marginLeft = `490px`;
        document.body.style.position = 'fixed'
            if(n == 0){
                setTimeout(() => {
                    n = 1
                    setDivVisivel(false);
                    document.body.style.position = 'static';
                    document.body.style.marginLeft = '7px';
                }, 2000);
            }
        }
    };


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

      
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
            // Token ainda não está definido, espere até que ele seja definido.
            return;
        }
        
        fetch('http://localhost:2306/post', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                return response.json();

            })
            .then((data) => {
                if (Array.isArray(data)) {
                    console.log(data)
                    setPosts(data);
                    console.log('post aquis', data)
                } else {
                    console.error('A resposta da API não é um array:', data);
                }
            })
            .catch((error) => console.error('Erro ao buscar posts:', error));
        }, [token]);
    return (
        <div className={Styles.es}>
            {posts.map(post => (
                <Post
                chave={post.id}
                user={post.user}
                petId={post.pet}
                nome={post.nome}
                username={post.username}
                descricao={post.descricao}
                tempo={post.createdAt}
                />
            ))}
            {divVisivel && (
                <div className={Styles.spin_container}>
                    <div className={Styles.spin}></div>
                </div>
            )}
        </div>
    );
}
