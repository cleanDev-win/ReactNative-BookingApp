import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SearchCard } from "../components";
import { Ionicons } from "@expo/vector-icons";
import * as colors from './../components/colors';
import { connect } from 'react-redux';

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state={
            results: 
                [
                    {
                        "practitioner": {
                            "practitionerId": "81818f9b-b978-48f1-b46b-8f49933e074b",
                            "practitionerName": "Danniris Rojas",
                            "practitionerProfilePhoto": null,
                            "practitionerReviews": "",
                            "practitionerAverageRating": 0
                        },
                        "clinic": {
                            "clinicId": "d07b7c9b-0c33-49cb-a3e1-7eb68233a080",
                            "clinicName": "Alonso Business",
                            "clinicGeolocation": {
                                "lat": 34.052234, 
                                "lng": -118.243685
                            },
                            "clinicAddress": "Los Angeles, CA, USA",
                            "place_id": null,
                            "description": "",
                            "distanceFromSearchAddress": 0
                        },
                        "service": {
                            "serviceId": 1,
                            "serviceName": {
                                "id": "1",
                                "name": "ACUPUNCTURE",
                                "image": "https://klnkfnd-documents.s3.us-east-2.amazonaws.com/Acupuncture.png"
                            },
                            "serviceOptions": []
                        },
                        "unavailableTimes": [
                            {
                                "01/04/2020": []
                            },
                            {
                                "01/05/2020": []
                            },
                            {
                                "01/06/2020": []
                            },
                            {
                                "01/07/2020": []
                            },
                            {
                                "01/08/2020": []
                            },
                            {
                                "01/09/2020": []
                            },
                            {
                                "01/10/2020": []
                            },
                            {
                                "01/11/2020": []
                            },
                            {
                                "01/12/2020": []
                            },
                            {
                                "01/13/2020": []
                            },
                            {
                                "01/14/2020": []
                            },
                            {
                                "01/15/2020": []
                            },
                            {
                                "01/16/2020": []
                            },
                            {
                                "01/17/2020": []
                            },
                            {
                                "01/18/2020": []
                            }
                        ]
                    },
                ]
            
        }
    }

    componentDidMount() {
        
    }

    renderItem(row) {
        const { item, index } = row;
        return (
            <TouchableOpacity style={{width: '100%'}} onPress={()=>this.props.navigation.navigate('Sixth', {param: index})}>
                <SearchCard post={item} itemIdx={index} />
            </TouchableOpacity>
        )
    }
    
    render() {
        const {searchedServices} = this.props;
            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Results</Text>
                        <TouchableOpacity style={styles.map} onPress={()=>this.props.navigation.navigate("MapSearchResult", {results: this.state.results})}>
                            <Text style={styles.mapTxt}>MAP</Text>
                            <Ionicons name="md-map" size={26} color={colors.mainText} />
                        </TouchableOpacity>
                    </View>
                    
                    <FlatList
                        data={this.state.results}
                        keyExtractor={item => item.practitioner.practitionerId}
                        showsVerticalScrollIndicator={false}
                        renderItem={this.renderItem.bind(this)}
                    />
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 32,
        fontFamily: 'AvenirNextDemiBold',
        color: colors.title
    },
    map: {
        flexDirection: 'row',
        alignItems: 'center',
        fontFamily: 'AvenirNextRegular'
    },
    mapTxt: {
        fontSize: 20, 
        paddingRight: 10, 
        fontFamily: 'AvenirNextRegular',
        color: colors.title
    }
});

const mapStateToProps = state => {
    return {
        searchedServices: state.ServiceReducer.searchedServices
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResult)