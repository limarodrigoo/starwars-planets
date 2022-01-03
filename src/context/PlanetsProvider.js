import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const defaultFilter = {
    filterByName: { name: '' },
  };

  const [planetsResults, setPlanetsResults] = useState([]);
  const [filters, setFilters] = useState(defaultFilter);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByNumericValues, setfilterByNumericValues] = useState([]);

  const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(API_URL);
      const { results } = await data.json();
      setPlanetsResults(results);
      setFilteredPlanets(results);
    };
    fetchData();
  }, []);

  const filterPlanetsByName = (planetName) => {
    const string = planetName.toUpperCase();
    const result = planetsResults
      .filter(({ name }) => name.toUpperCase().includes(string));
    setFilteredPlanets(result);
  };

  const setComparison = (column, comparison, value) => {
    switch (comparison) {
    case 'maior que':
      return filteredPlanets.filter((planet) => Number(planet[column]) > Number(value));
    case 'menor que':
      return filteredPlanets.filter((planet) => Number(planet[column]) < Number(value));
    default:
      return filteredPlanets.filter((planet) => Number(planet[column]) === Number(value));
    }
  };

  const filterPlanetsByNum = (column, comparison, value) => {
    setfilterByNumericValues([
      ...filterByNumericValues,
      {
        column,
        comparison,
        value,
      },
    ]);
    const result = setComparison(column, comparison, value);

    setFilteredPlanets(result);
  };

  const contextValue = {
    planetsResults,
    setPlanetsResults,
    filteredPlanets,
    setFilteredPlanets,
    filterPlanetsByName,
    filters,
    setFilters,
    filterByNumericValues,
    setfilterByNumericValues,
    filterPlanetsByNum,
  };
  return (
    <PlanetContext.Provider value={ contextValue }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
