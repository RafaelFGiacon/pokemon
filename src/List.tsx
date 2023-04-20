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
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getPokemons = async () => {
      const response = await axios<ApiResponse>(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1272"
      );
      setPokemons(response.data.results);
    };
    getPokemons();
  }, []);

  const filteredPokemons = search
    ? pokemons.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    : pokemons;

  const setRandomPokemon = () => {
    setActivePokemon(pokemons[Math.floor(Math.random() * pokemons.length)]);
  };

  return (
    <div className="list">
      <h2>List</h2>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setSearch("")}>X</button>
      <button onClick={setRandomPokemon}>R</button>
      <ul>
        {filteredPokemons.map((item) => (
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
