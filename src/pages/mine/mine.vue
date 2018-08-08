<template>
	<div>{{minename}}</div>
</template>

<script>
	const config = {
		"enablePullDownRefresh": true,
		"backgroundTextStyle": "dark",
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "我的",
	}
	const wxRequest = require('./../../uitls/wxRequest.js');
	const configData = require('./../../uitls/config.js');
	Page({
		data: {
			minename: '我的页面',
			name: "222"
		},
		setTitle() {
			wx.setNavigationBarTitle({
				title: '我的',
			})
		},
		onLoad: function(options) {
			this.setTitle();
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

</style>