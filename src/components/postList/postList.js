import React, { useState, useEffect } from 'react';
import Post from '../posts/post';
import Styles from "../postList/postList.module.css"

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');
    const [postsAntigos, setPostsAntigos] = useState([]);

    const chunkArray = (arr, tamanho) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += tamanho) {
          chunks.push(arr.slice(i, i + tamanho));
        }
        return chunks;
      };
    
      const renderizarComAtraso = () => {
        const grupos = chunkArray(posts, 10);
        grupos.forEach((grupo, index) => {
          setTimeout(() => {
            setPostsAntigos((prev) => [...prev, ...grupo]);
          }, index * 3000);
        });
      };
    
      useEffect(() => {
        if (posts.length > 0) {
          renderizarComAtraso();
        }
      }, [posts]);
      

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
        {postsAntigos.map((post) => (
          <Post
            chave={post.id}
            user={post.user}
            petId={post.pet}
            nome={post.nome}
            username={post.username}
            descricao={post.descricao}
            tempo={post.createdAt}
            key={post.id}  // Use um identificador único como a chave
          />
        ))}
      </div>
    );
}
