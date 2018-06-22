<style rel="stylesheet/scss" lang="scss" scoped>
  .about-us {
    font-family: 微软雅黑;
    /*background: url("../assets/images/logo.jpg") no-repeat;*/
    background-size: cover;
    padding-top: 1rem;
    height: 100%;
    width: 100%;
    position: fixed;
    font-size: .8rem;
    .title {
      text-align: center;
    }
    .us {
      text-align: right;
      font-size: 0.7rem;
    }
    .title .num{
      color: #f30707;
      font-size: 25px;
      margin: 0 10px;
    }
  }
</style>
<template>
  <div class="about-us">
    <div class="title"><b>病历库</b></div>
    <div style="padding: .5rem">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过区块链的激励机制，激励人们上传自己的病历到链上，区块链技术能够更好的保存人们的病历。通过链上的病历大数据分析，为科研人员研究人类的疾病史带来帮助，查看病历库需要一定的token，构成病历库生态价值循环。

      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;此DAPP基于星云链，发布病历信息上链需使用星云链钱包：<a href="https://nano.nebulas.io">https://nano.nebulas.io/</a></p>

      <!--<div class="title" >病历库共有<span class="num">100</span>（份）上链病历</div>-->
      <hr>
      <p class="us">联系我们：who1753@163.com</p>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
