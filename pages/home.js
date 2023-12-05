import Styles from "../styles/home.module.css"
import SideBar from "../src/components/sideBar/sideBar"
import Posts from "../src/components/posts/post"

export default function Home() {
  return (
    <div className={Styles.meinha}>
      <SideBar />
      <div className={Styles.content}>
        <Posts
          title="Título do Post 1"
          description="Descrição do Post 1"
          name="Nome do Usuário"
          nickname="@nickname"
        /><Posts
          title="Título do Post 1"
          description="Descrição do Post 1"
          imageUrl="/path/to/image1.jpg"
          name="Nome do Usuário"
          nickname="@nickname"
        /><Posts
          title="Título do Post 1"
          description="Descrição do Post 1"
          imageUrl="/path/to/image1.jpg"
          name="Nome do Usuário"
          nickname="@nickname"
        /><Posts
          title="Título do Post 1"
          description="Descrição do Post 1"
          imageUrl="/path/to/image1.jpg"
          name="Nome do Usuário"
          nickname="@nickname"
        /><Posts
          title="Título do Post 1"
          description="Descrição do Post 1"
          imageUrl="/path/to/image1.jpg"
          name="Nome do Usuário"
          nickname="@nickname"
        />
        <Posts
          title="Título do Post 1"
          description="Descrição do Post 1"
          imageUrl="/path/to/image1.jpg"
          name="Nome do Usuário"
          nickname="@nickname"
        />
        <Posts
          title="Título do Post 1"
          description="Descrição do Post 1"
          imageUrl="/path/to/image1.jpg"
          name="Nome do Usuário"
          nickname="@nickname"
        />
        <Posts
          title="Título do Post 1"
          description="Descrição do Post 1"
          imageUrl="/path/to/image1.jpg"
          name="Nome do Usuário"
          nickname="@nickname"
        />
        <Posts
          title="Título do Post 1"
          description="Descrição do Post 1"
          imageUrl="/path/to/image1.jpg"
          name="Nome do Usuário"
          nickname="@nickname"
        />
        <Posts
          title="Título do Post 1"
          description="Descrição do Post 1"
          imageUrl="/path/to/image1.jpg"
          name="Nome do Usuário"
          nickname="@nickname"
        />
        <Posts
          title="Título do Post 1"
          description="Descrição do Post 1"
          imageUrl="/path/to/image1.jpg"
          name="Nome do Usuário"
          nickname="@nickname"
        />
        <Posts
          title="Título do Post 1"
          description="Descrição do Post 1"
          imageUrl="/path/to/image1.jpg"
          name="Nome do Usuário"
          nickname="@nickname"
        />
        <Posts
          title="Título do Post 1"
          description="Descrição do Post 1"
          imageUrl="/path/to/image1.jpg"
          name="Nome do Usuário"
          nickname="@nickname"
        />

      </div>

    </div>
  )
}
