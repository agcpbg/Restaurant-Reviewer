import { combineReducers } from 'redux';

import { citiesArrReducer } from './cities';
import { selectCityReducer } from './singleCity';
import { loadRestaurantsReducer } from './singleCityRestaurants';
import { selectRestaurantReducer } from './restaurant';

const rootReducer = combineReducers({
  allCities: citiesArrReducer,
  selectedCity: selectCityReducer,
  selectedCityRestaurants: loadRestaurantsReducer,
  selectedRestaurant: selectRestaurantReducer,
});

export default rootReducer;
