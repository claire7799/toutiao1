<template>
    <div class="publish-content">
        <el-card>
            <div slot="header">
                <bread>{{articleId?'修改文章':'发表文章'}}</bread>
            </div>
            <el-form ref="form" :model="pubForm" label-width="100px">
                <!-- 标题字符要在5-30个，否则会报错 无法提交  可以做个判断提示一下 -->
                <el-form-item label="标题：" style="width:500px">
                    <el-input v-model="pubForm.title"></el-input>
                </el-form-item>
                <el-form-item label="内容：">
                    <!-- 富文本 -->
                     <quill-editor v-model="pubForm.content"
                     :options="editorOption"
                     ref="myQuillEditor">
                    </quill-editor>
                </el-form-item>
                <el-form-item label="封面：">
                    <el-radio-group v-model="pubForm.cover.type" @change="changeType">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                    <div v-if="pubForm.cover.type===1">
                        <my-image v-model="pubForm.cover.images[0]"></my-image>
                    </div>
                    <div v-if="pubForm.cover.type===3">
                        <my-image v-model="pubForm.cover.images[0]"></my-image>
                        <my-image v-model="pubForm.cover.images[1]"></my-image>
                        <my-image v-model="pubForm.cover.images[2]"></my-image>
                    </div>
                </el-form-item>
                <el-form-item label="频道：">
                    <my-channel v-model="pubForm.channel_id"></my-channel>
                </el-form-item>
                 <el-form-item v-if="!articleId">
                    <el-button type="primary" @click="submit(false)">发表</el-button>
                    <el-button @click="submit(true)">存入草稿</el-button>
                </el-form-item>
                <el-form-item v-else>
                    <el-button type="primary" @click="update(false)">修改</el-button>
                    <el-button @click="update(true)">存入草稿</el-button>
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
      // 富文本配置项
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }]
          ]
        }
      },
      pubForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      dialogVisible: false,
      articleId: null
    }
  },
  components: {
    quillEditor
  },
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) {
      this.getArticle()
    }
  },
  watch: {
    $route () {
      if (!this.$route.query.id) {
        this.articleId = null
        this.pubForm = {
          title: '',
          content: '',
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  methods: {
    changeType () {
      this.pubForm.cover.images = []
    },
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.pubForm)
      this.$message.success(draft ? '文章存入草稿成功' : '文章发表成功')
      this.$router.push('/article')
    },
    async getArticle () {
      const { data: { data } } = await this.$http.get(`articles/${this.$route.query.id}`)
      this.pubForm = data
    },
    async update (draft) {
      await this.$http.put(`articles/${this.$route.query.id}?draft=${draft}`, this.pubForm)
      this.$message.success(draft ? '文章存入草稿成功' : '文章发表成功')
      this.$router.push('/article')
    }
  }

}
</script>

<style scoped lang="less">

</style>
