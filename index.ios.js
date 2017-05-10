import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './app/store';
import { StackNavigator } from 'react-navigation';

import CitiesContainer from './app/components/Cities';
import SingleCityContainer from './app/components/SingleCity';
import RestaurantContainer from './app/components/Restaurant';

const AppStackNavigator = StackNavigator({
  Cities: {
    screen: CitiesContainer,
    navigationOptions: {
        title: 'Select a City',
    }
  },
  SingleCity: {
    screen: SingleCityContainer,
    navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.city.name}`,
    })
  },
  Restaurant: {
    screen: RestaurantContainer,
    navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.restaurant.name}`,
    })
  },
});

const App = () => (
  <Provider store={store}>
    <AppStackNavigator />
  </Provider>
);

AppRegistry.registerComponent('StackathonProject', () => App);
