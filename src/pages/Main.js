import React from 'react';
import {View, FlatList, StyleSheet, Text,TouchableOpacity} from 'react-native';
import {Container, Header, Content, Card, CardItem, Thumbnail, Left, Body,Right} from 'native-base'
import moviedb from "../services/moviedb"
import moment from "moment/moment"

export default class Main extends React.Component {
    static navigationOptions = {
        title: 'Estréias da Semana',
    }
    state = {
        films: [],
        page: 1,
        apiInfo: []
    }

    componentDidMount(): void {
        this.loadMovies();
    }


    loadMovies = async (page = 1) => {
        const response = await moviedb.get(`&page=${page}`);
        const {results, ...apiInfo} = response.data;
        this.setState({
            films: [...this.state.films, ...results],
            apiInfo,
            page
        });
    };

    loadMore = () => {
        const {page, apiInfo} = this.state;
        if (page === apiInfo.total_pages) return;
        const pageNumber = page + 1;
        this.loadMovies(pageNumber);
    };

    loadImage = (path) => {
        return 'http://image.tmdb.org/t/p/w500' + path;
    }
    renderItem = ({item}) => (
        <View>
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate("MovieDetail",{movie:item});
            }}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail
                                source={{uri: encodeURI(this.loadImage(item.backdrop_path != null ? item.backdrop_path : item.poster_path))}}/>
                            <Body>
                                <Text>{item.title}</Text>
                                    <Text>Score:</Text>
                                <Text
                                    style={item.vote_average > 6 ? {
                                        fontSize: 20,
                                        color: "#FFF",
                                        borderColor: "#5ada17",
                                        borderRadius: 5,
                                        borderWidth: 2,
                                        backgroundColor: "#5ada17",
                                        fontWeight: "bold",
                                        flex: 2,
                                        width: `${item.vote_average * 10}%`
                                    } : {
                                        borderColor: "#ff2a36",
                                        fontSize: 20,
                                        color: "#FFF",
                                        borderRadius: 5,
                                        borderWidth: 2,
                                        backgroundColor: "#ff2a36",
                                        fontWeight: "bold",
                                        width: `${item.vote_average * 10}%`
                                    }}/>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Right>
                            <Text style={{fontSize: 20, width: '100%', height: 30}}>
                                {moment(item.release_date, 'YYYY-MM-DD').startOf('day').fromNow()}
                            </Text>
                        </Right>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        </View>
    )
    ;

    render = () => (
        <Container>
            <Content>
                <FlatList
                    data={this.state.films}
                    renderItem={this.renderItem}
                    keyExtractor={item => 'id-' + item.id}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                />

            </Content>
        </Container>

    );
}
const MainStyles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: "#fafafa",
    },
    score: {
        flexDirection: "row",
        justifyContent: "center",
    },
    scoretextGreen: {
        fontSize: 20,
        color: "#FFF",
        borderColor: "#5ada17",
        borderRadius: 5,
        borderWidth: 2,
        backgroundColor: "#5ada17",
        fontWeight: "bold",
    },
    scoretextRed: {
        borderColor: "#ff2a36",
        fontSize: 20,
        color: "#FFF",
        borderRadius: 5,
        borderWidth: 2,
        backgroundColor: "#ff2a36",
        fontWeight: "bold",
    },
    list: {
        padding: 5
    }
})


