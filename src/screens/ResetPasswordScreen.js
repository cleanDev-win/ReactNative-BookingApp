import React, { Component } from 'react';
import { View, 
        Text, 
        StyleSheet, 
        TouchableOpacity, 
        Vibration, 
        Alert, 
        KeyboardAvoidingView,
        Platform,
        ActivityIndicator } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
// import { TextField } from 'react-native-material-textfield';
import * as colors from '../components/colors';
import {Snackbar} from 'react-native-paper';
import {API_URL} from './../config';
export default class ResetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            confirmPassword: '',
            errorMsg: '',
            displaySnackbar: false,
            loading: false,
            uidb64: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {uidb64} = this.props.navigation.state.params;
        this.setState({uidb64: uidb64});
        console.log("reset password");
        console.log(uidb64);
        console.log(this.state.uidb64);
    }

    handleSubmit() {
        this.setState({loading: true});
        let url = `${API_URL}/users/reset_password/`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                uidb64: this.state.uidb64,
                password: this.state.newPassword
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
        .then(res=>res.json())
        .then(result => {
            console.log("result=>",result);
            if(result.status == "0") {
                this.setState({loading: false});
                Alert.alert(
                    "SUCCESS",
                    "Password is reset successfully.",
                    [
                        {text: 'OK', onPress: ()=>this.props.navigation.navigate("SignIn")}
                    ],
                    { cancelable: false}
                );
            } else {
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
        const {newPassword, confirmPassword, loading} = this.state;
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS==='ios'?'padding':false}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                keyboardOpeningTime={0}
                style={styles.container}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Reset Password
                    </Text>
                    <Text style={styles.desc}>
                        Please enter your new password.
                    </Text>
                </View>
                <View style={{width: '100%'}}>
                    <View style={styles.inputContainer}>
                        <PasswordInputText
                            style={styles.input}
                            value={this.state.newPassword}
                            secureTextEntry={true}
                            label="NEW PASSWORD"
                            autoCapitalize={'none'}
                            onChangeText={(text)=>this.setState({newPassword: text})}
                            baseColor={colors.mainText}
                            tintColor={colors.primary}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <PasswordInputText 
                            style={styles.input}
                            value={this.state.confirmPassword}
                            secureTextEntry={true}
                            label="CONFIRM PASSWORD"
                            autoCapitalize={'none'}
                            onChangeText={(text)=>{this.setState({confirmPassword: text})}}
                            baseColor={colors.mainText}
                            tintColor={colors.primary}
                        />
                        {
                            newPassword && confirmPassword && (newPassword != confirmPassword) ?
                            <Text style={styles.error_text}>Password does not match</Text>
                            :<Text></Text>
                        }
                    </View>
                </View>
                <TouchableOpacity style={newPassword&&confirmPassword&&newPassword==confirmPassword?styles.resetBtn:styles.disbledBtn} onPress={this.handleSubmit.bind(this)} disabled={!newPassword || !confirmPassword || newPassword != confirmPassword || loading}>
                    {
                        loading?<ActivityIndicator size="small" color={colors.white} />
                        :<Text style={styles.resetText}>Reset Password</Text>
                    }
                </TouchableOpacity>
                <Snackbar
                    visible={this.state.displaySnackbar}
                    onDismiss={()=>this.resetSnackbar()}
                    duration={2500}
                >
                    {this.state.errorMsg}
                </Snackbar>
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
        alignSelf: 'flex-start'
    },
    title: {
        fontSize: 32,
        fontFamily: 'AvenirNextDemiBold',
        color: colors.title
    },
    desc: {
        paddingTop: 20,
        fontSize: 16,
        fontFamily: 'AvenirNextDemiBold',
        color: colors.title
    },
    inputContainer: {
        width: '100%',
        paddingTop: 20
    },
    input: {
        fontSize: 18,
        fontFamily: 'AvenirNextRegular',
    },
    error_text: {
        fontSize: 14,
        color: colors.red
    },
    resetBtn: {
        height: 70,
        backgroundColor: colors.btn,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    disbledBtn: {
        height: 70,
        backgroundColor: `${colors.btn}90`,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    resetText: {
        fontSize: 22,
        color: colors.white,
        fontFamily: 'AvenirNextDemiBold',
    }
})