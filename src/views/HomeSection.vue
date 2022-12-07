<template>
  <div class="home">
    <div v-if="this.load == true">loading!!!</div>
    <div v-else id="movieCard">
      <h1>금주의 인기작품</h1>
        <!-- <MovieCard :src=""/> -->
         <div class="homelist">
        <ul>
          <li v-for="(i, x) in this.movieItem1" :key="{ x }" @click="goDetail">
            <router-link :to="`/detail/${i.id}`">
            <img :src="this.url + i.poster_path" />
            <span>{{i.title.length > 16 ? i.title.substr(0, 15) + ".." : i.title}}</span>
          </router-link>
          </li>
        </ul>
        <span class="leftbtn" @click="leftClick(1)">〈</span>
        <span class="rightbtn" @click="rightClick(1)">〉</span>
      </div>
      <h1>조금만 기다려요!</h1>
        <!-- <MovieCard /> -->
      <div class="homelist">
        <ul>
          <li v-for="(i, x) in this.movieItem2" :key="{ x }">
            <router-link :to="`/detail/${i.id}`">
            <img :src="this.url + i.poster_path" />
            <span>{{i.title.length > 16 ? i.title.substr(0, 15) + ".." : i.title}}</span>
          </router-link>
          </li>
        </ul>
        <span class="leftbtn" @click="leftClick(2)">〈</span>
        <span class="rightbtn" @click="rightClick(2)">〉</span>
      </div>
      <h1>Now Playing</h1>
      <!-- <MovieCard /> -->
      <div class="homelist">
        <ul>
          <li v-for="(i, x) in this.movieItem3" :key="{ x }">
            <router-link :to="`/detail/${i.id}`">
            <img :src="this.url + i.poster_path" />
            <span>{{i.title.length > 16 ? i.title.substr(0, 15) + ".." : i.title}}</span>
          </router-link>
          </li>
        </ul>
        <span class="leftbtn" @click="leftClick(3)">〈</span>
        <span class="rightbtn" @click="rightClick(3)">〉</span>
      </div>
    </div>
  </div>
</template>

<script>
// import MovieCard from "../components/MovieCard.vue";

export default {
  name: 'HomeSection',
  data() {
    return {
      movieItem1: [],
      movieItem2: [],
      movieItem3: [],
      url: "https://image.tmdb.org/t/p/w200",
      load: true,
      prev1 : 0,
      prev2 : 0,
      prev3 : 0,
      totalPrev:0,
    };
  },
  props: {},
  //https://image.tmdb.org/t/p/w500
  methods: {
   fetchData1() {
      this.$axios
        .get(
          "https://api.themoviedb.org/3/trending/movie/day?api_key=6ae188018e371e8e0f975652b9237f00&language=ko-KR"
        )
        .then((res) => {
          this.movieItem1 = res.data.results.slice(0, 15);
          this.load = false;
        })
        .catch((err) => console.log(err));
    },
    fetchData2() {
      this.$axios
        .get(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=6ae188018e371e8e0f975652b9237f00&language=ko-KR&page=1&region=KR"
        )
        .then((res) => {
          this.movieItem2 = res.data.results.slice(0, 15);
          this.load = false;
        })
        .catch((err) => console.log(err));
    },
    fetchData3() {
      this.$axios
        .get(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=6ae188018e371e8e0f975652b9237f00&language=ko-KR&page=1&region=KR"
        )
        .then((res) => {
          this.movieItem3 = res.data.results.slice(0, 15);
          this.load = false;
        })
        .catch((err) => console.log(err));
    },
    leftClick(x) {
      const card = document.querySelector(`#movieCard > div:nth-of-type(${x}) > ul`);
      const cardWidth =document.querySelector(`#movieCard> div:nth-of-type(${x}) > ul > li:nth-child(1)`).offsetWidth + 10;
      if (x === 1) {
        this.prev1 -= 1 ;
        // this.prev1 -= 1 ;
        this.totalPrev = this.prev1;
      }else if(x ===2){
        this.prev2 -= 1;
        this.totalPrev = this.prev2;
      }else{
        this.prev3 -= 1;
        this.totalPrev = this.prev3;
      }
      if(this.totalPrev <=0){
        this.prev1 = 0;
        this.prev2 = 0;
        this.prev3 = 0;
      }
      card.style.transform = `translateX(-${cardWidth * this.totalPrev}px)`;
      card.style.transition = `all 0.5s ease`;
    },
    rightClick(x) {
     const card = document.querySelector(`#movieCard > div:nth-of-type(${x}) > ul`);
      const cardWidth =document.querySelector(`#movieCard> div:nth-of-type(${x}) > ul > li:nth-child(1)`).offsetWidth + 10;
      const disWidth = window.innerWidth +(cardWidth * (this.totalPrev)) ;
      if (x === 1) {
        this.prev1 +=1 ;
        this.totalPrev = this.prev1;
      }else if(x ===2){
        this.prev2 += 1;
        this.totalPrev = this.prev2;
      }else{
        this.prev3 += 1;
        this.totalPrev = this.prev3;
      }
      if(disWidth >= card.offsetWidth){
        this.prev1 = 0;
        this.prev2 = 0;
        this.prev3 = 0;
        this.totalPrev = 0;
      }
      card.style.transform = `translateX(-${cardWidth * this.totalPrev}px)`;
      card.style.transition = `all 0.5s ease`;
    },
  },
  components: {
    // MovieCard
  },
  created: function () {
    this.fetchData1();
    this.fetchData2();
    this.fetchData3();
  },
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
.homelist {
  @include base(100%, 350px, block);
  overflow: hidden;
  position: relative;
  padding-top: 25px;
  & > ul {
    @include base(calc(200px * 15), $cardheight, flex);
    @include flex(row nowrap, space-evenly, center);
    & > li {
      // background-color: purple;
      @include base($cardwidth, inherit, block);
      cursor: pointer;
      & {
        display: inline-block;
        transition-duration: $defaultDuration;
        transition-property: transform;

        @include hideTapHighlightColor();
        @include hardwareAccel();
        @include improveAntiAlias();

        &:hover {
          transform: translateY(-15px);
        }
      }
      & > a > img {
      // & > img {
        @include base($cardwidth, 270px, block);
        object-fit: cover;
      }
      & > a > span {
      // & > span {
        @include base($cardwidth, 30px, block);
        line-height: 30px;
      }
    }
  }
}
.leftbtn,
.rightbtn {
  @include base(80px, 270px, block);
  position: absolute;
  top: 25px;
  font-size: 50px;
  line-height: $cardheight;
  text-align: center;
  text-decoration: bold;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    scale: 1.3;
    backdrop-filter: blur(3px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
}
.rightbtn {
  right: 0;
}
</style>