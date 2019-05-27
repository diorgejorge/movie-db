import React from 'react';
import {Container, Header, Content, Card, CardItem, Body} from 'native-base'
import ingressocom from "../services/ingressocom";
import {FlatList, Text, View} from "react-native";
import Salas from "../components/salas"

export default class Cinemas extends React.Component {
    state = {
        theaters: []
    }

    componentDidMount() {
        this.loadTheaters();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snuapshot: SS): void {
        this.loadTheaters();
    }
    retira_acentos(text)
    {
        text = text.toLowerCase();
        text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
        text = text.replace(new RegExp('[Ç]','gi'), 'c');
        return text;
    }
    loadTheaters = async () => {
        const movieT = this.retira_acentos(this.props.movie.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/[\s]/g, "-").toLowerCase());
        const url = `/sessions/city/${this.props.city}/event/url-key/${movieT}/partnership/a`;
        const response = await ingressocom.get(url);
        const results = response.data;
        this.setState({
            theaters: results,
        });

    };
    renderTheaters = ({item}) => (
        <Card>
            <CardItem header>
                <Text>{item.name}</Text>
            </CardItem>
            <CardItem body>
                <Salas salas={item.rooms}/>
            </CardItem>
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