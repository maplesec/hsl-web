<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button class="filter-item" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('common.add')}}</el-button>
      <el-input v-model="searchValue"></el-input>
      <el-button class="filter-item" @click="initTable" type="promary">搜索</el-button>
    </div>

    <el-dialog :title="$t('common.add') + $t('common.space') + $t('role.role')" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="form" label-position="left" label-width="120px" class="demo-dynamic">
        <el-form-item :label="$t('role.name')" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(resource, index) in form.resources"
          :label="'资源' + index"
          :key="resource.key"
        >
          <el-col :span="8">
            <el-form-item
              :prop="'resources.' + index + '.value'"
              :rules="{
                required: true, message: '资源不能为空', trigger: 'blur'
              }">
              <el-select v-model="resource.value" placeholder="选择资源">
                <el-option
                  v-for="item in resourceOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            -
          </el-col>
          <el-col :span="8">
            <el-form-item
              :prop="'resources.' + index + '.operation'"
              :rules="{
                required: true, message: '操作不能为空', trigger: 'blur'
              }">
              <el-select v-model="resource.operation" placeholder="选择权限">
                <el-option
                  v-for="item in operationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            -
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button @click.prevent="removeResource(resource)" style="float:right">删除</el-button>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="addResource">新增资源</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" v-if="dialogStatus==='create'" @click="createRole">{{$t('common.confirm')}}</el-button>
        <el-button type="primary" v-if="dialogStatus==='edit'" @click="editRole">{{$t('common.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-table
      v-loading="loading"
      :data="tableData"
      @sort-change="handleSortChange"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t('role.name')"
        sortable="custom"
        width="180">
      </el-table-column>
      <el-table-column :label="$t('common.operation')">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">{{$t('common.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">{{$t('common.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.page"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.totalCount">
    </el-pagination>
  </div>

</template>

<script>

import * as api from '@/services/role'
import * as api2 from '@/services/resource'
// import * as api2 from '@/services/resource'
export default {
  data () {
    return {
      tableData: [],
      pagination: {
        totalCount: 0,
        page: 1,
        pageSize: 5,
        sortBy: '',
        sort: ''
      },
      searchValue: '',
      loading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      form: {
        name: '',
        resources: [{
          value: ''
        }]
      },
      resourceOptions: [],
      operationOptions: [{
        value: 'show',
        label: '查看'
      }, {
        value: 'operate',
        label: '操作'
      }],
      rules: {
        name: [
          {required: true, message: this.$t('validation.require') + this.$t('common.space') + this.$t('role.name')},
          {min: 3, max: 12, message: '3-12' + this.$t('validation.characters')}
        ]
      },
      formLabelWidth: '120px'
    }
  },
  created () {
    this.initTable()
  },
  methods: {
    initTable (isSearch) {
      this.loading = true
      if (isSearch) {
        this.pagination.page = 1
      }
      const query = {
        page: this.pagination.page,
        pageSize: this.pagination.pageSize,
        filter: this.searchValue,
        sortBy: this.pagination.sortBy,
        sort: this.pagination.sort
      }
      this.$doRequest(api.getRoleList(query), '获取角色列表', this.$showErrorType.none).then((res) => {
        setTimeout(() => {
          this.loading = false
        }, 200)
        this.tableData = res.result
        this.pagination.totalCount = res.totalCount
      }, (err) => {
        if (err) {
          console.log(err)
        }
        setTimeout(() => {
          this.loading = false
        }, 200)
      })
    },
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.initTable()
    },
    handleCurrentChange (val) {
      this.pagination.page = val
      this.initTable()
    },
    handleSortChange (val) {
      this.pagination.sortBy = val.prop
      if (val.order) {
        this.pagination.sort = val.order === 'ascending' ? 'asc' : 'desc'
      } else {
        this.pagination.sort = null
      }
      this.initTable()
    },
    resetForm () {
      this.form = {
        name: '',
        resources: [{
          value: '',
          key: Date.now()
        }]
      }
    },
    removeResource (item) {
      var index = this.form.resources.indexOf(item)
      if (index !== -1) {
        this.form.resources.splice(index, 1)
      }
    },
    addResource () {
      this.form.resources.push({
        value: '',
        key: Date.now()
      })
    },
    handleCreate () {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createRole () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const params = {
            name: this.form.name
          }
          api.addRole(params).then(() => {
            this.initTable()
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleEdit (id) {
      this.$doRequest(api.getRole(id), '获取指定角色', this.$showErrorType.none).then((res) => {
        this.form = res || {}
        this.dialogStatus = 'edit'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        this.$doRequest(api2.getResourceAll(), '获取资源列表', this.$showErrorType.none).then((res) => {
          this.resourceOptions = []
          res.result.forEach((item) => {
            this.resourceOptions.push({
              value: item.name,
              label: item.name
            })
          })
        })
      })
    },
    editRole () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const params = {
            name: this.form.name
          }
          api.editRole(this.form.id, params).then(() => {
            this.initTable()
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleDelete (id, row) {
      console.log('delete', id, row)
      api.deleteRole(id).then(() => {
        this.initTable()
      })
    }
  }
}
</script>
<style>
  .demo-dynamic .el-input {
    /*margin-right: 10px;*/
    /*width: 270px;*/
    /*vertical-align: top;*/
  }
</style>
