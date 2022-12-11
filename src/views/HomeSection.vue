<template>
  <div class="home">
    <div id="movieCard" v-for="(i,x) in this.movies" :key={x}>
      <h1>{{i.title}}</h1>
        <MovieCard :movie="i.url" :mIndex="x" :load="this.load" />
        <div v-if="this.load">loading!!!</div>
    </div>
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";

export default {
  name: 'HomeSection',
  data() {
    return {
      load: true,
      movies :[ {title : "금주의 인기작품", url: "https://api.themoviedb.org/3/trending/movie/day?api_key=6ae188018e371e8e0f975652b9237f00&language=ko-KR"}, 
      {title : "조금만 기다려요!", url : "https://api.themoviedb.org/3/movie/upcoming?api_key=6ae188018e371e8e0f975652b9237f00&language=ko-KR&page=1&region=KR"}, 
      {title : "NOW PLAYING!", url : "https://api.themoviedb.org/3/movie/now_playing?api_key=6ae188018e371e8e0f975652b9237f00&language=ko-KR&page=1&region=KR"}]
    };
  },
  components: {
    MovieCard
  },
  methods:{
    loadComplete(){

    }
  }
};
</script>
<style lang="scss">
* {
  color: azure;
}
h1 {
  @include base(100vw, 50px, block);
  line-height: 50px;
  text-indent: 10px;
}
</style>