const LOGIN_SESSION_KEY = 'loginSessionKey';
const PRODuUTID = 'ProductId';
const CATEGORYID = 'categoryId';
const CHANNELID = 'BL0201';
const WXUSERINFO_KEY = 'wxUserInfo';
const WXMOBILE = 'wxmobile';
const OPENID = 'openId';
const registerUrl = '';

function isLogin() {
	var a = wx.getStorageSync(LOGIN_SESSION_KEY);
	if (null == wx.getStorageSync(LOGIN_SESSION_KEY) || '' == wx.getStorageSync(LOGIN_SESSION_KEY)) {
		return false;
	} else {
		return true;
	}
}
/**
 * 设置登录信息
 */
function setUserInfo(session) {
	try {
		wx.setStorageSync(LOGIN_SESSION_KEY, session);
	} catch (e) {
		console.log(e);
	}
}

/**
 * 提取注册渠道，跟踪码功能
 */
function setCommonality(params) {
	if (params != null && params != undefined){
		if (params.registerChannel != null) {
			//setRegisterChannel(params.registerChannel);
			setRegisterChannel("BL7504");
		} else {
			setRegisterChannel("BL7504");
		}
		if (params.trackingCode != null) {
			setTrackingCode(params.trackingCode);
		}
		if (params.q) {
			var canCodeurl = unescape(params.q); /*url解码转义*/
			var num = canCodeurl.indexOf('?') + 1;
			canCodeurl = canCodeurl.slice(num);
			var tempArr1 = canCodeurl.split('&');
			for (var i = 0; i < tempArr1.length; i++) {
				var tempArr2 = tempArr1[i].split('=')
				var key1 = tempArr2[0]
				var value = tempArr2[1]
				if (key1 == 'trackingCode') {
					setTrackingCode(value);
				}
			}
		}
	}
	
}

/**
 * 	设置注册渠道 ,
 * @param {*} data
 */
function setRegisterChannel(registerChannel) {
	try {
		wx.setStorageSync('registerChannel', registerChannel);
	} catch (e) {
		console.log(e);
	}
}
/**
 * 	获取注册渠道 ,
 * @param {*} data
 */
function getRegisterChannel() {
	if (Object.keys(wx.getStorageSync("registerChannel")).length != 0) {
		return wx.getStorageSync("registerChannel");
	}
	return null;
}

/**
 *  设置跟踪码
 * @param {*} data
 */
function setTrackingCode(trackingCode) {
	try {
		wx.setStorageSync('trackingCode', trackingCode);
	} catch (e) {
		console.log(e);
	}
}
/**
 *  获取跟踪码
 * @param {*} data
 */
function getTrackingCode() {
	if (Object.keys(wx.getStorageSync("trackingCode")).length != 0) {
		return wx.getStorageSync("trackingCode");
	}
	return null;
}

function setProductId(data) {
	try {
		wx.setStorageSync(PRODuUTID, data);
	} catch (e) {
		console.log(e);
	}
}
// 模拟用户信息
function setMyuser() {
	let s =
		'{"locked_reason":"","doudoulevel":"102","realNameLevel":"0","loginCode":"","black_account":false,"error_times":"0","memberLevelCode":"10","encode_memberId":"fa36954401189e551c25e80030e03e66","pwdStrength":"","mediaCephUrl":"","groupIds":"","member_id":"100000002726441","avatarUrl":"","nickName":"","memberLevel":"10","mobile":"15692155373","idFlag":"0","expire_in":"2400","member_name":"15692155373","member_token":"d221e74af4ed45b23eb3ff2f0903fefc73399010b8a8fe5fa1bb5ae323bf9460","remain_times":"3","isSalesman":"0","usable_stat":"0","encode_mobile":"d56bfebe7b0cd59ddfd1078d67fb2246","need_complete":false,"high_risk":false,"newRegFlag":false}';
	try {
		wx.setStorageSync(LOGIN_SESSION_KEY, s);
	} catch (e) {
		console.log(e);
	}
}
 
function getUserInfo() {
	if (Object.keys(wx.getStorageSync(LOGIN_SESSION_KEY)).length != 0) {
		console.log('userInfo', wx.getStorageSync(LOGIN_SESSION_KEY));
		return wx.getStorageSync(LOGIN_SESSION_KEY);
	}
	return null;
}

function getProductId() {
	if (Object.keys(wx.getStorageSync(PRODuUTID)).length != 0) {
		return wx.getStorageSync(PRODuUTID);
	}
	return null;
}

function setCategoryId(data) {
	try {
		wx.setStorageSync(CATEGORYID, data);
	} catch (e) {
		console.log(e);
	}
}

function getCategoryId() {
	if (Object.keys(wx.getStorageSync(CATEGORYID)).length != 0) {
		return wx.getStorageSync(CATEGORYID);
	}
	return null;
}

/**
 * 全局获取查询到的微信用户信息 uuId openId
 */
function getWxUserInfo() {
	if (Object.keys(wx.getStorageSync(WXUSERINFO_KEY)).length != 0) {
		return wx.getStorageSync(WXUSERINFO_KEY);
	}
	return null;
}
/**
 * 设置微信用户信息 uuId openId
 */
function setWxUserInfo(data) {
	try {
		wx.setStorageSync(WXUSERINFO_KEY, data);
	} catch (e) {
		console.log(e);
	}
}
/**
 * 存储微信手机授权之后手机号
 * @param {手机号码} data
 */
function setWxMobile(data) {
	try {
		wx.setStorageSync(WXMOBILE, data);
	} catch (e) {
		console.log(e);
	}
}
/**
 * 获取之前微信授权手机号
 */
function getWxMobile() {
	if (Object.keys(wx.getStorageSync(WXMOBILE)).length != 0) {
		return wx.getStorageSync(WXMOBILE);
	}
	return null;
}

function setOpenId(data) {
	try {
		wx.setStorageSync(OPENID, data);
	} catch (e) {
		console.log(e);
	}
}
function getOpenId() {
	if (Object.keys(wx.getStorageSync(OPENID)).length != 0) {
		console.log('OPENID', wx.getStorageSync(OPENID));
		return wx.getStorageSync(OPENID);
	}
	return null;
}

module.exports = {
	isLogin: isLogin,
	setUserInfo: setUserInfo,
	getUserInfo: getUserInfo,
	getProductId: getProductId,
	setProductId: setProductId,
	setCategoryId: setCategoryId,
	getCategoryId: getCategoryId,
	setMyuser: setMyuser,
	getWxUserInfo: getWxUserInfo,
	setWxUserInfo: setWxUserInfo,
	setWxMobile: setWxMobile,
	getWxMobile: getWxMobile,
	setOpenId: setOpenId,
	getOpenId: getOpenId,
	setCommonality: setCommonality,
	getRegisterChannel: getRegisterChannel,
	getTrackingCode: getTrackingCode,
};
