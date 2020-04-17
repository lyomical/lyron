<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>             
    <div class="footer-link">
      <a href="javascript:;" target="_blank">Mi主页</a><span>|</span>
      <a href="javascript:;" target="_blank">Vue全栈</a><span>|</span>
      <a href="javascript:;" target="_blank">React全家桶</a><span>|</span>
      <a href="javascript:;" target="_blank">微信支付专项（H5+小程序+Node+Mongo）</a>
    </div>
    <div class="copyright">Copyright ©2019 <span class="domain">mi.futurefe.com</span> All Rights Reserved.</div>
  </div>
</template>
<script>
export default {
  name: 'nav-footer'
}
</script>
<style lang="scss" scoped>
  .footer{
    height:234px;
    border-top:4px solid #FF6600;
    background-color:#333333;
    color:#999999;
    font-size:16px;
    text-align:center;
    .footer-logo{
      margin-top:46px;
      margin-bottom:31px;
      img{
        width:53px;
        height:36px;
        margin-bottom:13px;
      }
    }
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
      margin-bottom:13px;
    }
    .copyright{
      .domain{
        color:#FF6600;
      }
    }
  }
</style>
