import React from 'react';
import {Container, Header, Content, Card, CardItem, Body} from 'native-base'
import {FlatList, Text, View, StyleSheet} from "react-native";

export default class sessions extends React.Component {
    renderItem = ({item}) => (
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
            <Text style={SessionStyles.sessionData}>
                {item.type[0]}
            </Text>
            <Text style={SessionStyles.sessionData}>
                {item.type[1]}
            </Text>
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
    }
})