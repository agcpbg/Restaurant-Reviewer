import React from 'react';
import store from '../store';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { onRestaurantEnterThunk, editRestaurantThunk } from '../reducers/restaurant';

export class Restaurant extends React.Component {
  constructor() {
    super();

    this.state = {
      restaurantName: '',
      rating: '',
      review: ''
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.handleChangeReview = this.handleChangeReview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount () {
    this.props.getOnRestaurantEnterThunk(this.props.navigation.state.params.restaurant.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      restaurantName: nextProps.selectedRestaurant.name,
      rating: nextProps.selectedRestaurant.rating.toString(),
      review: nextProps.selectedRestaurant.review
    });
  }

  handleChangeName (event) {
    this.setState({ restaurantName: event });
  }

  handleChangeRating (event) {
    this.setState({ rating: event });
  }

  handleChangeReview (event) {
    this.setState({ review: event });
  }

  handleSubmit (event) {
    this.props.getEditRestaurantThunk(this.state.restaurantName, this.state.rating, this.state.review, this.props.selectedRestaurant.id);
    this.props.navigation.navigate('SingleCity', { city: this.props.selectedCity });
    //this.props.navigation.goBack(this.props.navigation.state.key);
  }

  render () {

    const { selectedRestaurant } = this.props;

    return (

      <View style={styles.container}>

        <View style={styles.formContainer}>
          <Text style={styles.label}>EDIT RESTAURANT</Text>
          <TextInput style={styles.textInput} name="restaurantName" value={this.state.restaurantName} onChangeText={this.handleChangeName} />
          <Text style={styles.label}>RATING</Text>
          <TextInput style={styles.textInput} name="rating" value={this.state.rating} onChangeText={this.handleChangeRating} />
          <Text style={styles.label}>WRITE REVIEW</Text>
          <TextInput style={styles.textInput} name="review" value={this.state.review} multiline={true} onChangeText={this.handleChangeReview} />
          <View style={styles.citySubContainer}>
            <Button title="submit" color="white" onPress={this.handleSubmit} />
          </View>
        </View>

        <View style={styles.emptyContainer}></View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightsteelblue',
  },
  formContainer: {
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flex: 1,
  },
  label: {
    flex: 1,
    left: 5,
    textAlign: 'center',
    marginTop: 10,
    height: 20,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
    padding: 5,
    height: 30,
 },
 citySubContainer: {
    flex: 1,
    backgroundColor: 'darkblue',
    marginTop: 10,
    marginBottom: 25,
    marginLeft: 10,
    marginRight: 10,
 },
 emptyContainer: {
   flex: 1,
 },
});

import { connect } from 'react-redux';

function mapState (state) {
  return {
    selectedRestaurant: state.selectedRestaurant,
    selectedCity: state.selectedCity,
  };
}

function mapDispatch(dispatch) {
  return {
    getEditRestaurantThunk: function (restaurantName, rating, review, restaurantId) {
      dispatch(editRestaurantThunk(restaurantName, rating, review, restaurantId));
    },
    getOnRestaurantEnterThunk: function (restaurantId) {
      dispatch(onRestaurantEnterThunk(restaurantId));
    },
  };
}

const RestaurantContainer = connect(mapState, mapDispatch)(Restaurant);

export default RestaurantContainer;
