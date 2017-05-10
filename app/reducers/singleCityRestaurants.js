import axios from 'axios';

import ip from '../../IP';
import { selectCity } from './singleCity';

export const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS';
export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const DELETE_RESTAURANT = 'DELETE_RESTAURANT';

//Action creators

export const loadRestaurants = function (restaurants) {
  return {
    type: LOAD_RESTAURANTS,
    restaurants: restaurants
  };
};

export const addRestaurant = function (restaurant) {
  return {
    type: ADD_RESTAURANT,
    restaurant: restaurant
  };
};

export const deleteRestaurant = function (restaurantId) {
  return {
    type: DELETE_RESTAURANT,
    restaurantId: restaurantId
  };
};

// Reducer

let initialState = [];

export const loadRestaurantsReducer = (prevState = initialState, action) => {

  let newState = prevState.slice(0);

  switch (action.type) {

    case LOAD_RESTAURANTS: {
      newState = [...action.restaurants];
      return newState;
    }

    case ADD_RESTAURANT: {
      newState = [...newState, action.restaurant];
      return newState;
    }

    case DELETE_RESTAURANT: {
      let newRestaurantArr = newState.filter(restaurant => {
        return restaurant.id !== +action.restaurantId;
      });
      newState = [...newRestaurantArr];
      return newState;
    }

    default: {
      return prevState;
    }
  }
};

// Thunks

export function onCityEnterThunk (cityId) {

  return function thunk (dispatch) {

    return axios.get(`${ip}/api/city/${cityId}`)
      .then(res => res.data)
      .then(city => {
        let restaurants = [...city.restaurants];
        delete city.restaurants;
        dispatch(selectCity(city));
        dispatch(loadRestaurants(restaurants));
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function addRestaurantThunk (restaurantName, rating, review, cityId) {

  return function thunk (dispatch) {

    return axios.post(`${ip}/api/restaurant`, {name: restaurantName, rating: rating, review: review, cityId: cityId})
    .then(res => res.data)
    .then(restaurant => {
      const action = addRestaurant(restaurant);
      dispatch(action);
    })
    .catch(err => {
      console.error(err);
    });
  };
}

export function deleteRestaurantThunk (restaurantId) {

  return function thunk (dispatch) {

    return axios.delete(`${ip}/api/restaurant/${restaurantId}`)
    .then(res => res.data)
    .then(restaurant => {
      const action = deleteRestaurant(restaurantId);
      dispatch(action);
    })
    .catch(err => {
      console.error(err);
    });
  };
}
