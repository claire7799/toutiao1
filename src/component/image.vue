<template>
  <div class="myimage">
    <div class="btnImg"  @click="OpenDialog()">
      <img :src="value||defaultimg" alt />
    </div>
    <!-- 上传图片对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <!-- 顶部切换 -->
      <el-tabs v-model="activeName" type="card" class="box">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group v-model="reqParams.collect" size="mini" @change="collectChange">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="container">
            <div class="img-item" v-for="item in images" :key="item.id" @click="selectedImg(item.url)"
            :class="{selected:selectedImgurl===item.url}"
            >
              <img :src="item.url" alt />
            </div>
          </div>
         <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            v-if="total>reqParams.per_page"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePages"
            >
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">

            <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="uploadHeaders"
            :on-success="uploadSuccess"
            name="image"
            >
            <img v-if="upimageUrl" :src="upimageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImg()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultimg from '../assets/images/default.png'
export default {
  name: 'my-image',
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      selectedImgurl: null,
      upimageUrl: null,
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      defaultimg
    }
  },
  props: ['value'],
  methods: {
    //  点击上传图片，打开对话框
    OpenDialog () {
      this.dialogVisible = true

      //   清空上次选中的图片
      this.selectedImgurl = null
      this.upimageUrl = null
      //   渲染素材列表
      this.getImages()
    },
    // 获取素材库图片
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 切换 到收藏
    collectChange () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 换页码
    changePages (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 从素材库选择图片显示到对话框页面
    selectedImg (url) {
      this.selectedImgurl = url
    },
    // 上传图片显示到对话框页面
    uploadSuccess (res) {
      this.upimageUrl = res.data.url
    },
    // 确定上传的图片显示到页面
    confirmImg () {
      if (this.activeName === 'image') {
        //   把确定的图片地址赋值给value
        this.$emit('input', this.selectedImgurl)
      } else {
        this.$emit('input', this.upimageUrl)
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="less">
.btnImg{
    width:150px;
    height: 150px;
    border:1px dashed #ddd;
    img{
        width: 100%;
        height: 100%;
        display: block;
    }
}
.container{
    margin-top: 10px;
}
.img-item{
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    margin-right: 10px;
    margin-bottom: 20px;
    display: inline-block;
    position: relative;
    &.selected{
        &::after{
            position: absolute;
            // 不加content图片加载不出来
            content:'';
            left: 0;
            top:0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6) url(../assets/images/selected.png) no-repeat center/50px 50px;
        }
    }
    img{
        width: 100%;
        height: 100%;
        // 属性的作用：图片填充的规则，等比例缩放 完整显示在容器内
        object-fit: contain;
    }

}

.dialog-footer{
    width: 100%;
    display: block;
    text-align: center;
}
// 大盒子
.myimage{
    display: inline-block;
    margin-right: 20px;
}
</style>
