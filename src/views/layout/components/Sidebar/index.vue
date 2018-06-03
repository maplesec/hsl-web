<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="!sidebar.opened">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <router-link :to="'/user'">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">用户</span>
      </el-menu-item>
    </router-link>
    <router-link :to="'/role'">
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">角色</span>
      </el-menu-item>
    </router-link>
    <router-link :to="'/resource'">
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">资源</span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('app', [
          'sidebar'
      ])
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

