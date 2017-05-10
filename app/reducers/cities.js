import axios from 'axios';

import ip from '../../IP';

export const LOAD_CITIES = 'LOAD_CITIES';
export const ADD_CITY = 'ADD_CITY';
export const DELETE_CITY = 'DELETE_CITY';

//Action creators

export const loadCities = cities => {
  return {
    type: LOAD_CITIES,
    cities: cities
  };
};

export const addCity = city => {
  return {
    type: ADD_CITY,
    city: city
  };
};

export const deleteCity = cityId => {
  return {
    type: DELETE_CITY,
    cityId: cityId
  };
};

// Reducer

let initialState = [];

export const citiesArrReducer = (prevState = initialState, action) => {

  let newState = prevState.slice(0);

  switch (action.type) {

    case LOAD_CITIES: {
      newState = [...action.cities];
      return newState;
    }


    case ADD_CITY: {
      newState = [...newState, action.city];
      return newState;
    }


    case DELETE_CITY: {
      let newCityArr = newState.filter(city => {
        return city.id !== +action.cityId;
      });
      newState = [...newCityArr];
      return newState;
    }


    default: {
      return prevState;
    }
  }
};

// Thunks

export function loadCitiesThunk () {

  return function thunk (dispatch) {

    return axios.get(`${ip}/api/cities`)
      .then(res => res.data)
      .then(cities => {
        dispatch(loadCities(cities));
      })
      .catch(err => {
        console.error(err);
    });

  };
}

export function addCityThunk (cityName) {

  return function thunk (dispatch) {

    return axios.post(`${ip}/api/city`, {name: cityName})
    .then(res => res.data)
    .then(city => {
      const action = addCity(city);
      dispatch(action);
    })
    .catch(err => {
      console.error(err);
    });
  };
}

export function deleteCityThunk (cityId) {

  return function thunk (dispatch) {

    return axios.delete(`${ip}/api/city/${cityId}`)
    .then(res => res.data)
    .then(city => {
      const action = deleteCity(cityId);
      dispatch(action);
    })
    .catch(err => {
      console.error(err);
    });
  };
}
