<template>
  <ul class="searchResult">
    <li v-for="(i, x) in this.mResult" :key="{ x }">
      <div>
        <img :src="i.poster_path === null ?require('../assets/noimage.svg') : oriUrl+ i.poster_path" />
        <button @click="getLikes2(i.id)">담아두기 ❤️</button>
      </div>
      <div>
        <span>
          <router-link :to="`/detail/${i.id}`">
            <h2>{{ i.title }}</h2>
            <h3>({{ i.release_date.split("-")[0] }})</h3>
          </router-link>
          <h4>{{ i.original_title }}</h4>
        </span>
        <p>
          {{
            i.overview.length > 150
              ? i.overview.substr(0, 150) + "..."
              : i.overview
          }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      isExist: false,
      sTitle: "",
      sPoster: "",
    };
  },
  props: {
    mResult: Array,
    noimage: String
  },
  methods: {
    getLikes2(like) {
      for (let item of this.mResult) {
        if (like === item.id) {
          this.sTitle = item.title;
          this.sPoster = item.poster_path;
        }
      }
      const arr = JSON.parse(localStorage.getItem("store")) || [];
      const obj = { id: like, title: this.sTitle, poster: this.sPoster };
      arr.map((d) => {
        d.id === like ? this.isExist = true : this.isExist =false;
      });
      if (this.isExist) {
        alert("이미 담으셨어요!");
      } else {
        arr.push(obj);
        alert(`나의 리스트에 담았습니다!`);
      }
      localStorage.setItem("store", JSON.stringify(arr));
    },
  },
  computed:mapState([
    'oriUrl'
  ])
};
</script>

<style lang="scss" scoped>
.searchResult {
  @include base(100%, auto, flex);
  @include flex(column nowrap, space-between, center);
  // background-color: skyblue;
  & > li {
    @include base(800px, 280px, flex);
    @include flex(row nowrap, space-around, center);
    // background-color: pink;
    & > div:first-child {
      @include base(40%, 220px, flex);
      @include flex(column nowrap, center, center);
      & > img {
        @include base(150px, 180px, block);
        object-fit: contain;
      }
      & > button {
        @extend %btn;
        margin-right: 0;
      }
    }
    & > div:last-child {
      @include base(60%, 220px, flex);
      @include flex(column nowrap, space-between, center);
      & > span {
        @include base(100%, 80px, block);
        & > a {
          @include base(inherit, 50px, flex);
          @include flex(row wrap, start, center);
          & > h2 {
            width: auto;
          }
          & > h3 {
            width: 100px;
            text-align: center;
          }
        }
        & > h4 {
          @include base(100%, 30px, block);
          line-height: 30px;
          color: var(--orititle);
        }
      }
      & > p {
        @include base(100%, 120px, block);
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>