<template>
    <view class="setPass">
        <view class="setIpt">
            <input type="text" disabled :placeholder="$public.phoneEncryption(tel)"placeholder-style="color: #c4c4c4">
        </view>
        <view class="setIpt">
            <input type="text"v-model="formData.code" :placeholder="$t('content.set[8]')"placeholder-style="color: #c4c4c4">
            <text @click="getAuthCodeBefore">{{sendCodeFlag ? intervalTime+'s' : $t('content.set[9]')}}</text>
        </view>
        <view class="setIpt">
            <input type="password" v-if="iptType == 'password'" v-model="formData.pasw" :placeholder="$t('content.set[11]')"placeholder-style="color: #c4c4c4">
            <input type="text" v-else v-model="formData.pasw" :placeholder="$t('content.set[11]')"placeholder-style="color: #c4c4c4">
            <image :src="passShow" @click="showPass"></image>
        </view>
        <view class="btnBox">
            <button class="cu-btn" @click="setPasw">{{$t('content.set[10]')}}</button>
        </view>
    </view>
</template>

<script>
    import {getCode,updatePwd} from '@/api/api.js'
    export default {
        name: "setPass",
        data(){
            return{
                iptType:'password',
                intervalTime:60,
                sendCodeFlag:false,
                timeId:'',
                tel:this.$store.state.user.userInfo.mobile,
                passShow:require('@/static/hide.png'),
                formData:{
                    code:'',
                    pasw:'',
                }
            }
        },
        onLoad(){},
        watch:{
            sendCodeFlag(val){
                if (!val) {
                    this.intervalTime = 60;
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
        onReady() {
            uni.setNavigationBarTitle({
                title: this.$t('header[22]')
            })
        },
        methods:{
            getAuthCodeBefore(){
                let _this = this;
                if (!_this.sendCodeFlag){
                    getCode({
                        type:'EDIT_PASSWORD',
                        tel:_this.tel
                    }).then(res=>{
                        if (res.code == 200){
                            _this.sendCodeFlag = true
                        }
                        _this.$public.msg(res.message)
                    })
                }
            },
            showPass(){
                let _this = this;
                if (_this.iptType == 'password'){
                    _this.iptType = 'text'
                    _this.passShow = require('@/static/show.png')
                } else {
                    _this.iptType = 'password'
                    _this.passShow = require('@/static/hide.png')
                }
            },
            setPasw(){
                let _this = this;
                if (!_this.formData.code){
                    _this.$public.msg(_this.$t('content.set[13]'))
                    return false
                }
                if (!_this.formData.pasw){
                    _this.$public.msg(_this.$t('content.set[14]'))
                    return false
                }
                let _data = {
                    code:_this.formData.code,
                    pswd:_this.$utils.encrypt(_this.formData.pasw)
                }
                updatePwd(_data).then(res=>{
                    _this.$public.msg(res.message)
                    if (res.code == 200){
                        _this.formData.code = ''
                        _this.formData.pasw = ''
                        setTimeout(()=>{
                            uni.removeStorageSync('token');
                            uni.removeStorageSync('user');
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
    .setPass{
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
            image{
                display: block;
                width: 50rpx;
                height: 50rpx;
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
