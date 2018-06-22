<template>
  <div class="case-details">
    <my-head centerTitle="病历明细" @headBack="backList"></my-head>

    <group label-width="5em" title="基本信息:">
      <div class="card-cont">
        <cell primary="content" title="姓名:" :value="house.name"></cell>
        <cell title="性别:" align-items="flex-start" :value="house.profession"></cell>
        <cell title="籍贯:" align-items="flex-start" :value="house.origin"></cell>
        <cell title="民族:" align-items="flex-start" :value="house.nation"></cell>
        <cell title="出生日期:" align-items="flex-start" :value="getTimeStr(house.birthday)"></cell>
      </div>

    </group>

    <div class="blank"></div>

    <group label-width="5em" title="病历:">
      <div class="card-cont">
        <cell primary="content" title="现病史:" :value="house.pMH"></cell>
        <cell title="既往史:" align-items="flex-start" :value="house.oMH"></cell>
        <cell title="家族史:" align-items="flex-start" :value="house.fMH"></cell>
      </div>
    </group>

    <div class="blank"></div>
  </div>
</template>
<style src="../assets/css/index.css" scoped></style>
<script>
import MyHead from '../components/head'
import house from '../lib/house.js'

import {Cell, Group} from 'vux'

export default {
  components: {MyHead, Group, Cell},
  data () {
    return {
      house: {},
      rented: 0
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      let self = this
      var id = this.$route.query.id
      if (id) {
        this.$vux.loading.show({
          text: '加载中'
        })

        house.getHouse(id, (rs) => {
          this.house = rs || {}
          self.$vux.loading.hide({
            text: '加载中'
          })
        })

        // house.getAccount({}, res => {
        //   if (res.code == 0) {
        //
        //   }
        // });
      } else {
        this.$vux.alert.show({
          text: '数据不存在',
          onHide () {
            self.$router.push({
              name: 'search'
            })
          }
        })
      }
    },
    getTimeStr (str) {
      return str ? moment(str).format('YYYY-MM-DD hh:mm') : '未知'
    },
    backList () {
      this.$router.go(-1)
    },
    typeName (type) {
      var name = null
      this.rentHouseTypes.forEach(rh => {
        if (rh.key == type) {
          name = rh.value
          return false
        }
      })
      return name
    },
    jubao () {
      this.$vux.toast.text('暂未实现')
    },
    hasDevice (key) {
      var devices = this.house.devices || []
      var flag = false
      devices.forEach(d => {
        if (d == key) {
          flag = true
          return false
        }
      })
      return flag
    },
    concatMe () {
      if (!this.house.concatPhone) {
        this.$vux.toast.text('房东没有留下联系信息!')
      }
    },
    rentNow () {
      if (this.rented) {
        return
      }
      this.house.rented = 1
      house.addHouse(this.house, res => {
        if (res.code == 0) {
          this.rented = 1
        }
      }, this.house.money)
    }
  },
  computed: {
    rentHouseTypes () {
      return this.$store.state.rentHouseTypes
    },
    devices () {
      return this.$store.state.devices
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .case-details{
    .house-broker {
      .iconfont {
        color: #00AA98;
        font-size: .9rem;
      }
    }
    .house-header {
      .back {
        height: 2rem;
        line-height: 2rem;
        color: #00AA98;
        font-size: .8rem;
      }
      padding-top: 2.8rem;
    }
    .concat-me {
      line-height: 22px !important;
      font-size: .6rem !important;;
      color: #693a2f !important;
    }
    .rented {
      width: 5rem;
      height: 5rem;
      position: absolute;
      z-index: 200;
      right: 2rem;
      top: 2rem;
      background: url("../assets/images/rented.png") no-repeat;
      background-size: 5rem 4.5rem;
      opacity: 0.7;
    }
  }
  .weui-cells{
    padding: 15px !important;
    .card-cont{
      border: 1px #ddd solid;
      background: #fff;
      border-radius: 4px;
    }
  }
</style>
