<template>
  <div>
    <span ref="backdrop" id="backdrop_image"></span>
    <div v-if="this.loading === true" class="loading-container">
      <div class="loading"></div>
      <div id="loading-text">loading</div>
    </div>
    <div v-else class="movielist">
      <ul>
        <li>
          <img :src="this.backUrl + this.movieDetail.poster_path" alt="" />
          <ol>
            <li>{{ this.movieDetail.original_title }}</li>
            <li>{{ this.movieDetail.runtime }}분</li>
          </ol>
        </li>
        <li>
          <div>
            <h1>
              {{ this.movieDetail.title }} ({{
                this.movieDetail.release_date.split("-")[0]
              }}) &nbsp; &nbsp; &nbsp; &nbsp; ⭐️{{
                this.movieDetail.vote_average.toFixed(1)
              }}
            </h1>
            <hr />
            <h2>줄거리</h2>
            <p>{{ this.movieDetail.overview }}</p>
            <ol>
              <li v-for="(i, t) in this.movieDetail.genres" :key="{ t }">
                {{ i.name }}
              </li>
            </ol>
            <span class="likesBtn" @click="getLikes(this.movieDetail.id)"
              >담아두기❤️</span
            >
            <span v-show="this.video" @click="this.show = true" class="trailBtn"
              >예고편 보기🔮</span
            >
          </div>
        </li>
      </ul>
    </div>
    <VideoModal
      v-if="this.show === true"
      @close="showTrailer"
      :show="this.show"
      :trailURL="videoURL"
    />
  </div>
</template>

<script>
import VideoModal from "../components/common/TrailerModal.vue";
import {mapState} from "vuex";

export default {
  data() {
    return {
      mId: "",
      movieDetail: [],
      trailer: "",
      loading: true,
      video: false,
      isExist: false,
      show: false,
    };
  },
  methods: {
    getLikes(like) {
      const arr = JSON.parse(localStorage.getItem("store")) || [];
      const obj = {
        id: like,
        title: this.movieDetail.title,
        poster: this.movieDetail.poster_path,
      };
      arr.map((d) => {
        like === d.id ? (this.isExist = true) : null;
      });
      if (this.isExist) {
        alert("이미 담으셨어요!");
      } else {
        arr.push(obj);
        alert(`나의 리스트에 담았습니다!`);
      }
      localStorage.setItem("store", JSON.stringify(arr));
    },
    showTrailer(close) {
      this.show = close;
    },
  },
  computed: {
    videoURL() {
      return `https://www.youtube.com/embed/${this.trailer}`;
    },
    ...mapState([ 'backUrl' ])
  },
  mounted() {
    this.mId = this.$route.params.id;
    this.$axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.mId}?api_key=6ae188018e371e8e0f975652b9237f00&language=ko-KR&append_to_response=videos`
      )
      .then((res) => {
        this.movieDetail = res.data;
        if(this.movieDetail.videos.results.length === 0){
          this.trailer = null;
        }else{
          this.video = true;
          this.trailer = this.movieDetail.videos.results[0].key;
        }
        this.loading = false;
        this.$refs.backdrop.style.background = `linear-gradient(
            to left,
            rgba(20, 20, 20, 0) 10%,
            rgba(20, 20, 20, 0.25) 30%,
            rgba(20, 20, 20, 0.5) 50%,
            rgba(20, 20, 20, 0.75) 70%,
            rgba(20, 20, 20, 1) 100%
          ), url("${this.backUrl}${this.movieDetail.backdrop_path}") no-repeat center center`;
        this.$refs.backdrop.style.backgroundSize = "cover";
      });
  },
  components: {
    VideoModal,
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  width: 100%;
  object-fit: contain;
}
#backdrop_image {
  position: relative;
  @include base(100%, 500px, block);
}
.movielist {
  position: absolute;
  top: 150px;
  & > ul {
    @include base(100%, auto, flex);
    @include flex(row nowrap, space-around, center);
    & > li:first-child {
      @include base(40%, 500px, flex);
      @include flex(column nowrap, space-around, center);
      & > img {
        @include base(300px, auto, block);
        box-shadow: -5px 0px 30px #000;
        object-fit: contain;
      }
      & > ol {
        @include base(300px, auto, flex);
        @include flex(row wrap, space-around, start);
        & > li {
          color: var(--orititle);
          &:first-child {
            width: 80%;
          }
          &:last-child {
            width: 20%;
          }
        }
      }
    }
    & > li:last-child {
      @include base(60%, auto, block);
      padding-right: 23%;
      text-shadow: 2px 2px 5px #000;
      & > div {
        & > h1 {
          height: 100px;
          line-height: 100px;
        }
        & > h2 {
          height: 60px;
          line-height: 60px;
        }
        & > p {
          min-height: 150px;
          line-height: 22px;
          @include font("noto", 15px, 400);
        }
        & > ol {
          @include base(auto, 30px, flex);
          @include flex(row nowrap, start, center);
          & > li {
            @include base(auto, inherit, block);
            line-height: 30px;
            margin: 0 5px 0 5px;
            color: var(--orititle);
            font-size: 14px;
          }
        }
      }
    }
  }
}
.likesBtn,
.trailBtn {
  @extend %btn;
  float: left;
}
.class {
  display: block;
}
</style>
