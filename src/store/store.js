import { createStore } from 'vuex';

// const TRENDING_URL = "https://api.themoviedb.org/3/trending/movie"
// // const MOVIE_URL = "https://api.themoviedb.org/3/movie/";
// const API_KEY = '?api_key=6ae188018e371e8e0f975652b9237f00';

export default createStore({
    state: {
        // movieItem: [],
        // load : true
    },
    getters: {
        
    },
    mutations: {
        // fetchData(){
        //     // this.$axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=6ae188018e371e8e0f975652b9237f00&language=ko-KR")
        //     this.$axios.get(`${TRENDING_URL}/day${API_KEY}&language=ko-KR`)
        //     .then(res => { this.movieItem = res; this.load = false; console.log(this.movieItem)})
        //     .catch(err => console.log(err))
        //   }
    }
  });