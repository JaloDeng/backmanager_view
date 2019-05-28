<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input placeholder="" clearable @change="keywordsChange" style="width: 300px;margin: 0px;padding: 0px;"  size="mini"
            @keyup.enter.native="search" prefix-icon="el-icon-search" v-model="activity.title"></el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="search"></el-button>
        </div>
        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddActivityView">添加活动</el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <el-table :data="activities" v-loading="tableLoading" size="mini" style="width: 100%" border="0">
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column prop="title" label="主题"></el-table-column>
            <el-table-column prop="statusName" label="状态"></el-table-column>
            <el-table-column prop="sponsor" label="供应商"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
          </el-table>
          <div style="justify-content:space-between;">
            <el-pagination background :page-size="10" :current-page="activity.page" @current-change="currentChange"
              layout="total, prev, pager, next" :total="total" style="text-align:center"></el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-form :model="activity" :rules="rules" ref="addActivityForm" style="margin: 0px;padding: 0px;">
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activities: [],
      activity: {
        title: '',
        page: 1,
        size: 10
      },
      tableLoading: false,
      total: 0
    }
  },
  methods: {
    currentChange (currentChange) {
      this.activity.page = currentChange
      this.loadActivities()
    },
    search () {
      this.activity.page = 1
      this.loadActivities()
    },
    keywordsChange (val) {
      if (val === '') {
        this.search()
      }
    },
    showAddActivityView () {
      alert('点击添加活动按钮')
    },
    loadActivities () {
      var _this = this
      this.tableLoading = true
      this.postRequest2('/getActivityList', _this.activity).then(resp => {
        this.tableLoading = false
        if (resp && resp.status === 200) {
          var data = resp.data
          _this.activities = data.data
          _this.total = data.total
        }
      })
    }
  },
  mounted: function () {
    this.loadActivities()
  }
}
</script>

<style>
  .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
