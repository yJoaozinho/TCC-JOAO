import Styles from "../../styles/criarPost.module.css"
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export default function criarPost() {


  const [erro, setErro] = useState('');
  const [descricao, setDescricao] = useState('')
  const [userData, setUserData] = useState({})
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState('');
  const { id } = router.query;

  const onClose = () => {
    router.push('/meusAnimais');
  };
  
  useEffect(() => {

    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          console.log('a porra do token :', token)
          setToken(token)
          const decoded = jwtDecode(token);
          setUser(decoded.sub);

        } catch (error) {
          console.error('Erro ao decodificar o token:', error);
        }
      } else {
        console.log('Nenhum token encontrado.');
      }
    }
    async function buscarPerfil() {
      try {
          const response = await fetch(`http://localhost:2306/user/${user}`, {
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

          const dadosPerfil = await response.json();
          setUserData(dadosPerfil);
        } catch (error) {
          setErro(error.message);
        }
      }
    

    buscarPerfil();

  }, [id]);
const onSubmit = async (e) =>{
  e.preventDefault();
  const postData = {
    id,
    descricao,
   
};

  async function criarPost(postData) {


    try {
      const response = await fetch('http://localhost:2306/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      if (response.status === 201) {
        const responseData = await response.json();
        console.log('Post criado:', responseData.mensagem);
      } else if (response.status === 401) {
        const erroData = await response.json();
        console.error('Erro:', erroData.mensagem);
      } else if (response.status === 403) {
        const erroData = await response.json();
        console.error('Erro:', erroData.mensagem);
      } else {
        console.error('Erro desconhecido ao criar o post.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  criarPost(postData);

}

  

  



  return (
    <div className={Styles.raul}>
      <div className={Styles.postContainer}>
        <div className={Styles.userInfo}>
          {/* <img src="/avatar.jpg" alt="User Avatar" className={Styles.avatar} /> */}
          <div>
            <div className={Styles.userName}>{userData.nome}</div>
            <div className={Styles.username}>@{userData.username}</div>
          </div>
        </div>
        <input
          className={Styles.inputBox}
          name="descricao"
          placeholder="Sobre oq esta pensando?"
          value={descricao} onChange={(e) => setDescricao(e.target.value)}
        />
        <div className={Styles.buttons}>
          <button className={`${Styles.button} ${Styles.cancel}`} onClick={onClose}>Cancelar!</button>
          <button className={`${Styles.button} ${Styles.post}`}>Postar</button>
        </div>

      </div>
    </div>
  );
};