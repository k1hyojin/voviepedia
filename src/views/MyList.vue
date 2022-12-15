<template>
  <div>
    <h1>내가 좋아하는 영화들 🎞</h1>
    <div class="deleteAll">
      <button @click="deleteAllList">전체삭제</button>
    </div>
    <MyMovieCard  @deletemine="removeMyList" />
  </div>
</template>

<script>
import MyMovieCard from "../components/MyMovieCard.vue";
import {mapGetters} from 'vuex';
export default {
  methods: {
    deleteAllList() {
      if (
        confirm(" 전체삭제 하시겠습니까? 확인을 누르시면 복구되지 않습니다. ")
      ) {
        localStorage.removeItem("store");
        location.reload();
      }
    },
    removeMyList(discard) {
      for (let i = 0; i < this.myMovie.length; i++) {
        if (discard === this.myMovie[i].id) {
          this.myMovie.splice(i, 1);
          i--;
        }
      }
      localStorage.setItem("store", JSON.stringify(this.myMovie));
    },
  },
  components: {
    MyMovieCard,
  },
  computed:{
    ...mapGetters(['myMovie'])
  },
  mounted(){
    this.$store.commit('loadMovie');
  }
};
</script>

<style lang="scss" scoped>
h1 {
  @extend %pagetitle;
}
.deleteAll {
  @include base(1000px, 60px, flex);
  margin: 0 auto;
  @include flex(row nowrap, end, center);
  & > button {
    @extend %btn;
  }
}
</style>