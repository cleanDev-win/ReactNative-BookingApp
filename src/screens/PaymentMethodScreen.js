import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, AsyncStorage } from 'react-native';
import { PaymentCard } from "../components";
import * as colors from './../components/colors';
export default class PaymentMethodScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            cards: [
                {
                    id: "1",
                    cardType: 'Credit Card',
                    cardNum: '**** **** **** 2355'
                },
                {
                    id: "2",
                    cardType: 'Credit Card',
                    cardNum: '**** **** **** 3355'
                },
            ],
            status: ''
        }
        this.renderItem = this.renderItem.bind(this);
        this.handlePressCard = this.handlePressCard.bind(this);
    }
    _retrieveData = async () => {
        try {
        const value = await AsyncStorage.getItem('useCurrent');
        if (value !== null) {
            return value;
        }
        } catch (error) {
            return error;
        }
    };
    
    componentDidMount() {
        
    }

    handlePressCard(id) {
        console.log("row =>", id);
        console.log("status =>", this.state.status);
        let param = {
            id: id,
            status: this.state.status
        }
        this.props.navigation.navigate("Tenth", {param: param});
    }

    handleAddPayment() {
        console.log("status =>", this.state.status);
        let param = {
            status: this.state.status
        }
        this.props.navigation.navigate("Nineth", {param: param})
    }
    renderItem(row) {
        const { item, index } = row;
        return (
            <TouchableOpacity style={{flex: 1, width: '100%' }} key={item.id} onPress={(row)=>this.handlePressCard(item.id)}>
                <PaymentCard post={item} itemIdx={index} />
            </TouchableOpacity>
        )
    }

    render() {
        this._retrieveData().then(temp=> {
            console.log("currnet status => ", temp);
            this.state.status = temp;
        }
        )
        return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Payment Method</Text>
            <FlatList 
                style={{flex: 1}}
                data={this.state.cards}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => this.renderItem(item)}
            />
            <TouchableOpacity  onPress={this.handleAddPayment.bind(this)}>
                <Text style={styles.addText}>+ Add new one</Text>
            </TouchableOpacity>
        </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
        alignSelf: 'flex-start',
        fontFamily: 'AvenirNextDemiBold',
        color: colors.title
    },
    addText: {
        color: colors.primary,
        fontSize: 20,
        fontFamily: 'AvenirNextRegular'
    }
});