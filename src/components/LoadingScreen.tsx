import Pokedex from "../assets/assets/pokedex.png";
import styles from "./loadingScreen.module.css";

function LoadingScreen() {
  return (
    <div className={styles.loadingScreen}>
      <img className={styles.loadingScreenIcon} src={Pokedex} alt="Pokedex" />
    </div>
  );
}
export default LoadingScreen;
