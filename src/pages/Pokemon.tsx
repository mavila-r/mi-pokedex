import { useNavigate, useParams } from "react-router-dom"; // Importa los hooks `useNavigate` y `useParams` de React Router para manejar la navegación y los parámetros de la URL.
import pokeballSrc from "../assets/assets/pokeball.png"; // Importa la imagen de la pokebola desde la carpeta de assets.
import Footer from "../components/footer"; // Importa el componente Footer.
import styles from "./pokemon.module.css"; // Importa los estilos CSS específicos para este componente.

import { useEffect, useState } from "react"; // Importa los hooks `useEffect` y `useState` de React para manejar el ciclo de vida y el estado del componente.
import { fetchPokemon } from "../api/fetchPokemon"; // Importa la función `fetchPokemon` para obtener detalles sobre un Pokémon desde la API.
import LoadingScreen from "../components/LoadingScreen"; // Importa el componente LoadingScreen para mostrar una pantalla de carga.
import { PokemonDetails } from "../types/types"; // Importa el tipo `PokemonDetails` desde el archivo de definición de tipos.
import { waitFor } from "../utils/utils"; // Importa la función `waitFor` desde el archivo de utilidades.

const Pokemon = () => {
  const { name } = useParams(); // Extrae el parámetro `name` de la URL utilizando el hook `useParams`.
  const [pokemon, setPokemon] = useState<PokemonDetails>(); // Define el estado local `pokemon` para almacenar los detalles del Pokémon.
  const [isLoading, setIsLoading] = useState(false); // Define el estado local `isLoading` para controlar si se está cargando el Pokémon.
  const navigate = useNavigate(); // Obtiene la función `navigate` para manejar la navegación.

  useEffect(() => { // Utiliza useEffect para cargar los detalles del Pokémon cuando el componente se monta o cuando cambia el parámetro `name`.
    async function getPokemon() { // Define una función asincrónica para obtener los detalles del Pokémon.
      setIsLoading(true); // Establece `isLoading` en `true` para mostrar la pantalla de carga.
      await waitFor(500); // Espera 1 segundo simulando una carga.
      const fetchedPokemon = await fetchPokemon(name as string); // Llama a la función `fetchPokemon` para obtener los detalles del Pokémon.
      setPokemon(fetchedPokemon); // Actualiza el estado `pokemon` con los detalles obtenidos del Pokémon.
      setIsLoading(false); // Establece `isLoading` en `false` para ocultar la pantalla de carga.
    }
    getPokemon(); // Ejecuta la función `getPokemon` cuando el componente se monta o cuando cambia el parámetro `name`.
  }, [name]); // El segundo argumento de useEffect (un array con `name`) asegura que el efecto se ejecute cuando `name` cambia.

  if (isLoading || !pokemon) { // Si se está cargando o los detalles del Pokémon aún no están disponibles, muestra la pantalla de carga.
    return <LoadingScreen />;
  }

  return (
    <> {/* Renderiza el contenido del componente */}
      <button className={styles.pokeballButton} onClick={() => navigate(-1)}> {/* Renderiza un botón que, al hacer clic, navega hacia atrás en la historia del navegador. */}
        <img className={styles.pokeballImg} src={pokeballSrc} alt="pokeball" /> {/* Renderiza una imagen de una pokebola dentro del botón. */}
        Go back {/* Texto del botón */}
      </button>
      <div className={styles.pokemon}> {/* Contenedor principal del componente */}
        <main className={styles.pokemonInfo}> {/* Contenedor de la información del Pokémon */}
          <div className={styles.pokemonTitle}>{name?.toUpperCase()}</div> {/* Renderiza el nombre del Pokémon en mayúsculas */}
          <div>Nr. {pokemon?.id}</div> {/* Renderiza el número del Pokémon */}
          <div> {/* Contenedor de la imagen del Pokémon */}
            <img
              className={styles.pokemonInfoImg}
              src={pokemon?.imgSrc}
              alt={pokemon?.name}
            /> {/* Renderiza la imagen del Pokémon */}
          </div>
          <div>HP: {pokemon?.hp}</div> {/* Renderiza los puntos de salud del Pokémon */}
          <div>Attack: {pokemon?.attack}</div> {/* Renderiza el ataque del Pokémon */}
          <div>Defense: {pokemon?.defense}</div> {/* Renderiza la defensa del Pokémon */}
        </main>
      </div>
      <Footer /> {/* Renderiza el componente Footer. */}
    </>
  );
};

export default Pokemon; // Exporta el componente Pokemon.
