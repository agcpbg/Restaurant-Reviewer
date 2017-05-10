import React from 'react';
import { ScrollView, View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';

import { incrementRestaurantCount } from '../reducers/restaurantCount';

class Root extends React.Component {
  constructor() {
    super();

    this.incrementCount = this.incrementCount.bind(this);
  }

  incrementCount () {
    this.props.incrementRestaurantCountThunk(1);
  }

  render () {

    return (

      <View>
        <Text style={{marginTop: 20}} >
          Restaurant Count: { this.props.restaurantCount }
        </Text>
        <TouchableHighlight onPress={this.incrementCount} >
          <Text>Add Restaurant</Text>
        </TouchableHighlight>
        <ScrollView>

        </ScrollView>
      </View>

    );
  }
}

import {connect} from 'react-redux';

function mapState (state) {
  return { restaurantCount: state.restaurantCount };
}

function mapDispatch (dispatch) {
  return {
    incrementRestaurantCountThunk: function (num) {
      dispatch(incrementRestaurantCount(num));
    }
  };
}

const RootContainer = connect(mapState, mapDispatch)(Root);

export default RootContainer;
