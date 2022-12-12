<template>
  <div class="home">
    <div id="movieCard" v-for="(i,x) in movies" :key={x}>
      <h1>{{i.title}}</h1>
        <MovieCard :movie="i.url" :mIndex="x" @load="loading" />
        <div v-if="this.load === true">loading!!!</div>
    </div>
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";
import {mapState} from "vuex";

export default {
  name: 'HomeSection',
  data() {
    return {
      load: true,
    };
  },
  components: {
    MovieCard
  },
  methods:{
    loading(load){
      this.load = load;
    }
  },
  computed:{
    ...mapState([
      'movies',
    ])
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