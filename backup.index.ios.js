import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './app/store';

import RootContainer from './app/components/Root';

// export default class StackathonProject extends Component {
//   render() {
//     {console.log('inside of render function!!!')}
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

const App = () => (
  <Provider store={store}>
    <RootContainer />
  </Provider>
);

AppRegistry.registerComponent('StackathonProject', () => App);

// import React, { Component } from "react";
// import { AppRegistry, View, Text, Button } from "react-native";

// import { StackNavigator } from "react-navigation";

// const LoginScreen = props => (
//     <View>
//         <Button
//             title="Log In"
//             onPress={() => {
//                 props.navigation.navigate("Main");
//             }}
//         />
//     </View>
// );

// class MainScreen extends Component {
//     static navigationOptions = {
//         title: "Welcome"
//     };

//     render() {
//         return (
//             <View>
//                 <Text>Welcome to React Navigation</Text>
//             </View>
//         );
//     }
// }

// const App = StackNavigator({
//     Login: { screen: LoginScreen },
//     Main: { screen: MainScreen }
// });

// AppRegistry.registerComponent("StackathonProject", () => App);
