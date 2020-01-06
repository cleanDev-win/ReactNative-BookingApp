import React, { Component } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-ratings';
import * as colors from './../components/colors';

export default class SearchCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { clinic, practitioner, service, unavailableTimes } = this.props.post;
        return (
            <View style={styles.container}>
                <Image style={styles.avatar} source={practitioner.practitionerProfilePhoto?{uri: practitioner.practitionerProfilePhoto}:require("./../../assets/profile-blank.png")} />
                <View style={{ marginLeft: 20}}>
                    <Text style={styles.name}>{practitioner.practitionerName}</Text>
                    <Text style={styles.itemFont}>{clinic.clinicName}</Text>
                    <View style={styles.itemContainer}>
                        <Ionicons name="md-time" size={20} color={colors.lightgrey} />
                        {/* <Text style={[styles.itemFont, {paddingLeft: 10}]}>{unavailableTimes}</Text> */}
                    </View>
                    <View style={[styles.itemContainer, {paddingLeft: 2}]}>
                        <Ionicons name="md-pin" size={20} color={colors.lightgrey} />
                        {/* <Text style={[styles.itemFont, {paddingLeft: 12}]}>{distance}km</Text> */}
                    </View>
                    {/* <View style={{ flexDirection: 'row' }}>
                        <AirbnbRating 
                            count={5}
                            defaultRating={rating}
                            size={20}
                            showRating={false}
                            isDisabled={true}
                        />
                        <Text style={styles.hourlyRate}>${hourlyRate}</Text>
                    </View> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        paddingVertical: 15,
        flexDirection:'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0, 
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
        justifyContent: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    name: {
        fontSize: 24,
        fontFamily: 'AvenirNextRegular',
        color: colors.mainText
    },
    itemFont: {
        fontSize: 16,
        color: colors.lightgrey,
        fontFamily: 'AvenirNextRegular'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hourlyRate: {
        color: colors.primary,
        fontSize: 24,
        textAlign: 'right',
        paddingLeft: 40,
        fontFamily: 'AvenirNextRegular'
    }
})