import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ScheduleCard } from "../components";
import * as colors from './../components/colors';
export default class ScheduledBookingScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            schedules: [
                {
                    "id": "1",
                    "service": "Massage Therapy",
                    "name": "Myrtie Wolfe",
                    "clinic": "First Clinic",
                    "date": "July 24, 2019 ar 3 : 00 pm",
                    "status": "Processing",
                    "photoUrl": ""
                },
                {
                    "id": "2",
                    "service": "Physiotherapy",
                    "name": "Myrtie Wolfe",
                    "clinic": "Second Clinic",
                    "date": "July 24, 2019 ar 3 : 00 pm",
                    "status": "Confirmed",
                    "photoUrl": ""
                },
                {
                    "id": "3",
                    "service": "Reception",
                    "name": "Myrtie Wolfe",
                    "clinic": "Third Clinic",
                    "date": "July 24, 2019 ar 3 : 00 pm",
                    "status": "Processing",
                    "photoUrl": ""
                },
                {
                    "id": "4",
                    "service": "Additional",
                    "name": "Myrtie Wolfe",
                    "clinic": "Fourth Clinic",
                    "date": "July 24, 2019 ar 3 : 00 pm",
                    "status": "Confirmed",
                    "photoUrl": ""
                },
            ]
        }
       
    }
    
    componentDidMount() {

    }

    renderItem(row) {
        const { item, index } = row;
        return <ScheduleCard post={item} itemIdx={index} />
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Scheduled Bookings</Text>
                </View>
                
                <FlatList
                    data={this.state.schedules}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.renderItem.bind(this)}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f1f1f1",
    },
    title: {
        fontSize: 32,
        color: colors.title,
        fontFamily: 'AvenirNextDemiBold',
    },
    titleContainer: {
        marginBottom: 30,
    },
});