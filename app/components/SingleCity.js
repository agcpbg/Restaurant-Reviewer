import React from 'react';
import store from '../store';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { addRestaurantThunk, deleteRestaurantThunk, onCityEnterThunk } from '../reducers/singleCityRestaurants';

export class SingleCity extends React.Component {
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
    this.props.getOnCityEnterThunk(this.props.navigation.state.params.city.id);
  }

  componentDidMount () {

  }

  componentWillReceiveProps (nextProps) {
    console.log('next props are ', nextProps);
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
    this.props.getAddRestaurantThunk(this.state.restaurantName, this.state.rating, this.state.review, this.props.selectedCity.id);
    this.setState({ restaurantName: '', rating: '', review: '' });
  }

  render () {

    const { selectedCity, restaurants } = this.props;
    const { navigate } = this.props.navigation;

    return (

      <ScrollView style={styles.container}>

        <View style={styles.formContainer}>
          <Text style={styles.label}>ADD RESTAURANT</Text>
          <TextInput style={styles.textInput} name="restaurantName" value={this.state.restaurantName} placeholder="Restaurant" onChangeText={this.handleChangeName} />
          <Text style={styles.label}>RATING</Text>
          <TextInput style={styles.textInput} name="rating" value={this.state.rating} onChangeText={this.handleChangeRating} />
          <Text style={styles.label}>WRITE REVIEW</Text>
          <TextInput style={styles.textInput} name="review" value={this.state.review} placeholder="Write a review..." multiline={true} onChangeText={this.handleChangeReview} />
          <View style={styles.citySubContainer}>
            <Button title="submit" color="white" onPress={this.handleSubmit} />
          </View>
        </View>

        <View style={styles.restaurantContainer}>
          {
            !!restaurants.length && restaurants.map(restaurant => {
              return <View style={styles.panel} key={restaurant.id}>
                      <View style={styles.panelHeader}>
                        <Text style={styles.panelHeaderText} >{restaurant.name}</Text>
                      </View>
                      <View style={styles.panelBody}>
                        <Text style={styles.panelBodyText}>My Rating: {restaurant.rating}</Text>
                        <Text style={styles.panelBodyText}>My Review: {restaurant.review}</Text>
                      </View>
                      <View style={styles.panelFooter}>
                        <View style={styles.editButtonContainer}>
                          <Button title="Edit" color="white" onPress={() => navigate('Restaurant', { restaurant: restaurant })} />
                        </View>
                        <View style={styles.deleteButtonContainer}>
                          <Button title="Delete" color="white" value={restaurant.id} onPress={() => {this.props.getDeleteRestaurantThunk(restaurant.id)}} />
                        </View>
                      </View>
                    </View>
            })
          }
        </View>

      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: 'lightsteelblue',
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
 restaurantContainer: {
  flex: 1,
 },
 panel: {
  borderWidth: 1,
  marginTop: 15,
  marginRight: 10,
  marginLeft: 10,
 },
 panelHeader: {
   backgroundColor: 'royalblue',
   padding: 10,
 },
 panelHeaderText: {
   color: 'white',
   fontWeight: 'bold',
   fontSize: 15,
 },
 panelBody: {
   padding: 10,
   backgroundColor: 'white',
 },
 panelBodyText: {
   fontWeight: 'bold',
   marginTop: 5,
   marginBottom: 5,
   fontSize: 15,
 },
 panelFooter: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: 'white',
 },
 editButtonContainer: {
  backgroundColor: 'darkturquoise',
  flex: 1,
  marginTop: 10,
  marginBottom: 20,
  marginLeft: 40,
  marginRight: 40,
 },
 deleteButtonContainer: {
  backgroundColor: 'tomato',
  flex: 1,
  marginTop: 10,
  marginBottom: 20,
  marginLeft: 20,
  marginRight: 40,
 },
});

import { connect } from 'react-redux';

function mapState (state, ownProps) {
  return {
    selectedCity: state.selectedCity,
    restaurants: state.selectedCityRestaurants,
  };
}

function mapDispatch(dispatch, ownProps) {
  return {
    getAddRestaurantThunk: function (restaurantName, rating, review, cityId) {
      dispatch(addRestaurantThunk(restaurantName, rating, review, cityId));
    },
    getDeleteRestaurantThunk: function (restaurantId) {
      dispatch(deleteRestaurantThunk(restaurantId));
    },
    getOnCityEnterThunk: function (cityId) {
      dispatch(onCityEnterThunk(cityId));
    },
  };
}

const SingleCityContainer = connect(mapState, mapDispatch)(SingleCity);

export default SingleCityContainer;
