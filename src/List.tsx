import { useEffect, useState } from "react";
import axios from "axios";
import { ApiResponse, Pokemon } from "./types";

type ListProps = {
  activePokemon: Pokemon | null;
  setActivePokemon: Function;
};

export const List: React.FC<ListProps> = ({
  activePokemon,
  setActivePokemon,
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getPokemons = async () => {
      const response = await axios<ApiResponse>(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1272"
      );
      setPokemons(response.data.results);
    };
    getPokemons();
  }, []);

  return (
    <div className="list">
      <h2>List</h2>
      <ul>
        {pokemons.map((item) => (
          <li
            key={item.name}
            onClick={() => setActivePokemon(item)}
            className={activePokemon?.name === item.name ? "active" : ""}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
