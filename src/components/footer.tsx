import { Link } from "react-router-dom";
import styles from "./footer.module.css";

// Assets
import PokemonPic from "../assets/assets/pikachu.png"
import LocationPic from "../assets/assets/pointer.png"
import ItemsPic from "../assets/assets/pokeball.png"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Link className={styles.footerLink} to="/pokemons">
                <img className={styles.footerIcon} src={PokemonPic} alt="Pokeball" />
                Pokemons
            </Link>
            <Link className={styles.footerLink} to="/pokemons">
                <img className={styles.footerIcon} src={ItemsPic} alt="Pokeball" />
                Items
            </Link>
            <Link className={styles.footerLink} to="/pokemons">
                <img className={styles.footerIcon} src={LocationPic} alt="Pokeball" />
                Map
            </Link>
        </footer>
    );
}

export default Footer;