import Styles from "../styles/home.module.css";
import SideBar from "../src/components/sideBar/sideBar";
import PetsList from "../src/components/petList/petList";
import { useState, useEffect } from "react";

export default function pets() {
  return (
    <div className={Styles.meinha}>
      <SideBar />
      <div className={Styles.content}>
        <div className="timeline">
          <PetsList />
        </div>
      </div>
    </div>
  );
}
