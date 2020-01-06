import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration, ActivityIndicator, Platform, KeyboardAvoidingView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import * as colors from './../components/colors';
import {API_URL} from './../config';
import {Snackbar} from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
export default class ForgetPasswordScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            email: '',
            displaySnackbar: false,
            errorMsg: '',
            errorSendMsg: '',
            loading: false
        }
    }
    
    componentDidMount() {

    }

    triggerSnackbar(msg) {
        Vibration.vibrate();
        this.setState({
            displaySnackbar: true,
            errorSendMsg: msg,
            ava_send: false
        })
    }

    resetSnackbar() {
        this.setState({
            displaySnackbar: false,
            errorSendMsg: ''
        })
    }

    validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(reg.test(text) === false) {
            this.setState({email: text, errorMsg: 'Please enter a valid email address', ava_send: false});
            return false;
        } else {
            this.setState({email: text, errorMsg: '', ava_send: true})
        }
    }

    handlePress() {
        this.setState({loading: true});
        let url = `${API_URL}/users/forgot_password/`; 
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
        .catch(err => {
            console.log(err);
        })
        .then(res => res.json())
        .then(result => {
            if(result.status == "0") {
                this.setState({loading: false});
                this.triggerSnackbar('Operation success');
                this.props.navigation.navigate("ConfirmEmail", {status: 'resetpassword', email: this.state.email});
            }else{
                this.setState({loading: false});
                this.triggerSnackbar('Operation failed.')
            }
        })
    }

    render() {
        const {email, errorMsg, ava_send, loading} = this.state;
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS==='ios'?'padding':false}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                keyboardOpeningTime={0}
                style={styles.container}
            >
                <View style={styles.titleContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style={styles.backBtnStyle} onPress={() => this.props.navigation.navigate('SignIn')}>
                        <Ionicons name="md-arrow-back" color={colors.title} style={{fontSize: 32, fontFamily: 'AvenirNextDemiBold'}}/>
                        </TouchableOpacity>
                        <Text style={styles.title}>
                            Forgot Password?
                        </Text>
                    </View>
                    <Text style={styles.desc}>
                        Type your email we will send link to reset password
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextField 
                        style={styles.input}
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        value={this.state.email}
                        label="EMAIL"
                        onChangeText={(text)=>{this.validateEmail(text)}}
                        autoCapitalize={"none"}
                        baseColor={colors.mainText}
                        tintColor={ava_send?colors.primary:colors.red}
                    />
                    {
                        email?
                        <Text style={styles.error_text}>{errorMsg}</Text>
                        :<Text></Text>
                    }
                </View>
                <TouchableOpacity style={email&&ava_send?styles.sendBtn:styles.disableBtn} onPress={ this.handlePress.bind(this)} disabled={!email || !ava_send || loading}>
                    {
                        loading?(
                            <ActivityIndicator size="small" color={colors.white} />
                        ):<Text style={styles.sendText}>Send</Text>
                    }
                </TouchableOpacity>
                <Snackbar
                    visible={this.state.displaySnackbar}
                    onDismiss={()=>this.resetSnackbar()}
                    duration={2500}
                >
                    {this.state.errorSendMsg}
                </Snackbar>
            {/* </View> */}
        </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        paddingTop: 30,
        width: '100%'
    },  
    title: {
        fontSize: 32,
        fontFamily: 'AvenirNextDemiBold',
        color: colors.title
    },
    desc: {
        paddingTop: 20,
        fontSize: 16,
        fontFamily: 'AvenirNextRegular',
        color: colors.title
    },
    inputContainer: {
        width: '100%'
    },
    input: {
        fontFamily: 'AvenirNextRegular',
        fontSize: 18
    },
    error_text: {
        fontSize: 14,
        color: colors.red
    },
    sendBtn: {
        height: 70,
        backgroundColor: colors.btn,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    disableBtn: {
        height: 70,
        backgroundColor: `${colors.btn}90`,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    sendText: {
        fontSize: 22,
        color: colors.white,
        fontFamily: 'AvenirNextDemiBold'
    },
    backBtnStyle: {
        paddingRight: 20,
    },
});