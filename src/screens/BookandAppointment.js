import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  ScrollView, FlatList, AsyncStorage } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import * as colors from './../components/colors';
export default class BookandAppointmentScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
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
                },
                {
                    id: 7,
                    time: '10 - 11 am'
                },
                {
                    id: 8,
                    time: '11 - 12 am'
                },
                {
                    id: 9,
                    time: '01 - 02 pm'
                },
                {
                    id: 10,
                    time: '02 - 03 pm'
                },
                {
                    id: 11,
                    time: '03 - 04 pm'
                },
                {
                    id: 12,
                    time: '04 - 05 pm'
                }
            ],
            ava_times:[]
        }
    }

    renderItem = ({item}) => {
        return (
            // <TouchableOpacity key={item.id} style={[styles.ava_item, {borderColor: this.selected?'#3ae0e0':'lightgrey'}]} onPress={()=>this.handleAvailability(item)}>
            <View style={[styles.ava_item, {borderColor: this.selected?colors.primary:colors.lightgrey}]}>
                <Text style={{color: this.selected, fontFamily: 'AvenirNextRegular'}}>{item.time}</Text>
            </View>
            // </TouchableOpacity>
        )
    };

    handleAvailability(item) {
        let temp = [];
        temp.push(item.id);
        console.log("item=>", item.id);
        
    }
    
    handleSelectDate = (date) => {
        console.log("date=>", date);
    };

    _storeData = async () => {
        try {
          await AsyncStorage.setItem('useCurrent', 'yes');
        } catch (error) {
          
        }
    };

    handleBook() {
        this._storeData().then(
            this.props.navigation.navigate("Forth", {prev_route: 'book'})
        );
    }
    
    render() {
        const { availability } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={{backgroundColor: 'white', padding: 20}}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Book And Appointment</Text>
                    </View>
                    <CalendarStrip 
                        style={styles.calendar}
                        calendarAnimation={{ type: 'sequence', duration: 30 }}
                        daySelectionAnimation={{type: 'background', duration: 200}}
                        highlightDateNumberStyle={{color: colors.primary, textDecorationLine: 'underline' }}
                        highlightDateNameStyle={{color: colors.primary}}
                        disabledDateNameStyle={{color: colors.lightgrey}}
                        disabledDateNumberStyle={{color: colors.lightgrey}}
                        calendarColor={colors.white}
                        onDateSelected={(date)=>this.handleSelectDate(date)}
                    />
                </View>
                
                <View style={{width: '100%', marginBottom: 20, marginTop: 20}}>
                    <Text style={styles.itemTitle}>Available Times</Text>
                    <View style={styles.card}>
                        <FlatList 
                            data={availability}
                            style={styles.ava_container}
                            renderItem={this.renderItem}
                            keyExtractor={item=>item.id}
                            showsVerticalScrollIndicator={false}
                            numColumns={3}
                        />
                    </View>
                </View>
                <View style={{padding: 20}}>
                    <TouchableOpacity style={styles.bookBtn} onPress={ this.handleBook.bind(this) }>
                        <Text style={styles.bookText}>Book</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'baseline',
        backgroundColor: '#eef0ed',
        paddingBottom: 20,
        width: '100%',
    },
    title: {
        fontSize: 32,
        fontFamily: 'AvenirNextDemiBold',
        color: colors.title
    },
    titleContainer: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    itemTitle:{
        fontSize: 20,
        color: colors.mainText,
        marginLeft: 20,
        fontFamily: 'AvenirNextRegular'
    },
    card: {
        flex: 1,
        alignSelf: 'baseline',
        width: '100%',
        padding: 20,
    },
    ava_container: {
        flex: 1
    },
    ava_item: {
        borderWidth: 1,
        margin: 5,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        height: 35,
        backgroundColor: colors.white
    },
    bookBtn: {
        height: 70,
        backgroundColor: colors.btn,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    bookText: {
        fontSize: 22,
        color: colors.white,
        fontWeight: 'bold',
        fontFamily: 'AvenirNextRegular'
    },
})