import { createStore } from 'vuex';

// const cardWidth = document.querySelector(".homelist > ul > li:first-child");
const MOVIE_URL = "https://api.themoviedb.org/3";
const API_KEY = "?api_key=6ae188018e371e8e0f975652b9237f00";
export default createStore({
    state: {
        backUrl: "https://image.tmdb.org/t/p/w500",
        oriUrl: "https://image.tmdb.org/t/p/original",
        movies: [{ title: "금주의 인기작품", url: `${MOVIE_URL}/trending/movie/day${API_KEY}&language=ko-KR` },
        { title: "조금만 기다려요!", url: `${MOVIE_URL}/movie/upcoming${API_KEY}&language=ko-KR&page=1&region=KR` },
        { title: "NOW PLAYING!", url: `${MOVIE_URL}/movie/now_playing${API_KEY}&language=ko-KR&page=1&region=KR` }],
        myMovies: "",
        load: true,
        movieItem: "",
        mResult: "",
        mId: "",
        movieDetail: [],
        trailer: "",
    },
    getters: {
        myMovie(state){
            state.myMovies = JSON.parse(localStorage.getItem("store"))
            return state.myMovies;
        }
    },
    mutations: {
       
    },
    actions: {
    }
})