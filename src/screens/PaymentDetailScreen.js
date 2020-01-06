import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import * as colors from './../components/colors';
export default class PaymentDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            cardName: 'Visa Payment Details',
            cardNum: '1453-2353-2353-2321',
            expDate: '02/2020',
            cVV: '***',
            zip_postal: '12412',
            isSaved: false
        }
    }
    
    componentDidMount() {
        
    }

    handleSavePayment() {
        let temp = this.state.isSaved;
        temp = !temp;
        this.setState({ isSaved: temp });
    }

    _removeData = async () => {
        try {
          await AsyncStorage.setItem('useCurrent', 'no');
        } catch (error) {
          console.log(error);
        }
    }

    handleUse() {
        this._removeData().then(
            this.props.navigation.navigate("PaySuccess")
        );
    }

    handleDelete() {
        this._removeData().then(
            this.props.navigation.navigate("Forth")
        )
    }

    render() {
        const {state} = this.props.navigation;
        console.log("final=>",state);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Payment Method Details</Text>
                <View style={styles.itemContainer}>
                    <Text style={styles.lblStyle}>CARD NAME</Text>
                    <TextInput 
                        style={styles.input}
                        value={this.state.cardName}
                        placeholder="Card Name"
                        autoCapitalize={"none"}
                        editable={false}
                    />
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.lblStyle}>CARD NUMBER</Text>
                    <TextInput 
                        style={styles.input}
                        value={this.state.cardNum}
                        keyboardType={'numeric'}
                        placeholder="Card Number"
                        editable={false}
                    />
                </View>
                <View style={[styles.itemContainer, {flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}]}>
                    <View style={styles.smallItemContainer}>
                        <Text style={styles.lblStyle}>EXP.DATE</Text>
                        <TextInput 
                            style={styles.input}
                            value={this.state.expDate}
                            placeholder="Exp.Date"
                            editable={false}
                        />
                    </View>
                    <View style={[styles.smallItemContainer, {paddingLeft: 25}]}>
                        <Text style={styles.lblStyle}>CVV</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.cVV}
                            autoCapitalize={"none"}
                            placeholder="CVV"
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.lblStyle}>ZIP/POSTAL CODE</Text>
                    <TextInput 
                        style={styles.input}
                        value={this.state.zip_postal}
                        keyboardType={'numeric'}
                        placeholder="Zip Code"
                        editable={false}
                    />
                </View>
                { state.params.param.status == "yes" &&
                <TouchableOpacity style={styles.payBtn} onPress={this.handleUse.bind(this)}>
                    <Text style={styles.payTxt}>Pay</Text>
                </TouchableOpacity>
                }
                {state.params.param.status == "no" &&
                <TouchableOpacity style={styles.deleteBtn} onPress={this.handleDelete.bind(this)}>
                    <Text style={styles.deleteTxt}>Delete</Text>
                </TouchableOpacity>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 32,
        fontFamily: 'AvenirNextDemiBold',
        color: colors.title
    },
    addText: {
        color: '#3ae0e0',
        fontSize: 20
    },
    itemContainer: {
        // paddingTop: '15%',
        width: '100%'
    },
    lblStyle: {
        fontSize: 14,
        fontFamily: 'AvenirNextRegular',
        color: colors.mainText
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lightgrey,
        width: '100%',
        height: 60,
        fontSize: 18,
        fontFamily: 'AvenirNextRegular',
        color: colors.lightgrey
    },
    smallItemContainer: {
        width: '50%'
    },
    saveBtn: {
        paddingTop: 10, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    lblToggle: {
        fontSize: 20,
        paddingLeft: 15,
    },
    deleteBtn: {
        height: 60,
        backgroundColor: colors.white,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: colors.red,
    },
    deleteTxt: {
        fontSize: 22,
        color: colors.red,
        fontFamily: 'AvenirNextDemiBold'
    },
    payBtn: {
        height: 40,
        backgroundColor: colors.btn,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    payTxt: {
        fontSize: 22,
        color: colors.white,
        fontFamily: 'AvenirNextDemiBold'
    }

});