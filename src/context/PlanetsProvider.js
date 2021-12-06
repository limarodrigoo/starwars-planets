import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planetsResults, setPlanetsResults] = useState([]);

  const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(API_URL);
      const { results } = await data.json();
      setPlanetsResults(results);
    };
    fetchData();
  }, []);

  const contextValue = {
    planetsResults,
    setPlanetsResults,
  };
  return (
    <PlanetContext.Provider value={ contextValue }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.array).isRequired,
};
