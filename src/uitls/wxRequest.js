const Promise = require('./../plugins/es6-promise.min.js');
const configData = require('./config.js');
const loginUtils = require('./loginUtils.js');
const wxApi = require('./wxApi.js');
const getRequesUrl = configData.config;
const resoucePath = configData.resoucePath;
const CHANNELID = "BL0201";
//微信code获取key 和openId
var userData={};
var requestParame = {}
var payParame = {}
var motto = {}
var storeId = {}
var userInfo = {}
var encStr={}
var response = {
	msg: "",
	obj: "",
	resCode: ""
}
var resdata = {};
var scanCodCheck=false;
var selfOrderCheck=false;
function wxPromisify(fn,url) {
	return function(obj = {}) {
		return new Promise((resolve, reject) => {
			obj.success = function(res) {
				//成功
				response = res.data;
				console.log("tpMall返回=", response);
				//如果是登陆失效 直接跳进登录页面
				if(response.resCode == "1080002") {
//					getloginByUUID(loginUtils.getWxUserInfo());
//					wx.navigateTo({
//							url: './../../pages/login/login',
//						})
					reject(response.msg);
				} else if(1==1) {
					if (response!=null){
//						var value = utils.Decrypt(response.obj)
						 var value =  response
						console.log("请求"+url+"tpMall返回参数=" + value);
						resolve(value);
					}else{
						resolve(null);
					}

				} else {
					reject(response);
				}
			};
			obj.fail = function(res) {
				//失败
				console.log(url+"请求失败：", res);
				reject(res);
			};
			fn(obj);
		});
	};
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function(callback) {
	let P = this.constructor;
	return this.then(value => P.resolve(callback()).then(() => value), reason => P.resolve(callback()).then(() => {
		throw reason;
	}));
};
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url,data = {}) {
	var data = data;
	 requestParame.url = url;
	requestParame.data = data
	console.log("get请求入参:"+requestParame);
	var getRequest = wxPromisify(wx.request,url);
	return getRequest({
		url: url,
		method: 'GET',
		data: data,
		header: {
			'Content-Type': 'application/json'
		}
	});
	
}

/*
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, parame = {}) {
	if(loginUtils.getOpenId() != null || loginUtils.getOpenId() != undefined){
		parame.deviceType = "xcx";
		parame.deviceId = loginUtils.getOpenId();
	}else{
		parame.deviceType = "xcx";
		parame.deviceId = "";
	}
	console.log("data", JSON.stringify(parame));
//  encStr = utils.Encrypt(JSON.stringify(parame));
	requestParame.url = url;
	requestParame.headerType = 'form-data'
	requestParame.data = parame
	console.log(requestParame);
	var postRequest = wxPromisify(wx.request,url);
	// 设置Content-Type 类型 为form-data
	var headerType = requestParame.headerType;
	var url = requestParame.url;
	var isToken = requestParame.isToken;
	var data = requestParame.data;
	var token = null;
	var header = {};
	header['Content-Type'] = "application/json";
	// 如果设置了请求头信息 遍历请求头的所有属性添加到请求头中
	if(!!requestParame.header) {
		for(let p in requestParame.header) {
			if(requestParame.header.hasOwnProperty(p) && !header.hasOwnProperty(p)) {
				header[p] = requestParame.header[p];
			}
		}
	};
	if(headerType === "form-data") {
		header['Content-Type'] = "application/x-www-form-urlencoded;  charset=UTF-8";
	};
	if(isToken) {
		token = wx.getStorageSync('MemberData').memberToken;
		if(!!!token) {
			console.log("token 丢失！！");
		} else {
			header['token'] = token;
			console.log("读取到本地token=", token);
		}
	};
	return postRequest({
		url: url,
		method: 'POST',
		data: data,
		header: header
	});
}

//调取支付接口
function payment(content = {}) {
	payParame = content;
	getlogin();
}

function getlogin() {
	wx.login({
		success: function(res) {
			if(res.code) {
				getDataSession(res.code)
			} else {
				console.log('获取用户登录态失败！' + res.errMsg)
			}
		}
	});
}
/**
 * 需要获取微信绑定手机号公共方法
 */
function getPhoneNumber(e) {
	wx.login({
		success:function(res){
			if(res.code){
				if (e.detail.errMsg != 'getPhoneNumber:fail user deny'){
					var encryptedData=e.detail.encryptedData;
					var iv=e.detail.iv;
					var openidurl = getRequesUrl.getWechatOpendId;
					var data = {
						js_code: res.code
					}
					postRequest(openidurl,data).then(res=>{
						var value = JSON.parse(res);
						var body = JSON.parse(value.body);
						if(body.openid != null) {
							//发起网络请求
							var openid=body.openid;
							var sessionKey=body.session_key;
							var pc = new WXBizDataCrypt(openid, sessionKey)
							var data = pc.decryptData(encryptedData , iv)
							return data;
						}
					});
					} else {
					}
			}else{
			}
		}
	})
}




/**
 * 微信授权获取用户信息解密
 */
function getwxUserInfo(){
	return new Promise(function (resolve, reject) {
	//获取微信登录授权
		wx.login({
			success:function(res){
				if (res.code) {
					var openidurl = getRequesUrl.getWechatOpendId;
					var data = {
						js_code: res.code
					}
					//获取OpenId
					postRequest(openidurl, data).then(res => {
						var value = JSON.parse(res);
						var body = JSON.parse(value.body);
						if(body.openid != null) {
							//发起网络请求
							var openid=body.openid;
							var sessionKey=body.session_key;
							var pc = new WXBizDataCrypt(openid, sessionKey)
							 wx.getUserInfo({
								success:function(res){
									console.log("用户同意了授权");
									var userInfo = res.userInfo
									var nickName = userInfo.nickName
									var avatarUrl = userInfo.avatarUrl
									var gender = userInfo.gender //性别 0：未知、1：男、2：女
									var province = userInfo.province
									var city = userInfo.city
									var country = userInfo.country
									var encryptedData=res.encryptedData;
									var iv=res.iv;
									var data = pc.decryptData(encryptedData , iv)
									loginUtils.setWxUserInfo(data);
									resolve(data)
								},
								fail:function (error) {
									console.log("用户拒绝了授权");
									reject(error)
								}
							})
						} else {
							var imageurl = "/assets/images/login_close_btn.png";
							wx.showToast({
								title: '获取OpenId失败',
								image: imageurl,
							});
						}
					}).catch((res) => {
						console.log("获取OpenId失败");
						
					});
				} else {
					console.log('登录失败！' + res.errMsg)
				}
			},
			fail:function (error) {
				console.log("用户拒绝了授权》》》》》");
				reject(error)
			}
		});
	})

}

// 查询购物车数量
function selectCartCountNum() {
	var url = getRequesUrl.selectCartCountNum;
	postRequest(url, selectDate()).then(res => {
		var numdata = JSON.parse(res)
		if(numdata.totalNum != undefined) {
			if(numdata.totalNum != "0") {
				var data = {
					selectCartCountDate: numdata,
					showloadnum: true
				}
				return data
			} else {
				var data = {
					selectCartCountDate: numdata,
					showloadnum: false
				}
				return data
			}
		}
	}).finally(() => {
		wx.hideLoading();
	});
}

function getmessInfo() {
	if(JSON.stringify(storeId) == "{}") {
		risoGetStoreInfo();
	}
	if(JSON.stringify(userInfo) == "{}") {
		getUserInfo();
	}
}

function selectDate() {
	getmessInfo();
	var data = {
		memberId: userInfo.member_id,
		storeId: storeId
	}
	return data
}
//组装添加购物车数量
function addShoppingCartData(productSkuId) {
	getmessInfo();
	var data = {
		skuId: productSkuId,
		quantity: "1",
		memberId: userInfo.member_id,
		storeId: storeId,
		memberToken: userInfo.member_token
	}
	return data
}

//添加购物车
function addGoodsToCart(productSkuId) {
	var url = getRequesUrl.addGoodsToCart;
	if(loginUtils.isLogin() == true) {
		postRequest(url, addShoppingCartData(productSkuId)).then(res => {
			selectCartCountNum();
			wx.showToast({
				title: "加入购物车成功",
				icon: "none",
				duration: 2000
			});
		}).catch(res => {
			wx.showToast({
				title: res.msg,
				icon: "none",
				duration: 2000
			});
		});

	} else {
		wx.hideLoading();
		wx.navigateTo({
			url: '../../../pages/login/login'
		})
	}

}

function getDataSession(id) {

	let self = this;
	var openidurl = getRequesUrl.getWechatOpendId;
	var data = {
		js_code: id,
	}
	var imageurl = "/assets/images/login_close_btn.png";

	//获取OpenId
	postRequest(openidurl, data).then(res => {
		var value = JSON.parse(res);
		var body = JSON.parse(value.body);
		if(body.openid != null) {
			//session_key=body.session_key;
			getPayId(body.openid);
		} else {
			console.log("错误图片》》》" + imageurl);
			wx.showToast({
				title: '获取OpenId失败',
				image: imageurl,
			});
		}

	}).catch((res) => {
		console.log("错误图片》》》111" + imageurl);
		wx.showToast({
			title: res.msg,
			image: imageurl,
		});
	}).finally((e) => {

	});
}
/**
 * 根据code 去服务器端获取openId 和 session_key
 */
function getsession_key(id) {
	let self = this;
	var openidurl = getRequesUrl.getWechatOpendId;
	var data = {
		js_code: id
	}
	var imageurl = "/assets/images/login_close_btn.png";
	//获取OpenId
	postRequest(openidurl, data).then(res => {
		var value = JSON.parse(res);
		var body = JSON.parse(value.body);
		if(body.openid != null) {
			userData.session_key=body.session_key;
			userData.openid=body.openid
			return userData;
		} else {
			wx.showToast({
				title: '获取OpenId失败',
				image: imageurl,
			});
		}
	}).catch((res) => {
		wx.showToast({
			title: res.msg,
			image: imageurl,
		});
	}).finally((e) => {
			return userData;
	});
}

function getPayId(openid) {
	var url = getRequesUrl.weixinOrderPay;
	postRequest(url, funsetDategetPay_id(openid)).then(res => {
		if(res != "" && res != undefined) {
			resdata = JSON.parse(res);
			wx.requestPayment({
				"timeStamp": resdata.resultmap.timeStamp,
				"nonceStr": resdata.resultmap.nonceStr,
				"package": resdata.resultmap.packages,
				"signType": resdata.resultmap.signType,
				"paySign": resdata.resultmap.paySign,
				"success": function(res) {
					changecare(1);
				},
				"fail": function(res) {
					changecare(2);
				}

			})
		}
	}).catch((res) => {
		var imageurl = "/assets/images/login_close_btn.png";
		wx.showToast({
			title: res.msg,
			image: imageurl,
		});
	}).finally((e) => {});
}

function changecare(data) {
	//1 代表支付成功跳转 2支付失败跳转
	if(data === 1) {
		if (scanCodCheck){
			//成功之后跳转地址
			wx.redirectTo({
				url: './../../pages/payResult/scanCodePayResult?scancheck=true&tradeCode=' + payParame.merOrderNo,
			})
			scanCodCheck=false;
		}else{
			if (selfOrderCheck){//判断是否自助点餐
				wx.redirectTo({
					url: '../../pages/payResult/newPayResult?tradeCode=' + payParame.merOrderNo,
				})
				selfOrderCheck=false;
			}else{
				wx.redirectTo({
					url: '../../pages/payResult/payResult?tradeCode=' + resdata.merOrderNo,
				})
			}
		}
		
	} else if(data === 2) {
		switch(payParame.tag) {
			case 1:
				showtoastfail();
				/***
				 * 产品更改去 订单列表
				 */
				// if (scanCodCheck) {
				// 	let pages = getCurrentPages();//当前页面
				// 	let prevPage = pages[pages.length - 2];//上一页面
				// 	prevPage.setData({//直接给上移页面赋值
				// 		tradeCode: resdata.merOrderNo,
				// 	});
				// 	wx.navigateBack({//返回
				// 		delta: 1
				// 	})
				// 	scanCodCheck=false;
				// }else{
				// 	wx.redirectTo({
				// 		url: '../../pages/orderList/orderList',
				// 	});
				// }
				wx.redirectTo({
					url: '../../pages/orderList/orderList',
				});
				break;
			case 2:
				showtoastfail();
				break;
			case 3:
				showtoastfail();
				break;
		}
	}

}
//获取门店信息
function risoGetStoreInfo() {
	if(risoContext.getStoreInfo() != "") {
		var storeInfo = JSON.parse(risoContext.getStoreInfo());
		storeId = storeInfo.pkStoreId;
	}
}
//获取用户信息
function getUserInfo() {
	if(JSON.parse(loginUtils.getUserInfo() != null)) {
		var userIn = JSON.parse(loginUtils.getUserInfo());
		userInfo = userIn
	}
}
function setScanCodCheck(check) {
	scanCodCheck=check;
}
function setselfOrderCheck(check) {
	selfOrderCheck = check;
}
function showtoastfail() {
	var imageurl = "/assets/images/login_close_btn.png";
	wx.showToast({
		title: "支付失败",
		image: imageurl,
	});
}

function finsh() {
	wx.navigateBack({
		delta: 1,
	});
}
//组装获取只支付id的数据 
function funsetDategetPay_id(id) {
	var data = {
		memberId: payParame.memberId,
		merOrderNo: payParame.merOrderNo,
		openid: id,
		remoteAddr: "127.1.1.0"
	}
	return data
}

function getPhoneIp() {
	//获取手机ip
	wx.request({
		url: 'http://ip-api.com/json',
		success: function(e) {
			console.log("IP----->", e.data.query);
			motto = e.data
		}
	})

}
//tag 标志是从那里调用进来的 1 订单 2 订单列表 3 订单详情 
function setDategetPay(memberId, merOrderNo, tag) {
	var data = {
		memberId: memberId,
		merOrderNo: merOrderNo,
		tag: tag,

	}
	return data
}
/**
 * 通过uuid 登录逻辑
 */
function getloginByUUID(wxUserInfo) {
	return new Promise(function (resolve, reject) {
		if (wxUserInfo!=null) {
		let uuId=wxUserInfo.unionId;
		let openId=wxUserInfo.openId;
		let data={
			channelId:CHANNELID,
			unionId:uuId,
			openId:openId,
			nickName:wxUserInfo.nickName,
			avatarUrl:wxUserInfo.avatarUrl,
			gender:wxUserInfo.gender,
			city:wxUserInfo.city,
			province:wxUserInfo.province,
			country:wxUserInfo.country,
			language:wxUserInfo.language,
		}
		var url = getRequesUrl.queryloginByuuId;
		return postRequest(url,data).then(res=>{
			loginUtils.setUserInfo(res);//保存登录信息
			console.log("登录信息》》》》获取用户信息"+JSON.parse(res));
			resolve(res);
		},function (response) {
			loginUtils.setUserInfo("");
			console.log("uuid登录失败》》》》");
			reject(response);
		});
	}else{
		//reject();
	}
})
}
/**
 * 静默注册
 */
function loginByWchat(mobile) {
	return new Promise(function (resolve, reject) {
		console.log("进入静默注册处理逻辑");
		let uuId="";
		let openid="";
		var wxUserInfo=loginUtils.getWxUserInfo();
		if(wxUserInfo!=null){
			uuId=wxUserInfo.unionId;
			openid=wxUserInfo.openId;
		}
		let data={
			channelId:CHANNELID,
			loginId:mobile,
			mobile:mobile,
			openId:openid,
			unionId:uuId,
			nickName:wxUserInfo.nickName,
			avatarUrl:wxUserInfo.avatarUrl,
			gender:wxUserInfo.gender,
			city:wxUserInfo.city,
			province:wxUserInfo.province,
			country:wxUserInfo.country,
			language:wxUserInfo.language,
			trackingCode:loginUtils.getTrackingCode(),
			registerChannel:loginUtils.getRegisterChannel(),
		}
		var loginByWchatUrl=getRequesUrl.loginByWchat;
		return postRequest(loginByWchatUrl,data).then(res=>{
				console.log("静默注册返回结果",JSON.parse(res));
				loginUtils.setUserInfo(res);
				resolve();
			}),function (response) {
				loginUtils.setUserInfo("");
				console.log("静默注册失败");
				reject();
			};
	})
}


/*扫码领券*/
function scanCodeFetchCoupen(param) {
	return new Promise(function (resolve, reject){
//		if (loginUtils.isLogin() == true) {
			var couponUrl = getRequesUrl.scanCodeFetchCoupen;
			postRequest(couponUrl,param).then(res => {
				var data = JSON.parse(res)
				resolve(data);
			}).catch((r)=>{
				reject(r);
			});
//		}
	});
}


module.exports = {
	postRequest: postRequest,
	getRequest: getRequest,
	payment: payment,
	setDategetPay: setDategetPay,
	addGoodsToCart: addGoodsToCart,
	selectCartCountNum: selectCartCountNum,
	getlogin:getlogin,
	getwxUserInfo:getwxUserInfo,
	getPhoneNumber:getPhoneNumber,
	getloginByUUID:getloginByUUID,
	loginByWchat:loginByWchat,
	scanCodeFetchCoupen: scanCodeFetchCoupen,
	setScanCodCheck: setScanCodCheck,
	setselfOrderCheck: setselfOrderCheck,
};