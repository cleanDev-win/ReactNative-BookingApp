import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as colors from './../components/colors';
export default class PaymentCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { cardType, cardNum } = this.props.post;
        return (
            <View style={styles.container}>
                <Ionicons name="md-card" size={32} color={colors.mainText} />
                <View style={styles.cardLabel}>
                    <Text style={[styles.lblStyle, {paddingRight: 10}]}>{cardType}</Text>
                    <Text style={styles.lblStyle}>{cardNum}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        flexDirection:'row',
        alignItems: 'center',
        width: '95%',
        elevation: 6,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        shadowOffset: {
        height: 1,
        width: 1,
        },
        margin: 10
    },

    cardLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    lblStyle: {
        fontSize: 18,
        color: colors.mainText,
        fontFamily: 'AvenirNextRegular'
    }
    
})