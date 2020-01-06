import React, { Component } from 'react';
import { View, 
        Text,
        StyleSheet, 
        TouchableOpacity, 
        Vibration, 
        Alert, 
        ActivityIndicator,
        KeyboardAvoidingView,
        Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as colors from '../components/colors';
import {Snackbar} from 'react-native-paper';
import {API_URL} from './../config';
import {TextField} from 'react-native-material-textfield';
export default class ConfirmEmailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pinCode: '',
            displaySnackbar: false,
            errorMsg: '',
            loading: false,
            currentStatus: '',
            uidb64: '',
            email:''
        }
        this.handleContinue = this.handleContinue.bind(this);
    }

    componentDidMount() {
        const {status,email} = this.props.navigation.state.params;
        this.setState({currentStatus: status, email: email});
    }
    handleContinue() {
        this.setState({loading: true});
        console.log("pin code=>",this.state.pinCode);
        let url;
        if(this.state.currentStatus== 'signup')  {
            url = `${API_URL}/client/confirm_account/`;
        }else {
            url = `${API_URL}/users/validate_pin_code/`;
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                pin_code: this.state.pinCode
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache'
        })
        .catch(err=>{
            console.log(err);
        })
        .then(res=>res.json())
        .then(result=>{
            if(result.status == "0") {
                this.setState({loading: false});
                Alert.alert(
                    "SUCCESS",
                    "Your email is confirmed successfully.",
                    [ 
                        {text: 'OK', onPress: ()=>this.state.currentStatus=='signup'?this.props.navigation.navigate("SignIn"):this.props.navigation.navigate("ResetPassword", {uidb64: result.uidb64})}
                    ],
                    { cancelable: false}
                );
            }else {
                this.setState({loading: false});
                this.triggerSnackbar('Operation failed.');
            }
        })
    }

    handleResendPinCode() {
        this.setState({loading: true});
        let url = `${API_URL}/client/request_pin/`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache'
        })
        .catch(err=>{
            console.log(err);
        })
        .then(res=>res.json())
        .then(result=>{
            if(result.status == "success") {
                this.setState({loading: false});
                Alert.alert(
                    "SUCCESS",
                    "We just sent another pin code to your email address.",
                    [
                        {text: 'OK'}
                    ],
                    { cancelable: false}
                );
            }else {
                this.setState({loading: false});
                this.triggerSnackbar('Operation failed.');
            }
        })
    }

    triggerSnackbar(msg) {
        Vibration.vibrate();
        this.setState({
            displaySnackbar: true,
            errorMsg: msg
        })
    }

    resetSnackbar() {
        this.setState({
            displaySnackbar: false,
            errorMsg: ''
        })
    }
    render() {
        const {pinCode, loading} = this.state;        
        return(
            // <KeyboardAvoidingView
            //     behavior={Platform.OS==='ios'?padding: false}
            //     enableOnAndroid={true}
            //     enableAutomaticScroll={true}
            //     keyboardOpeningTime={0}
            //     style={styles.mainContainer}
            // >
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Ionicons name="md-arrow-back" color={colors.title} style={{fontSize: 32, fontFamily: 'AvenirNextDemiBold', paddingRight: 10}}/>
                    <Text style={styles.input}>Back</Text>
                </TouchableOpacity>
                <KeyboardAvoidingView
                                behavior={Platform.OS==='ios'?'padding':false}
                                enableOnAndroid={true}
                                enableAutomaticScroll={true}
                                keyboardOpeningTime={0}
                                style={styles.container}
                >
                    <Ionicons name="md-mail" size={56} color={colors.primary} style={styles.img} /> 
                    <Text style={styles.title}>Confirm Your Email</Text>
                    <Text style={styles.desc}>
                        We sent pin code to your email.{"\n"}
                        Please check your email and enter the pin code to confirm your email.
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextField 
                            style={styles.input}
                            value={this.state.pinCode}
                            keyboardType={'numeric'}
                            label="PIN CODE"
                            onChangeText={(text)=>{this.setState({pinCode: text})}}
                            baseColor={colors.mainText}
                            tintColor={colors.primary}
                        />
                    </View>
                    {
                        this.state.currentStatus != 'signup' &&
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.normalTxt}>Did not receive pin code?</Text>
                            <TouchableOpacity onPress={this.handleResendPinCode.bind(this)}>
                                <Text style={[styles.normalTxt, {fontWeight: 'bold', paddingLeft: 10}]}>Resend pin code</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    
                </KeyboardAvoidingView>
                <TouchableOpacity style={pinCode?styles.continueBtn:styles.disableBtn} onPress={this.handleContinue} disabled={!pinCode || loading}>
                    {
                        loading?<ActivityIndicator size="small" color={colors.white} />
                        :<Text style={styles.continueText}>Continue</Text>
                    }
                </TouchableOpacity>
                <Snackbar
                    visible={this.state.displaySnackbar}
                    onDismiss={()=>this.resetSnackbar()}
                    duration={2500}
                >
                    {this.state.errorMsg}
                </Snackbar>
            </View>
            // </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    title: {
        fontSize: 32,
        color: colors.title,
        paddingBottom: 20,
        fontFamily: 'AvenirNextDemiBold'
    },
    desc: {
        fontSize: 16,
        color: colors.mainText,
        paddingBottom: 30,
        fontFamily: 'AvenirNextRegular'
    },
    normalTxt: {
        fontSize: 16,
        color: colors.mainText,
        fontFamily: 'AvenirNextRegular'
    },
    img: {
        width: 60,
        height: 60
    },
    inputContainer: {
        width:  '100%',
        marginTop: 20
    },
    input: {
        fontSize: 18,
        fontFamily: 'AvenirNextRegular',
    },
    continueBtn: {
        height: 70,
        backgroundColor: colors.btn,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    disableBtn: {
        height: 70,
        backgroundColor: `${colors.btn}90`,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    continueText: {
        fontSize: 22,
        color: colors.white,
        fontFamily: 'AvenirNextDemiBold'
    },
    backBtn: {
        paddingTop: 30, 
        flexDirection: 'row',
        alignItems: 'center'
    }
})