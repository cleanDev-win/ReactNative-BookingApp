import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {  Ionicons  } from '@expo/vector-icons';
import * as colors from './../components/colors';
export default class PaySuccessScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            photoUrl: '',
            name: 'Myrtie Wolfe',
            clinic: 'Clinic name',
            availableTime: 'July 24, 2019 at 3:00 pm'
        }
    }
    
    componentDidMount() {

    }

    handleContinue() {
        this.props.navigation.navigate("App");
    }

    render() {
        return (
        <View style={styles.container}>
            <Image style={styles.img} source={require("../../assets/cong.png")}  />
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.cong_desc}>Your payment is complete with : </Text>
            <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={this.state.photoUrl?{uri:this.state.photoUrl}:require("../../assets/profile-blank.png")} />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.name}>{this.state.name}</Text>
                    <Text style={styles.clinic}>{this.state.clinic}</Text>
                    <View style={styles.ava_Container}>
                        <Ionicons name="md-time" size={18} color="grey" />
                        <Text style={styles.time}>{this.state.availableTime}</Text>
                    </View>
                </View>
                
            </View>
            <Text style={styles.desc}>
                Check your e-mail for confirmation and further instructions
            </Text>
            <TouchableOpacity style={styles.continueBtn} onPress={ this.handleContinue.bind(this) }>
                <Text style={styles.ContinueText}>Continue</Text>
            </TouchableOpacity>
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
    title: {
        fontSize: 32,
        color: colors.title,
        paddingBottom: 20,
        fontFamily: 'AvenirNextDemiBold'
    },
    cong_desc: {
        fontSize: 22,
        color: colors.mainText,
        paddingBottom: 30,
        fontFamily: 'AvenirNextRegular'
    },
    img: {
        width: 60,
        height: 60,
    },
    desc: {
        paddingTop: 30,
        fontSize: 18,
        color: colors.mainText,
        textAlign: 'center',
        fontFamily: 'AvenirNextRegular'
    },
    continueBtn: {
        height: 60,
        backgroundColor: colors.btn,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 30
    },
    ContinueText: {
        fontSize: 22,
        color: colors.white,
        fontFamily: 'AvenirNextDemiBold',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30, 
    },
    name: {
        fontSize: 18,
        fontFamily: 'AvenirNextRegular',
        color: colors.mainText
    },
    clinic: {
        fontSize: 16,
        color: colors.lightgrey,
        paddingTop: 3,
        fontFamily: 'AvenirNextRegular'
    },
    time: {
        fontSize: 16,
        color: colors.lightgrey,
        paddingLeft: 3,
        fontFamily: 'AvenirNextRegular'
    },
    ava_Container: {
        paddingTop: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});