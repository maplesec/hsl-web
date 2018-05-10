<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button class="filter-item" @click="handleCreate(true)" type="primary" icon="el-icon-edit">{{$t('common.add')}}</el-button>
      <el-input v-model="searchValue"></el-input>
      <el-button class="filter-item" @click="initTable" type="promary">搜索</el-button>
    </div>

    <el-dialog :title="$t('common.add') + $t('common.space') + $t('user.user')" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="form" label-position="left" label-width="70px" >
        <el-form-item :label="$t('user.account')" :label-width="formLabelWidth" prop="account">
          <el-input v-model="form.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.name')" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.password')" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.checkPass')" :label-width="formLabelWidth" prop="checkPass">
          <el-input v-model="form.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-transfer v-model="form.roles" :data="roleList"></el-transfer>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" v-if="dialogStatus==='create'" @click="createUser">{{$t('common.confirm')}}</el-button>
        <el-button type="primary" v-if="dialogStatus==='edit'" @click="editUser">{{$t('common.confirm')}}</el-button>
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
        prop="account"
        :label="$t('user.account')"
        sortable="custom"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t('user.name')"
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

import * as api from '@/services/user'
import * as api2 from '@/services/role'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.pass') + this.$t(rule.field)))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.dataForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.checkPass')))
      } else if (value !== this.form.password) {
        callback(new Error(this.$t('validation.passDiff')))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      pagination: {
        totalCount: 0,
        page: 1,
        pageSize: 5,
        sortBy: null,
        sort: null
      },
      searchValue: '',
      loading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      form: {
        account: '',
        name: '',
        password: '',
        checkPass: '',
        roles: []
      },
      roleList: [],
      rules: {
        account: [
          {required: true, message: this.$t('validation.require') + this.$t('common.space') + this.$t('user.account')},
          {min: 3, max: 12, message: '3-12' + this.$t('validation.characters')}
        ],
        name: [
          {required: true, message: this.$t('validation.require') + this.$t('common.space') + this.$t('user.name')},
          {min: 3, max: 12, message: '3-12' + this.$t('validation.characters')}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
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
      this.$doRequest(api.getUserList(query), '获取用户列表', this.$showErrorType.none).then((res) => {
        setTimeout(() => {
          this.loading = false
        }, 500)
        this.tableData = res.result
        this.pagination.totalCount = res.totalCount
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
        account: ''
      }
    },
    handleCreate () {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      api2.getRoleList().then((res) => {
        this.roleList = []
        res.data.forEach((item) => {
          this.roleList.push({
            key: item.id,
            label: item.name
          })
        })
      })
    },
    createUser () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const params = {
            name: this.form.name,
            account: this.form.account,
            password: this.form.password
          }
          api.addUser(params).then(() => {
            this.initTable()
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleEdit (id) {
      api.getUser(id).then((res) => {
        this.form = res.data || {}
        this.dialogStatus = 'edit'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        api2.getRoleList().then((res) => {
          this.roleList = []
          res.data.forEach((item) => {
            this.roleList.push({
              key: item.id,
              label: item.name
            })
          })
          api.getUserRoles(id).then((res) => {
            console.log('roles', res)
          })
        })
      })
    },
    editUser () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const params = {
            name: this.form.name,
            account: this.form.account,
            password: this.form.password
          }
          let params2 = {roles: []}
          this.form.roles.forEach((item) => {
            params2.roles.push(item.toString())
          })
          this.$doRequest(api.editUser(this.form.id, params), '编辑用户').then(() => {
            api.setUserRoles(this.form.id, params2).then(() => {
              this.initTable()
              this.dialogFormVisible = false
            })
          })
        }
      })
    },
    handleDelete (id, row) {
      console.log('delete', id, row)
      api.deleteUser(id).then(() => {
        this.initTable()
      })
    }
  }
}
</script>
