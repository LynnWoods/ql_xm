<template>
    <view class="loginContent">
        <view class="language">
            <view class="langShow"@click.stop="isLanguage">
                <image src="@/static/lang.png" class="lang"></image>
                <text>{{language}}</text>
            </view>
            <view class="langList"v-if="isLang">
                <text @click="btnLang('zh_cn')">简体中文</text>
                <text @click="btnLang('en_us')">English</text>
            </view>
        </view>
        <image src="@/static/logo.png" class="logo"></image>
        <view class="loginBox">
            <view class="loginIpt">
                <input type="text" v-model="formData.tel" :placeholder="$t('login[3]')"placeholder-style="color: #a9adbe">
            </view>
            <view class="loginIpt">
                <input type="password" v-if="iptType == 'password'" v-model="formData.password" :placeholder="$t('login[4]')"placeholder-style="color: #a9adbe">
                <input type="text" v-else v-model="formData.password" :placeholder="$t('login[4]')"placeholder-style="color: #a9adbe">
                <image :src="passShow" @click="showPass"></image>
            </view>
            <view class="forget"><text @click="forget">{{$t('login[2]')}}</text></view>
            <view class="btnFun">
                <view class="clause">
                    <view class="state" :class="isClause ? 'active' : ''" @click="isClause = !isClause"></view>
                    <text>{{$t('login[5]')}}</text>
                    <text class="blue" @click="open(3)">{{$t('login[6]')}}</text>
                    <text class="blue" @click="open(4)">{{$t('login[7]')}}</text>
                </view>
                <button class="lg-btn" @click="login">{{$t('login[0]')}}</button>
                <button class="re-btn" @click="register">{{$t('login[1]')}}</button>
            </view>
        </view>
		<uniPopup ref="popup" type="center">
			<view v-html="agreement"></view>
		</uniPopup>
    </view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
    import {submitLogin,cms_type} from '@/api/api.js'
    import {mapActions} from 'vuex'
    export default {
		components:{uniPopup},
        data(){
            return{
				agreement:null,
                isClause:false,
                isLang:false,
                language:'简体中文',
                iptType:'password',
                passShow:require('@/static/eye-close.png'),
                formData:{
                    tel:'13219108806',
                    password :'123456aa'
                }
            }
        },
        onLoad() {
            let lang = uni.getStorageSync('_lang')
            if (lang == 'zh_cn'){
                this.language= '简体中文'
            } else {
                this.language= 'English'
            }
        },
        computed:{},
        methods:{
            ...mapActions([
                'getUserInfo'
            ]),
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
            isLanguage(el){
                let _this = this;
                _this.isLang = !_this.isLang;
                // el.stopPropagation();
                document.onclick = function (event) {
                    _this.isLang = false;
                }
            },
            btnLang(lang){
                let _this = this
                this.$i18n.locale = lang
                uni.setStorageSync('_lang', lang)
                if (lang == 'zh_cn'){
                    this.language= '简体中文'
                } else {
                    this.language= 'English'
                }
                _this.isLang = false
            },
            login(){
                let _this = this
                if (!_this.formData.tel){
                    _this.$public.msg(_this.$t('login[8]'))
                    return false
                }
                if (!_this.formData.password){
                    _this.$public.msg(_this.$t('login[9]'))
                    return false
                }
                let _data = {
                    tel:_this.formData.tel,
                    password:_this.$utils.encrypt(_this.formData.password)
                }
				if(this.isClause){
					uni.showLoading({
						title: _this.$t('login[11]')+'....'
					});
					submitLogin(_data).then(res=>{
						if (res.code == 200){
							_this.$ComTools.setToken(res.data.token)
							_this.getUserInfo(res.data)
							_this.$ComTools.setUser(res.data)
							setTimeout(()=>{
								uni.hideLoading();
								uni.switchTab({
									url: '/pages/index/index',
								})
							},2000)
						}else {
							uni.hideLoading();
							_this.$public.msg(res.message,2000)
						}
					}).catch(err=>{
						uni.hideLoading();
						console.log(err)
					})
				}else{
					_this.$public.msg(_this.$t('login[10]'))
				}

            },
            forget(){
                let _this = this
                uni.navigateTo({
                    url: '/pages/login/forget',
                })
            },
            register(){
                let _this = this
                uni.navigateTo({
                    url: '/pages/login/register',
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    page{padding: 0;background-color: #fff}
    .loginContent{
        padding-top: 174rpx;
        .language{
            position: absolute;
            right: 80rpx;
            top: 50rpx;
            .langShow{
                display: flex;
                align-items: center;
                font-size: 30rpx;
                font-weight: 600;
                padding-right: 30rpx;
                background-image: url("@/static/dow.png");
                background-size: 30rpx 35rpx;
                background-repeat: no-repeat;
                background-position: 100%;
                .lang{
                    width: 40rpx;
                    height: 40rpx;
                }
                text{
                    padding: 0 10rpx;
                }
            }
            .langList{
                -moz-box-shadow:0rpx 0rpx 10rpx #eee;
                -webkit-box-shadow:0rpx 0rpx 10rpx #eee;
                box-shadow:0rpx 0rpx 10rpx #eee;
                text{
                    display: block;
                    text-align: center;
                    line-height: 80rpx;
                    font-size: 30rpx;
                    font-weight: 600;
                }
                text:nth-child(1){
                    border-bottom: 2rpx solid #eee;
                }
            }
        }
        .logo{
            display: block;
            width: 176rpx;
            height: 242rpx;
            margin: 0 auto;
        }
        .loginBox{
            padding: 96rpx 74rpx 0 74rpx;
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

