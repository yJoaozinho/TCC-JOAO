import Styles from "../../styles/index.module.css";
import SideBar from "../../src/components/sideBar/sideBar";
import FotoDePerfil from "../../src/components/fotoDePerfil/fotoDePerfil";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

export default function perfilPet() {
  const router = useRouter();
  const { id } = router.query;
  const [token, setToken] = useState(null);
  const [erro, setErro] = useState('');
  const [petData, setPetData] = useState({});
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

    async function buscarPerfilPet() {
      if (token && id) {
        try {
          const response = await fetch(`http://localhost:2306/animal/${id}`, {
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

          const dadosPerfilPet = await response.json();
          console.log('Dados do pet:', dadosPerfilPet);
          setPetData(dadosPerfilPet);

          
          if (userId !== dadosPerfilPet.dono && dadosPerfilPet.adocao === true) {
            setShowAdoptButton(true);
          }

          // Agora que temos os dados do pet, podemos buscar os dados do usuário
          buscarPerfilUsuario(dadosPerfilPet.dono);
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
      buscarPerfilPet();
    }
  }, [token, id, userId]);

  const handleAdoptClick = async () => {
    try {
      const requestData = {
        pet: id, // Substitua pelo ID do pet
        owner: petData.dono, // Substitua pela propriedade correta que contém o ID do dono do pet
      };
      console.log(requestData)
  
      if (token) {
        const response = await fetch('http://localhost:2306/adoption', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(requestData)
        });
  
        if (response.status === 204) {
          console.log('Adoção realizada com sucesso!');
          // Coloque aqui qualquer ação adicional após uma adoção bem-sucedida
        } else if (response.status === 401) {
          const erroData = await response.json();
          console.error('Erro:', erroData.mensagem);
        } else {
          console.error('Erro desconhecido ao realizar a adoção.');
        }
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  

  return (
    <div className={Styles.container}>
      <SideBar />
      <div className={Styles.perfil}>
        <div className={Styles.botoesNav}>
          {showAdoptButton && (
            <button
              className={Styles.link}
              onClick={handleAdoptClick}
            >
              Adotar
            </button>
          )}
        </div>
        <div className={Styles.vemDeLadinho}>
          <FotoDePerfil h="110" w="140" />
          <div className={Styles.infosPrincipais}>
            <h3 className={Styles.nome}> <strong className={Styles.nickname}>{petData.nome}</strong> - @{userData.nome}</h3>
            <h4> {petData.idade} - {petData.sexo}</h4>
          </div>
        </div>
        <div className={Styles.infoUsuario}>
          <div className={Styles.campo}>
            <strong>Descricao:</strong><br></br>
            <span className={Styles.quebra}>{petData.descricao}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
