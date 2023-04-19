import { useState } from "react";
import { Details } from "./Details";
import { List } from "./List";
import { Pokemon } from "./types";

export const App = () => {
  const [activePokemon, setActivePokemon] = useState<Pokemon | null>(null);

  return (
    <div>
      <h1>Pokemon</h1>
      <div>
        <div className="content">
          <List
            activePokemon={activePokemon}
            setActivePokemon={setActivePokemon}
          />
          <Details activePokemon={activePokemon} />
        </div>
      </div>
    </div>
  );
};
