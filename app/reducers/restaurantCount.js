import axios from 'axios';

export const INCREMENT_RESTAURANT_COUNT = 'INCREMENT_RESTAURANT_COUNT';

export const incrementRestaurantCount = increment => ({
    type: INCREMENT_RESTAURANT_COUNT,
    increment
});

const initialState = 0;

export const incrementRestaurantCountReducer = (prevState = initialState, action) => {

  let newstate;

  switch (action.type) {

    case INCREMENT_RESTAURANT_COUNT:
      newState = prevState + action.increment;
      return newState;

    default:
      return prevState;
  }
};
