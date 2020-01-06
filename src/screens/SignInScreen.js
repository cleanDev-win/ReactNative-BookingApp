import React, { Component } from 'react';
import { View, 
        Text, 
        StyleSheet, 
        TouchableOpacity, 
        ImageBackground, 
        Dimensions, 
        Vibration,
        TextInput,
        ActivityIndicator,
        KeyboardAvoidingView,
        Platform
} from 'react-native';
import * as colors from './../components/colors';
import {Snackbar} from 'react-native-paper';
import {connect} from "react-redux";
import { signin } from './../store/actions/authAction';
import NetInfo from '@react-native-community/netinfo';
const height = Math.round(Dimensions.get('window').height);

class SignInScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            signinerror: '',
            displaySnackbar: false,
            netinfo: '',
            submitted: false,
            ava_submit: false
        }
    }
    
    componentDidMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
            this.setState({netinfo: isConnected});
        });
    }

    componentWillReceiveProps(nextProps) {
        const {signinerror} = this.props;
        if(nextProps.signinerror !== signinerror && nextProps.signinerror !== '') {
            this.triggerSnackbar(signinerror);
        }
    }

    disableSubmit() {
        const {email, password} = this.state;
        if(email === '') return true;
        if(password === '') return true;
        return false;
    }

    validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
            this.setState({email:text, signinerror: 'Please enter a valid email address', ava_submit: false});
            return false;
        }
        else {
          this.setState({email:text, signinerror: '', ava_submit: true})
        }
    }

    attemptSignIn() {
        this.setState({submitted: true})
        if(this.state.netinfo == 'offline') {
            this.triggerSnackbar('No internet connection. Please check your network status.');
        } else {
            this.handleSignIn();
        }
    }

    async handleSignIn() {
        let authData = {};
        authData = {
            email: this.state.email,
            password: this.state.password
        }
        await this.props.onSignIn(authData);
    }

    triggerSnackbar(msg) {
        Vibration.vibrate();
        this.setState({
            displaySnackbar: true,
            signinerror: msg,
        });
    }

    resetSnackbar() {
        this.setState({
            displaySnackbar: false,
            signinerror: ''
        });
    }

    render() {
        const { loggingIn } = this.props;
        const {submitted, email, password, ava_submit} = this.state;
        return (
            
                <View style={styles.container}>
                    <ImageBackground source={require("./../../assets/base_img.png")} style={styles.backImage}>
                        <View  style={styles.maincontainer}>
                        <KeyboardAvoidingView 
                            enableOnAndroid={true}
                            enableAutomaticScroll={true}
                            keyboardOpeningTime={0}
                            style={{width: '100%'}} 
                        >
                                <View style={styles.fn_container}>
                                    <Text style={styles.title}>KLNK</Text>
                                    <ImageBackground source={require("../../assets/Exclusion_38.png")} style={styles.fn_image}>
                                        <Text style={styles.fn_text}>fn</Text>
                                    </ImageBackground>
                                </View>
                                <Text style={styles.welcome_title}>
                                    Welcome to KLNKfnd!
                                </Text>
                                <Text style={styles.welcome_desc}>
                                    Donec facilisis tortor ut augue {"\n"}lacinia, at viverra est semper. Sed
                                </Text>
                                <TextInput 
                                    style={styles.inputText}
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={(text)=>{this.validateEmail(text)}}
                                    autoCapitalize={"none"}
                                />
                                {
                                    submitted && 
                                    (!email)?
                                    <Text style={styles.error_text}>Email is required.</Text>
                                    :<Text style={styles.error_text}>{this.state.signinerror}</Text>
                                }
                                <TextInput 
                                    style={styles.inputText}
                                    placeholder="Password"
                                    value={password}
                                    secureTextEntry={true}
                                    autoCapitalize={"none"}
                                    onChangeText={(text)=>{this.setState({password: text})}}
                                />
                                {
                                    submitted && !password &&
                                    <Text style={styles.error_text}>Password is required.</Text>
                                }
                                <TouchableOpacity onPress={()=> this.props.navigation.navigate("ForgetPassword")} style={{ alignSelf: 'flex-end'}}>
                                    <Text style={styles.forgotTxt}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={!password || !ava_submit?styles.disableloginBtn:styles.loginBtn} onPress={this.attemptSignIn.bind(this)} disabled={loggingIn || !ava_submit || !password || loggingIn}>
                                    {loggingIn ? (
                                        <ActivityIndicator size="small" color={colors.white} />
                                    ) : <Text style={styles.loginText}>Log In</Text> }
                                    
                                </TouchableOpacity>
        
                                <View style={styles.signUpContainer}>
                                    <Text style={styles.signUpDesc}>Don`t you have an account? </Text>
                                    <TouchableOpacity onPress={ ()=>this.props.navigation.navigate("SignUp") }>
                                        <Text style={styles.signupTxt}> Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </ImageBackground>
                    <Snackbar
                        visible={this.state.displaySnackbar}
                        onDismiss={()=>this.resetSnackbar()}
                        duration={2500}
                        style={styles.snackBar}
                    >
                        {this.props.signinerror?this.props.signinerror:this.state.signinerror}
                    </Snackbar>
                </View>
            
        )            
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    maincontainer: {
        flex: 1,
        padding: 25,
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'flex-start',
    },
    backImage: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 32,
        color: colors.white,
        fontFamily: 'AvenirNextDemiBold'
    },
    fn_container: {
        flexDirection: 'row',
    },
    fn_image: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 2,
        marginTop: 5
    },
    fn_text: {
        fontSize: 18,
        color: colors.fn_grey,
        fontWeight: 'bold',
        paddingLeft: 3,
        fontFamily: 'AvenirNextRegular'
    },
    welcome_title: {
        marginTop: 20,
        fontSize: 28,
        color: colors.white,
        fontFamily: 'AvenirNextDemiBold'
    },
    welcome_desc: {
        marginTop: 10,
        fontSize: 17,
        color: colors.white,
        fontFamily: 'AvenirNextRegular',
        lineHeight: 20,
        marginBottom: 40
    },
    forgotTxt: {
        marginTop: 10,
        fontSize: 17,
        color: colors.white,
        fontFamily: 'AvenirNextRegular',
        lineHeight: 20,
        marginBottom: 30,
        fontWeight: "400"
    },
    error_text: {
        fontSize: 14,
        color: colors.red
    },
    inputContainer: {
        width: '100%'
    },
    inputText: {
        paddingHorizontal: 15,
        fontSize: 18,
        borderWidth: 1,
        borderColor: colors.white,
        height: 60,
        width: '100%',
        marginTop: 20,
        fontFamily: 'AvenirNextRegular',
        color: colors.mainText
    },
    loginBtn: {
        height: 70,
        backgroundColor: colors.btn,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'AvenirNextRegular'
    },
    disableloginBtn: {
        height: 70,
        backgroundColor: `${colors.btn}90`,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'AvenirNextRegular'
    },
    loginText: {
        fontSize: 22,
        color: colors.white,
        fontWeight: 'bold',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        marginTop: 30
    },
    signUpDesc: {
        fontSize: 17,
        color: colors.white,
        fontFamily: 'AvenirNextRegular'
    },
    signupTxt: {
        fontWeight: 'bold',
        fontSize: 17,
        color: colors.primary,
        fontFamily: 'AvenirNextRegular'
    },
    snackBar: {
        backgroundColor: colors.lightgrey,
    }
});

const mapStateToProps = state => {
    return {
        signinerror: state.AuthReducer.signinerror,
        is_authenticated: state.AuthReducer.is_authenticated,
        loggingIn: state.AuthReducer.loggingIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (authData) => {
            dispatch(signin(authData));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInScreen)