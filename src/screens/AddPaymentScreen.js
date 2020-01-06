import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { TextField } from 'react-native-material-textfield';
import * as colors from './../components/colors';
export default class AddPaymentScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            cardName: '',
            cardNum: '',
            expDate: '',
            cVV: '',
            zip_postal: '',
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

    handleAddPayment() {
        this.props.navigation.navigate("Forth");
    }

    render() {
        const {state} = this.props.navigation;
        return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Details</Text>
            <View style={styles.itemContainer}>
                <TextField 
                    style={styles.input}
                    value={this.state.cardName}
                    label="Card Name"
                    autoCapitalize={"none"}
                    onChangeText={(text)=>{this.setState({cardName: text})}}
                    baseColor={colors.mainText}
                    tintColor={colors.primary}
                />
            </View>
            <View style={styles.itemContainer}>
                <TextField 
                    style={styles.input}
                    value={this.state.cardNum}
                    keyboardType={'numeric'}
                    label="Card Number"
                    onChangeText={(text)=>{this.setState({cardNum: text})}}
                    baseColor={colors.mainText}
                    tintColor={colors.primary}
                />
            </View>
            <View style={[styles.itemContainer, {flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}]}>
                <View style={styles.smallItemContainer}>
                    <DatePicker
                        style={{ width: '100%', marginTop: 15 }}
                        date={this.state.expDate}
                        mode="date"
                        placeholder="MM/YYYY"
                        format="YYYY/MM"
                        minDate="2000-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                            dateInput: {
                                borderColor: 'white',
                                borderBottomColor: colors.lightgrey,
                                borderBottomWidth: 1,
                                height: 60
                            },
                            placeholderText: {
                                fontSize: 18,
                                alignSelf:'flex-start',
                                fontFamily: 'AvenirNextRegular'
                            },
                            dateText: {
                                fontSize: 18,
                                alignSelf:'flex-start',
                                fontFamily: 'AvenirNextRegular'
                            }
                        }}
                        onDateChange={(date) => {this.setState({expDate: date})}}
                    />
                </View>
                <View style={[styles.smallItemContainer, {paddingLeft: 25}]}>
                    <TextField
                        style={styles.input}
                        value={this.state.cVV}
                        autoCapitalize={"none"}
                        label="CVV"
                        secureTextEntry={true}
                        onChangeText={(text)=>{this.setState({cVV: text})}}
                        baseColor={colors.mainText}
                        tintColor={colors.primary}
                    />
                </View>
            </View>
            <View style={styles.itemContainer}>
                <TextField 
                    style={styles.input}
                    value={this.state.zip_postal}
                    keyboardType={'numeric'}
                    label="Zip Code"
                    onChangeText={(text)=>{this.setState({zip_postal: text})}}
                    baseColor={colors.mainText}
                    tintColor={colors.primary}
                />
            </View>
            { state.params.param.status == "yes" &&
            <View style={styles.itemContainer}>
                <TouchableOpacity onPress={this.handleSavePayment.bind(this)} style={styles.saveBtn}>
                    <View style={{backgroundColor: this.state.isSaved ? colors.primary : colors.white, borderWidth: 1, borderColor: this.state.isSaved?'#3ae0e0':'lightgrey', borderRadius: 50, width: 20, height: 20}}>
                    </View>
                    <Text style={[{ color: this.state.isSaved ? colors.primary : colors.mainText}, styles.lblToggle]}>Save Payment Method</Text>
                </TouchableOpacity>
            </View>
            }
            { state.params.param.status == "yes" &&
            <TouchableOpacity style={styles.payBtn} onPress={()=> this.props.navigation.navigate("PaySuccess") }>
                <Text style={styles.payTxt}>Pay $50</Text>
            </TouchableOpacity>
            }
            { state.params.param.status == "no" &&
            <TouchableOpacity style={styles.payBtn} onPress={this.handleAddPayment.bind(this)}>
                <Text style={styles.payTxt}>Add Payment</Text>
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
        color: colors.title,
        fontFamily: 'AvenirNextDemiBold'
    },
    addText: {
        color: '#3ae0e0',
        fontSize: 20
    },
    itemContainer: {
        marginTop: 15,
        width: '100%'
    },
    lblStyle: {
        fontSize: 14,
        fontFamily: 'AvenirNextRegular'
    },
    input: {
        fontSize: 18,
        fontFamily: 'AvenirNextRegular',
        color: colors.mainText
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
        fontFamily: 'AvenirNextRegular'
    },
    payBtn: {
        height: 60,
        backgroundColor: colors.btn,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    payTxt: {
        fontSize: 22,
        color: colors.white,
        fontWeight: 'bold',
        fontFamily: 'AvenirNextDemiBold'
    }
});