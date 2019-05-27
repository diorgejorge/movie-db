import React from 'react';
import {FlatList, Text, View, StyleSheet,TouchableOpacity,Linking} from "react-native";

export default class sessions extends React.Component {
    handleClick = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + this.props.url);
            }
        });
    };
    renderItem = ({item}) => (
       <View>
        <View style={{width:'100%', flexDirection: 'row',
            justifyContent: "center"}}>
            <View style={SessionStyles.sessionsView}>
                <Text style={SessionStyles.sessionData}>
                    {item.type[0]}
                </Text>
                <Text style={SessionStyles.sessionData}>
                    {item.type[1] === 'Normal'?'2D':'3D'}
                </Text>
            </View>
            <View style={SessionStyles.sessionsView}>
                <Text style={SessionStyles.sessionData}>
                    {item.date.hour} H
                </Text>
                <Text style={SessionStyles.sessionData}>
                    Dia: {item.date.dayAndMonth}
                </Text>
                <Text style={SessionStyles.sessionData}>
                    R$ {item.price}
                </Text>
            </View>
        </View>
        <TouchableOpacity style={SessionStyles.button} onPress={()=>this.handleClick(item.siteURL)}><Text style={{color:"#FFF"}}>Comprar</Text></TouchableOpacity>
       </View>
    );

    render() {
        return (
            <FlatList
                data={this.props.sessions}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => 'id-session' + item.id + index}
            />
        )
    }
}
const SessionStyles = StyleSheet.create({
    sessionsView: {
        flexDirection: 'row',
        justifyContent: "center"
    },
    sessionData: {
        padding: 10
    },
    button:{
        borderColor:"#1513ff",
        backgroundColor:"#1513ff",
        borderRadius:5,
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: "center"
    }
})