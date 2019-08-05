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
                <el-select v-model="reqParams.channel_id" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期：">
                <el-date-picker
                v-model="dataArr"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" >筛选</el-button>
            </el-form-item>
            </el-form>
        </el-card>

        <el-card class="list">
            <div slot="header">
                根据筛选条件共查询到 53400 条结果：
            </div>
             <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="cover"
                label="封面"
                width="180">
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                width="180">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态">
            </el-table-column>
            <el-table-column
                prop="date"
                label="发布时间"
                width="180">
            </el-table-column>
            <el-table-column
                label="操作">
            </el-table-column>
            </el-table>
            <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
// import Bread from '@/component/bread'
export default {
  data () {
    return {
      options: [{
        value: '1',
        label: 'ios'
      }, {
        value: '2',
        label: 'C++'
      }, {
        value: '3',
        label: 'Java'
      }, {
        value: '4',
        label: 'Android'
      }, {
        value: '5',
        label: '人工智能'
      }],
      reqParams: {
        status: null,
        channel_id: null
      },
      dataArr: [],
      tableData: [{
        cover: '2016-05-02',
        title: '文章1',
        status: '未审核',
        date: '2019-05-09'
      }]
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
