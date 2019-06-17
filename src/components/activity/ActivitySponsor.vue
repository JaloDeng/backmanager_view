<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;justify-content:space-between;align-items: center">
        <div style="display: inline; text-align:center">
          <el-input placeholder="" clearable @change="keywordsChange" style="width: 500px;"  size="mini"
            @keyup.enter.native="search" prefix-icon="el-icon-search" v-model="activitySponsor.name"></el-input>
          <el-button type="primary" size="mini" style="" icon="el-icon-search" @click="search"></el-button>
        </div>
        <div style="float: right;margin-right: 20px;display: inline">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddView">添加主办方</el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <el-table :data="activitySponsors" v-loading="tableLoading" size="mini" style="width: 100%;border-radius: 4px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" border="0" cell-style="text-align: center" header-cell-style="text-align: center">
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="score" label="星级分数"></el-table-column>
            <el-table-column prop="contact" label="联系人"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
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
    <el-form :model="activitySponsor" :rules="rules" ref="saveForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left;">
        <el-dialog :title="dialogTitle" style="padding: 0px" :close-on-click-modal="false" :visible.sync="dialogVisible" :before-close="cancelEdit" width="80%">
          <el-row :gutter="5">
            <el-col :span="6">
              <div>
                <el-form-item label="名称" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="activitySponsor.name" size="mini" style="width: 300px" placeholder="请输入名称"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="联系人" prop="contact">
                  <el-input prefix-icon="el-icon-edit" v-model="activitySponsor.contact" size="mini" style="width: 300px" placeholder="请输入联系人"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="电话" prop="phone">
                  <el-input prefix-icon="el-icon-user" v-model="activitySponsor.phone" size="mini" style="width: 300px" placeholder="请输入电话"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="1">
            <el-col :span="6">
              <div>
                <el-form-item label="地址" prop="address">
                  <el-input prefix-icon="el-icon-time" v-model="activitySponsor.address" size="mini" style="width: 300px" placeholder="请输入地址"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="宣传口号" prop="declaration">
                  <el-input prefix-icon="el-icon-time" v-model="activitySponsor.declaration" size="mini" style="width: 300px" placeholder="请输入宣传口号"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="简介" prop="summary">
                  <el-input prefix-icon="el-icon-location" v-model="activitySponsor.summary" size="mini" style="width: 300px" placeholder="请输入简介"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEdit">取消</el-button>
            <el-button size="mini" type="primary" @click="save('saveForm')">确认</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activitySponsors: [],
      activitySponsor: {
        id: '',
        serialNumber: '',
        name: '',
        contact: '',
        phone: '',
        address: '',
        logoPath: '',
        score: '',
        declaration: '',
        summary: '',
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
    save (formName) {
      var _this = this
      if (_this.activitySponsor.score === '') {
        _this.activitySponsor.score = 0
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postRequest2('/saveActivitySponsor', _this.activitySponsor).then(resp => {
            if (resp && resp.status === 200) {
              _this.dialogVisible = false
              _this.emptyData()
              _this.load()
            }
          })
        }
      })
    },
    cancelEdit () {
      this.dialogVisible = false
      this.emptyData()
      this.load()
    },
    currentChange (currentChange) {
      this.page = currentChange
      this.load()
    },
    del (row) {
      this.$confirm('此操作将永久删除[' + row.name + ']，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        alert('点击删除')
      }).catch(() => {
      })
    },
    emptyData () {
      this.activitySponsor = {
        id: '',
        serialNumber: '',
        name: '',
        contact: '',
        phone: '',
        address: '',
        logoPath: '',
        score: '',
        declaration: '',
        summary: '',
        createTime: '',
        updateTime: ''
      }
    },
    getActivitySponsorById () {
      this.postRequest2('/getActivitySponsorById?id=' + this.activitySponsor.id, null).then(resp => {
        if (resp && resp.status === 200) {
          var data = resp.data
          this.activitySponsor = data.data
        }
      })
    },
    keywordsChange (val) {
      if (val === '') {
        this.search()
      }
    },
    load () {
      var _this = this
      this.tableLoading = true
      _this.activitySponsor.page = this.page
      _this.activitySponsor.size = this.size
      this.postRequest2('/getActivitySponsorList', _this.activitySponsor).then(resp => {
        this.tableLoading = false
        if (resp && resp.status === 200) {
          var data = resp.data
          _this.activitySponsors = data.data
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
      this.activitySponsor = row
      this.dialogVisible = true
      this.getActivitySponsorById()
    },
    sizeChange (sizeChange) {
      this.size = sizeChange
      this.load()
    }
  },
  mounted: function () {
    this.load()
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
