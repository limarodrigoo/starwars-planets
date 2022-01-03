import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetsContext';

export default function TextInput() {
  const { filterPlanetsByName } = useContext(PlanetContext);

  const handleInputChange = ({ target: { value } }) => {
    filterPlanetsByName(value);
  };

  return (
    <div>
      <input
        type="text"
        onChange={ handleInputChange }
        placeholder="Filtar por texto"
        data-testid="name-filter"
      />
    </div>
  );
}
