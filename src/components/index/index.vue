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
      this._getLatest()
    },
    methods: {
      _getLatest() {
        getLatest()
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.error('内部错误，错误原因: ' + error)
        })
      }
    },
    components: {
      Banner
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
