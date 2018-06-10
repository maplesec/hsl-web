<template>
  <el-container>
    <sidebar></sidebar>
    <el-container>
      <el-header>
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <div class="right-menu">
          <span>{{profile.name}}</span>
          <el-button size="mini" type="primary" @click="logout()">{{$t('common.logout')}}</el-button>
        </div>
      </el-header>
      <el-main>
        <tags-view></tags-view>
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { Sidebar, TagsView, AppMain} from './components'
  import Hamburger from '@/components/Hamburger'
  import { mapGetters } from 'vuex'
  import * as api from '@/services/user'

  export default {
    name: 'layout',
    components: {
      Sidebar,
      Hamburger,
      TagsView,
      AppMain
    },
    data() {
      return {
        isCollapse: true
      };
    },
    computed: {
      ...mapGetters('app', [
        'sidebar',
        'profile'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      logout () {
        this.$doRequest(api.logout(), '登出').then((res) => {
          this.$router.push({name: 'login'});
        })
      }
    }
  }
</script>

<style>
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .right-menu {
    float: right;
    height: 100%;
  }
</style>
