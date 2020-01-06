import React, {Component} from "react";
import { View,  Dimensions, TouchableOpacity } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import {  ProfileScreen,
          SearchserviceScreen, 
          ScheduledBookingScreen, 
          PaymentMethodScreen,
          SearchResult,
          MapSearchResultScreen,
          BookandAppointmentScreen,
          AddPaymentScreen,
          PaymentDetailScreen,
          ServiceScreen } from "../screens";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from "@expo/vector-icons";
import CustomSidebarMenu from './CustomSidebarMenu';


class NavigationDrawerStructure extends Component {
    toggleDrawer = () => {
      this.props.navigationProps.toggleDrawer();
    };
    render() {
      return (
        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            <Ionicons name="ios-menu" size={36} />
          </TouchableOpacity>
        </View>
      );
    }
}

const SearchService_StackNavigator = createStackNavigator({
    First: {
      screen: SearchserviceScreen,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#fff',
      }),
    },
});

const ScheduledBooking_StackNavigator = createStackNavigator({
    Second: {
      screen: ScheduledBookingScreen,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#fff',
      }),
    },
});

const Profile_StackNavigator = createStackNavigator({
    Third: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#fff',
      }),
    },
});

const Payment_StackNavigator = createStackNavigator({
    Forth: {
      screen: PaymentMethodScreen,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#fff',
      }),
    },
});

const SearchResult_StackNavigator = createStackNavigator({
  Fifth: {
    screen: SearchResult,
    navigationOptions: ({ navigation }) => ({
      title: '',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
    }),
  },
});

const ServicePage_StackNavigator = createStackNavigator({
  Sixth: {
    screen: ServiceScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
    }),
  },
});

const MapSearchResult_StackNavigator = createStackNavigator({
  Seventh: {
    screen: MapSearchResultScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
    }),
  },
});

const BookandAppoinment_StackNavigator = createStackNavigator({
  Eighth: {
    screen: BookandAppointmentScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
    }),
  },
});

const AddPayment_StackNavigator = createStackNavigator({
  Nineth:{
    screen: AddPaymentScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
    }),
  }, 
});

const PaymentDetail_StackNavigator = createStackNavigator({
  Tenth:{
    screen: PaymentDetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
    }),
  },
});

const MainNavigator = createDrawerNavigator(
    {
        SearchService: {
            screen: SearchService_StackNavigator,
        },
        ScheduledBooking: {
            screen: ScheduledBooking_StackNavigator,
        },
        Profile: {
            screen: Profile_StackNavigator,
        },
        PaymentMethod: {
            screen: Payment_StackNavigator,
        },
        SearchResult: {
            screen: SearchResult_StackNavigator
        },
        Service: {
          screen: ServicePage_StackNavigator
        },
        MapSearchResult: {
          screen: MapSearchResult_StackNavigator
        },
        BookandAppointment: {
          screen: BookandAppoinment_StackNavigator
        },
        AddPayment: {
          screen: AddPayment_StackNavigator
        },
        PaymentDetail: {
          screen: PaymentDetail_StackNavigator
        }
    },
    {
      contentComponent: CustomSidebarMenu,
      drawerWidth: Dimensions.get('window').width - 130,
    }
);

export default createAppContainer(MainNavigator);