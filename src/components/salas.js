import React from 'react';
import {Container, Header, Content, Card, CardItem, Body} from 'native-base'
import Sessions from "../components/sessions";
import {FlatList, Text, View} from "react-native";

export default class salas extends React.Component {
    state = {
        theaters: []
    }

    renderItem = ({item}) => (
        <View>
            <Text>{item.name}</Text>
            <CardItem>
                <Sessions sessions={item.sessions}/>
            </CardItem>
        </View>

    );

    render() {
        return (
            <FlatList
                data={this.props.salas}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => 'id-rooms' + item.id + index}
            />

        )
    }
}