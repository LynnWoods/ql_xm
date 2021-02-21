<template>
    <view class="inviteContent">
        <view class="inviteBg">
            <image src="@/static/left_1.png" class="inviteBack" @click="inviteBack"></image>
            <view class="inCode">
                <view class="box">
                    <text>{{$t('content.invite[0]')}}</text>
                    <view class="code">{{invitationCode}}</view>
                    <view class="copy" @click="copy(invitationCode)">{{$t('content.invite[1]')}}</view>
                </view>
            </view>
        </view>
        <view>
			<view class="inviteRecord">{{$t('content.invite[2]')}}</view>
			<view class="inviteLabel">{{$t('content.invite[3]')}}</view>
			<view class="inviteList" v-if="invitation.length>0">
			    <view class="title">
			        <text>{{$t('content.invite[4]')}}</text>
			        <text>{{$t('content.invite[5]')}}</text>
			    </view>
			    <view class="contBody">
			        <view class="line" v-for="(item,index) in invitation" :key="index">
			            <text>{{item.createTime}}</text>
			            <text>{{item.nickname}}</text>
			        </view>
			    </view>
			</view>
		</view>
        <view class="btnBox">
            <button class="cu-btn" @click="card">{{$t('content.invite[6]')}}</button>
        </view>
    </view>
</template>

<script>
	import {member_invitation,member_qrcode} from '@/api/api.js'
    import uniCopy from '@/utils/uni-copy.js'
    export default {
        name: "invite",
        data(){
            return{
				invitation:[],
				total:'',
				page:0,
				invitationCode:''
			}
        },
        onShow(){
			this.get_invitation_list()
		},
        methods:{
			get_invitation_list(){
				member_invitation({pageNo:this.page,pageSize:15}).then(res=>{
					this.total = res.data.total;
					this.invitation = res.data.list;
				})
				member_qrcode().then(res=>{
					this.invitationCode = res.data.invitationCode
				})
			},
            inviteBack(){
                let _this = this;
                uni.switchTab({
                    url:'/pages/user/index'
                })
            },
            copy(value){
                uniCopy({
                    content:value,
                    success:(res)=>{
                        uni.showToast({
                            title: res,
                            icon: 'none'
                        })
                    },
                    error:(e)=>{
                        uni.showToast({
                            title: e,
                            icon: 'none',
                            duration:3000,
                        })
                    }
                })
            },
            card(){
                let _this = this;
                uni.navigateTo({
                    url:'/pages/view/user/card'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    page{padding: 0 0 90rpx 0;background-color: #5062d0}
    .inviteContent{
        .inviteBg{
            padding: 102rpx 0 204rpx 0;
            background-image: url("@/static/beijing.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: relative;
            .inviteBack{
                width: 18rpx;
                height: 34rpx;
                position: absolute;
                left: 40rpx;
                top: 35rpx;
                z-index: 9;
            }
            .inCode{
                width: 450rpx;
                /*height: 596rpx;*/
                /*background-color: #fff;*/
                margin: 0 auto;
                /*border-radius: 32rpx;*/
                padding: 48rpx 40rpx;
                .box{
                    width: 100%;
                    /*height: 384rpx;*/
                    /*border: 2rpx solid #ededed;*/
                    /*border-radius: 32rpx;*/
                    padding: 110rpx 0  80rpx 0;
                    text-align: center;
                    text{
                        font-size: 32rpx;
                        font-weight: 500;
                        color: rgba(255,255,255,0.80);
                    }
                    .code{
                        font-size: 64rpx;
                        font-weight: 500;
                        color: #ffffff;
                        margin: 32rpx 0;
                    }
                    .copy{
                        width: 260rpx;
                        height: 76rpx;
                        line-height: 76rpx;
                        text-align: center;
                        background-color: #faf0b5;
                        border: 4rpx solid #f6da65;
                        border-radius: 42rpx;
                        margin: 0 auto;
                        font-size: 32rpx;
                        font-weight: 500;
                        color: #333333;
                    }
                }
            }
        }
        .inviteRecord{
            padding: 16rpx 0;
            line-height: 44rpx;
            font-size: 32rpx;
            font-weight: 500;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .inviteRecord:before,.inviteRecord:after{
            content: '';
            display: block;
            height: 2rpx;
            width: 35rpx;
            margin: 0 10rpx;
            background-color:#fff;
        }
        .inviteLabel{text-align: center;font-size: 28rpx;font-weight: 400;color: #fff;}
        .inviteList{
            padding: 32rpx;
            .title{
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #84a2ff;
                /*opacity: 0.72;*/
                border-radius: 16rpx 16rpx 0 0;
                text{
                    display: block;
                    flex: 1;
                    height: 90rpx;
                    line-height: 90rpx;
                    text-align: center;
                    font-size: 28rpx;
                    font-weight: 500;
                    color: #ffffff;
                }
            }
            .contBody{
                height: 334rpx;
                overflow-y: auto;
                .line{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #fff;
                    border-bottom: 2rpx solid #979797;
                    text{
                        display: block;
                        flex: 1;
                        text-align: center;
                        height: 82rpx;
                        line-height: 82rpx;
                        font-size: 28rpx;
                        font-weight: 400;
                        color: #495068;
                    }
                }
                .line:last-child{
                    border-radius: 0 0 16rpx 16rpx;
                }
            }
        }
        .btnBox{
            /*padding: 80rpx 32rpx 94rpx 32rpx;*/
            padding: 10rpx 32rpx 10rpx 32rpx;
            position: fixed;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 99;
            background-color: #5062d0;
            .cu-btn{
                background-color: #7281d7;
                font-size: 32rpx;
                font-weight: 500;
                color: #ffffff;
                border-radius: 32rpx;
            }
        }
    }
</style>
