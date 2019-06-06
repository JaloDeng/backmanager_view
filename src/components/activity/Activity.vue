<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;justify-content:space-between;align-items: center">
        <div style="display: inline; text-align:center">
          <el-input placeholder="" clearable @change="keywordsChange" style="width: 500px;"  size="mini"
            @keyup.enter.native="search" prefix-icon="el-icon-search" v-model="activity.title"></el-input>
          <el-button type="primary" size="mini" style="" icon="el-icon-search" @click="search"></el-button>
        </div>
        <div style="float: right;margin-right: 20px;display: inline">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddView">添加活动</el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <el-table :data="activities" v-loading="tableLoading" size="mini" style="width: 100%;border-radius: 4px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" border="0" cell-style="text-align: center" header-cell-style="text-align: center">
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column prop="title" label="主题"></el-table-column>
            <el-table-column prop="statusName" label="状态"></el-table-column>
            <el-table-column prop="sponsor" label="主办方"></el-table-column>
            <el-table-column prop="releaseTime" label="发布时间"></el-table-column>
            <el-table-column prop="fromTime" label="开始时间"></el-table-column>
            <el-table-column prop="toTime" label="结束时间"></el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
              <template slot-scope="scope">
                <el-button @click="showEditView(scope.row)" size="mini" style="padding: 3px 4px 3px 4px;margin: 2px">编辑</el-button>
                <el-button @click="del(scope.row)" size="mini" type="danger" style="padding: 3px 4px 3px 4px;margin: 2px">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <div style="justify-content:space-between;">
            <el-pagination background :page-sizes="sizes" :page-size="size" @size-change="sizeChange" :current-page="page" @current-change="currentChange"
              layout="sizes, prev, pager, next, ->, total" :total="total" style="text-align:center"></el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-form :model="activity" :rules="rules" ref="addForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left;">
        <el-dialog :title="dialogTitle" style="padding: 0px" :close-on-click-modal="false" :visible.sync="dialogVisible" :before-close="cancelEdit" width="80%">
          <el-row :gutter="5">
            <el-col :span="6">
              <div>
                <el-form-item label="主题" prop="title">
                  <el-input prefix-icon="el-icon-edit" v-model="activity.title" size="mini" style="width: 300px" placeholder="请输入活动主题"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="摘要" prop="summary">
                  <el-input prefix-icon="el-icon-edit" v-model="activity.summary" size="mini" style="width: 300px" placeholder="请输入活动摘要"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="主办方" prop="sponsorId">
                  <el-input prefix-icon="el-icon-user" v-model="activity.sponsorId" size="mini" style="width: 300px" placeholder="请输入活动主办方"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="1">
            <el-col :span="6">
              <div>
                <el-form-item label="起始时间" prop="fromTime">
                  <el-input prefix-icon="el-icon-time" v-model="activity.fromTime" size="mini" style="width: 300px" placeholder="请输入活动起始时间"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="结束时间" prop="toTime">
                  <el-input prefix-icon="el-icon-time" v-model="activity.toTime" size="mini" style="width: 300px" placeholder="请输入活动结束时间"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="地址" prop="address">
                  <el-input prefix-icon="el-icon-location" v-model="activity.address" size="mini" style="width: 300px" placeholder="请输入活动地址"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="详情" prop="detail">
                  <el-input prefix-icon="el-icon-edit" v-model="activity.detail" size="mini" style="width: 300px" placeholder="请输入活动详情"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="费用说明" prop="expenseExplanation">
                  <el-input prefix-icon="el-icon-edit" v-model="activity.expenseExplanation" size="mini" style="width: 300px" placeholder="请输入活动费用说明"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="报名须知" prop="notice">
                  <el-input prefix-icon="el-icon-edit" v-model="activity.notice" size="mini" style="width: 300px" placeholder="请输入活动报名须知"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="备注" prop="remark">
                  <el-input prefix-icon="el-icon-edit" v-model="activity.remark" size="mini" style="width: 300px" placeholder="请输入活动备注"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="发布时间" prop="releaseTime">
                  <el-input prefix-icon="el-icon-time" v-model="activity.releaseTime" size="mini" style="width: 300px" readonly="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <editor v-model="activity.title"></editor>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEdit">取消</el-button>
            <el-button size="mini" type="primary" @click="add('addForm')">确认</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>

<script>
import editor from '../utils/Editor'

export default {
  data () {
    return {
      activities: [],
      activity: {
        id: '',
        status: '',
        title: '',
        summary: '',
        sponsorId: '',
        homePath: '',
        serialNumber: '',
        editor: '',
        fromTime: '',
        toTime: '',
        address: '',
        detail: '',
        expenseExplanation: '',
        refundExplanation: '',
        notice: '',
        clickCount: '',
        likeCount: '',
        shareCount: '',
        remark: '',
        releaseTime: '',
        createTime: '',
        updateTime: ''
      },
      dialogTitle: '',
      dialogVisible: false,
      page: 1,
      size: 10,
      sizes: [10, 20, 50],
      tableLoading: false,
      total: 0
    }
  },
  methods: {
    add (form) {
      alert('点击添加确定按钮')
    },
    cancelEdit () {
      this.dialogVisible = false
      this.emptyData()
    },
    currentChange (currentChange) {
      this.page = currentChange
      this.load()
    },
    del (row) {
      this.$confirm('此操作将永久删除[' + row.title + ']，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        alert('点击删除')
      }).catch(() => {
      })
    },
    emptyData () {
      this.activity = {
        id: '',
        status: '',
        title: '',
        summary: '',
        sponsorId: '',
        homePath: '',
        serialNumber: '',
        editor: '',
        fromTime: '',
        toTime: '',
        address: '',
        detail: '',
        expenseExplanation: '',
        refundExplanation: '',
        notice: '',
        clickCount: '',
        likeCount: '',
        shareCount: '',
        remark: '',
        releaseTime: '',
        createTime: '',
        updateTime: ''
      }
    },
    keywordsChange (val) {
      if (val === '') {
        this.search()
      }
    },
    load () {
      var _this = this
      this.tableLoading = true
      _this.activity.page = this.page
      _this.activity.size = this.size
      this.postRequest2('/getActivityList', _this.activity).then(resp => {
        this.tableLoading = false
        if (resp && resp.status === 200) {
          var data = resp.data
          _this.activities = data.data
          _this.total = data.total
        }
      })
    },
    search () {
      this.page = 1
      this.load()
    },
    showAddView () {
      this.dialogTitle = '添加'
      this.dialogVisible = true
    },
    showEditView (row) {
      this.dialogTitle = '编辑'
      this.activity = row
      this.dialogVisible = true
    },
    sizeChange (sizeChange) {
      this.size = sizeChange
      this.load()
    }
  },
  mounted: function () {
    this.load()
  },
  components: {
    editor
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
