import axios from 'axios';

export const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS';

export const loadRestaurants = restaurants => ({
    type: LOAD_RESTAURANTS,
    restaurants
});

const initialState = [];

export const loadRestaurantsReducer = (prevState = initialState, action) => {

  let newState = initialState.slice(0);

  switch (action.type) {

    case LOAD_RESTAURANTS:
      newState = [...action.restaurants];
      return newState;

    default:
      return prevState;
  }
};
