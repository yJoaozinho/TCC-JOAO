import Styles from "../../styles/index.module.css";
import SideBar from "../../src/components/sideBar/sideBar";
import FotoDePerfil from "../../src/components/fotoDePerfil/fotoDePerfil";
import FollowButton from "../../src/components/likeButtton/followButton";
import PosteList from "../../src/components/userList/posteList";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

export default function outroUser() {
  const router = useRouter();
  const { id } = router.query;
  const [token, setToken] = useState(null);
  const [erro, setErro] = useState('');
  
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState('');
  const [showAdoptButton, setShowAdoptButton] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        try {
          const decoded = jwtDecode(storedToken);
          const id = decoded.sub;
          setUserId(id);
        } catch (error) {
          console.error('Erro ao decodificar o token:', error);
        }
      } else {
        console.log('Nenhum token encontrado.');
      }
    }

    async function buscarPerfil() {
      if (token && id) {
        try {
          const response = await fetch(`http://localhost:2306/user/${id}`, {
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
            throw new Error('Erro ao buscar informações do pet');
          }

          const dadosPerfil = await response.json();
          console.log('Dados do pet:', dadosPerfil);
          setUserData(dadosPerfil);

          
          if (userId !== dadosPerfil.dono === true) {
            setShowAdoptButton(true);
          }

          
          buscarPerfilUsuario(dadosPerfil.dono);
        } catch (error) {
          setErro(error.message);
        }
      }
    }

    async function buscarPerfilUsuario(donoId) {
      if (token && donoId) {
        try {
          const response = await fetch(`http://localhost:2306/user/${donoId}`, {
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

          const dadosPerfilUsuario = await response.json();
          console.log('Dados do usuário:', dadosPerfilUsuario);
          setUserData(dadosPerfilUsuario);
        } catch (error) {
          setErro(error.message);
        }
      }
    }

    if (token && id) {
      buscarPerfil();
    }
  }, [token, id, userId]);

  
  

  return (
    <div className={Styles.container}>
      <SideBar />
      <div className={Styles.perfil}>
        <div className={Styles.botoesNav}>
          {showAdoptButton && (
            <FollowButton />
          )}
        </div>
        <div className={Styles.vemDeLadinho}>
          <FotoDePerfil h="110" w="140" />
          <div className={Styles.infosPrincipais}>
            <h3 className={Styles.nome}> <strong className={Styles.nickname}>{userData.nome}</strong> - @{userData.username}</h3>
            <h4> {userData.cidade} - {userData.estado}</h4>
          </div>
        </div>
        <div className={Styles.infoUsuario}>
          <div className={Styles.campo}>
            <strong>Descricao:</strong><br></br>
            <span className={Styles.quebra}>{userData.biografia}</span>
          </div>
        </div>
        <div>
            <PosteList  id={id} />
        </div>
      </div>
    </div>
  );
}
