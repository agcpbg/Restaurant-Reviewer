import React from 'react';
import { View, TextInput, Text, Button, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';

import store from '../store';

import { loadCitiesThunk, addCityThunk, deleteCityThunk } from '../reducers/cities';

export class Cities extends React.Component {
  constructor() {
    super();
    this.state = {
      city: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount () {
    this.props.getLoadCitiesThunk();
  }

  handleChange (event) {
    this.setState({ city: event });
  }

  handleSubmit (event) {
    this.props.getAddCityThunk(this.state.city);
    this.setState({ city: '' });
  }

  render () {

    const { cities } = this.props;
    const { navigate } = this.props.navigation;

    return (

      <View style={styles.container}>

        <View style={styles.formContainer}>
          <View style={styles.inputsContainer}>
            <Text style={styles.label}>ADD CITY</Text>
            <TextInput style={styles.textInput} name="city" value={this.state.city} onChangeText={this.handleChange} />
          </View>
          <View style={styles.citySubContainer}>
            <Button color="white" onPress={this.handleSubmit} title="submit" />
          </View>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {
            !!cities.length && cities.map(city => {
              return <View key={city.id} style={styles.cityMapContainer}>
                <View style={styles.cityButtonContainer}>
                  <Button onPress={() => navigate('SingleCity', { city: city })} style={styles.cityButton} title={city.name} value={city.id} color='white'/>
                </View>
                <View style={styles.delButtonContainer}>
                  <Button title="X" value={city.id} onPress={() => {this.props.getDeleteCityThunk(city.id)}} color="white"/>
                </View>
              </View>
            })
          }
        </ScrollView>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.2,
    paddingTop: 40,
    backgroundColor: 'lightsteelblue',
  },
  inputsContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 0.25,
    left: 5,
  },
  textInput: {
    flex: 0.75,
    backgroundColor: 'white',
    borderWidth: 1,
    right: 10,
    padding: 5,
 },
   citySubContainer: {
    flex: 1,
    backgroundColor: 'darkblue',
    marginTop: 10,
    marginBottom: 10,
 },
  submit: {
    borderWidth: 1,
    backgroundColor: 'green',
    color: 'white',
    marginBottom: 10,
  },
  scrollContainer: {
    backgroundColor: 'aliceblue',
    flex: 1,
  },
  cityMapContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   flex: 1,
 },
 cityButtonContainer: {
   backgroundColor: 'dodgerblue',
   marginTop: 10,
   marginLeft: 10,
   flex: 0.9
 },
 cityButton: {
   flex: 0.8,
 },
 delButtonContainer: {
   flex: 0.1,
   marginTop: 10,
   marginLeft: 5,
   marginRight: 5,
   backgroundColor: 'dodgerblue',
 },
});

import { connect } from 'react-redux';

function mapState (state) {
  return {
    cities: state.allCities
  };
}

function mapDispatch(dispatch) {
  return {
    getLoadCitiesThunk: function () {
      dispatch(loadCitiesThunk());
    },
    getAddCityThunk: function (cityName) {
      dispatch(addCityThunk(cityName));
    },
    getDeleteCityThunk: function (cityId) {
      dispatch(deleteCityThunk(cityId));
    },
  };
}

const CitiesContainer = connect(mapState, mapDispatch)(Cities);

export default CitiesContainer;
