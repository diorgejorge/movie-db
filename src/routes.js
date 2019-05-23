import { createStackNavigator} from 'react-navigation';


import Main from './pages/Main'
import MovieDetail from './pages/MovieDetail'

export default createStackNavigator({
    Main,
    MovieDetail
},{
    navigationOptions:{
        headerStyle:{
            backgroundColor: "#4f1cda"
        },
        headerTintColor:"#FFF"
    }
});