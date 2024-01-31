import Styles from "./postList.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Post({ _id, nome, descricao, dono }) {
    const router = useRouter();
    const idPost = _id;
    const [imageUrl, setImageUrl] = useState({});
    const [token, setToken] = useState("");
    const [erro, setErro] = useState("");
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
              setToken(storedToken);
              try {
                const decoded = jwtDecode(storedToken);
                setUserId(decoded.sub);
                fetchImage(storedToken, decoded.sub)
              } catch (error) {
                console.error("Erro ao decodificar o token:", error);
              }
            } else {
              console.log("Nenhum token encontrado.");
            }
        }
        
       
        async function buscarPerfil() {
            if (token && dono) {
              try {
                const response = await fetch(`http://localhost:2306/user/${dono}`, {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
      
                if (response.status === 401) {
                  throw new Error("Usuário não logado!");
                } else if (response.status === 403) {
                  throw new Error("Acesso negado!");
                } else if (!response.ok) {
                  throw new Error("Erro ao buscar informações do usuário");
                }
      
                const dadosPerfil = await response.json();
                setUserData(dadosPerfil);
              } catch (error) {
                setErro(error.message);
              }
            }
          }
      
          buscarPerfil();
    }, [dono, token]);

    const fetchImage = async (token, id) => {
        try {
            const response = await fetch(`http://localhost:2306/user/pic/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const imageUrl = await response.json()
                console.log("URL da imagem recebida da API:", imageUrl); 
                setImageUrl(imageUrl);
            } else {
                console.error("Falha ao buscar a imagem de perfil. Status:", response.status);
            }
        } catch (error) {
            console.error("Erro ao buscar a imagem de perfil:", error);
        }
    };

    const excluirPost = async () => {
        try {
            

            if (token) {
                const response = await fetch(`http://localhost:2306/post/${idPost}`, {
                    method: 'DELETE',
                    headers: {
                        
                        'Authorization': `Bearer ${token}`
                    },
                    
                });

                if (response.status === 204) {
                    console.log('excluiu');

                } else if (response.status === 401) {
                    const erroData = await response.json();
                    console.error('Erro:', erroData.mensagem);
                } else {
                    const erroData = await response.json();
                    console.error('Erro:', erroData);
                }
            }
        }
        catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div className={Styles.post}>
            <div className={Styles.postHeader}>
                <img src={imageUrl.pic} alt={`Foto do ${nome}`} />
                <div>
                    <div className={Styles.name}>{nome}</div>
                    <div className={Styles.timestamp}>{userData.username}</div>
                </div>
                <div className={Styles.raiPaLa}>
                    <button
                        className={Styles.petButton}
                        
                    >
                        @{nome}
                    </button>
                </div>
            </div>
            <div className={Styles.postContent}>{descricao}</div>
            <div className={Styles.postFooter}>
                <button className={Styles.petButton} onClick={excluirPost}>
                    Excluir 
                </button>

            </div>
        </div>
    );
}
