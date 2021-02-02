<template>
    <view class="succeedContent">
        <view class="succInfo" v-if="order_info_list">
            <view class="showInfo">
                <text>质押份数</text>
                <text>{{order_info_list.amount}} 份</text>
            </view>
            <view class="showInfo">
                <text>单位产品质押</text>
                <text>{{succeed.unit}} FIL</text>
            </view>
            <view class="showInfo">
                <text>质押数量合计</text>
                <text>{{succeed.unit*order_info_list.amount}} FIL</text>
            </view>
            <view class="showInfo">
                <text>质押期限</text>
                <text>{{succeed.day}} 天</text>
            </view>
            <view class="showInfo">
                <text>质押时间</text>
                <text>{{order_info_list.createTime}}</text>
            </view>
        </view>
        <view class="btnBox">
            <button class="cu-btn" @click="jump_info">查看详情</button>
        </view>
    </view>
</template>

<script>
	import {order_info} from '@/api/api.js'
    export default {
        name: "succeed",
        data(){
            return{
				id:'',
				order_info_list:null,
				succeed:{
					day:'',
					unit:'',
				}
			}
        },
        onLoad(option){
			this.id = option.id
			this.succeed.day = option.day
			this.succeed.unit = option.unit
		},
		onShow(){
			this.get_order_info()
		},
        methods:{
			get_order_info(){
				order_info({id:this.id}).then(res=>{
					this.order_info_list = res.data
				})
			},
			jump_info(){
				uni.navigateTo({
				    url:`/pages/view/user/orderDetail?id=`+this.id
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
    .succeedContent{
        .succInfo{
            background-color: #fff;
            border-radius: 32rpx;
            padding: 36rpx 30rpx;
            .showInfo{
                display: flex;
                justify-content: space-between;
                align-items: center;
                line-height: 60rpx;
                text{
                    font-size: 14px;
                    font-weight: 600;
                    color: #474650;
                }
            }
        }
        .btnBox{
            padding: 40rpx 26rpx;
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
