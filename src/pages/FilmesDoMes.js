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

    async componentDidMount(): void {
       await this.loadMovies(this.state.with_genres,1);
    }


    loadMovies = async (page =  1) => {
        const dtIni = moment().startOf('month').format('YYYY-MM-DD');
        const dtFim = moment().endOf('month').format('YYYY-MM-DD');
        const response = await moviedb.get(`&page=${page}`, {
            params: {
                with_genres: this.state.with_genres,
                'release_date.gte': dtIni,
                'release_date.lte': dtFim
            }
        });
        const {results, ...apiInfo} = response.data;
        this.setState({
            films: results,
            apiInfo,
            page:page
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
        await this.setState({with_genres:value})
        await this.loadMovies(1);
    }
    ;

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
                    keyExtractor={(item,index) => 'id-' + item.id+index}
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


