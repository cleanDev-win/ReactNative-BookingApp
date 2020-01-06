import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as colors from './../components/colors';
import { connect } from 'react-redux';
class MapSearchResultScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            sampleSiteMarkers: [
                {
                    id: 1,
                    title: 'Registerd Massage',
                    description: 'Registerd Massage',
                    coordinate: {
                        longitude: -122.4324,
                        latitude: 37.78825
                    },
                    image: require("./../../assets/beauty-body-hands-56884.png")
                },
                {
                    id: 2,
                    title: 'Physio theraphy',
                    description: 'Physio theraphy',
                    coordinate: {
                        longitude: -122.4380,
                        latitude: 37.78880
                    },
                    image: require("./../../assets/Anderson-College-PTA-OTA028.png")
                },
                {
                    id: 3,
                    title: 'Additional Service',
                    description: 'Additional Service',
                    coordinate: {
                        longitude: -122.4800,
                        latitude: 37.80000
                    },
                    image: require("./../../assets/adult-career-clipboard-1919236.png")
                }
            ]
        }
    }
    
    componentDidMount() {
    }

    render() {
        const {searchedServices} = this.props;
        
        return (
        <View style={styles.container}>
            <Text style={styles.title}>Map Search Result</Text>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.mapStyle}
                    provider={PROVIDER_GOOGLE}
                    zoomEnabled={true}
                    pitchEnabled={true}
                    rotateEnabled={true}
                    scrollEnabled={true}
                    showsCompass={true}
                    showsBuildings={true}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {
                        this.state.sampleSiteMarkers.map((item) => (
                            <MapView.Marker
                                key={item.id}
                                coordinate={item.clinic.clinicGeolocation}
                            >
                                <MapView.Callout onPress={()=>this.props.navigation.navigate("Service")}>
                                    <View style={{ padding: 10 }} >
                                        <Text style={{marginBottom: 0}}>
                                            <Image source={{uri: item.practitioner.practitionerProfilePhoto}} style={{ height: 150, width:200, marginTop: 0}} resizeMode="cover" />
                                        </Text>
                                        <Text style={styles.itemtitle}>
                                            {item.clinic.clinicName}
                                        </Text>
                                        <Text style={styles.itemdesc}>{item.clinic.clinicName}</Text>  
                                    </View>
                                </MapView.Callout>
                            </MapView.Marker>
                    ))
                    }
                </MapView>
                <TouchableOpacity style={styles.listBtn} onPress={()=>this.props.navigation.navigate("SearchResult", {transition: 'fade'})}>
                    <Ionicons name="md-list" size={20} />
                    <Text style={styles.listText} >List</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        padding: 20,
        fontFamily: 'AvenirNextDemiBold',
        color: colors.title
    },
    mapContainer: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    mapStyle: {
        width: '100%',
        height: '100%'
    },
    listBtn: {
        position: 'absolute', 
        top: '85%',  
        alignSelf: 'center',
        flexDirection: 'row',
        width: 150,
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'lightgrey',
        fontFamily: 'AvenirNextRegular'
    },
    listText: {
        fontSize: 18, 
        paddingLeft: 20
    },
    itemtitle: {
        fontFamily: 'AvenirNextDemiBold',
        fontSize: 16,
    },
    itemdesc: {
        fontFamily: 'AvenirNextRegular',
        fontSize: 12,
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
)(MapSearchResultScreen)