
import axios from 'axios/index';
import moment from 'moment/moment';
import { REACT_APP_THEMOVIEDB_KEY } from 'react-native-dotenv'

const moviesdb = axios.create({
    baseURL: `https://api.themoviedb.org/3/discover/movie?api_key=${REACT_APP_THEMOVIEDB_KEY}&region=BR&language=pt-BR&with_genres=10751,16&sort_by=release_date.desc&include_adult=false&include_video=false&primary_release_date.gte=${moment(new Date()).format('YYYY-MM-DD')}&primary_release_date.lte=${moment(new Date()).add(7,'days').format('YYYY-MM-DD')}`
});
export default moviesdb;
