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
      <SearchList :mResult="this.mResult" />
    </div>
  </div>
</template>

<script>
import SearchList from "../components/searchList.vue";

export default {
  data() {
    return {
      sMovie: "",
      lang: "ko-KR",
      mResult: "",
      backUrl: "https://image.tmdb.org/t/p/original",
    };
  },
  methods: {
    sMovieList() {
      this.mResult = '';
      this.$axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=6ae188018e371e8e0f975652b9237f00&language=${this.lang}&query=${this.sMovie}&page=1&include_adult=false`
        )
        .then((res) => {
          this.mResult = res.data.results;
        })
        .catch((err) => console.log(err));
    },
  },
  components:{
    SearchList
  }
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
  }
}
</style>