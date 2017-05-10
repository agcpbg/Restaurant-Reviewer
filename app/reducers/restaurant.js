import axios from 'axios';

import ip from '../../IP';

export const EDIT_RESTAURANT = 'EDIT_RESTAURANT';
export const SELECT_RESTAURANT = 'SELECT_RESTAURANT';

//Action creators

export const editRestaurant = function (restaurant) {
  return {
    type: EDIT_RESTAURANT,
    selectedRestaurant: restaurant
  };
};

export const selectRestaurant = function (restaurant) {
  return {
    type: SELECT_RESTAURANT,
    selectedRestaurant: restaurant
  };
};

// Reducer

let initialState = {};

export const selectRestaurantReducer = (prevState = initialState, action) => {

  let newState = Object.assign({}, prevState);

  switch (action.type) {

    case EDIT_RESTAURANT: {
      newState = action.selectedRestaurant;
      return newState;
    }

    case SELECT_RESTAURANT: {
      newState = action.selectedRestaurant;
      return newState;
    }

    default: {
      return prevState;
    }
  }
};

// Thunks

export function onRestaurantEnterThunk (restaurantId) {

  return function thunk (dispatch) {

    return axios.get(`${ip}/api/restaurant/${restaurantId}`)
      .then(res => res.data)
      .then(restaurant => {
        dispatch(selectRestaurant(restaurant));
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function editRestaurantThunk (restaurantName, rating, review, restaurantId) {

  return function thunk (dispatch) {

    return axios.put(`${ip}/api/restaurant`, {name: restaurantName, rating: rating, review: review, id: restaurantId})
    .then(res => res.data)
    .then(restaurant => {
      const action = editRestaurant(restaurant);
      dispatch(action);
    })
    .catch(err => {
      console.error(err);
    });
  };
}
