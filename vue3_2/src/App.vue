<template>
  <!-- keep-alive 用法 Component是当前要渲染的组件 -->
  <!-- <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view> -->
  <router-view />
  <van-tabbar route>
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/mine" icon="orders-o">课程页</van-tabbar-item>
    <van-tabbar-item to="/profile" icon="manager-o">个人中心</van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss"></style>
