<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {}
  },
  mounted() {
   this.getUser();
   this.getCartCount();
   //判断用户信息是否还存在cookie里，如果不存在，则因用户已退出
   if(this.$cookie.get('userId')){
     this.getUser();
     this.getCartCount();
   }
  },
  methods: {
   getUser(){
    this.axios.get('/user').then((res={})=>{
     //to-do 保存到vuex里
     this.$store.dispatch('saveUserName',res.username);
    })
   },
   getCartCount(){
    this.axios.get('/carts/products/sum').then((res=0)=>{
     //to-do 保存到vuex里
     this.$store.dispatch('saveCartCount',res);
    })
   }
  },
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>
