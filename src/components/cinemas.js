import React from 'react';
import {Container, Header, Content, Card, CardItem, Body} from 'native-base'
import ingressocom from "../services/ingressocom";
import {FlatList, Text, View} from "react-native";

export default class Cinemas extends React.Component {
    state = {
        theaters: []
    }

    componentDidMount() {
        this.loadTheaters();
    }
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        this.loadTheaters();
    }

    loadTheaters = async () => {
        const response = await ingressocom.get(`/sessions/city/${this.props.city}/event/url-key/${encodeURI('pokemon-detetive-pikachu')}/partnership/a`);
        const results = response.data;
        this.setState({
            theaters: results,
        });
    };
    renderSessions = ({item}) => (
            <CardItem body>
                <CardItem>
                    <Text>
                        {item.date.hour} H
                    </Text>
                </CardItem>
                <CardItem>
                    <Text>
                        Dia: {item.date.dayAndMonth}
                    </Text>
                </CardItem>
                <CardItem>
                    <Text>
                        R$ {item.price}
                    </Text>
                </CardItem>
            </CardItem>

    );
    renderRoom = ({item}) => (
        <CardItem body>
            <CardItem header>
                <Text>
                    {item.name}
                </Text>
            </CardItem>
            <CardItem>
                <FlatList
                    data={item.sessions}
                    renderItem={this.renderSessions}
                    keyExtractor={(item, index) => 'id-session-' + item.id + index}
                />
            </CardItem>
        </CardItem>
    );
    renderTheaters = ({item}) => (
        <Card>
            <CardItem header>
                <Text>{item.name}</Text>
            </CardItem>
            <FlatList
                data={item.rooms}
                renderItem={this.renderRoom}
                keyExtractor={(item, index) => 'id-room-' + item.id + index}
            />
        </Card>
    )
    renderItem = ({item}) => (
        <FlatList
            data={item.theaters}
            renderItem={this.renderTheaters}
            keyExtractor={(item, index) => 'id-theater-' + item.id + index}
        />
    );

    render() {
        return (
            <Container>
                <Content>
                    <FlatList
                        data={this.state.theaters}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => 'id-' + item.id + index}
                    />
                </Content>
            </Container>

        )
    }
}