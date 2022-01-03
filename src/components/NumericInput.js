import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetsContext';

export default function NumericInput() {
  const { filterPlanetsByNum } = useContext(PlanetContext);
  const [valueToFilter, setValueToFilter] = useState(0);

  const handleChange = ({ target: { value } }) => {
    setValueToFilter(value);
  };

  const onClick = () => {
    const col = document.getElementById('columns').value;
    const comparison = document.getElementById('option').value;
    const { value } = document.getElementById('value');

    console.log(col, comparison, value);
    filterPlanetsByNum(col, comparison, value);
  };

  const columns = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const options = ['maior que', 'menor que', 'igual a'];

  return (
    <div>
      <select id="columns" data-testid="column-filter">
        {columns.map((colum) => (
          <option
            key={ colum }
            value={ colum }
          >
            {colum}

          </option>
        ))}
      </select>
      <select id="option" data-testid="comparison-filter">
        {options.map((option) => (
          <option
            key={ option }
            value={ option }
          >
            {option}

          </option>
        ))}
      </select>
      <input
        id="value"
        type="number"
        data-testid="value-filter"
        value={ valueToFilter }
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ onClick }
      >
        Adicionar Filtro

      </button>
    </div>
  );
}
