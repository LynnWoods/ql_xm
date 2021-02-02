<template>
    <view class="forgetContent">
        <view class="return">
            <image src="@/static/back_code.png" @click="returnLogin"></image>
            <text>找回密码</text>
        </view>
        <view class="loginBox">
            <view class="loginIpt">
                <input type="text" v-model="formData.tel" placeholder="请输入手机号"placeholder-style="color: #a9adbe">
            </view>
            <view class="loginIpt">
                <input type="text" v-model="formData.code" placeholder="请输入验证码"placeholder-style="color: #a9adbe">
                <text @click="getAuthCodeBefore">{{sendCodeFlag ? intervalTime : '验证码'}}</text>
            </view>
            <view class="loginIpt">
                <input type="password" v-model="formData.password" placeholder="请输入新密码"placeholder-style="color: #a9adbe">
            </view>
            <view class="loginIpt">
                <input type="password" v-model="formData.towPass" placeholder="请再次确认新密码"placeholder-style="color: #a9adbe">
            </view>
            <view class="btnFun">
                <button class="lg-btn" @click="resetPass">重置密码</button>
            </view>
        </view>
    </view>
</template>

<script>
    import {forgetPass, getCode} from '@/api/api.js'
    export default {
        name: "forget",
        data(){
            return{
                intervalTime:90,
                sendCodeFlag:false,
                timeId:'',
                formData:{
                    tel:'',
                    code:'',
                    password:'',
                    towPass:'',
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
            returnLogin(){
                let _this = this;
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
                        type:'FORGET_PASSWORD',
                        tel:_this.formData.tel
                    }).then(res=>{
                        if (res.code == 200){
                            _this.sendCodeFlag = true
                        }
                        _this.$public.msg(res.message)
                    })
                }
            },
            resetPass(){
                let _this = this;
                if (!_this.formData.tel){
                    _this.$public.msg('手机号不能为空')
                    return false
                }
                if (!_this.formData.code){
                    _this.$public.msg('验证码不能为空')
                    return false
                }
                if (!_this.formData.password){
                    _this.$public.msg('密码不能为空')
                    return false
                }
                if (_this.formData.password !== _this.formData.towPass){
                    _this.$public.msg('两次密码输入不一致')
                    return false
                }
                let _data = {
                    tel:_this.formData.tel,
                    code:_this.formData.code,
                    password:_this.$utils.encrypt(_this.formData.password)
                }
                forgetPass(_data).then(res =>{
                    _this.$public.msg(res.message)
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
    page{padding: 12rpx 60rpx;background-color: #fff}
    .forgetContent{
        .return{
            display: flex;
            align-items: center;
            margin-top: 80rpx;
            image{
                width: 52rpx;
                height: 52rpx;
            }
            text{
                font-size: 44rpx;
                font-weight: 600;
                color: #495068;
                padding-left: 20rpx;
            }
        }
        .loginBox{
            padding: 96rpx 0 0 0;
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
            .forget{
                text-align: right;
                font-size: 28rpx;
                font-weight: 500;
                text-decoration: underline;
                color: #3466ff;
            }
            .btnFun{
                padding: 121rpx 50rpx 0 50rpx;
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
