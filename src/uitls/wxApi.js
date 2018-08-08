var Promise = require('./../plugins/es6-promise.min.js');
var util = require('./util.js');

function wxPromisify(fn) {
    return function (obj = {}) {
        return new Promise((resolve, reject) => {
            obj.success = function (res) {
                //成功
                resolve(res);
            };
            obj.fail = function (res) {
                //失败
                reject(res);
            };
            fn(obj);
        });
    };
};
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(value => P.resolve(callback()).then(() => value), reason => P.resolve(callback()).then(() => {
        throw reason;
    }));
};
/**
 * 微信用户登录,获取code
 */
function wxLogin() {
    return wxPromisify(wx.login);
}
/**
 * 获取微信用户信息
 * 注意:须在登录之后调用
 */
function wxGetUserInfo() {
    return wxPromisify(wx.getUserInfo);
}
/**
 * 获取系统信息
 */
function wxGetSystemInfo() {
    return wxPromisify(wx.getSystemInfo);
}
/**
 * 关闭当前页面，跳转到应用内的某个页面
 */
function wxRedirectTo(obj = {}) {
    let data = obj.data === undefined ? '' : util.json2Form(obj.data);
    let url = obj.url + '?' + data;
    wx.redirectTo({
        url: url
    });
}
/**
 * 关闭所有页面，跳转到应用内的某个页面
 */
function wxReLaunch(obj = {}) {
    let data = obj.data === undefined ? '' : util.json2Form(obj.data);
    let url = obj.url + '?' + data;
    wx.reLaunch({
        url: url
    });
}
/**
 * 保留当前页面，跳转到应用内的某个页面
 * 使用wx.navigateBack可以返回到原页面。
 */
function wxNavigateTo(obj = {}) {
    let data = obj.data === undefined ? '' : util.json2Form(obj.data);
    console.log("wxNavigateTo data 参数=", data);
    let url = obj.url + '?' + data;
    wx.navigateTo({
        url: url
    });
}
/*
 * 跳转到一级页面，一级页面不能带参数
 */
function wxSwitchTab(obj = {}) {
    let url = obj.url;
    wx.switchTab({
        url: url
    });
}
module.exports = {
    wxPromisify: wxPromisify,
    wxLogin: wxLogin,
    wxGetUserInfo: wxGetUserInfo,
    wxGetSystemInfo: wxGetSystemInfo,
    wxNavigateTo: wxNavigateTo,
    wxSwitchTab: wxSwitchTab,
    wxRedirectTo: wxRedirectTo,
    wxReLaunch: wxReLaunch
};