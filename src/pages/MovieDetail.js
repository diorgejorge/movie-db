import React from 'react';
import {Text, Image, FlatList} from "react-native"
import {Container, Header, Content, Card, CardItem, Body} from 'native-base'
import ingressocom from "../services/ingressocom";
import CityCombo from "../components/CityCombo";
import Cinemas from "../components/cinemas";

export default class MovieDetail extends React.Component {

    static navigationOptions = {
        title: "Detalhe",
    }

    state = {
        films: [],
        images: [],
        city: 397
    }

    componentDidMount(): void {
        this.loadMovies();
    }

    _onValueChange(value: string) {
        this.setState({city:value});
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

    loadMovies = async () => {
        const movieT = this.retira_acentos(this.props.navigation.state.params.movie.title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/[\s]/g, "-").toLowerCase());
        const response = await ingressocom.get(`/events/url-key/${movieT}/partnership/Cin%C3%A9polis`);
        const results = response.data;
        const images = response.data.images[1] != undefined ? response.data.images[1] : response.data.images[0];
        this.setState({
            films: results,
            images: images
        });
    };

    render = () => (
        <Container>
            <Content>
                <CityCombo onValueChange={this._onValueChange.bind(this)}/>
                <Image
                    source={{uri: encodeURI(this.state.images.url)}}
                    style={{height: 200, width: '100%', resizeMode: 'stretch'}}/>
                <Card>
                    <CardItem header>
                        <Text>
                            {this.state.films.originalTitle}
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                {this.state.films.synopsis}
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text>Duração: {this.state.films.duration} min</Text>
                    </CardItem>
                    <CardItem style={{alignItems: "center"}}>

                    </CardItem>
                </Card>
                <Cinemas movie={this.props.navigation.state.params.movie.title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")} city={this.state.city}/>
            </Content>
        </Container>
    );
}

