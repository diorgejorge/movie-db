import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Button,
    Icon, Picker
} from 'native-base'
import moviedb from "../services/moviedb"
import moment from "moment/moment"
import MovieCard from "../components/MovieCard";

export default class FilmesDoMes extends React.Component {
    static navigationOptions = {
        title: 'Filmes do Mês',
    }
    state = {
        films: [],
        page: 1,
        apiInfo: [],
        with_genres: '10751,16'
    }

    componentDidMount(): void {
        this.loadMovies();
    }


    loadMovies = async (page = 1) => {
        const response = await moviedb.get(`&page=${page}`, {
            params: {
                with_genres: '16,10751',
                'primary_release_date.gte': moment(new Date()).format('YYYY-MM-01'),
                'primary_release_date.lte': moment(new Date()).format('YYYY-MM-30')
            }
        });
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

    renderItem = ({item}) => (
        <MovieCard movie={item} navigation={this.props.navigation}/>
    )
    ;

    async onValueChange(value: string) {
        await this.loadMoviesCombo(value);
    }
    ;

    loadMoviesCombo = async (with_genres) => {
        const response = await moviedb.get(`&page=1`, {
            params: {
                with_genres: with_genres,
                'primary_release_date.gte': moment().startOf('month').format('YYYY-MM-DD'),
                'primary_release_date.lte': moment().endOf('month').format('YYYY-MM-DD')
            }
        });
        const {results, ...apiInfo} = response.data;
        this.setState({
            films: results,
            apiInfo,
            page: 1,
            with_genres: with_genres
        });
    };


    render = () => (
        <Container>
            <Content>
                <Picker
                    mode="dropdown"
                    placeholder="Select One"
                    selectedValue={this.state.with_genres}
                    onValueChange={this.onValueChange.bind(this)}
                >
                    <Picker.Item label="Animação" value="10751,16"/>
                    <Picker.Item label="Romance" value="10749"/>
                    <Picker.Item label="Aventura" value="12"/>
                    <Picker.Item label="Ação" value="28"/>
                </Picker>
                <FlatList
                    data={this.state.films}
                    renderItem={this.renderItem}
                    keyExtractor={item => 'id-' + item.id}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                />

            </Content>
            <Footer>
                <FooterTab>
                    <Button onPress={() => {
                        this.props.navigation.navigate("Main")
                    }}>
                        <Icon active name="home"/>
                    </Button>
                    <Button active onPress={() => {
                        this.props.navigation.navigate("FilmesDoMes")
                    }}>
                        <Icon name="calendar"/>
                    </Button>
                </FooterTab>
            </Footer>
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


