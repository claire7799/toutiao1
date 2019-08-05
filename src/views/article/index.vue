<template>
    <div>
        <el-card>
             <div slot="header">
                 <!-- 面包屑 -->
                 <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                </el-breadcrumb>
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
    </div>
</template>

<script>

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
      dataArr: []
    }
  }
}
</script>

<style>

</style>
