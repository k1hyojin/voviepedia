<template>
  <div class="homelist">
    <ul ref="cards">
      <li v-for="(i, x) in this.movieItem" :key="{ x }" ref="cardli">
        <router-link :to="`/detail/${i.id}`"> 
        <img :src="this.url + i.poster_path" />
        <span>{{i.title.length > 16 ? i.title.substr(0, 15) + ".." : i.title}}</span>
        </router-link>
      </li>
    </ul>
    <span class="leftbtn" @click="leftClick">〈</span>
    <span class="rightbtn" @click="rightClick">〉</span>
  </div>
</template>

<script>
export default {
    name: 'HomeSection',
    data(){
      return{
        movieItem: "",
        url: "https://image.tmdb.org/t/p/w200",
        arrow : 0,
      }
    },
   props:{
    movie : String,
    load : Boolean,
    mIndex: Number,
   },
   methods:{
    leftClick() {
      this.arrow -=1;
      if(this.arrow <=0){
        this.arrow = 0;
      }
      this.card.style.transform = `translateX(-${this.cardWidth * this.arrow}px)`;
      this.card.style.transition = `all 0.5s ease`;
    },
    rightClick() {
      const disWidth = window.innerWidth +(this.cardWidth * (this.arrow)) ;
     this.arrow +=1;
      if(disWidth >= this.card.offsetWidth){
        this.arrow = 0;
      }
      this.card.style.transform = `translateX(-${this.cardWidth * this.arrow}px)`;
      this.card.style.transition = `all 0.5s ease`;
    },
   },
   mounted(){
     this.$axios.get(this.movie)
     .then((res) => {
       this.movieItem = res.data.results.slice(0, 15);
       this.loading=false;
     })
     .catch((err) => console.log(err));
   },
   computed:{
    card(){
      return this.$refs.cards;
    },
    cardWidth(){
      return this.$refs.cardli[0].offsetWidth + 10;
    }
   },
};
</script>

<style lang="scss" scoped>
.homelist {
  @include base(100%, 350px, block);
  overflow: hidden;
  position: relative;
  padding-top: 25px;
  & > ul {
    @include base(calc(200px * 15), $cardheight, flex);
    @include flex(row nowrap, space-evenly, center);
    & > li {
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
      @extend %moviecard;
      }
      & > a > span {
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
    transform:scale(1.2);
    backdrop-filter: blur(3px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
}
.rightbtn {
  right: 0;
}
</style>