<template>
    <div>
        <el-card>
            <div slot="header">
                <bread>评论管理</bread>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="title"
                    label="标题"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="total_comment_count"
                    label="总评论数"
                    >
                </el-table-column>
                <el-table-column
                    prop="fans_comment_count"
                    label="粉丝评论数"
                    >
                </el-table-column>
                <el-table-column
                    label="状态"
                    >
                    <template slot-scope="scope">
                        {{scope.row.comment_status?'正常':'关闭'}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                   >
                   <template slot-scope="scope" >
                        <el-button v-if="!scope.row.comment_status" type="success" size="mini"
                        @click="statusToggle(scope.row)">打开评论</el-button>
                        <el-button v-else type="danger"
                        @click="statusToggle(scope.row)" size="mini">关闭评论</el-button>
                   </template>

                </el-table-column>

            </el-table>
            <el-pagination
            background
            layout="prev, pager, next"
            :current-page="reqParams.page"
            :page-size="reqParams.per_page"
            @current-change="changePage"
            :total="total">
            </el-pagination>
        </el-card>

    </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.tableData = data.results
      this.total = data.total_count
    },
    changePage (page) {
      this.reqParams.page = page
      this.getComments()
    },
    statusToggle (row) {
      const text1 = '你确定打开该文章的评论功能吗？'
      const text2 = '你确定关闭该文章的评论功能吗？'
      this.$confirm(row.comment_status ? text2 : text1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.$http.put('comments/status?article_id=' + row.id, { allow_comment: !row.comment_status })
        this.$message.success('修改文章评论状态成功')
        row.comment_status = data.allow_comment
      }).catch(() => {})
    }

  }
}

</script>
<style lang="less" scoped>
.el-pagination{
 margin-top: 20px;
}
</style>
