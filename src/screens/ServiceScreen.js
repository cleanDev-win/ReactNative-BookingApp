import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-ratings';
import MapView from 'react-native-maps';
import * as colors from './../components/colors';


export default class ServiceScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            id: "1",
            service: "Massage Therapy",
            name: "Myrtie Wolfe",
            clinic: "First Clinic",
            availability: [
                {
                    id: 1,
                    time: '10 - 11 am'
                },
                {
                    id: 2,
                    time: '11 - 12 am'
                },
                {
                    id: 3,
                    time: '01 - 02 pm'
                },
                {
                    id: 4,
                    time: '02 - 03 pm'
                },
                {
                    id: 5,
                    time: '03 - 04 pm'
                },
                {
                    id: 6,
                    time: '04 - 05 pm'
                }
            ],
            distance: "2",
            rating: 5,
            hourlyRate: 40,
            photoUrl: "",
            overview: "Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor.",
            location: "390 Wyman Pike, Los Angeles, CA",
            photoUrl: "",
            selected: false,
            reviews: [
                {
                    id: "1",
                    name : "Austin Hunt",
                    date: "02/01/2019",
                    rating: 5,
                    photoUrl:'',
                    feedback: "Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor."
                },
                {
                    id: "2",
                    name: "Virginia Pierce",
                    date: "02/01/2019",
                    rating: 5,
                    photoUrl: '',
                    feedback: "Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor."
                }
            ],
        }

        this.handleAvailability = this.handleAvailability.bind(this);
    }

    renderItem = ({item}) => {
        return (
            <View key={item.id} style={[styles.ava_item, {borderColor: this.selected?colors.primary:colors.lightgrey}]} onPress={()=>this.handleAvailability(item)}>
                <Text style={{color: this.selected, fontFamily: 'AvenirNextRegular'}}>{item.time}</Text>
            </View>
        )
    };

    handleAvailability(item) {
        
    }

    renderReview = ({item}) => {
        return (
            <View key={item.id} style={styles.reviewCardContainer}>
                <View style={styles.reviewCard_avatarContainer}>
                    <View style={styles.reviewCard_avatarText}>
                        <Image style={styles.reviewCard_avatarImage} source={item.photoUrl?{uri: item.photoUrl}:require("./../../assets/profile-blank.png")} />
                        <View style={{flexDirection: 'column', marginLeft: 10}}>
                            <Text style={styles.reviewCard_name}>{item.name}</Text>
                            <Text style={styles.reviewCard_date}>{item.date}</Text>
                        </View>
                    </View>
                    <AirbnbRating 
                        count={5}
                        defaultRating={item.rating}
                        size={12}
                        selectedColor={colors.primary}
                        showRating={false}
                        isDisabled={true}
                    />
                </View>
                <View style={styles.reviewCard_feedbackContainer}>
                    <Text style={styles.reviewCard_feedback}>{item.feedback}</Text>
                </View>
            </View>
        )
    };
    
    render() {
        const { service, hourlyRate, name, clinic, distance, overview, availability, location, photoUrl, rating, reviews } = this.state;
        const { param } = this.props.navigation.state.params;
        console.log("test ==> ", param);
        return (
            <ScrollView style={styles.container}>
                <View style={styles.service}>
                    <Text style={styles.title}>{service}</Text>
                    <Text style={styles.hourlyRate}>${hourlyRate}</Text>
                </View>
                <View style={styles.avatarContainer}>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.itemFont}>{clinic}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Ionicons name="ios-pin" size={20} style={{color: colors.mainText, paddingRight: 10}} />
                            <Text style={styles.itemFont}>{distance} km</Text>
                        </View>
                    </View>
                    <Image style={styles.avatar} source={photoUrl?{uri: photoUrl}:require("./../../assets/profile-blank.png")} />
                </View>
                <TouchableOpacity style={styles.bookBtn} onPress={()=>this.props.navigation.navigate("BookandAppointment") }>
                    <Text style={styles.bookText}>Book</Text>
                </TouchableOpacity>
                <View style={styles.overview}>
                    <Text style={styles.itemTitle}>Overview</Text>
                    <View style={styles.card}>
                        <Text style={{fontFamily: 'AvenirNextRegular', color: colors.lightgrey}}>{overview}</Text>
                    </View>
                </View>
                <View style={{width: '100%', marginBottom: 20}}>
                    <Text style={styles.itemTitle}>Availability</Text>
                    <View style={styles.card}>
                        <FlatList 
                            data={availability}
                            style={styles.ava_container}
                            renderItem={this.renderItem}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item=>item.id}
                            numColumns={3}
                        />
                    </View>
                </View>
                <View style={styles.review}>
                    <Text style={styles.itemTitle}>Reviews</Text>
                    <View style={styles.reviewContainer}>
                        <View style={{flexDirection: 'row', marginRight: 20, marginLeft: 20}}>
                            <Text style={{fontSize: 18, fontFamily: 'AvenirNextRegular'}}>5.0 (2 reviews)</Text>
                        </View>
                        <AirbnbRating 
                            count={5}
                            defaultRating={rating}
                            size={15}
                            selectedColor={colors.primary}
                            showRating={false}
                            isDisabled={true}
                        />
                    </View>
                </View>
                <FlatList 
                    data={reviews}
                    style={{flex: 1}}
                    renderItem={this.renderReview}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item=>item.id}
                />
               
                <View style={styles.location}>
                    <Text style={styles.itemTitle}>Loation</Text>
                    <View style={styles.mapview}>
                        <Text style={styles.locationTxt}>{location}</Text>
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                            }}
                        />
                    </View>
                </View>
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'baseline',
        backgroundColor: colors.white,
        padding: 20,
        width: '100%',
    },
    title: {
        fontSize: 32,
        fontFamily: 'AvenirNextRegular',
        color: colors.title
    },
    service: {
        flexDirection: 'row',
        flexWrap:'wrap', 
        justifyContent:'space-between', 
        marginBottom: 20
    },
    avatarContainer: {
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    name: {
        fontSize: 18,
        fontFamily: 'AvenirNextRegular',
        color: colors.mainText
    },
    itemFont: {
        fontSize: 16,
        color: colors.mainText,
        fontFamily: 'AvenirNextRegular'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hourlyRate: {
        color: colors.primary,
        fontSize: 24,
        fontFamily: 'AvenirNextRegular'
    },
    bookBtn: {
        height: 60,
        backgroundColor: colors.btn,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20
    },
    bookText: {
        fontSize: 22,
        color: colors.white,
        fontWeight: 'bold',
        fontFamily: 'AvenirNextDemiBold'
    },
    itemTitle:{
        fontSize: 22,
        color: colors.mainText,
        marginBottom: 10,
        marginLeft: 20,
        fontFamily: 'AvenirNextRegular'
    },
    card: {
        flex: 1,
        alignSelf: 'baseline',
        backgroundColor: colors.white,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection:'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 3,
    },
    ava_container: {
        flex: 1
    },
    ava_item: {
        borderWidth: 1,
        margin: 3,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        height: 35
    },
    ava_text: {
        color: 'grey'
    },
    overview: {
        marginBottom: 20
    },
    review: {
        width: '100%',
        marginBottom: 20
    },
    reviewContainer: {
        flexDirection: 'row',
    },
    reviewCardContainer: {
        flex: 1,
        alignSelf: 'baseline',
        borderRadius: 5,
        margin: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 6,
        elevation: 3,
        borderColor: 'grey',
        marginBottom: 15
    },
    reviewCard_avatarContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between'
    },
    reviewCard_avatarImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    reviewCard_avatarText: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    reviewcard_name: {
        fontFamily: 'AvenirNextRegular'
    },
    reviewCard_date: {
        fontSize: 14,
        color: '#d7ded9',
        fontFamily: 'AvenirNextRegular'
    },
    reviewCard_feedbackContainer: {
        flex: 1,
        alignSelf: 'baseline',
    },
    reviewCard_feedback: {
        marginTop: 5,
        fontSize: 14,
        color: 'grey',
        fontFamily: 'AvenirNextRegular'
    },
    location: {
        width: '100%',
        marginBottom: 40
    },
    mapStyle: {
        width: '100%',
        height: 200
    },
    mapview: {
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        width: '100%',
        borderWidth: 1,
        borderColor: 'grey',
    },
    locationTxt: {
        fontSize: 18, 
        paddingTop: 10, 
        paddingBottom: 10,
        fontFamily: 'AvenirNextRegular',
        color: colors.mainText
    }
})