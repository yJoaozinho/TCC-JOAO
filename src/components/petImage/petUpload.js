
import Styles from "./petUpload.module.css"
import { useEffect, useState } from "react";

function ImageUpload({ petId }) {
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        try {
          const decoded = jwtDecode(storedToken);
         
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      } else {
        console.log("Nenhum token encontrado.");
      }

      
    }
  }, []);
  const handleImageChange = (e) => {
    
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Checa se uma imagem foi selecionada
    if (!image) {
      alert('Por favor, selecione uma imagem para fazer upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch(`http://localhost:2306/animal/pic/${petId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
          },
        body: formData,
       
      });

      if (response.ok) {
        const responseBody = await response.json();
        alert('Imagem enviada com sucesso!');
      } else {
        alert('Falha no envio da imagem.');
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      alert('Erro ao enviar a imagem.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={Styles.form}>
    <label className={Styles.formLabel}>Trocar imagem de perfil do pet:</label>
    <input type="file" accept="image/*" onChange={handleImageChange} />
    <button type="submit">Enviar Imagem</button>
  </form>
  );
}

export default ImageUpload;
