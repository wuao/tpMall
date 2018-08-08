<template>
	<div class="log-item">{{mainname}}</div>
	<div class="container">

		<div  wx:for="{{weatherBean.data.forecast}}" wx:key="id" wx:for-item="item">
				<text style='font-size: 16px; color: #999999;'>{{item.date}}</text>
			 	<text style='font-size: 16px; color: #999999;'>{{item.high}}</text>

		</div>
	</div>
	<button bindtap="test"> 测试请求 </button>

</template>

<script>
	const config = {
		"enablePullDownRefresh": true,
		"backgroundTextStyle": "dark",
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "首页",
	}
	const wxRequest = require('./../../uitls/wxRequest.js');
	const configData = require('./../../uitls/config.js');
	const getRequesUrl = configData.config;
	const resoucePath = configData.resoucePath;
	Page({
		data: {
			mainname: '首页',
			weatherBean: "",
		},
		setTitle() {
			wx.setNavigationBarTitle({
				title: '首页',
			})
		},

		/**
		 * 拼装入参
		 */
		setdata() {
			var data = {
				city: "北京市"
			}
			return data
		},

		test() {
			this.getDate();
		},

		/**
		 * 数据请求
		 */
		getDate() {
			let that = this
			wx.showLoading({})
			var url = getRequesUrl.gettestData;
			wxRequest.getRequest(url, that.setdata()).then(res => {
				var data = res;
				if(data != null && data != undefined) {
					this.setData({
						weatherBean: data
					});
				} else {
					this.setData({
						weatherBean: "请求为空"
					});
				}

			}).finally(() => {
				wx.hideLoading()
			});
		},

		onLoad: function(options) {
			this.setTitle()
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {}

	})
</script>

<style>
	.container {
		display: flex;
		width: 100%;
		height: 500px;
		flex-direction: row-reverse;
	}
	
	.log-item {
			width: 100%;
		align-items: center;
		height: 50px;
	}
	
	 
</style>