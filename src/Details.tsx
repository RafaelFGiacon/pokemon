import { useEffect, useState } from "react";
import { PokemonDetails, Pokemon } from "./types";
import axios from "axios";

type DetailsProps = {
  activePokemon: Pokemon | null;
};

export const Details: React.FC<DetailsProps> = ({ activePokemon }) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchActive = async () => {
      if (!activePokemon) {
        return;
      }
      const response = await axios<PokemonDetails>(activePokemon.url);
      setDetails(response.data);
    };
    fetchActive();
  }, [activePokemon]);

  return (
    <div className="details">
      {activePokemon && details ? (
        <div>
          <h2>{activePokemon.name}</h2>
          <div className="details-content">
            <img src={details.sprites.front_default} />
            <fieldset>
              <legend>Abilities</legend>
              <ul>
                {details.abilities.map((item) => (
                  <li>{item.ability.name}</li>
                ))}
              </ul>
            </fieldset>
          </div>
        </div>
      ) : (
        <div>Please, use the list to select a Pokemon.</div>
      )}
    </div>
  );
};
