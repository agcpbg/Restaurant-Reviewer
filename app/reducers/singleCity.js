import axios from 'axios';

import ip from '../../IP';

export const SELECT_CITY = 'SELECT_CITY';

//Action creators

export const selectCity = function (city) {
  return {
    type: SELECT_CITY,
    selectedCity: city
  };
};

// Reducer

let initialState = {};

export const selectCityReducer = (prevState = initialState, action) => {

  let newState = Object.assign({}, prevState);

  switch (action.type) {

    case SELECT_CITY: {
      newState = action.selectedCity;
      return newState;
    }

    default: {
      return prevState;
    }
  }
};

// Thunks
