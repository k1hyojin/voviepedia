<template>
  <nav>
    <ul>
        <li v-for="(item,i) in nav" :key='{i}'>
            <router-link :to='item.path'>{{item.menu}}</router-link>
        </li>
    </ul>
  </nav>
</template>

<script>
export default {
    data(){
        return{
            nav : [
                { path : "/", menu: "Home"},
                { path : "/search", menu: "Search"},
                { path : "/mypage", menu: "Mypage"},
            ]
        }
    }
};
</script>

<style lang="scss">
nav {
  @include base(100%, 50px, block);
  & > ul {
    @include base(350px, 50px, flex);
    padding-right: 80px;
    @include flex(row nowrap, space-around, center);
    float: right;
    &>li{
        @include base(80px, 30px, flex);
        @include flex(row nowrap, space-around, center);
        &>a{ color: #ccc !important;}
    }
  }
}
</style>