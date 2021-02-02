<template>
    <view class="registerContent">
        <image src="@/static/logo.png" class="logo"></image>
        <view class="registerBox">
            <view class="loginIpt">
                <input type="text" v-model="formData.tel" placeholder="请输入手机号"placeholder-style="color: #a9adbe">
            </view>
            <view class="loginIpt">
                <input type="password" v-if="iptType == 'password'" v-model="formData.password" placeholder="请输入密码"placeholder-style="color: #a9adbe">
                <input type="text" v-else v-model="formData.password" placeholder="请输入密码"placeholder-style="color: #a9adbe">
                <image :src="passShow" @click="showPass"></image>
            </view>
            <view class="loginIpt">
                <input type="text" v-model="formData.code" placeholder="请输入验证码"placeholder-style="color: #a9adbe">
                <text @click="getAuthCodeBefore">{{sendCodeFlag ? intervalTime : '验证码'}}</text>
            </view>
            <view class="inviteCode">
                <text>邀请码(必填)</text>
                <input type="text"v-model="formData.invitation">
            </view>
            <view class="btnFun">
                <view class="clause">
                    <view class="state" :class="isClause ? 'active' : ''" @click="isClause = !isClause"></view>
                    <text>同意</text>
                    <text class="blue" @click="open(3)">《用户服务协议》</text>
                    <text class="blue" @click="open(4)">《隐私条款》</text>
                </view>
                <button class="lg-btn" @click="register">注册</button>
                <button class="re-btn" @click="login">登录</button>
            </view>
        </view>
		<uniPopup ref="popup" type="center">
			<view v-html="agreement"></view>
		</uniPopup>
    </view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
    import {submitRegister,getCode,cms_type} from '@/api/api.js'
    export default {
		components:{uniPopup},
        data(){
            return{
                isClause:false,
                intervalTime:90,
                sendCodeFlag:false,
                timeId:'',
				agreement:null,
                iptType:'password',
                passShow:require('@/static/eye-close.png'),
                formData:{
                    tel:'',
                    password:'',
                    code:'',
                    invitation:''
                }
            }
        },
        onLoad(){},
        watch:{
            sendCodeFlag(val){
                if (!val) {
                    this.intervalTime = 90;
                    return clearInterval(this.timeId);
                }
                this.timeId = setInterval(()=>{
                    this.intervalTime--;
                    if (this.intervalTime <= 0) {
                        this.sendCodeFlag = false;
                        clearInterval(this.timeId);
                    }
                },1000)
            }
        },
        methods:{
			open(type){
				this.agreement=''
				cms_type({type:type}).then(res=>{
					this.agreement = res.data.content;
					this.$refs.popup.open()
				})
			},
            showPass(){
                let _this = this;
                if (_this.iptType == 'password'){
                    _this.iptType = 'text'
                    _this.passShow = require('@/static/eye-open.png')
                } else {
                    _this.iptType = 'password'
                    _this.passShow = require('@/static/eye-close.png')
                }
            },
            login(){
                let _this = this
                uni.navigateTo({
                    url: '/pages/login/login',
                })
            },
            getAuthCodeBefore(){
                let _this = this;
                if (!_this.formData.tel){
                    _this.$public.msg('请输入手机号')
                    return false
                }
                if (!_this.sendCodeFlag){
                    getCode({
                        type:'REGISTER',
                        tel:_this.formData.tel
                    }).then(res=>{
                        if (res.code == 200){
                            _this.sendCodeFlag = true
                        }
                        _this.$public.msg(res.message)
                    })
                }
            },
            register(){
                let _this = this;
                if (!_this.formData.tel){
                    _this.$public.msg('手机号不能为空')
                    return false
                }
                if (!_this.formData.password){
                    _this.$public.msg('密码不能为空')
                    return false
                }
                if (!_this.formData.code){
                    _this.$public.msg('验证码不能为空')
                    return false
                }
                // if (!_this.formData.invitation){
                //     _this.$public.msg('邀请码不能为空')
                //     return false
                // }
                if (!_this.isClause){
                    _this.$public.msg('是否同意协议条款')
                    return false
                }
                let _data = {
                    tel:_this.formData.tel,
                    password:_this.$utils.encrypt(_this.formData.password),
                    code:_this.formData.code,
                    invitationCode:_this.formData.invitation
                }
                submitRegister(_data).then(res=>{
                    _this.$public.msg(res.message,1000)
                    if (res.code == 200){
                        setTimeout(()=>{
                            uni.navigateTo({
                                url: '/pages/login/login',
                            })
                        },1500)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    page{padding: 0;background-color: #fff!important;}
    .registerContent{
        padding-top: 144rpx;
        .logo{
            display: block;
            width: 124rpx;
            height: 164rpx;
            margin: 0 auto;
        }
        .registerBox{
            padding: 70rpx 74rpx 0 74rpx;
            .loginIpt{
                background-color: #ecf0ff;
                border-radius: 32rpx;
                padding: 0 28rpx;
                margin-bottom: 32rpx;
                display: flex;
                align-items: center;
                input{
                    flex: 1;
                    height: 88rpx;
                    font-size: 28rpx;
                    font-weight: 500;
                    color: #333;
                }
                text{
                    display: block;
                    width: 140rpx;
                    height: 76rpx;
                    line-height: 76rpx;
                    background-color: #e7e7e7;
                    text-align: center;
                    font-size: 28rpx;
                    font-weight: 500;
                    color: #707070;
                }
                image{
                    display: block;
                    width: 50rpx;
                    height: 50rpx;
                }
            }
            .inviteCode{
                display: flex;
                align-items: flex-end;
                padding: 0 30rpx;
                text{
                    font-size: 28rpx;
                    font-weight: 600;
                    color: #495068;
                }
                input{
                    flex: 1;
                    font-size: 30rpx;
                    font-weight: 500;
                    color: #495068;
                    border-bottom: 2rpx solid #d8d8d8;
                    padding-left: 8rpx;
                }
            }
            .btnFun{
                padding: 98rpx 50rpx 0 50rpx;
                .clause{
                    margin-bottom: 60rpx;
                    display: flex;
                    align-content: center;
                    .state{
                        width: 32rpx;
                        height: 32rpx;
                        margin-right: 10rpx;
                        background-color: #e2e2e2;
                        border-radius: 8rpx;
                    }
                    .active{
                        background-image: url("@/static/agree.png");
                        background-size: 100% 100%;
                    }
                    text{
                        font-size: 24rpx;
                        font-weight: 500;
                        color: #474650;
                    }
                    .blue{
                        color: #3466ff;
                    }
                }
                .lg-btn{
                    background-color: #3466ff;
                    font-size: 32rpx;
                    font-weight: 500;
                    color: #ffffff;
                    border-radius: 32rpx;
                }
                .re-btn{
                    background-color: #fff;
                    font-size: 32rpx;
                    font-weight: 500;
                    color: #474650;
                    border-radius: 32rpx;
                    border: 2rpx solid #3466ff;
                    margin-top: 40rpx;
                }
                .re-btn:after{
                    border-color: transparent;
                }
            }
        }
    }
</style>
