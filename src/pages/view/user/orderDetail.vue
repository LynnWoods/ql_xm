<template>
    <view class="orderDetailContent" v-if="order_info_list">
        <view class="headBox">
            <view class="earnings">{{$t('content.userList[17]')}} (FIL)</view>
            <view class="percentum">{{order_info_list.money * order_info_list.profit}}</view>
            <view class="earnings">{{$t('content.userList[18]')}} (FIL)</view>
            <view class="orderNum">{{order_info_list.profitMoney}}</view>
        </view>
        <view class="orderCon">
            <view class="numInfo">
                <view class="stateOrder">
                    <view class="name" v-if="order_info_list.status=='CANCELED'||order_info_list.status=='CANCEL'">{{$t('content.userList[19]')}}</view>
                    <view class="name" v-else>{{$t('content.userList[20]')}}</view>
					<view class="state yellow" v-if="order_info_list.status=='WAITINYG'">{{$t('content.userList[21]')}}</view>
					<view class="state" v-if="order_info_list.status=='COMPLETE'">{{$t('content.userList[22]')}}</view>
					<view class="state violet" v-if="order_info_list.status=='CANCELED'">{{$t('content.userList[23]')}}</view>
					<view class="state red" v-if="order_info_list.status=='CANCEL'">{{$t('content.userList[24]')}}</view>
					<view class="state green" v-if="order_info_list.status=='HAVING'">{{$t('content.userList[25]')}}</view>
                </view>
                <view class="infoOrder">
                    <view>{{$t('content.userList[26]')}}</view>
                    <view>
                        <text>{{order_info_list.yearProfit}}%</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>{{$t('content.userList[27]')}}</view>
                    <view>
                        <text>{{order_info_list.money}} FIL</text>
                    </view>
                </view>
                <view class="infoOrder" v-if="order_info_list.status=='CANCELED'||order_info_list.status=='CANCEL'">
                    <view>{{$t('content.userList[28]')}}</view>
                    <view>
						<text v-if="order_info_list.status=='WAITINYG'">0 FIL</text>
						<text v-if="order_info_list.status=='COMPLETE'">0 FIL</text>
						<text v-if="order_info_list.status=='CANCELED'">{{order_info_list.money - order_info_list.breachMoney}} FIL</text>
						<text v-if="order_info_list.status=='CANCEL'">{{order_info_list.money - order_info_list.breachMoney}} FIL</text>
						<text v-if="order_info_list.status=='HAVING'">0 FIL</text>
                    </view>
                </view>
                <view class="infoOrder" v-if="order_info_list.status=='CANCELED'||order_info_list.status=='CANCEL'">
                    <view>{{$t('content.userList[29]')}}</view>
                    <view>
                        <text class="red">≈{{order_info_list.breachMoney}} FIL</text>
                    </view>
                </view>
                <view class="infoOrder" v-if="order_info_list.status=='CANCELED'||order_info_list.status=='CANCEL'">
                    <view>{{$t('content.userList[30]')}}</view>
                    <view>
                        <text>{{order_info_list.money - order_info_list.breachMoney}} FIL</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>{{$t('content.userList[31]')}}</view>
                    <view>
						<text v-if="order_info_list.status=='CANCEL'">{{$public.timestampToTime1(order_info_list.cancleTime*1000)}}</text>
                        <text v-else>{{$public.timestampToTime1(order_info_list.startTime*1000)}}</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view v-if="order_info_list.status=='CANCELED'||order_info_list.status=='CANCEL'">{{$t('content.userList[32]')}}</view>
                    <view v-else>{{$t('content.userList[33]')}}</view>
                    <view>
						<text v-if="order_info_list.status=='CANCELED'||order_info_list.status=='CANCEL'">{{$public.timestampToTime1(order_info_list.returnTime*1000)}}</text>
                        <text v-else>{{$public.timestampToTime1(order_info_list.endTime*1000)}}</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>{{$t('content.userList[34]')}}</view>
                    <view>
                        <text>{{order_info_list.cycel}} {{$t('content.userList[10]')}}</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>{{$t('content.userList[35]')}}</view>
                    <view>
                        <text>{{order_info_list.frofitPledge}} {{$t('content.userList[10]')}}</text>
                    </view>
                </view>
            </view>
            <view class="btnBox">
				<view class="state yellow" v-if="order_info_list.status=='WAITINYG'">
					<!-- 待收益 -->
					<button class="cu-btn" @click="unlock">{{$t('content.userList[36]')}}</button>
				</view>
				<view class="state" v-if="order_info_list.status=='COMPLETE'">

				</view>
				<view class="state violet" v-if="order_info_list.status=='CANCELED'">
					<!-- <button class="cu-btn">已解锁</button> -->
				</view>
				<view class="state red" v-if="order_info_list.status=='CANCEL'">
					<!-- <button class="cu-btn">解锁中</button> -->
				</view>
				<view class="state green" v-if="order_info_list.status=='HAVING'">
					<!-- 收益中 -->
					<button class="cu-btn" @click="unlock">{{$t('content.userList[36]')}}</button>
				</view>
            </view>
        </view>
    </view>
</template>

<script>
	import {order_info} from '@/api/api.js'
    export default {
        name: "orderDetail",
        data(){
            return{
				id:'',
				order_info_list:null
			}
        },
        onLoad(option){
			this.id = option.id
		},
		onShow(){
			this.get_order_info()
		},
        onReady() {
            uni.setNavigationBarTitle({
                title: this.$t('header[17]')
            })
        },
        methods:{
			get_order_info(){
				order_info({id:this.id}).then(res=>{
					this.order_info_list = res.data
				})
			},
            unlock(){
                let _this = this;
                uni.navigateTo({
                    url:'/pages/view/user/unlock?id='+this.id
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    page{padding: 0}
    .orderDetailContent{
        .headBox{
            background-color: #547eff;
            border-radius: 0 0 50rpx 50rpx;
            padding: 40rpx 66rpx 160rpx 66rpx;
            .earnings{
                font-size: 24rpx;
                font-weight: 600;
                color: #ffffff;
            }
            .percentum{
                font-size: 64rpx;
                font-weight: 900;
                color: #ffffff;
                margin: 20rpx 0 35rpx 0;
            }
            .orderNum{
                font-size: 44rpx;
                font-weight: 900;
                color: #ffffff;
                margin-top: 15rpx;
            }
        }
        .orderCon{
            padding: 0 30rpx;
            margin-top: -130rpx;
            padding-bottom: 300rpx;
            .numInfo{
                background-color: #fff;
                border-radius: 32rpx;
                padding: 40rpx;
                .stateOrder{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    /*margin-bottom: 16rpx;*/
                    .name{
                        flex: 1;
                        font-size: 28rpx;
                        font-weight: 600;
                        color: #495068;
                    }
                    .state{
                        width: 124rpx;
                        height: 64rpx;
                        line-height: 64rpx;
                        font-size: 28rpx;
                        font-weight: 600;
                        color: #ffffff;
                        background-color: #c5c5c5;
                        border-radius: 16rpx;
                        text-align: center;
                    }
                    .green{background-color: #35ceab;}
                    .yellow{background-color: #ffb74a;}
                    .violet{background-color: #b66dff;}
                    .red{background-color: #ff6d6d;}
                }
                .infoOrder{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    view{
                        line-height: 60rpx;
                        font-size: 28rpx;
                    }
                    view:nth-child(1){
                        font-weight: 600;
                        color: #495068;
                    }
                    view:nth-child(2){
                        font-weight: 700;
                        color: #495068;
                        .gray{
                            color: #979797;
                        }
                        .red{
                            color: #fa3e3e;
                        }
                    }
                }
            }
            .btnBox{
                padding-top: 90rpx;
                .cu-btn{
                    background-color: #3466ff;
                    font-size: 32rpx;
                    font-weight: 500;
                    color: #ffffff;
                    border-radius: 32rpx;
                }
            }
        }
    }
</style>
