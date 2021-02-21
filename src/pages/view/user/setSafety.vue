<template>
    <view class="setSafetyContent">
        <view class="userList">
            <view class="cu-item" @click="routeSkip('setMobile')">{{$t('content.set[0]')}} <text>{{ $public.phoneEncryption(tel) }}</text></view>
            <view class="cu-item" @click="routeSkip('setPass')">{{$t('content.set[1]')}} <text>{{$t('content.set[2]')}}</text></view>
            <view class="cu-item" @click="routeSkip('setDeal')">{{$t('content.set[3]')}}
			<text v-if="status">{{$t('content.set[4]')}}</text>
			<text v-else>{{$t('content.set[5]')}}</text>
			</view>
        </view>
        <view class="btnBox">
            <button class="cu-btn" @click="outLogin">{{$t('content.set[6]')}}</button>
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
        onReady() {
            uni.setNavigationBarTitle({
                title: this.$t('header[20]')
            })
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
