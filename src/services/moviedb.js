import axios from 'axios/index';
import {REACT_APP_THEMOVIEDB_KEY} from 'react-native-dotenv'

const moviesdb = axios.create({
    baseURL: `https://api.themoviedb.org/3/discover/movie?`,
    params:{
        api_key:REACT_APP_THEMOVIEDB_KEY,
        region:'BR',
        language:'pt-BR',
        sort_by:'release_date.desc',
        include_adult:false,
        include_video:false
    }
});
export default moviesdb;