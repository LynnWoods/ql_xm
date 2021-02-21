<template>
    <view class="hashrateContent">
        <view class="headBox">
            <view class="earnings">{{$t('content.userList[37]')}}(T)</view>
            <view class="percentum">{{dataInfor.amount}}</view>
            <view class="hashTime">
                <view class="info">
                    <text>{{$t('content.userList[15]')}}</text>
                    <text>{{dataInfor.lockTime}}{{$t('content.userList[10]')}} / {{dataInfor.lockDay}}{{$t('content.userList[10]')}}</text>
                </view>
                <view class="info"style="text-align: left">
                    <text>{{$t('content.userList[38]')}}</text>
                    <text>{{dataInfor.profitTime}}{{$t('content.userList[10]')}} / {{dataInfor.cycelDay}}{{$t('content.userList[10]')}}</text>
                </view>
            </view>
        </view>
        <view class="orderCon">
            <view class="numInfo">
                <view class="stateOrder">
                    <view class="name">{{$t('content.userList[39]')}}</view>
                    <view class="state green" v-if="dataInfor.status == 'WAITINYG'">{{$t('content.userList[40]')}}</view>
                    <view class="state yellow" v-if="dataInfor.status == 'HAVING'">{{$t('content.userList[41]')}}</view>
                    <view class="state" v-if="dataInfor.status == 'COMPLETE'">{{$t('content.userList[22]')}}</view>
                </view>
                <view class="infoOrder">
                    <view>{{$t('content.userList[42]')}}</view>
                    <view>
                        <view>{{dataInfor.money}} USDT</view>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>{{$t('content.userList[43]')}}</view>
                    <view>
                        <view>{{dataInfor.orderNo}}</view>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>{{$t('content.userList[44]')}}</view>
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
        onReady() {
            uni.setNavigationBarTitle({
                title: this.$t('header[18]')
            })
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
