<template>
    <div>
        <el-card>
            <div slot="header">
                <bread>发布文章</bread>
            </div>
            <el-form ref="form" :model="pubForm" label-width="100px">
                <el-form-item label="标题：" style="width:500px">
                    <el-input v-model="pubForm.title"></el-input>
                </el-form-item>
                <el-form-item label="内容：">
                     <quill-editor v-model="pubForm.content"
                            ref="myQuillEditor">
                    </quill-editor>
                </el-form-item>
                <el-form-item label="封面：">
                    <el-radio-group v-model="pubForm.cover.type">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                    <div class="btnImg">
                        <img src="../../assets/images/default.png" alt="">
                    </div>
                </el-form-item>
                <el-form-item label="频道：">
                    <my-channel v-model="pubForm.channel_id"></my-channel>
                </el-form-item>
                 <el-form-item>
                    <el-button type="primary">发表</el-button>
                    <el-button>存入草稿</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      pubForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
    }
  },
  components: {
    quillEditor
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
</style>
