<template>
  <div class="house-search">
    <div class="case-container">
      <div class="search-cent">
        <input type="text" v-model="searchText" placeholder="搜索病例...">
      </div>
      <ul class="case-warp">
        <li v-for="(item, index) in matchArr"
            @click="toDetail(item.fromUser)"
            :key="'item'+index">
          <img src="../assets/images/no-house.png">
          <div class="case-info">
            <h5>{{ item.name }}</h5>
            <p>
              <span>职业:</span>
              <span>{{ item.profession }}</span>
            </p>
            <p>
              <span>籍贯:</span>
              <span>{{ item.origin }}</span>
              <span>名族:</span>
              <span>{{ item.nation }}</span>
            </p>
          </div>
        </li>
      </ul>
      <div v-if="!cases || cases.length == 0" class="noHouses">
        暂无病历数据！
      </div>
    </div>
    <i class="iconfont icon-shuaxin" @click="refreshHouse"></i>
  </div>
</template>
<style src="../assets/css/list_house.css" scoped></style>
<script>
import house from '../lib/house.js'
import {Group, XAddress} from 'vux'

export default {
  components: {Group, XAddress},
  data () {
    return {
      name: '',
      searchText: '',
      cases: [],
      matchArr: []
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    toDetail (houseId) {
      this.$router.push({
        name: 'detail',
        query: {
          id: houseId
        }
      })
    },
    loadData () {
      var rs = []
      this.$vux.loading.show({
        text: '加载中....'
      })
      house.getHouses((data) => {
        this.$vux.loading.hide()
        if (data && data.cases) {
          data.cases.forEach(h => {
            if (this.canSee(h)) {
              rs.push(h)
            }
          })
        }
      })
      this.cases = rs
      this.matchArr = rs
    },
    canSee (house) {
      // if (house.isOpen == 1) {
      //   return false;
      // }
      return true
    },
    matchText(text) {
      let arr = []
      this.cases.forEach(item => {
        if (item.name.indexOf(text) !== -1) {
          arr.push(item)
        }
      })
      this.matchArr = arr
    },
    getTimeStr (str) {
      return str ? moment(str).format('YYYY-MM-DD hh:mm') : '未知'
    },
    refreshHouse () {
      this.loadData()
    }
  },
  watch: {
    searchText () {
      if (this.searchText === '') {
        this.matchArr = this.cases
      } else {
        this.matchText(this.searchText)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .house-search {
    width: 100%;
    .case-container {
      .search-cent {
        padding: 15px;
        background: #49A798;
        input {
          width: 100%;
          border-radius: 4px;
          height: 31px;
          background: #fff;
          padding: 0 12px;
          box-sizing: border-box;
        }
      }
    }
    .case-warp {
      padding: 15px;
      li {
        display: flex;
        border: 1px #ddd solid;
        border-radius: 4px;
        padding: 15px;
        margin-bottom: 15px;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .3);
        &:last-child {
          margin-bottom: 0;
        }
        img {
          width: 60px;
          height: 60px;
          border-radius: 4px;
        }
        .case-info {
          margin-left: 15px;
          h5 {
            font-weight: 600;
            font-size: 16px;
          }
          p {
            span:nth-child(2) {
              margin-right: 10px;
            }
          }
        }
      }
    }
    .noHouses {
      text-align: center;
      font-size: 16px;
    }
    .iconfont {
      position: absolute;
      right: 15px;
      bottom: 15px;
      font-size: 24px;
      z-index: 999999;
    }
  }
</style>
