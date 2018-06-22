<template>
  <div class="app-container">
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="foot-tabs">
      <ul>
        <router-link v-for="(v,n) in menus" :key="n" :to="{ name: v.name }" tag="li" active-class="selected">
          <i class="iconfont" :class="v.iconCls"></i>
          <span>{{v.title}}</span><i class="iconfont icon-red-dot" v-if="counts(v.name) > 0"></i>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menus: [{
        title: '病历库',
        name: 'search',
        iconCls: 'icon-sousuo'
      }, {
        title: '我的病历',
        name: 'myCase',
        iconCls: 'icon-wode'
      }, {
        title: '关于',
        name: 'setting',
        iconCls: 'icon-guanyu'
      }]
    }
  },
  mounted () {
  },
  methods: {
    counts: function (name) {
      return 0
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  html,body,#app{
    height: 100%;
    width: 100%;
  }
  .app-container{
    height: 100%;
    width: 100%;
    .content{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 57px;
    }
  }
  .foot-tabs {
    font-size: .65rem;
    position: fixed;
    bottom: 0px;
    width: 100%;
    box-shadow: 0px -1px 3px #ccc;
    z-index: 99;
    background-color: #ffffff;
    ul{
      display: flex;
      li{
        position: relative;
        padding: 6px;
        display: inline;
        width:33%;
        text-align: center;
        letter-spacing: 2px;
        color: #999;
        line-height: 1.3;
        i{
          display: block;
          font-size: 1.1rem;
        }
        .icon-red-dot{
          position: absolute;
          color: red;
          top: -8%;
          right: 20%;
          font-size: 1.375rem;
        }
      }
      li.selected{
        font-family: 'Microsoft YaHei', Arial, sans-serif;
        color: #00AA98;
        img{
          opacity: 1;
        }
      }
    }
  }
</style>
