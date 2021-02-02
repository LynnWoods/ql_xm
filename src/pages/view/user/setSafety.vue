<template>
    <view class="setSafetyContent">
        <view class="userList">
            <view class="cu-item" @click="routeSkip('setMobile')">我的帐号 <text>{{ $public.phoneEncryption(tel) }}</text></view>
            <view class="cu-item" @click="routeSkip('setPass')">登录密码 <text>修改</text></view>
            <view class="cu-item" @click="routeSkip('setDeal')">交易密码 
			<text v-if="status">去修改</text>
			<text v-else>去设置</text>
			</view>
        </view>
        <view class="btnBox">
            <button class="cu-btn" @click="outLogin">退出登录</button>
        </view>
    </view>
</template>

<script>
    export default {
        name: "setSafety",
        data(){
            return{
                tel:this.$store.state.user.userInfo.mobile,
				status:null
            }
        },
        onLoad(){
			
		},
		onShow(){
			this.status = uni.getStorageSync('user').jyPasswprd
		},
        computed:{},
        methods:{
            routeSkip(url){
                let _this = this;
                uni.navigateTo({
                    url:`/pages/view/user/`+url
                })
            },
            outLogin(){
                uni.removeStorageSync('token');
                uni.removeStorageSync('user');
                uni.navigateTo({
                    url: '/pages/login/login',
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .setSafetyContent{
        .userList{
            background-color: #fff;
            border-radius: 32rpx;
            padding: 20rpx 0;
            .cu-item{
                font-size: 28rpx;
                font-weight: 500;
                color: #495068;
                line-height: 90rpx;
                margin-left: 40rpx;
                padding-right: 44rpx;
                border-bottom: 1px solid rgba(0,0,0,0.10);
                display: flex;
                justify-content: space-between;
                align-items: center;
                text{
                    display: block;
                    flex: 1;
                    text-align: right;
                    font-size: 28rpx;
                    font-weight: 500;
                    color: #c4c4c4;
                }
            }
            .cu-item:after{
                content: '';
                display: block;
                width: 40rpx;
                height: 40rpx;
                background-image: url("@/static/more.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
            .cu-item:last-child{
                border: none;
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
