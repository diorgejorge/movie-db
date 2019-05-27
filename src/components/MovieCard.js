import React, {Component} from 'react';
import {Card, CardItem, Thumbnail, Left, Body,Right} from 'native-base'
import {Text, TouchableOpacity, View,ProgressBarAndroid} from "react-native";
import moment from "moment";
import "moment/locale/pt-br";

export default class MovieCard extends Component {
    loadImage = (path) => {
        return 'http://image.tmdb.org/t/p/w500' + path;
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate("MovieDetail",{movie:this.props.movie});
                }}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail
                                    source={{uri: encodeURI(this.loadImage(this.props.movie.backdrop_path != null ? this.props.movie.backdrop_path : item.poster_path))}}/>
                                <Body>
                                    <Text>{this.props.movie.title}</Text>
                                    <Text note>{moment(this.props.movie.release_date,"YYYY-MM-DD").format('LLL')}</Text>
                                    <Text>Score:</Text>
                                    <ProgressBarAndroid styleAttr="Horizontal" progress={this.props.movie.vote_average / 10} color={this.props.movie.vote_average > 5.5 ?"#5ada17":"#ff2a36"} indeterminate={false}/>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Right>
                                <Text style={{fontSize: 20, width: '100%', height: 30}}>
                                    {moment(this.props.movie.release_date, 'YYYY-MM-DD').startOf('day').fromNow()}
                                </Text>
                            </Right>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </View>
        );
    }
}
