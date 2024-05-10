import { PokemonDetails } from "../types/types"; // Importa el tipo `PokemonDetails` desde el archivo de definición de tipos.
import { formatName } from "../utils/utils"; // Importa la función `formatName` desde el archivo de utilidades.

export async function fetchPokemon(
  pokemonName: string
): Promise<PokemonDetails> { // La función `fetchPokemon` acepta un argumento `pokemonName` de tipo `string` y devuelve una promesa que se resuelve en un objeto `PokemonDetails`.
  const response = await fetch( // Realiza una solicitud HTTP para obtener detalles sobre el Pokémon utilizando la PokeAPI.
    `https://pokeapi.co/api/v2/pokemon/${formatName(pokemonName)}`
  ); // La URL de la solicitud se construye utilizando el nombre del Pokémon formateado utilizando la función `formatName`.

  if (!response.ok) { // Si la respuesta no es exitosa (código de estado diferente de 200), lanza un error con el mensaje del estado de la respuesta.
    throw new Error(response.statusText);
  }
  const result = await response.json(); // Convierte la respuesta en formato JSON.

  const pokemon = { // Extrae la información relevante del resultado y la asigna a un objeto `pokemon`.
    name: result.name, // Nombre del Pokémon.
    id: result.id, // ID del Pokémon.
    imgSrc: result.sprites.front_default, // URL de la imagen del Pokémon.
    hp: result.stats[0]?.base_stat, // Puntos de salud del Pokémon.
    attack: result.stats[1]?.base_stat, // Poder de ataque del Pokémon.
    defense: result.stats[2]?.base_stat, // Poder de defensa del Pokémon.
  };
  return pokemon; // Devuelve el objeto `pokemon`.
}
