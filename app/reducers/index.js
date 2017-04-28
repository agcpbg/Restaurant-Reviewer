import { combineReducers } from 'redux';

import { loadRestaurantsReducer } from './loadRestaurants';
import { incrementRestaurantCountReducer } from './restaurantCount';
const rootReducer = combineReducers({
  allRestaurants: loadRestaurantsReducer,
  restaurantCount: incrementRestaurantCountReducer,
});

export default rootReducer;
