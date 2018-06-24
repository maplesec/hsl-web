<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input v-model="searchValue" style="width: 200px;"></el-input>
      <el-button class="filter-item" @click="handleCreate(true)" type="primary" icon="el-icon-edit">{{$t('common.add')}}</el-button>

      <el-button class="filter-item" @click="initTable" type="promary">搜索</el-button>
    </div>

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

    <el-dialog :title="$t('common.add') + $t('common.space') + $t('user.user')" :visible.sync="dialog.dialogVisible" @open="dialog.contentVisible = true" @closed="dialog.contentVisible = false">
      <create-user v-if="dialog.contentVisible" :data="dialog.info"></create-user>
    </el-dialog>
  </div>
</template>

<script>

import * as api from '@/services/user'
import * as api2 from '@/services/role'
import createUser from './modal/createUser.vue'

export default {
  components: {
    createUser
  },
  data () {
    return {
      searchValue: '',
      dialog: {
        dialogVisible: false,
        contentVisible: false,
        info: {
          status: 'create',
          id: ''
        }
      },
    }
  },
  computed: {
    tableData(){
      return this.$store.state.user.list.data;
    },
    loading(){
      return this.$store.state.user.list.loading;
    },
    pagination() {
      return this.$store.state.user.list.pagination;
    }
  },
  created () {
    this.initTable()
  },
  methods: {
    initTable (isSearch) {
      if (isSearch) {
        this.$store.dispatch('user/setPagination', {page: 1});
      }
      const query = {
        page: this.pagination.page,
        pageSize: this.pagination.pageSize,
        filter: this.searchValue,
        sortBy: this.pagination.sortBy,
        sort: this.pagination.sort
      }
      this.$store.dispatch('user/getList', query).then((e)=>{
          console.log(this.$store.state.user.list.pagination)
        //TODO: 出错的提示
      })
    },
    handleSizeChange (val) {
      this.$store.dispatch('user/setPagination', {pageSize: val});
      this.initTable()
    },
    handleCurrentChange (val) {
      this.$store.dispatch('user/setPagination', {page: val});
      this.initTable()
    },
    handleSortChange (val) {
      this.$store.dispatch('user/setPagination', {sortBy: val.prop});
      if (val.order) {
        this.$store.dispatch('user/setPagination', {sort: val.order === 'ascending' ? 'asc' : 'desc'});
      } else {
        this.$store.dispatch('user/setPagination', {sort: null});
      }
      this.initTable()
    },



    handleCreate () {
      // 设置需要传输的数据
      this.dialog.info = {
        status: 'create',
        id: ''
      }
      // 设置visible
      this.dialog.dialogVisible = true
      return;



    },
    handleEdit (id) {

    },
    handleDelete (id, row) {
      console.log('delete', id, row)
      this.$doRequest(api.deleteUser(id), '删除用户').then(() => {
        this.initTable()
      })
    }
  }
}
</script>
