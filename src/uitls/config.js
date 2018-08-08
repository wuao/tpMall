const PRE = 'https://pre.risofresh.com/';
const SIT = 'https://sit.risofresh.com/';
const PRD = 'http://wthrcdn.etouch.cn/';
// 修改环境配置时 一定要修改！ 一定要修改！ 一定要修改！ _setting.scss 中的 $url 配置


const LocalHost = PRD;
const requestPath = LocalHost;

module.exports = {
	// 各渠道表示 H5,IOS,ANDROID,XCX
	fromApp: 'XCX',
	// 转发内容设置
	shareConfig: {
		title: '千姿化妆品'
	},
	config: {
		/*
		 *  获取商品详情
		 * 请求头 需要 channelCode  BL0201 和 商品 productId
		 * {
		 *     channelCode:"BL0201",
		 *     productId:“85966ae4d2534c21843f9bf1d8db4bfd”,
		 *     storeId:"8a9e48185b754539015b757e8acd000e",
		 *     channelMedia:"20200001411",
		 * }
		 */
		gettestData: requestPath + 'weather_mini',
		 
	}
};
