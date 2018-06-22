'use strict';

var CaseContract = function () {

  //病历数量
  LocalContractStorage.defineProperty(this, "caseNums");

  //病历
  LocalContractStorage.defineMapProperty(this, "cases");
  LocalContractStorage.defineMapProperty(this, "caseIndex");

  LocalContractStorage.defineProperty(this, "adminAddress");

};

CaseContract.prototype = {

  init : function() {

    this.adminAddress = "n1PjUo1btMbhsozGGfZwFBsFj8Bs4mPd7EG";
    this.caseNums = 0;
  },

  //添加病历
  saveCase : function (history) {

    var fromUser = Blockchain.transaction.from,
        hash = Blockchain.transaction.hash;

    hash = history.hash ? history.hash : hash;

    var flag = this.cases.get(fromUser);

    if(history){
      history.fromUser = fromUser;
      history.hash = hash;
    }

    //插入
    if(!flag){
      this.caseIndex.set(this.caseNums, fromUser)
      this.caseNums += 1
    }

    this.cases.set(fromUser, history);

    return this.caseNums;
  },

  delCase : function () {

    var fromUser = Blockchain.transaction.from;

    this.cases.del(fromUser);
  },

  getCase : function (fromUser) {

    return this.cases.get(fromUser);
  },

  getCases : function (limit, offset) {

    var result = {
      total: 0,
      cases: []
    }
    var total = this.caseNums
    if (!total) {
      return result
    }
    result.total = total
    if (offset == -1) {
      offset = total - 1
    }

    for (var i = offset; i > offset - limit; i--) {
      var fromUser = this.caseIndex.get(i)
      var history = this.cases.get(fromUser)

      if(history){
        result.cases.push(history);
      }else {
        total--;
      }
    }
    return result;
  },

  getAccount(){
    var fromUser = Blockchain.transaction.from;
    var userInfo = this.cases.get(fromUser) || {};
    userInfo.fromUser = fromUser
    return userInfo;
  },

  stats: function () {
    var result = {
      caseNums: this.caseNums,
    }
    return result
  },

  withdraw: function (address, value) {

    var fromUser = Blockchain.transaction.from
    if (fromUser != this.adminAddress) {
      throw new Error("403")
    }

    var amount = new BigNumber(value * 1000000000000000000)
    var result = Blockchain.transfer(address, amount)
    return result
  }

}

module.exports = CaseContract;
