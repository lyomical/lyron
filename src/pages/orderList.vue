<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}} 
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl" v-for="(item,i) in order.orderItemVoList" :key="i">
                <div class="good-list">
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.currentUnitPrice}} X {{item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order == 20">
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <!-- pagination中的，v-if=false取消分布显示 -->
          <el-pagination
            v-if="false" 
            class = "pagination"
            background
            layout="prev, pager, next,jumper,total"
            :pageSize = "pageSize"
            :total="total"
            @current-change="handleChange">
          </el-pagination>
          <div class="load-more" v-if="showNextPage">
            <el-button type="primary" :loading="loading" @click="loadMore">显示更多</el-button>
          </div>
          <div class="scroll-more" 
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="100">
            <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
          </div>
          <no-data v-if="!loading && list.length == 0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import NoData from './../components/NoData'
import Loading from './../components/Loading'
import {Pagination,Button} from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  name: 'order-list',
  data() {
    return {
      loading:false,
      list:[],
      pageSize:2,//每页显示数量
      pageNum:1,//默认指向当前第1页
      total:0, //总页数
      showNextPage:false, //加载更多控制显示
      busy:false,// 滚动加载
    }
  },
  directives: {
    infiniteScroll
  },
  components:{
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]:Pagination,
    [Button.name]:Button
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList(){
      this.loading = true;      
      this.axios.get('/orders',{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize
        }
      }).then((res)=>{
        this.loading = false;
        this.list = this.list.concat(res.list);
        this.total = res.total;
        this.showNextPage = res.hasNextPage;        
      }).catch(()=>{
        this.loading = true;
      })
    },
    goPay(orderNo){
      // 三种路由跳转方式
        // this.$router.push('/order/pay')
        /*this.$router.push({
          name:'order-pay',
          query:{
            orderNo
          }
        })*/
        this.$router.push({
          path:'/order/pay',
          query:{
            orderNo
          }
        })
    },
    handleChange(pageNum){
      this.pageNum = pageNum;
      this.getOrderList();
    },
    //第二种方法，加载更多按钮
    loadMore(){
      this.pageNum ++;
      this.getOrderList();
    },
    scrollMore(){
      this.busy = true;
      setTimeout(() => {
        this.pageNum ++;
        this.getList();
      }, 500);
    },
    //专门给scrollMore使用
    getList(){
      this.loading = true;      
      this.axios.get('/orders',{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize
        }
      }).then((res)=>{
        this.loading = false;
        this.list = this.list.concat(res.list);        
        if(res.hasNextPage){
          this.busy=false;
        }else{
          this.busy=true;
        }        
      });
    }
  },
}
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .order-list{
    .wrapper{
      background-color:$colorJ;
      padding-top:33px;
      padding-bottom:110px;
      .order-box{
        .order{
          @include border();
          background-color:$colorG;
          margin-bottom:31px;
          &:last-child{
            margin-bottom:0;
          }
          .order-title{
            @include height(74px);
            background-color:$colorK;
            padding:0 43px;
            font-size:16px;
            color:$colorC;
            .item-info{
              span{
                margin:0 9px;
              }
            }
            .money{
              font-size:26px;
              color:$colorB;
            }
          }
          .order-content{
            padding:0 43px;
            .good-box{
              width:88%;
              .good-list{
                display: flex;
                align-items: center;
                height:145px;
                .good-img{
                  width:112px;
                  img{
                    width:100%;
                  }
                }
                .good-name{
                  font-size:20px;
                  color:$colorB;
                }
              }
            }
            .good-state{
              @include height(145px);
              font-size: 20px;
              color:$colorA;
              a{
                color:$colorA;
              }
            }
          }
        }
        .pagination{
          text-align:right;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{
          background-color: #FF6600;
        }
        .el-button--primary{
          background-color: #FF6600;
          border-color: #FF6600;
        }
        .load-more,.scroll-more{
          text-align:center;
        }
      }
    }
  }
</style>