import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { authLogout } from '../store/actions/authAction';
import * as colors from './../components/colors';
class CustomSidebarMenu extends Component {
    constructor() {
        super();
        this.items = [
            {
                navOptionThumb: 'md-search',
                navOptionName: 'Find Service',
                screenToNavigate: 'SearchService',
            },
            {
                navOptionThumb: 'md-bookmark',
                navOptionName: 'Scheduled Bookings',
                screenToNavigate: 'ScheduledBooking',
            },
            {
                navOptionThumb: 'md-person',
                navOptionName: 'Profile',
                screenToNavigate: 'Profile',
            },
            {
                navOptionThumb: 'md-card',
                navOptionName: 'Payment Method',
                screenToNavigate: 'PaymentMethod',
            },
        ];
    }

    logout = async() => {
        this.props.onLogout();
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate("SignIn");
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{width: '100%'}}>
                    { this.items.map((item, key) => (
                        <View  key={key}>
                            <TouchableOpacity style={styles.mainContainer} onPress={()=>this.props.navigation.navigate(item.screenToNavigate)} >
                                <View style={styles.icon}>
                                    <Ionicons name={item.navOptionThumb} size={24} style={styles.iconitem} />
                                </View>
                                <Text style={styles.lblstyle}>
                                    {item.navOptionName}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={styles.logoutContainer}>
                    <TouchableOpacity onPress={this.logout}>
                        <Text style={[styles.lblstyle, {color: colors.title}]}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
        paddingTop: 60,
    },
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    icon: {
        marginRight: 10,
        marginLeft: 20
    },
    lblstyle: {
        fontSize: 18,
        fontFamily: 'AvenirNextDemiBold',
        color: colors.grey
    },
    iconitem: {
        color: colors.primary,
        width:24, 
        height: 24
    },
    logoutContainer: {
        position:'absolute', 
        bottom: 80, 
        left: 20
    }
})

const mapStateToProps = state => {
    return {
        user: state.AuthReducer.user,
        is_authenticated: state.AuthReducer.is_authenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => {
            dispatch(authLogout());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomSidebarMenu)