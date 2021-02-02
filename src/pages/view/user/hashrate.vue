<template>
    <view class="hashrateContent">
        <view class="headBox">
            <view class="earnings">订单数量(T)</view>
            <view class="percentum">{{dataInfor.amount}}</view>
            <view class="hashTime">
                <view class="info">
                    <text>开挖时间</text>
                    <text>{{dataInfor.lockTime}}天 / {{dataInfor.lockDay}}天</text>
                </view>
                <view class="info"style="text-align: left">
                    <text>算力有效期</text>
                    <text>{{dataInfor.profitTime}}天 / {{dataInfor.cycelDay}}天</text>
                </view>
            </view>
        </view>
        <view class="orderCon">
            <view class="numInfo">
                <view class="stateOrder">
                    <view class="name">算力状态</view>
                    <view class="state green" v-if="dataInfor.status == 'WAITINYG'">待分发</view>
                    <view class="state yellow" v-if="dataInfor.status == 'HAVING'">分发中</view>
                    <view class="state" v-if="dataInfor.status == 'COMPLETE'">已完成</view>
                </view>
                <view class="infoOrder">
                    <view>订单金额</view>
                    <view>
                        <view>{{dataInfor.money}} USDT</view>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>订单编号</view>
                    <view>
                        <view>{{dataInfor.orderNo}}</view>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>订单时间</view>
                    <view>
                        <text>{{dataInfor.createTime}}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {getPorderInfo} from '@/api/api.js'
    export default {
        data(){
            return{
                dataInfor:{}
            }
        },
        onLoad(option){
            this.getInfor(option.id)
        },
        methods:{
            getInfor(id){
                getPorderInfo({id:id}).then(res=>{
                     this.dataInfor = res.data;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    page{padding: 0}
    .hashrateContent{
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
            .hashTime{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .info{
                    width: 40%;
                    text{
                        display: block;
                        color: #ffffff;
                    }
                    text:nth-child(1){
                        font-size: 24rpx;
                        font-weight: 600;
                        margin-bottom: 20rpx;
                    }
                    text:nth-child(2){
                        font-size: 28rpx;
                        font-weight: 700;
                    }
                }
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
                        /*font-weight: 600;*/
                        font-weight:bold;
                        color: #495068;
                    }
                    view:nth-child(2){
                        /*font-weight: 700;*/
                        font-weight:bold;
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
        }
    }
</style>
