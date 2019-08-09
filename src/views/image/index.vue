<template>
    <div class="container">
    <el-card>
        <div slot="header">
            <bread>素材管理</bread>
        </div>
        <div class="btn-box">
            <el-radio-group v-model="reqParams.collect" size="small" @change="changeCollect">
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <el-button type="success" style="float:right" size="small" @click="openDiolog()">添加素材</el-button>
        </div>
        <div class="list">
            <div class="item" v-for="item in imglist" :key="item.id">
                <img :src="item.url" alt="">
                <!-- 收藏列表的字体图标底部隐藏 -->
                <div class="footer" v-show="!reqParams.collect">
                    <span class="el-icon-star-off" :class="{selected:item.is_collected}"
                    @click="toggleCollect(item)"
                    ></span>
                    <span class="el-icon-delete" @click="deleteCollect(item)"></span>
                </div>
            </div>
        </div>
        <el-pagination
        background
        v-if="imgcount>reqParams.per_page"
        layout="prev, pager, next"
        :page-size = "reqParams.per_page"
        :current-page = "reqParams.page"
        @current-change = "changePage"
        :total="imgcount">
        </el-pagination>
        </el-card>
        <!-- 上传素材对话框 -->
        <el-dialog
        title="添加素材"
        :visible.sync="dialogVisible"
        width="300px"
        >
        <span class="upload">
            <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="uploadHeaders"
            name="image"
            >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">关 闭</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import store from '@/store'
export default {

  data () {
    return {
      // 传参
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      //   素材列表
      imglist: [],
      //   素材总数
      imgcount: 0,
      //  上传素材对话框隐藏
      dialogVisible: false,
      //   上传素材地址
      imageUrl: null,
      //  上传素材请求头
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    //   渲染素材列表
    this.getImgList()
  },
  methods: {
    //   获取后台素材
    async getImgList () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.imglist = data.results
      this.imgcount = data.total_count
    },
    // 切换收藏素材列表
    changeCollect () {
      console.log(this.reqParams.collect)

      this.reqParams.page = 1
      this.getImgList()
    },
    // 切换页数 渲染页面
    changePage (newpage) {
      this.reqParams.page = newpage
      this.getImgList()
    },
    // 打开对话框
    openDiolog () {
      this.imageUrl = null
      this.dialogVisible = true
    },
    // 上传成功的函数
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      //   两秒自动关闭对话框 设置定时器
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImgList()
      }, 2000)
    },
    // 切换收藏
    async toggleCollect (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      item.is_collected = data.collect
    },
    deleteCollect (item) {
      this.$confirm('此操作将永久删除该素材, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${item.id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getImgList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.list{
    width: 100%;
    margin-top: 20px;
    .item{
        width: 160px;
        height: 160px;
        border:1px dashed #ddd;
        position: relative;
        display: inline-block;
        margin-right: 50px;
        margin-bottom: 20px;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
        .footer{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            background:rgba(black,0.6);
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            span{
                margin:0 20px;
                // &.selected是设置span的selected属性的样式
                 &.selected{
                color:red;
                }
            }

        }
    }
}
.upload{
    display: block;
    width: 180px;
    height: 180px;
    border: 1px dashed #d9d9d9;
    margin: 0 auto;

}

</style>
