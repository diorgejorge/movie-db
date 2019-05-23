import React from 'react';
import {Text, Image, FlatList} from "react-native"
import {Container, Header, Content, Card, CardItem, Body} from 'native-base'

const MovieDetail = ({navigation}) => (
    <Container>
        <Content>
            <Card>
                <CardItem style={{alignItems: "center"}}>
                    <Image
                        source={{uri: encodeURI(loadURL(navigation.state.params.movie.poster_path))}}
                        style={{height: 200, width: '100%', resizeMode: 'center'}}/>
                </CardItem>
                <CardItem header>
                    <Text>
                        {navigation.state.params.movie.original_title}
                    </Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            {navigation.state.params.movie.overview}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem footer>
                    <Text>Popularidade: {navigation.state.params.movie.popularity}</Text>
                </CardItem>
            </Card>
        </Content>
    </Container>
)

const loadURL = (url) =>{
    return 'http://image.tmdb.org/t/p/w500'+url;
}
MovieDetail.navigationOptions = ({navigation}) => ({
    title: navigation.state.params.movie.title
});

export default MovieDetail;