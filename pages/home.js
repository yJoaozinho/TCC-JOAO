import Styles from "../styles/home.module.css"
import SideBar from "../src/components/sideBar/sideBar"
import PostsList from "../src/components/postList/postList"

export default function Home() {
  return (
    <div className={Styles.meinha}>
      <SideBar />
      <div className={Styles.content}>
        <div className="timeline">
          <PostsList /> 
        </div>







      </div>

    </div>
  )
}
