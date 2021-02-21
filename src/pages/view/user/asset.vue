<template>
    <view>
        <uni-nav-bar background-color="#F3F3F3" shadow="false" fixed="true">
            <view class="navBar">
                <image src="@/static/left.png" @click="returnIndex"></image>
                <view class="tit">{{$t('content.user[42]')}}</view>
                <view class="rightTit"@click="assetDetail">{{$t('content.user[11]')}}</view>
            </view>
        </uni-nav-bar>
        <view class="assetContent">
            <view class="assetHead">
                <view class="cny">{{$t('content.user[43]')}} (CNY)</view>
                <view class="price">￥ {{cny}}</view>
            </view>
            <view class="assetBody">
                <view class="assetList" v-for="(item,index) in wallet_list" :key="index">
                    <view class="codeImage">
                        <!-- <image src="@/static/lf.jpg"></image> -->
                        <text>{{item.coin}}</text>
                    </view>
                    <view class="showInfo">
                        <view class="box">
                            <view>{{$t('content.user[44]')}}</view>
                            <view>{{item.balance}}</view>
                        </view>
                        <text class="line"></text>
                        <view class="box">
                            <view>{{$t('content.user[45]')}}</view>
                            <view>{{item.releaseBalance}}</view>
                        </view>
                        <text class="line"></text>
                        <view class="box">
                            <view>{{$t('content.user[46]')}}</view>
                            <view>{{item.balance+item.releaseBalance+item.frozenBalance}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	import {get_wallet_list} from '@/api/api.js'
    import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    export default {
        components: {uniNavBar},
        data(){
            return{
				wallet_list:[],
				cny:null
			}
        },
        onShow(){
			this.get_wallet()
		},
		onPullDownRefresh() {
			this.page = 1
		    this.get_wallet();
		    //刷新完成后关闭
		    setTimeout(function () {
		      uni.stopPullDownRefresh(); //停止下拉刷新动画
		    }, 1000);
		 },
        methods:{
			get_wallet(){
				get_wallet_list({}).then(res=>{
					this.cny = res.data.cnyTotal;
					this.wallet_list = res.data.wallet;
				})
			},
            returnIndex(){
                let _this = this;
                uni.switchTab({
                    url:'/pages/user/index'
                })
            },
            assetDetail(){
                let _this = this;
                uni.navigateTo({
                    url:'/pages/view/user/assetDetail'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    page{background-color: #F3F3F3;padding: 0}
    .navBar{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30rpx;
        image{
            width: 18rpx;
            height: 35rpx;
        }
        .tit{
            font-weight: 600;
        }
        .rightTit{
            height: 40rpx;
            width: 90rpx;
            line-height: 40rpx;
            text-align: center;
            background-color: #3466ff;
            border-radius: 16rpx;
            font-size: 24rpx;
            font-weight: 500;
            color: #ffffff;
        }
    }
    .assetContent{
        padding:  12rpx 28rpx;
        .assetHead{
            background-color: #fff;
            border-radius: 32rpx;
            text-align: center;
            padding: 38rpx 0;
            .cny{
                font-size: 38rpx;
                font-weight: 600;
                color: #a4acc2;
                line-height: 50rpx;
                margin-bottom: 8rpx;
            }
            .price{
                font-size: 56rpx;
                font-weight: 700;
                color: #495068;
                line-height: 80rpx;
            }
        }
        .assetBody{
            padding: 20rpx 0;
            .assetList{
                background-color: #fff;
                border-radius: 32rpx;
                margin-bottom: 20rpx;
                padding: 40rpx 0;
                .codeImage{
                    display: flex;
                    align-items: center;
                    padding: 0 48rpx;
                    margin-bottom: 26rpx;
                    image{
                        width: 44rpx;
                        height: 44rpx;
                        border-radius: 100%;
                    }
                    text{
                        font-size: 38rpx;
                        font-weight: 700;
                        color: #495068;
                        padding-left: 10rpx;
                    }
                }
                .showInfo{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .box{
                        flex: 1;
                        text-align: center;
                        view:nth-child(1){
                            font-size: 28rpx;
                            font-weight: 500;
                            color: #979797;
                            margin-bottom: 10rpx;
                        }
                        view:nth-child(2){
                            font-size: 32rpx;
                            font-weight: 700;
                            color: #495068;
                        }
                    }
                    .line{
                        display: block;
                        width: 2rpx;
                        height: 35rpx;
                        background-color: #979797;
                    }
                }
            }
        }
    }
</style>
