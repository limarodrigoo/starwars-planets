import React from 'react';

export default function NumericInput() {
  const columns = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_wate'];
  const options = ['maior que', 'menor que', 'igual a'];

  return (
    <div>
      <select data-testid="column-filter">
        {columns.map((colum) => (
          <option
            key={ colum }
            value={ colum }
          >
            {colum}

          </option>
        ))}
      </select>
      <select data-testid="column-filter">
        {options.map((option) => (
          <option
            key={ option }
            value={ option }
          >
            {option}

          </option>
        ))}
      </select>
      <input type="number" data-testid="value-filter" />
      <button type="button" data-testid="button-filter">Adicionar Filtro</button>
    </div>
  );
}
