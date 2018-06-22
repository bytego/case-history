<template>
  <div class="add-house">
    <my-head centerTitle="新增病例" :showLeft="false"></my-head>
    <group>
      <x-input title="姓名" v-model="name" :required="true"></x-input>
      <selector title="性别" :options="['男','女']" v-model="sex" :required="true"></selector>
      <datetime title="出生日期" start-date="1940-01-11" v-model="birthday" :required="true"></datetime>
      <x-input title="职业" v-model="profession" :required="true"></x-input>
      <x-input title="籍贯" v-model="origin" :required="true"></x-input>
      <x-input title="民族" v-model="nation" :required="true"></x-input>
      <x-switch title="是否隐藏" v-model="isOpen" :value-map="[0,1]"></x-switch>
    </group>
    <!--<group>-->
      <!--<x-textarea title="现病史" v-model="pMH" placeholder="请填写现病史" :show-counter="false" :rows="3"></x-textarea>-->
      <!--<x-textarea title="既往史" v-model="oMH" placeholder="请填写既往史" :show-counter="false" :rows="3"></x-textarea>-->
      <!--<x-textarea title="家族史" v-model="fMH" placeholder="请填写家族史" :show-counter="false" :rows="3"></x-textarea>-->
    <!--</group>-->
    <ul class="case-info">
      <li>
        <h5>病例史</h5>
        <textarea autocomplete="off" v-model="pMH" autocapitalize="off" autocorrect="off"></textarea>
      </li>
      <li>
        <h5>既往史</h5>
        <textarea autocomplete="off" v-model="pMH" autocapitalize="off" autocorrect="off"></textarea>
      </li>
      <li>
        <h5>家族史</h5>
        <textarea autocomplete="off" v-model="pMH" autocapitalize="off" autocorrect="off"></textarea>
      </li>
    </ul>
    <x-button type="primary" @click.native="addHouse">病历上链</x-button>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="addHouse">确定</x-button>
    </box>

  </div>
</template>
<script>
import {Group, XInput, Cell, PopupRadio, XSwitch, XTextarea, XButton, Box, XAddress, ChinaAddressV4Data, Datetime, Selector} from 'vux'
import MyHead from '../components/head'
import house from '../lib/house.js'

export default {
  components: {MyHead, Group, XInput, Cell, PopupRadio, XSwitch, XTextarea, XButton, Box, XAddress, Datetime, Selector},
  data () {
    return {
      name: null, // 标题
      sex: '', // 房租
      birthday: null, // 楼层
      profession: null, // 装修程度
      origin: null, // 是否电梯
      nation: null,
      isOpen: '0',
      pMH: null,
      oMH: null, // 联系号码
      fMH: null
    }
  },
  methods: {
    addHouse () {
      var data = {
        name: this.name,
        sex: this.sex,
        birthday: this.birthday,
        profession: this.profession,
        origin: this.origin,
        nation: this.nation,
        isOpen: this.isOpen || 0,
        pMH: this.pMH,
        oMH: this.oMH,
        fMH: this.fMH
      }

      var cur = this
      var errorMsg = null
      if (!data.name) {
        errorMsg = '个人姓名不能为空'
      } else if (!data.pMH) {
        errorMsg = '请输入你的现病史'
      } else if (!data.oMH) {
        errorMsg = '请输入你的既往病史'
      } else if (!data.fMH) {
        errorMsg = '请输入你的家族病史，如无，请填写无病史'
      }
      if (errorMsg) {
        this.$vux.toast.text(errorMsg)
        return
      }
      house.addHouse(data, res => {
        if (res.code == 0) {
          this.$vux.toast.show({
            text: '新增成功!',
            onHide () {
              cur.$router.push({
                name: 'detail',
                query: {
                  id: cur.myAddress
                }
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .add-house {
    /*padding-top: 2.2rem;*/
    .case-info{
      padding: 0 15px;
      background: #f1f1f1;
      padding-bottom: 10px;
      h5{
        font-size: 16px;
        padding: 10px 0;
      }
      textarea{
        width: 100%;
        border: 1px #ddd solid;
        border-radius: 4px;
        height: 100px;
        outline: none;
        padding: 10px;
        box-sizing: border-box;
      }
    }
  }

  .house-icon {
    padding: 1rem 0 0;
    overflow: hidden
  }

  .house-icon li {
    float: left;
    width: 16.6%;
    height: 2.8rem
  }

  .house-icon li .icon {
    width: 22px;
    height: 22px;
    background: url(../assets/images/house-device.png) no-repeat;
    background-size: auto 55px;
    margin: 0 auto;
    opacity: 0.5;
    color: #b3acac;
  }

  .house-icon li .text {
    text-align: center;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    margin-top: .28rem;
    color: #afaaaa;
  }

  .house-icon .hasdev {
    .icon {
      opacity: 1;
      color: #00AA98;
      background-image: url("../assets/images/house-device-has.png") !important;
    }
    .text {
      color: #00AA98;
    }
  }

  .house-icon li .text.gray {
    color: #dbdbdb;
    text-decoration: line-through
  }

  .house-icon li .gray {
    background-position-y: bottom
  }

  .house-icon li .eq-kuandai {
    background-position-x: 0
  }

  .house-icon li .eq-kongtiao, .house-icon li .eq-zhong_yan_kong_tiao {
    background-position-x: -27px
  }

  .house-icon li .eq-reshuiqi {
    background-position-x: -55px
  }

  .house-icon li .eq-xiyiji {
    background-position-x: -82px
  }

  .house-icon li .eq-bingxiang {
    background-position-x: -112px
  }

  .house-icon li .eq-duliweishengjian {
    background-position-x: -139px
  }

  .house-icon li .eq-ji_zhong_gong_nuan, .house-icon li .eq-nuanqi {
    background-position-x: -170px
  }

  .house-icon li .eq-yangtai {
    background-position-x: -200px
  }

  .house-icon li .eq-yigui {
    background-position-x: -230px
  }

  .house-icon li .eq-dianshiji, .house-icon li .eq-you_xian_dian_shi {
    background-position-x: -259px
  }

  .house-icon li .eq-kezuofan {
    background-position-x: -290px
  }

  .house-icon li .eq-shafa {
    background-position-x: -324px
  }

  .house-icon li .eq-chuang {
    background-position-x: -359px
  }

  .house-icon li .eq-weibolu {
    background-position-x: -394px
  }

  .house-icon li .eq-dian_ti, .house-icon li .eq-keti {
    background-position-x: -481px
  }

  .house-icon li .eq-huoti {
    background-position-x: -453px
  }

  .house-icon li .eq-futi {
    background-position-x: -423px
  }

  .house-icon li .eq-shui {
    background-position-x: -710px
  }

  .house-icon li .eq-tingchewei {
    background-position-x: -567px
  }

  .house-icon li .eq-ranqi {
    background-position-x: -510px
  }

  .house-icon li .eq-wangluo {
    background-position-x: -594px
  }

  .house-icon li .eq-dian {
    background-position-x: -626px
  }

  .house-icon li .eq-dianhua {
    background-position-x: -654px
  }

  .house-icon li .eq-mei_qi {
    background-position-x: -688px
  }

  .house-icon li .eq-shangshui {
    background-position-x: -710px
  }

  .house-icon li .eq-xiashui {
    background-position-x: -732px
  }

  .house-icon li .eq-guanmei {
    background-position-x: -754px
  }

  .house-icon li .eq-paiyan {
    background-position-x: -776px
  }

  .house-icon li .eq-paiwu {
    background-position-x: -798px
  }

  .house-icon li .eq-380v {
    background-position-x: -820px
  }

  .house-icon li .eq-keminghuo {
    background-position-x: -688px
  }

  .house-icon li .eq-waibaiqu {
    background-position-x: -842px
  }
</style>
<style rel="stylesheet/scss">
  .weui-switch:checked {
    border-color: #00AA98 !important;
    background-color: #00AA98 !important;
  }

  .weui-btn_primary {
    background-color: #00AA98 !important;
  }
</style>
