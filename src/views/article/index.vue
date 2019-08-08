<template>
    <div>
        <el-card>
             <div slot="header">
                 <!-- 面包屑 -->
                <bread>内容管理</bread>

            </div>
            <el-form  label-width="80px" size="small">
            <el-form-item label="状态：">
                <el-radio-group v-model="reqParams.status">
                    <el-radio :label="null">全部</el-radio>
                    <el-radio  :label="0">草稿</el-radio>
                    <el-radio  :label="1">待审核</el-radio>
                    <el-radio  :label="2">审核成功</el-radio>
                    <el-radio :label="3">审核失败</el-radio>
                 </el-radio-group>
            </el-form-item>
            <el-form-item label="频道：" >
              <!-- 频道组件 -->
             <my-channel v-model="reqParams.channel_id"></my-channel>
            </el-form-item>
            <el-form-item label="日期：">
                <el-date-picker
                v-model="dataArr"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeDate"
                value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="select">筛选</el-button>
            </el-form-item>
            </el-form>
        </el-card>

        <el-card class="list">
            <div slot="header">
                根据筛选条件共查询到 {{this.total}} 条结果：
            </div>
             <el-table
            :data="articles"

            style="width: 100%">
            <el-table-column
                prop="cover"
                label="封面"
                width="180">
                <template slot-scope="scope">
                    <el-image :src="scope.row.cover.images[0] " fit:cover style="width:90px;height:60px">
                        <div slot="error">
                            <img src="../../assets/images/error.gif" style="width:90px;height:60px">
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                width="180">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.status ===1">待审核</el-tag>
                  <el-tag v-if="scope.row.status ===2" type="success">审核通过</el-tag>
                  <el-tag v-if="scope.row.status ===0" type="info">草稿</el-tag>
                  <el-tag v-if="scope.row.status ===3" type="warning">审核失败</el-tag>
                  <el-tag v-if="scope.row.status ===4" type="danger">已删除</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="pubdate"
                label="发布时间"
                width="180">

            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                   <el-button type="primary" icon="el-icon-edit" circle plain @click="edit(scope.row.id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle plain
                    @click="del(scope.row.id)"></el-button>
                </template>
            </el-table-column>
            </el-table>
            <el-pagination
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            :total="total"
            @current-change="changePage"

            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
// import Bread from '@/component/bread'
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      dataArr: [],
      articles: [],
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {

    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    select () {
      this.reqParams.page = 1
      this.getArticles()
    },
    changeDate (dataArr) {
      if (dataArr) {
        this.reqParams.begin_pubdate = dataArr[0]
        this.reqParams.end_pubdate = dataArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    edit (id) {
      // 跳转到发布文章页面
      this.$router.push('/publish?id=' + id)
    },
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getArticles()
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

<style lang="less" scoped>
    .list{
        margin-top: 20px;
    }
    .el-pagination{
        text-align: center;
    }
</style>
