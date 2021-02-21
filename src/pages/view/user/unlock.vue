<template>
    <view class="unlockContent">
        <view class="numInfo" v-if="order_info_list">
            <view class="infoOrder">
                <view>{{$t('content.userList[8]')}}</view>
                <view>
                    <text>{{order_info_list.money}} FIL</text>
                </view>
            </view>
            <view class="infoOrder">
                <view>{{$t('content.userList[28]')}}</view>
                <view>
                    <text>{{order_info_list.money - unlock_info.money}} FIL</text>
                </view>
            </view>
            <view class="infoOrder">
                <view>{{$t('content.userList[29]')}}</view>
                <view>
                    <text class="red">≈{{unlock_info.money}} FIL</text>
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
            <view class="infoOrder">
                <view>{{$t('content.userList[45]')}}</view>
                <view>
                    <text>{{$public.timestampToTime1(unlock_info.time*1000)}}</text>
                </view>
            </view>
        </view>
        <view class="ruleList">
            <view class="rule">{{$t('content.userList[46]')}}</view>
            <view class="listLine">{{product_rule}}</view>
        </view>
        <view class="btnBox">
            <button class="cu-btn" @click="unclock">{{$t('content.userList[47]')}}</button>
        </view>
    </view>
</template>

<script>
	import {order_info,order_unlock,getProduct,order_unlock_info} from '@/api/api.js'
    export default {
        name: "unlock",
        data(){
            return{
				id:'',
				order_info_list:null,
				product_rule:'',
				unlock_info:''
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
                title: this.$t('header[19]')
            })
        },
        methods:{
			get_order_info(){
				order_info({id:this.id}).then(res=>{
					this.order_info_list = res.data
					getProduct({id:this.order_info_list.productId}).then(res=>{
						this.product_rule = res.data.unlockRule
					})
					order_unlock_info({orderId:this.id}).then(res=>{
						this.unlock_info = res.data
					})
				})


			},
			unclock(){
				order_unlock({orderId:this.id}).then(res=>{
					if(res.code==200){
						uni.navigateTo({
						    url:'/pages/view/user/myOrder'
						})
					}else{
						this.$public.msg(res.message)
					}
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
    .unlockContent{
        .numInfo{
            background-color: #fff;
            border-radius: 32rpx;
            padding: 40rpx;
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
        .ruleList{
            background: #ffffff;
            border-radius: 32rpx;
            padding: 30rpx;
            margin-top: 20rpx;
            box-sizing: border-box;
            .rule{
                font-size: 28rpx;
                font-weight: 600;
                color: #474650;
                margin-bottom: 20rpx;
            }
            .listLine{
                font-size: 24rpx;
                font-weight: 400;
                color: #979797;
                margin-bottom: 20rpx;
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
</style>
