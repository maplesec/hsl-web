<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button class="filter-item" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('common.add')}}</el-button>
    </div>

    <el-dialog :title="$t('common.add') + $t('common.space') + $t('role.role')" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="form" label-position="left" label-width="70px" >
        <el-form-item :label="$t('role.name')" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" v-if="dialogStatus==='create'" @click="createRole">{{$t('common.confirm')}}</el-button>
        <el-button type="primary" v-if="dialogStatus==='edit'" @click="editRole">{{$t('common.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t('role.name')"
        width="180">
      </el-table-column>
      <el-table-column :label="$t('common.operation')">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">{{$t('common.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">{{$t('common.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>

import * as api from '@/services/role'
export default {
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      dialogStatus: '',
      form: {
        name: ''
      },
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
    initTable () {
      let service = api.getRoleList()
      service.then((res) => {
        this.tableData = res.data
      })
    },
    resetForm () {
      this.form = {
        name: ''
      }
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
      api.getRole(id).then((res) => {
        this.form = res.data || {}
        this.dialogStatus = 'edit'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
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
