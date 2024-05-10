import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPokemons } from "../api/fetchPokemons"; // Importa la función fetchPokemons para obtener los datos de los Pokémon.
import Footer from "../components/footer"; // Importa el componente Footer.
import Header from "../components/header"; // Importa el componente Header.
import { Pokemon } from "../types/types.d"; // Importa el tipo Pokemon desde el archivo de definición de tipos.
import styles from "./pokemons.module.css"; // Importa los estilos CSS específicos para este componente.
import LoadingScreen from "../components/LoadingScreen";
import { waitFor } from "../utils/utils";

const Pokemons = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState(""); // Define el estado local query para almacenar la consulta de búsqueda.
    const [pokemons, setPokemons] = useState<Pokemon[]>([]); // Define el estado local pokemons para almacenar la lista de Pokémon.

    useEffect(() => { // Utiliza useEffect para realizar una llamada a la API y cargar los datos de los Pokémon cuando el componente se monta.
        const fetchAllPokemons = async () => {
            setIsLoading(true);
            await waitFor(1000);
            const allPokemons = await fetchPokemons(); // Llama a la función fetchPokemons para obtener los datos de los Pokémon.
            setPokemons(allPokemons); // Actualiza el estado de los Pokémon con los datos obtenidos.
            setIsLoading(false);
        };
        fetchAllPokemons(); // Ejecuta la función fetchAllPokemons cuando el componente se monta.
    }, []); // El segundo argumento de useEffect (un array vacío) asegura que el efecto solo se ejecute una vez, cuando el componente se monta.

    if (isLoading || !pokemons) {
        return <LoadingScreen />;
    }

    const filteredPokemons = pokemons?.slice(0, 151).filter((pokemon) => {
        return pokemon.name.toLowerCase().match(query.toLowerCase()); //Que coincida la busqueda con el texto
      });
    return (
        <>
            <Header query={query} setQuery={setQuery} /> {/* Renderiza el componente Header, pasándole los props query y setQuery. */}
            <main>
                <nav className={styles.nav}>
                    {filteredPokemons?.slice(0, 151).map((pokemon) => ( // Mapea la lista de Pokémon y renderiza un enlace para cada uno.
                        <Link
                            key={pokemon.id}
                            className={styles.listItem}
                            to={`/pokemons/${pokemon.name.toLowerCase()}`}
                        >
                            <img
                                className={styles.listItemIcon}
                                src={pokemon.imgSrc}
                                alt={pokemon.name}
                            />
                            <div className={styles.listItemText}>
                                <span>{pokemon.name}</span>
                                <span>{pokemon.id}</span>
                            </div>
                        </Link>
                    ))}
                </nav>
            </main>
            <Footer /> {/* Renderiza el componente Footer. */}
        </>
    );
};

export default Pokemons; // Exporta el componente Pokemons.
