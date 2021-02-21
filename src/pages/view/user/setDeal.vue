<template>
    <view class="setDeal">
        <view class="setIpt">
            <input type="text" disabled :placeholder="$public.phoneEncryption(tel)"placeholder-style="color: #c4c4c4">
        </view>
        <view class="setIpt">
            <input type="text" v-model="formData.code" :placeholder="$t('content.set[8]')"placeholder-style="color: #c4c4c4">
            <text @click="getAuthCodeBefore">{{sendCodeFlag ? intervalTime : $t('content.set[9]')}}</text>
        </view>
        <view class="setIpt">
            <input type="password" v-if="iptType == 'password'" v-model="formData.pasw" :placeholder="$t('content.set[12]')"placeholder-style="color: #c4c4c4">
            <input type="text" v-else v-model="formData.pasw" :placeholder="$t('content.set[12]')"placeholder-style="color: #c4c4c4">
            <image :src="passShow" @click="showPass"></image>
        </view>
        <view class="btnBox">
            <button class="cu-btn" @click="jyPass">{{$t('content.set[10]')}}</button>
        </view>
    </view>
</template>

<script>
    import {getCode,jyPassword,getInfoUser} from '@/api/api.js'
    export default {
        name: "setDeal",
        data(){
            return{
                iptType:'password',
                intervalTime:90,
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
        onShow(){
			this.get_useInfo()
		},
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
        onReady() {
            uni.setNavigationBarTitle({
                title: this.$t('header[23]')
            })
        },
        methods:{
			get_useInfo(){
				let _this = this;
				getInfoUser({}).then(res=>{
					_this.$ComTools.setUser(res.data)
				})
			},
            getAuthCodeBefore(){
                let _this = this;
                if (!_this.sendCodeFlag){
                    getCode({
                        type:'EDIT_JY_PASSWORD',
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
            jyPass(){
                let _this = this;
                if (!_this.formData.code){
                    _this.$public.msg(_this.$t('content.set[13]'))
                    return false
                }
                if (!_this.formData.pasw){
                    _this.$public.msg(_this.$t('content.set[16]'))
                    return false
                }
                let _data = {
                    code:_this.formData.code,
                    jyPswd:_this.$utils.encrypt(_this.formData.pasw)
                }
                jyPassword(_data).then(res=>{
                    _this.$public.msg(res.message)
                    if (res.code == 200){
						this.get_useInfo()
                        _this.formData.code = ''
                        _this.formData.pasw = ''
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .setDeal{
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
