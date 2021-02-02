<template>
    <view class="setMobile">
        <view class="setIpt">
            <input type="text"v-model="formData.tel" placeholder="请输入新手机号"placeholder-style="color: #c4c4c4">
        </view>
        <view class="setIpt">
            <input type="text"v-model="formData.code" placeholder="请输入验证码"placeholder-style="color: #c4c4c4">
            <text @click="getAuthCodeBefore">{{sendCodeFlag ? intervalTime : '获取验证码'}}</text>
        </view>
        <view class="btnBox">
            <button class="cu-btn" @click="setNewTel">确定</button>
        </view>
    </view>
</template>

<script>
    import {getCode,editTel} from '@/api/api.js'
    export default {
        name: "setMobile",
        data(){
            return{
                intervalTime:90,
                sendCodeFlag:false,
                timeId:'',
                formData:{
                    tel:'',
                    code:''
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
            getAuthCodeBefore(){
                let _this = this;
                if (!_this.formData.tel){
                    _this.$public.msg('手机号不能为空')
                    return false
                }
                if (!_this.sendCodeFlag){
                    getCode({
                        type:'UPDATE_TEL',
                        tel:_this.formData.tel
                    }).then(res=>{
                        if (res.code == 200){
                            _this.sendCodeFlag = true
                        }
                        _this.$public.msg(res.message)
                    })
                }
            },
            setNewTel(){
                let _this = this;
                let _data = {
                    tel:_this.formData.tel,
                    code:_this.formData.code
                }
                editTel(_data).then(res=>{
                    _this.$public.msg(res.message)
                    if (res.code == 200){
                        _this.formData.tel = ''
                        _this.formData.code = ''
                        setTimeout(()=>{
                            uni.removeStorageSync('token');
                            uni.removeStorageSync('user');
                            uni.navigateTo({
                                url: '/pages/login/login',
                            })
                        },1000)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .setMobile{
        .setIpt{
            background-color: #fff;
            border-radius: 32rpx;
            padding: 0 28rpx;
            margin-bottom: 20rpx;
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
                height: 88rpx;
                line-height: 88rpx;
                text-align: center;
                font-size: 28rpx;
                font-weight: 500;
                color: #495068;

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
