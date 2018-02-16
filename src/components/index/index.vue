<template>
  <div>
    <banner/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Banner from 'common/banner/banner'
  import {getLatest} from 'api/index'

  export default {
    name: 'index',
    created() {
      getLatest()
    },
    components: {
      Banner
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
