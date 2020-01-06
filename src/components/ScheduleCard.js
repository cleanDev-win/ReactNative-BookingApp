import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {  Ionicons  } from '@expo/vector-icons';
import Menu, { MenuItem } from 'react-native-material-menu';
import * as colors from './../components/colors';
export default class ScheduleCard extends Component {
    _menu = null;
    setMenuRef = ref => {
        this._menu = ref;
    };

    constructor(props) {
        super(props);
        this.setState = {
            selectedMenu: false
        }
    }

    showMenu = () => {  
        this._menu.show();
    }

    hideMenu = () => {
        this._menu.hide();
    }

    handleEdit = () => {
        console.log("edit");
        this.hideMenu();
    }

    handleDelete = () => {
        console.log("delete");
        this.hideMenu();
    }

    render() {
        const { service, name, clinic, date, status, photoUrl } = this.props.post;
        return (
            <View style={styles.container}>
                <View style={{alignItems: 'flex-end'}}>
                    <Menu
                        style={{marginTop: 20}}
                        ref={this.setMenuRef}
                        button={
                        <TouchableOpacity onPress={this.showMenu} style={{ alignSelf: 'flex-end' }}>
                            <Ionicons name='ios-more' size={24} color={colors.mainText} />
                        </TouchableOpacity>
                        }>
                        <MenuItem onPress={this.handleDelete}><Text style={{color: colors.red}}>Delete</Text></MenuItem>
                        <MenuItem onPress={this.handleEdit}>Edit</MenuItem>
                    </Menu>
                </View>
                    
                <View style={styles.mainContainer}>
                    <Image style={styles.avatar} source={photoUrl?{uri: photoUrl}:require("./../../assets/profile-blank.png")} />
                    <View style={{ marginLeft: 20}}>
                        <Text style={styles.service}>{service}</Text>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.itemFont}>{clinic}</Text>
                        <View style={styles.itemContainer}>
                            <Ionicons name="md-time" size={20} color={colors.lightgrey} />
                            <Text style={[styles.itemFont, {paddingLeft: 10}]}>{date}</Text>
                        </View>
                        <Text style={[styles.status, {color: status=="Processing"?colors.primary:colors.btn}]}>{status}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'baseline',
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 10,
        padding: 20,
        elevation: 9,
        flexDirection:'column',
        shadowColor: "#000",
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        shadowOffset: {
        height: 0,
        width: 4,
        },
        width: '95%'
    },
    mainContainer: {
        flexDirection: 'row'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    service: {
        fontSize: 22,
        color: colors.mainText
    },
    name: {
        fontSize: 18,
        color: colors.mainText
    },
    status: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 18,
    },
    itemFont: {
        fontSize: 16,
        color: colors.lightgrey,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hourlyRate: {
        color: '#3ae0e0',
        fontSize: 24,
        textAlign: 'right',
        paddingLeft: 50
    }
})