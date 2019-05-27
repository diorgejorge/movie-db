import { createStackNavigator} from 'react-navigation';


import Main from './pages/Main'
import MovieDetail from './pages/MovieDetail'
import FilmesDoMes from './pages/FilmesDoMes'

export default createStackNavigator({
    Main,
    MovieDetail,
    FilmesDoMes

},{
    navigationOptions:{
        headerStyle:{
            backgroundColor: "#4f1cda"
        },
        headerTintColor:"#FFF"
    }
});