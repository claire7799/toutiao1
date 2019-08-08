<template>
     <!-- clearable清除 -->
     <!-- v-model="reqParams.channel_id"双向绑定在组件中无效只能用于input
        组件双向绑定数据 用:value="value" @change="fn"  $emit
      -->
                <el-select :value="value"  @change="fn" placeholder="请选择" clearable>
                    <el-option
                    v-for="item in channelOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
    // 空字符处理成null
      if (val === '') { val = null }
      this.$emit('input', val)
    }
  }
  // watch 侦听器的使用场景：当你需要监听某一个属性的变化，去做一些开销较大操作(异步操作)
  //   watch: {
  //     'reqParams.channel_id': function (newVal, oldVal) {
  //       if (newVal === '') {
  //         this.reqParams.channel_id = null
  //       }
  //     }
  //   }

}
</script>

<style>

</style>
