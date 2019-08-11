import Bread from '@/component/bread'
import Channel from '@/component/channel'
import Image from '@/component/image'
// vue插件 暴露一个对象  对象中有一个选项  install 安装意思
export default {
  install (Vue) {
    // 安装函数  当Vue.use(使用插件) install被调用
    // Vue 全局的vue对象
    Vue.component(Bread.name, Bread)
    Vue.component(Channel.name, Channel)
    Vue.component(Image.name, Image)
  }
}
