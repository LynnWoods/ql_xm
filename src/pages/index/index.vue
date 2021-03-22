<template>
	<view class="homeContent">
		<swiper class="swiperBox" :autoplay="true" :interval="3000" :duration="500" :circular="true"  v-if="banner_list.length!=0">
			<swiper-item v-for="(item,index) in banner_list" :key="index" @click="bannerLink(item.linkUrl)">
				<view class="swiper-item uni-bg-red"style="width: 100%;height: 100%;">
					<image :src="baseUrl+item.url"style="width: 100%;height: 100%;"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="notice">
			<view class="notIcon"></view>
			<swiper class="noticeSwiper" :autoplay="true" :interval="2000" :duration="500" :circular="true" :vertical="true">
				<swiper-item v-for="(item,index) in announcement_list" :key="index">
					<view class="swiper-item uni-bg-red">{{item.title}}</view>
				</swiper-item>
			</swiper>
			<view class="navFunBtn" @click="noticeSkip">
				<text></text>
				<text></text>
				<text></text>
			</view>
		</view>
		<view class="headTitle">{{$t('content.home[0]')}}</view>
		<view class="showImg" @click="activity" v-if="activity_list.length!=0">
			<image :src="baseUrl+activity_list[0].url"></image>
		</view>
<!--		<view class="survey">-->
<!--			<view class="infoTit">-->
<!--				<image src="@/static/filfox.png"></image>-->
<!--				<text>全网概览</text>-->
<!--			</view>-->
<!--			<view class="surveyFlex">-->
<!--				<view class="lin">-->
<!--					<text>区块高度</text>-->
<!--					<text>347.123</text>-->
<!--				</view>-->
<!--				<view class="lin">-->
<!--					<text>最新区块时间</text>-->
<!--					<text>50秒前</text>-->
<!--				</view>-->
<!--				<view class="lin">-->
<!--					<text>全网有效算力</text>-->
<!--					<text>347.123EiB</text>-->
<!--				</view>-->
<!--				<view class="lin">-->
<!--					<text>活跃矿工数</text>-->
<!--					<text>856</text>-->
<!--				</view>-->
<!--				<view class="lin">-->
<!--					<text>每区块奖励</text>-->
<!--					<text>347.123FiL</text>-->
<!--				</view>-->
<!--				<view class="lin">-->
<!--					<text>24h平均挖矿收益</text>-->
<!--					<text>347.123</text>-->
<!--				</view>-->
<!--			</view>-->
<!--		</view>-->
        <view class="showImg" @click="bannerLink('/pages/view/home/rank_list')">
            <image src="../../static/rankbanner.png"></image>
        </view>
		<view class="newMsg">
			<view class="infoTit">
				<text>{{$t('content.home[1]')}}</text>
				<text @click="newMore">{{$t('content.home[2]')}}  〉</text>
			</view>
			<view class="listCon" v-for="(item,index) in advisory_list" @click="msg_info(item.id)" :key="index">
				<image class="iconImg" :src="baseUrl+item.imgUrl"></image>
				<view class="titCon">
					<text>{{item.title}}</text>
					<text>{{item.createTime}}</text>
				</view>
			</view>
		</view>
		<view class="notice">
			<view class="query" @click="bannerLink('/pages/view/home/FIL_now/FIL_now')">{{$t('content.home[3]')}}</view>
			<view class="rightBtn"></view>
		</view>
		<view class="coinMarket">
			<view class="coinTit">{{$t('content.home[4]')}}</view>
			<view class="navCoin">
				<text>{{$t('content.home[5]')}}(￥)</text>
				<text>{{$t('content.home[6]')}}</text>
				<text>{{$t('content.home[7]')}}</text>
			</view>
			<view class="marketList" v-for="(item,index) in coin_list" :key="index">
				<view class="coin">
					<text>{{item.symbol}}</text>
					<text>VOL {{parseInt(item.vol)}}</text>
				</view>
				<view class="price">
					<text>￥{{item.cnyPrice}}</text>
					<text>${{item.price}}</text>
				</view>
<!--				<view class="ups " :class="(index+1)%2==1?'red':'green'">{{$public.keepFull(item.chg)}}%</view>-->
				<view class="ups " :class="item.chg < 0?'red':'green'">{{item.chg < 0?'':'+'}}{{$public.keepFull(item.chg)}}%</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getBanner,baseUrl,get_announcement,cms_advisory,market_thumb} from '@/api/api.js'
	import Stomp from 'stompjs'
	import SockJS from "sockjs-client";
	export default {
		data() {
			return {
				banner_list:[],
				announcement_list:[],
				baseUrl:baseUrl,
				activity_list:[],
				advisory_list:[],
				coin_list:[],
				coin_scoket:null
			}
		},
		onLoad() {},
		onShow(){
			this.init()
			// 进入首页时执行长连接
			this.set_socket()
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.$t('header[0]')
			})
		},
		onHide(){
			this.stompClient.disconnect();
		},
		methods: {
			// 建立长链接
			set_socket(){
				// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
				let _this = this;
				if (this.stompClient) {
					this.stompClient.ws.close();
				}
				let stompClient = null;
				const websocket = new SockJS("http://wjykcs.wisvalley.cn/market/market-ws");
				stompClient = Stomp.over(websocket);
				_this.stompClient = stompClient;
				stompClient.debug = false;
				stompClient.connect({},(res) => {
					stompClient.subscribe("/topic/market/thumb", function(msg) {
						let resp =	JSON.parse(msg.body)
						_this.coin_scoket = resp
						for(let i = 0;i<_this.coin_list.length;i++){
								if(_this.coin_list[i].symbol == _this.coin_scoket.symbol){
								_this.coin_list[i].vol = _this.coin_scoket.vol
								_this.coin_list[i].price = _this.coin_scoket.price
								_this.coin_list[i].chg = _this.coin_scoket.chg
							}
						}
					})
				}
			  );
			},
			init(){
				let _this = this;
				_this.imgBanner(0)
				get_announcement({}).then(res=>{//获取公告
					this.announcement_list = res.data.list
				})
				_this.imgBanner(1)
				cms_advisory({}).then(res=>{//新闻资讯
					this.advisory_list = res.data.list.slice(0,4)
				})
				market_thumb({}).then(res=>{
					this.coin_list = res.data
				})
			},
			imgBanner(type){
				let _this = this;
				getBanner({type:type}).then(res=>{
					if(type==0){
						this.banner_list = res.data.list//获取轮播
					}else if(type==1){
						this.activity_list = res.data.list//获取活动
					}
				})
			},
			bannerLink(url){//轮播跳转路径
				uni.navigateTo({
					url:url
				})
			},
			noticeSkip(){
				uni.navigateTo({
					url:'/pages/view/home/notice'
				})
			},
			newMore(){
				uni.navigateTo({
					url:'/pages/view/home/newMsg'
				})
			},
			activity(){
				uni.navigateTo({
					url:'/pages/view/home/activity'
				})
			},
			msg_info(id){
				uni.navigateTo({
					url:`/pages/view/home/msg_info?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

	.homeContent{
		.swiperBox{
			height:226rpx;
			border-radius: 32rpx;
			overflow: hidden;
			swiper{
				height: 226rpx;
			}
		}
		.notice{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 76rpx;
			margin: 20rpx 0;
			padding: 0 20rpx;
			background-color: #fff;
			border-radius: 16rpx;
			.notIcon{
				height: 40rpx;
				width: 40rpx;
				margin-right: 16rpx;
				background-image: url("../../static/notice.png");
				background-size: 100% 100%;
			}
			.noticeSwiper{
				flex: 1;
				height: 76rpx;
				color: #474650;
				line-height: 76rpx;
				font-size: 26rpx;
			}
			.navFunBtn{
				text{
					display: block;
					width: 30rpx;
					height: 5rpx;
					background-color: #333333;
					margin-bottom: 5rpx;
				}
			}
			.query{
				flex: 1;
				height: 76rpx;
				line-height: 76rpx;
				font-size: 32rpx;
				font-weight: 700;
				color: #474650;
			}
			.rightBtn{
				height: 40rpx;
				width: 40rpx;
				background-image: url("../../static/more_filecoin.png");
				background-size: 100% 100%;
				/*transform:rotate(180deg);*/
			}
		}
		.headTitle{
			font-size: 32rpx;
			color: #474650;
			/*font-weight: 600;*/
			font-weight:bold;
			margin-bottom: 12rpx;
			padding-left: 20rpx;
		}
		.showImg{
			height: 128rpx;
			image{
				height: 100%;
				width: 100%;
				border-radius: 32rpx;
			}
		}
		.survey{
			background-color: #fff;
			border-radius: 32rpx;
			padding: 40rpx 34rpx;
			margin: 20rpx 0;
			.infoTit{
				display: flex;
				align-items: center;
				image{
					width: 124rpx;
					height: 46rpx;
				}
				text{
					font-size: 24rpx;
					font-weight: 500;
					color: #2552c2;
					padding-left: 20rpx;
				}
			}
			.surveyFlex{
				display: flex;
				flex-wrap: wrap;
				padding-top: 40rpx;
				.lin{
					width: 48%;
					padding: 0 1% 40rpx 1%;
					padding-bottom: 40rpx;
					text{
						display: block;
						flex-wrap: wrap;
						line-height: 40rpx;
						overflow:hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					text:nth-child(1){
						font-size: 24rpx;
						font-weight: 500;
						color: #979797;
					}
					text:nth-child(2){
						font-size: 28rpx;
						/*font-weight: 700;*/
						font-weight:bold;
						color: #495068;
					}
				}
			}
		}
		.newMsg{
			background-color: #fff;
			border-radius: 32rpx;
			padding: 40rpx 34rpx 8rpx 34rpx;
			margin: 20rpx 0;
			.infoTit{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 15rpx;
				text{
					font-size: 32rpx;
					/*font-weight: 600;*/
					font-weight:bold;
					color: #474650;
				}
				text:last-child{
					font-weight: 500!important;
					font-size: 24rpx;
					color: #828282;
				}
			}
			.listCon{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 36rpx;
				.iconImg{
					width: 88rpx;
					height: 88rpx;
					border-radius: 24rpx;
				}
				.titCon{
					flex: 1;
					width: 100rpx;
					padding: 0 10rpx 0 20rpx;
					text{
						display: block;
						line-height: 40rpx;
					}
					text:nth-child(1){
						font-size: 28rpx;
						/*font-weight: 600;*/
						font-weight:bold;
						color: #474650;
						overflow:hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					text:nth-child(2){
						font-size: 24rpx;
						color: #a7a7a7;
					}
				}
			}
		}
		.coinMarket{
			background-color: #fff;
			border-radius: 32rpx;
			padding: 36rpx 0;
			.coinTit{
				font-size: 32rpx;
				/*font-weight: 600;*/
				font-weight:bold;
				color: #474650;
				margin-bottom: 40rpx;
				line-height: 40rpx;
				padding: 0 30rpx;
			}
			.navCoin{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 30rpx 12rpx 30rpx;
				border-bottom: 2rpx solid #ced0d9;
				text{
					display: block;
					font-size: 24rpx;
					color: #979797;
					font-weight: 600;
				}
			}
			.marketList{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx;
				border-bottom: 2rpx solid #ced0d9;
				.coin{
					text{
						display: block;
						font-size: 28rpx;
						/*font-weight: 600;*/
						font-weight:bold;
						line-height: 32rpx;
						color: #495068;
					}
					text:last-child{
						font-size: 24rpx;
						/*font-weight: 600;*/
						font-weight:bold;
						color: #9aa6cd;
					}
				}
				.price{
					text{
						display: block;
						font-size: 28rpx;
						/*font-weight: 600;*/
						font-weight:bold;
						line-height: 32rpx;
						color: #495068;
					}
					text:last-child{
						font-size: 24rpx;
						/*font-weight: 600;*/
						font-weight:bold;
						color: #9aa6cd;
						text-align: center;
					}
				}
				.ups{
					height: 58rpx;
					line-height: 58rpx;
					font-size: 28rpx;
					/*font-weight: 700;*/
					font-weight:bold;
					color: #ffffff;
					border-radius: 16rpx;
					padding: 0 10rpx;
				}
				.red{
					background-color: #fb7765;
				}
				.green{
					background-color: #6be2a2;
				}
			}
		}
	}
</style>
