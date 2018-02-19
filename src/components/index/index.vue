<template>
  <div>
    <m-header/>
    <banner :topList="topList"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Banner from 'common/banner/banner'
  import MHeader from 'common/m-header/m-header'
  import {getLatest} from 'api/index'

  export default {
    name: 'index',
    data() {
      return {
        topList: []
      }
    },
    created() {
      this._getLatest()
    },
    methods: {
      _getLatest() {
        getLatest()
        .then((response) => {
          this.topList = response.top_stories
        })
        .catch((error) => {
          console.error('内部错误，错误原因: ' + error)
        })
      }
    },
    components: {
      Banner,
      MHeader
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
