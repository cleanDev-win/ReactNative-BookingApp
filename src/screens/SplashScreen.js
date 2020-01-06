import React, { Component } from 'react';
import { View, Image, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken=='true'?'App':'SignIn');
    };

    componentDidMount() {
        this._bootstrapAsync();
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={require("../../assets/splash.png")}  />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        height: 200,
        width: 200
    }
});
