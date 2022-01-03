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

  const contextValue = {
    planetsResults,
    setPlanetsResults,
    filteredPlanets,
    setFilteredPlanets,
    filterPlanetsByName,
    filters,
    setFilters,
  };
  return (
    <PlanetContext.Provider value={ contextValue }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.array).isRequired,
};
