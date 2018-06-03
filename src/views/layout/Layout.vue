<template>
  <el-container>
    <sidebar></sidebar>
    <el-container>
      <el-header>
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
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
        'sidebar'
      ])
    },
    methods: {
      toggleSideBar() {
          //this.isCollapse = !this.isCollapse;
          //console.log(this.isCollapse)
        this.$store.dispatch('app/toggleSideBar')
      }
    }
  }
</script>
