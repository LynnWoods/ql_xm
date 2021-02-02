<template>
    <view class="affirmContent">
        <view class="details">
            <text>质押份数</text>
            <text>{{affirm.amount}} 份</text>
        </view>
        <view class="details">
            <text>单位产品质押</text>
            <text>{{affirm.unit}} FIL</text>
        </view>
        <view class="details">
            <text>质押数量合计</text>
            <text>{{affirm.unit*affirm.amount}} FIL</text>
        </view>
        <view class="details">
            <text>质押期限</text>
            <text>{{affirm.day}} 天</text>
        </view>
        <view class="btnBox">
            <button class="cu-btn" @click="succeedSkip">确认</button>
        </view>
    </view>
</template>

<script>
	import {order_create} from '@/api/api.js'
    export default {
        name: "affirm",
        data(){
            return{
				affirm:{
					amount:'',
					productId:'',
					day:'',
					unit:'',
				}
			}
        },
        onLoad(option){
			this.affirm.amount=option.number
			this.affirm.productId = option.id
			this.affirm.day=option.day
			this.affirm.unit=option.unit
		},
        methods:{
            succeedSkip(){
				order_create({  
					amount:this.affirm.amount,
					productId:this.affirm.productId
				}).then(res=>{
					if(res.code==200){
						uni.navigateTo({
						    url:'/pages/view/pledge/succeed?unit='+this.affirm.unit+'&day='+this.affirm.day+'&id='+ res.data
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
    .affirmContent{
        .details{
            background-color: #fff;
            border-radius: 32rpx;
            padding: 35rpx 0 0 40rpx;
            margin-bottom: 20rpx;
            text{
                display: block;
                line-height: 40rpx;
                font-size: 28rpx;
                font-weight: 600;
                color: #474650;
            }
            text:nth-child(2){
                line-height: 88rpx;
                font-size: 44rpx;
                font-weight: 700;
                color: #474650;
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
