// json对象格拼接成制定格式的字符串
const testUserIn = function () {
  // 用户名 字母 数字 和汉字
  const regName = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
  // 手机号码
  const regPhone = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
  return {
    name(name) {
      return regName.test(name);
    },
    phone(num) {
      return regPhone.test(num);
    },
    pswStrong(psw) {
      /*
          推断字符类型
      */
      function CharMode(iN) {
        if (iN >= 48 && iN <= 57) //数字
          return 1;
        if (iN >= 65 && iN <= 90) //大写字母
          return 2;
        if (iN >= 97 && iN <= 122) //小写
          return 4;else return 8; //特殊字符
      }
      /*
          统计字符类型
      */
      function bitTotal(num) {
        let modes = 0;
        for (let i = 0; i < 4; i++) {
          if (num & 1) modes++;
          num >>>= 1;
        }
        return modes;
      }
      /*
          返回密码的强度级别
      */
      function checkStrong(sPW) {
        if (sPW.length <= 4) return 0; //密码太短
        let Modes = 0;
        for (let i = 0; i < sPW.length; i++) {
          //測试每个字符的类别并统计一共同拥有多少种模式.
          Modes |= CharMode(sPW.charCodeAt(i));
        }
        return bitTotal(Modes);
      }
      return checkStrong(psw);
    }
  };
}();

const trim = function (str) {
  return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
};

const json2Form = function (json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
};
const switchStoreType = function (type) {
  switch (type) {
    case '2010':
      return '大卖场';
    case '2030':
      return '便利店';
    default:
      return '超市';
  }
};
// util.fmtDate(new Date(listData[i].orderDate), 'yyyy-MM-dd hh:mm:ss')
const fmtDate = (date, fmt) => {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds // 毫秒
    () };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
};

// 倒计时
function setTimeOut() {}
setTimeOut.prototype.setTime = function (obj = {}) {
  let self = this;
  if (this.low <= 0) {
    obj.done();
    self.clear();
  } else {
    self.T = setTimeout(() => {
      self.setTime(obj);
    }, 1000);
    obj.run(this.low);
    this.low--;
  }
};
setTimeOut.prototype.start = function (obj = {}) {
  this.now = new Date().getTime();
  // 获取倒计时剩余秒数
  this.time = this.now - obj.beginTime;
  this.low = ((obj.expTime - this.time) / 1000).toFixed(0);
  this.T = null;
  if (this.low <= 0) return;
  this.setTime(obj);
};
setTimeOut.prototype.clear = function () {
  let self = this;
  clearTimeout(self.T);
};

module.exports = {
  json2Form: json2Form,
  testUserIn: testUserIn,
  trim: trim,
  switchStoreType,
  fmtDate,
  setTimeOut
};