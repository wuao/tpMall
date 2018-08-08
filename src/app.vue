
<template>
</template>

<style lang="less">
</style>

<script>
	const config = {
		"pages": [
			'pages/main/main',
			'pages/supermaket/supermaketmenu/supermaketmenu',
			'pages/shoppingCart/shoppingCart',
			'pages/mine/mine'

		],
		"window": {
			"navigationBarBackgroundColor": "#fff",
			"navigationBarTitleText": "千姿化妆",
			"backgroundColor": "#f5f5f5",
			"backgroundTextStyle": "light",
		},

		"tabBar": {
			"color": "#425566",
			"selectedColor": "#425566",
			"backgroundColor": "#f9f9f9",
			"list": [{
					"text": "首页",
					"pagePath": "pages/main/main",
					"iconPath": "/assets/images/icon_home.png",
					"selectedIconPath": "/assets/images/icon_select_home.png"
				},
				{
					"text": "商品",
					"pagePath": "pages/supermaket/supermaketmenu/supermaketmenu",
					"iconPath": "/assets/images/icon_supermarket.png",
					"selectedIconPath": "/assets/images/icon_select_supermarket.png"
				},
				{
					"text": "购物车",
					"pagePath": "pages/shoppingCart/shoppingCart",
					"iconPath": "/assets/images/icon_shoppingcart.png",
					"selectedIconPath": "/assets/images/icon_select_shoppingcart.png"
				},
				{
					"text": "我的",
					"pagePath": "pages/mine/mine",
					"iconPath": "/assets/images/icon_mine.png",
					"selectedIconPath": "/assets/images/icon_select_mine.png"
				}
			]
		},
		"networkTimeout": {
			"request": 12000,
			"downloadFile": 20000
		},
		"debug": true
	}

//	App({
//		data: {
//			name: "999"
//		},
		/**
		 * 加载中
		 */
//		onload: function() {
//		},
// 
//	});
</script>