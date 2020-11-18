<template>
  <div class="app-layout">
    <header class="header">
        <div><img src="../assets/logo.svg" alt="" class="img"></div>
        <div>My shirt shop</div>
    </header> 

      <!-- 菜单将放这里 -->
      <NavMenu />
      <router-view></router-view>
  </div>
</template>

<script>
import NavMenu from './NavMenu'
export default {
  components: {
    NavMenu,
  }
}
</script>

<style lang="stylus">
@import '../style/main';
</style>

<style lang="stylus" scoped>
.header {
    .img {
        width: 64px;
        height: 64px;
    }
}
    
</style>