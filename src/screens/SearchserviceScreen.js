import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, TextInput, ActivityIndicator } from 'react-native';
import { AirbnbRating  } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons';
import * as colors from './../components/colors';
import { getServices, searchService } from './../store/actions/serviceAction';
import { connect } from 'react-redux';

class SearchserviceScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            businessType: 0,
            location: '',
            rating: 5,
            selected_ava: true,
            selected_near: true,
            services: [
                {id: 1, name: "massage"},
                {id: 2, name: "massage1"},
                {id: 3, name: "massage2"},
            ],
            dateTime: ''
        }
        this.handleSelectService = this.handleSelectService.bind(this);
    }
    
    componentDidMount() {
        this.props.onGetServices();
        let date = new Date();
        this.setState({dateTime: date});
    }


    handleChangeLocation = (text) => {
        this.setState({location: text});
    }

    handleChangeNear() {
        let temp = this.state.selected_near;
        temp = !temp;
        this.setState({ selected_near: temp });
    }

    handleChangeAvailability() {
        let temp = this.state.selected_ava;
        temp = !temp;
        this.setState({ selected_ava: temp });
    }

    handleSelectService(value) {
        this.setState({businessType: value});
    }

    async handleSearch() {
        let searchData = {};
        searchData = {
            businessType: this.state.businessType + 1,
            nearBy: this.state.selected_near,
            longitude: "-118.2436849",
            latitude: "34.0522342",
            availableNow: this.state.selected_ava,
            dateTime: this.state.dateTime
        }
        console.log("search data => ", searchData);
        // this.props.navigation.navigate("Fifth", {param: param});
        await this.props.onSearchService(searchData);
    }

    ratingCompleted = (rating) => {
        this.setState({ rating: rating });
    }

    render() {
        const {gettingService, services, searchingService} = this.props;
        console.log("searching... =>", searchingService);
            return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Search Service</Text>
                <View style={{width: '100%'}}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.lblText}>BUSINESS TYPE</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                gettingService &&
                                    <ActivityIndicator size="large" color={colors.mainText} />
                            }
                            {   
                                services.map((item, index)=>
                                    <View key={index} style={styles.imgContainer}>
                                        <TouchableOpacity onPress={()=>this.handleSelectService(index)}>
                                            <ImageBackground borderRadius={10} borderColor={index==this.state.businessType?colors.primary:colors.white}  borderWidth={2} source={{uri: item.image}} style={styles.img}>
                                                <Text style={styles.imgText}>
                                                    {item.name}
                                                </Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.lblText}>LOCATION</Text>
                        <View style={styles.locationContainer}>
                            <Ionicons style={styles.icon} name='md-pin' size={20} color="grey" />
                            <TextInput 
                                style={styles.input}
                                value={this.state.location}
                                placeholder="Enter Address"
                                autoCapitalize={"none"}
                                onChangeText={this.handleChangeLocation}
                            />
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={this.handleChangeNear.bind(this)} style={{paddingTop: 10, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{backgroundColor: this.state.selected_near ? colors.primary : colors.white, borderWidth: 1, borderColor: this.state.selected_near?colors.primary:'lightgrey', borderRadius: 50, width: 20, height: 20}}>
                            </View>
                            <Text style={[{ paddingLeft: 10, color: this.state.selected_near ? colors.primary : colors.mainText}, styles.lblToggle]}>Near Me</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.lblText}>AVAILABILITY</Text>
                        <TouchableOpacity onPress={this.handleChangeAvailability.bind(this)} style={{paddingTop: 10, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{backgroundColor: this.state.selected_ava ? colors.primary : colors.white, borderWidth: 1, borderColor: this.state.selected_ava?colors.primary:'lightgrey', borderRadius: 50, width: 20, height: 20}}>
                            </View>
                            <Text style={[{ paddingLeft: 10, color: this.state.selected_ava ? colors.primary : colors.mainText}, styles.lblToggle]}>Available Now</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.itemContainer}>
                        <Text style={styles.lblText}>RATING</Text>
                        <AirbnbRating 
                            count={5}
                            defaultRating={this.state.rating}
                            size={30}
                            selectedColor={colors.primary}
                            showRating={false}
                            style={{alignItems: 'flex-start'}}
                            onFinishRating={this.ratingCompleted}
                        />
                    </View> */}
                </View>
                <View style={styles.itemContainer}>
                    <TouchableOpacity style={styles.searchBtn} onPress={ this.handleSearch.bind(this) } disabled={searchingService}>
                        {searchingService ? (
                            <ActivityIndicator size="small" color={colors.white} />
                        ) : <Text style={styles.searchText}>Search</Text>
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
            )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignItems: 'flex-start',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 32,
        fontFamily: 'AvenirNextDemiBold',
        color: colors.title
    },
    itemContainer: {
        paddingTop: 10,
        width: '100%'
    },
    lblText: {
        fontSize: 14,
        fontFamily: 'AvenirNextRegular',
        paddingTop: 5,
        paddingBottom: 5,
        color: colors.grey
    },
    locationContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
    },
    icon: {
        paddingLeft: 10,
        paddingRight:10
    },
    input: {
        fontSize: 17,
        flex: 1,
        // paddingTop: 10,
        // paddingRight: 10,
        // paddingBottom: 10,
        paddingLeft: 10,
        // height: 70,
        width: '90%',
        color: colors.mainText
    },
    lblToggle: {
        fontSize: 20,
        fontFamily: 'AvenirNextRegular'
    },
    searchBtn: {
        height: 60,
        backgroundColor: colors.btn,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
            
    },
    searchText: {
        fontSize: 22,
        color: colors.white,
        fontWeight: 'bold',
        fontFamily: 'AvenirNextDemiBold'
    },

    img: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    imgContainer: {
        paddingRight: 20,
    },
    imgText: {
        color: colors.white,
        fontFamily: 'AvenirNextRegular',
        textAlignVertical: "center",
        textAlign: "center",
    }
});

const mapStateToProps = state => {
    return {
        services: state.ServiceReducer.services,
        gettingService: state.ServiceReducer.gettingService,
        searchingService: state.ServiceReducer.searchingService
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetServices: () => {
            dispatch(getServices());
        },
        onSearchService: (searchData) => {
            dispatch(searchService(searchData));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchserviceScreen)