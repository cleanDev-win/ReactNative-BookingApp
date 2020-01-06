import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextField } from 'react-native-material-textfield';
import * as Permissions from 'expo-permissions';
// import ImagePicker from 'react-native-image-picker';
import * as colors from './../components/colors';
export default class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            photoUrl: '',
            name: 'Miriam',
            email: 'dax_blick@yahoo.com',
            password: '',
            confirm_new_pass: ''
        }
    }
    
    componentDidMount() {

    }

    async handleUploadImage() {
        // const options = {
        //     title: 'Select Avatar',
        //     storageOptions: {
        //       skipBackup: true,
        //       path: 'images',
        //     },
        // };
        // console.log("111");
        // ImagePicker.showImagePicker(options, (response) => {
        //     console.log('Response = ', response);
           
        //     if (response.didCancel) {
        //       console.log('User cancelled image picker');
        //     } else if (response.error) {
        //       console.log('ImagePicker Error: ', response.error);
        //     } else {
        //       const source = { uri: response.uri };
           
        //       // You can also display the image using data:
        //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };
           
        //       this.setState({
        //         photoUrl: source,
        //       });
        //     }
        // });
    }

    render() {
        return (
        
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Profile</Text>
                    <View style={{flexDirection: 'row'}}>
                    <Image style={styles.avatar} source={this.state.photoUrl?{uri: this.state.photoUrl}:require("./../../assets/profile-blank.png")} />
                    <View style={{justifyContent: 'center', paddingLeft: 20}}>
                        <Text style={styles.name}>{this.state.name}</Text>
                        <Text style={styles.email}>{this.state.email}</Text>
                        <TouchableOpacity style={{paddingTop: 5}} onPress={this.handleUploadImage.bind(this)}>
                            <Text style={styles.uploadImage}>Upload Picture</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
                <KeyboardAwareScrollView    enableOnAndroid={true}
                                            enableAutomaticScroll={true}
                                            keyboardOpeningTime={0}
                                            style={{width: '100%'}}
                >
                    <View style={{width: '100%'}}>
                        <View style={styles.inputContainer}>
                            <TextField
                                style={styles.input}
                                value={this.state.email}
                                label="EMAIL"
                                autoCapitalize={"none"}
                                onChangeText={(text)=>{this.setState({email: text})}}
                                baseColor={colors.mainText}
                                tintColor={colors.primary}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextField
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
                            <TextField
                                style={styles.input}
                                value={this.state.confirm_new_pass}
                                secureTextEntry={true}
                                label="CONFITM PASSWORD"
                                autoCapitalize={"none"}
                                onChangeText={(text)=>{this.setState({confirm_new_pass: text})}}
                                baseColor={colors.mainText}
                                tintColor={colors.primary}
                            />
                        </View>                        
                    </View>
                </KeyboardAwareScrollView>
                <TouchableOpacity style={styles.saveBtn} onPress={()=> this.props.navigation.navigate("App") }>
                    <Text style={styles.saveText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
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
    mainContainer: {
        width: '100%',
        flexDirection: 'column'
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
        color: colors.title,
        fontFamily: 'AvenirNextDemiBold',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    },  
    name: {
        fontSize: 25,
        color: colors.title
    },
    email: {
        fontSize: 16,
        color: colors.lightgrey
    },
    uploadImage: {
        fontSize: 16,
        color: colors.primary
    },
    inputContainer: {
        marginTop: 20
    },
    input: {
        fontSize: 18,
        fontFamily: 'AvenirNextRegular',
    },
    saveBtn: {
        height: 60,
        backgroundColor: colors.btn,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    saveText: {
        fontSize: 22,
        color: colors.white,
        fontWeight: 'bold',
        opacity: 0.8
    },
    lblStyle: {
        fontSize: 14,
        marginTop: 20
    },
});