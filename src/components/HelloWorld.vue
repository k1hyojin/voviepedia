<template>
  <div>hello</div>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>

<style lang="scss">
div{
  @include abc(100px);
  border: 1px solid $hi;
}
</style>
