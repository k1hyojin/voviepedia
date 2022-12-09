<template>
  <div class="searchList">
    <h1>영화 검색하기 🔍</h1>
    <div>
      <span>
        <div>
          <select v-model="lang" @change="langChange">
            <option value="ko-KR">한국어</option>
            <option value="en-US">English</option>
          </select>
          <input
            type="text"
            v-model="sMovie"
            placeholder="최대한 자세히 입력해주세요."
            @keyup.enter.prevent="sMovieList"
          />
          <span @click="sMovieList"> 검색 </span>
        </div>
      </span>
      <ul>
        <li v-for="(i,x) in this.mResult" :key={x}>
          <div>
            <img :src="this.backUrl+i.poster_path"  />
            <button @click="getLikes2(i.id)">담아두기 ❤️</button>
          </div>
          <div>
            <span>
              <router-link :to="`/detail/${i.id}`">
              <h2>{{i.title}}</h2>
              <h3>({{i.release_date.split("-")[0]}})</h3>
              </router-link>
            <h4>{{i.original_title}}</h4>
            </span>
            <p>{{i.overview.length > 150 ? i.overview.substr(0,150) + "..." : i.overview}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// https://api.themoviedb.org/3/keyword/spider/movies?api_key=6ae188018e371e8e0f975652b9237f00&language=en-US&include_adult=false
export default {
  data() {
    return {
      sMovie: "",
      lang: "ko-KR",
      mResult: "",
      backUrl: "https://image.tmdb.org/t/p/original",
      isExist:false,
      sTitle : "",
      sPoster : ""
    };
  },
  methods: {
    sMovieList() {
      this.mResult = "";
      this.$axios
        .get(
          // `https://api.themoviedb.org/3/search/movie?api_key=6ae188018e371e8e0f975652b9237f00&sort_by=popularity.desc&query=보스`
          `https://api.themoviedb.org/3/search/movie?api_key=6ae188018e371e8e0f975652b9237f00&language=${this.lang}&query=${this.sMovie}&page=1&include_adult=false`
        )
        .then((res) => {
          this.mResult = res.data.results;
          // console.log(this.mResult);
        })
        .catch((err) => console.log(err));
    },
    getLikes2(like){
      console.log(like);
      for(let i=0; i<this.mResult.length;  i++){
        if(like === this.mResult[i].id){
          this.sTitle = this.mResult[i].title;
          this.sPoster = this.mResult[i].poster_path;
        }
      }
          const arr = JSON.parse(localStorage.getItem("store")) || [];
          const obj = {id : like , title : this.sTitle, poster : this.sPoster };
          arr.map((d )=> {
            like === d.id ? this.isExist = true : null
          });
          if(this.isExist){
            alert("이미 담으셨어요!");
          }else{
            arr.push(obj);
            alert(`나의 리스트에 담았습니다!`);
          }
          localStorage.setItem( "store" , JSON.stringify(arr));
    }
  },

};
</script>

<style lang="scss">
.searchList {
  @include base(100%, auto, block);
  & > h1 {
    @extend %pagetitle;
  }
  & > div {
    @include base(100%, auto, block);
    margin-top: 20px;
    & > span {
      margin: 0 auto;
      @include base(800px, 80px, flex);
      @include flex(column nowrap, center, center);
      & > div {
        @include base(800px, 40px, flex);
        @include flex(row nowrap, center, center);
        & > select {
          @include base(80px, inherit, block);
          border: 1px solid var(--orititle);
          background-color: #222;
          border-top-left-radius: 40px;
          border-bottom-left-radius: 40px;
          text-align: center;
        }
        & > input {
          @include base(650px, inherit, block);
          background-color: #222;
          border-top: 1px solid var(--orititle);
          border-bottom: 1px solid var(--orititle);
          text-indent: 15px;
          &:focus {
            transition: all 0.3s ease;
            background-color: #333;
          }
        }
        & > span {
          @include base(70px, inherit, block);
          border: 1px solid var(--orititle);
          border-top-right-radius: 40px;
          border-bottom-right-radius: 40px;
          @include text("", center, 40px);
          cursor: pointer;
          background-color: rgba(103, 103, 103, 0.6);
        }
      }
    }
    // searchList 출력
    & > ul {
      @include base(100%, auto, flex);
      @include flex(column nowrap, space-between, center);
      // background-color: skyblue;
      & > li {
        @include base(800px, 280px, flex);
        @include flex(row nowrap, space-around, center);
        // background-color: pink;
        &>div:first-child{
          @include base(40%, 220px, flex);
          @include flex(column nowrap, center, center);
          &>img{
            @include base(150px, 180px, block);
            object-fit: contain;
          }
          &>button{ @extend %btn; margin-right: 0;}
        }
        &>div:last-child{
          @include base(60%, 220px, flex);
          @include flex(column nowrap, space-between, center);
          &>span{
            @include base( 100%, 80px, block);
            &>a{
              @include base(inherit, 50px, flex);
            @include flex(row wrap, start, center );
            &>h2{ width: auto;}
            &>h3{ width: 100px; text-align: center;}
            }
            &>h4{ @include base(100%, 30px, block); line-height: 30px; color: var(--orititle);}
          }
          &>p{ @include base(100%, 120px, block); font-size: 14px; line-height: 20px;}
        }
      }
    }
  }
}
</style>