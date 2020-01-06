import { createSwitchNavigator, createAppContainer } from "react-navigation";
import {SignInScreen, 
        SignUpScreen,
        ForgetPasswordScreen, 
        PaySuccessScreen, 
        ConfirmEmailScreen, 
        SplashScreen,
        ResetPasswordScreen
     } from "../screens";
import App from "./mainNavigator";

const AppNavigator = createSwitchNavigator({
        Splash: { screen: SplashScreen },
        SignIn: { screen: SignInScreen },
        SignUp: { screen: SignUpScreen },
        ConfirmEmail: { screen: ConfirmEmailScreen },
        ForgetPassword: {screen: ForgetPasswordScreen },
        ResetPassword: {screen: ResetPasswordScreen},
        PaySuccess: {screen: PaySuccessScreen},
        App
    },
    {
        initialRouteName: 'Splash',
    }
    
);

export default createAppContainer(AppNavigator);