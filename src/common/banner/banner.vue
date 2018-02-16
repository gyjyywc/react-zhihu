<template>
  <div class="banner">
    <span v-for="(item,index) in picList" :key="index">
      {{ item }} + {{ index }}
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'banner',
    props: {
      picList: {
        type: Array,
        default: () => {
          return ['hello', 'world', 'everyday']
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
