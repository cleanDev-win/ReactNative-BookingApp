import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration, ActivityIndicator, Platform, KeyboardAvoidingView } from 'react-native';
import {connect} from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import NetInfo from '@react-native-community/netinfo';
import * as colors from './../components/colors';
import {Snackbar} from 'react-native-paper';
import {signup} from './../store/actions/authAction';
import PasswordInputText from 'react-native-hide-show-password-input';
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";
class SignUpScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            email: '',
            password: '',
            confirm_pass: '',
            signuperror: '',
            displaySnackbar: false,
            netinfo: '',
            ava_email: true,
            ava_pass: true,
        }
        
    }
    
    componentDidMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({netinfo: isConnected});
        })
    }

    componentWillReceiveProps(nextProps) {
        const {signuperror} = this.props;
        if(nextProps.signuperror !== signuperror && nextProps.signuperror !== '') {
            this.triggerSnackbar(signuperror);
        }
    }

    validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false) {
            this.setState({email: text, signuperror: 'Please enter a valid email address', ava_email: false });
            return false;
        } else {
            this.setState({email: text, signuperror: '', ava_email: true });
        }
    }

    validatePassword = (text) => {
        this.setState({confirm_pass: text});
        const {password, confirm_pass} = this.state;
        if(password){
            if(password != text) {
                this.setState({ava_pass: false})
            }else{
                this.setState({ava_pass: true})
            }
        }
    }

    testGoogleAPI() {
        let url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=ElMxNjIsIExhbmUgTnVtYmVyIDcsIEJsb2NrIEgsIE5lYiBTYXJhaSwgU2FpbmlrIEZhcm0sIE5ldyBEZWxoaSwgRGVsaGkgMTEwMDYyLCBJbmRpYQ&key=AIzaSyCXx89ym1OwNSjnaLec7kB1gXkn5qEVjhg';
        axios.post(url, {})         
            .then(async (result)=>{
                console.log(result.data);
            });
    }
    attemptSignUp() {
        if(this.state.netinfo == 'offline') {
            this.triggerSnackbar('No internet connection. Please check your network status.');
        }else {
            this.handleSignUp();
        }
    }

    async handleSignUp() {
        let authData = {};
        authData = {
            email: this.state.email,
            password: this.state.password
        }
        await this.props.onSignUp(authData);
    }

    triggerSnackbar(msg) {
        Vibration.vibrate();
        this.setState({
            displaySnackbar: true,
            signuperror: msg
        })
    }

    resetSnackbar() {
        this.setState({
            displaySnackbar: false,
            signuperror: ''
        })
    }

    render() {
        const {email, password, confirm_pass, ava_email, ava_pass} = this.state;
        const {registering} = this.props;
        return (
            // <KeyboardAvoidingView
            //     behavior={Platform.OS==='ios'?padding:false}
            //     enableOnAndroid={true}
            //     enableAutomaticScroll={true}
            //     keyboardOpeningTime={0}
            //     style={styles.container}
            // >
                <View style={styles.container}>
                    <View style={{flexDirection: 'row', paddingTop: 30, alignItems: 'center'}}>
                        <TouchableOpacity style={styles.backBtnStyle} onPress={() => this.props.navigation.navigate('SignIn')}>
                            <Ionicons name="md-arrow-back" color={colors.title} style={{fontSize: 32, fontFamily: 'AvenirNextDemiBold'}}/>
                        </TouchableOpacity>
                        <Text style={styles.title}>
                            Sign Up
                        </Text>
                    </View>
                    <KeyboardAvoidingView
                        behavior={Platform.OS==='ios'?padding:false}
                        enableOnAndroid={true}
                        enableAutomaticScroll={true}
                        keyboardOpeningTime={0}
                        style={{width: '100%'}}>
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
                                tintColor={ava_email?colors.primary:colors.red}
                            />
                            {
                                email?
                                <Text style={styles.error_text}>{this.state.signuperror}</Text>
                                :<Text></Text>
                            }
                        </View>
                        <View style={styles.inputContainer}>
                            <PasswordInputText
                                style={styles.input}
                                value={this.state.password}
                                secureTextEntry={true}
                                label="PASSWORD"
                                autoCapitalize={"none"}
                                onChangeText={(text)=>{this.setState({password: text})}}
                                baseColor={colors.mainText}
                                tintColor={colors.primary}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <PasswordInputText
                                style={styles.input}
                                value={this.state.confirm_pass}
                                secureTextEntry={true}
                                label="CONFIRM PASSWORD"
                                autoCapitalize={"none"}
                                onChangeText={(text)=>{this.validatePassword(text)}}
                                tintColor={colors.primary}
                                baseColor={ava_pass?colors.mainText:colors.red}
                            />
                            {
                                (password && confirm_pass && (password != confirm_pass))?
                                <Text style={styles.error_text}>Password does not match</Text>
                                :<Text></Text>
                            }
                        </View>
                    </KeyboardAvoidingView>
                    <TouchableOpacity style={email&&password&&ava_email&&confirm_pass&&ava_pass?styles.signUpBtn:styles.disableBtn} onPress={ this.attemptSignUp.bind(this)} disabled={ !password || !confirm_pass || !ava_email || !ava_pass || registering}>
                    {
                        registering ? (
                            <ActivityIndicator size="small" color={colors.white} />
                        ):<Text style={styles.signUpText}>Sign Up</Text>
                    }
                    </TouchableOpacity>
                    <Snackbar
                        visible={this.state.displaySnackbar}
                        onDismiss={()=>this.resetSnackbar()}
                        duration={2500}
                    >
                        {this.props.signuperror?this.props.signuperror:this.state.signuperror}
                    </Snackbar>
                </View>
        // </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 32,
        fontFamily: 'AvenirNextDemiBold',
        color: colors.title
    },
    inputContainer: {
        marginBottom: 10,
        width:'100%'
    },
    input: {
        fontSize: 18,
        fontFamily: 'AvenirNextRegular',
    },
    signUpBtn: {
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
    signUpText: {
        fontSize: 22,
        color: colors.white,
        fontWeight: 'bold',
        fontFamily: 'AvenirNextDemiBold'
    },
    error_text: {
        fontSize: 14,
        color: colors.red
    },
    backBtnStyle: {
        paddingRight: 20,
    },
});

const mapStateToProps = state => {
    return {
        signuperror: state.AuthReducer.signuperror,
        registering: state.AuthReducer.registering
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (authData) => {
            dispatch(signup(authData));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpScreen)