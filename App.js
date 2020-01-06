import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View, YellowBox, AsyncStorage } from 'react-native';
import AppContainer from "./src/navigations";
import * as  Font from 'expo-font';
import store from './store';
import navigationService from './src/service/navigationService';
export default class App extends Component {

  state = {
    loading: true
  }
  async componentDidMount() {
    try {
      await Font.loadAsync({
        AvenirNextDemiBold: require('./assets/font/AvenirNextDemiBold.ttf'),
        AvenirNextRegular: require('./assets/font/AvenirNextRegular.otf')
      });
      await AsyncStorage.setItem('useCurrent', 'no');
    } catch(error) {
      console.log('error loading fonts ', error);
    }
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return(
        <View></View>
      );
    }
    return (
      <Provider store={store}>
        <AppContainer
          ref={(navigatorRef)=> {
            navigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    )
  }
}


YellowBox.ignoreWarnings(['Setting a timer', '']);