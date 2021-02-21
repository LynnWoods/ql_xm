<template>
    <scroll-view scroll-y class="userContent">
        <view class="userHead">
            <view class="userImg">
                <view :class="vipLevel=='1'?'imgBox':''">
                    <image :src="imgUser" class="imgCode"@click="getImg"></image>
                    <image :src="imgSuper" class="imgClass" v-if="vipLevel=='1'"></image>
                </view>
                <view class="iptName">
                    <input type="text" v-model="nameTel" :focus="isFocus"  class="userIpt" :disabled="isEdit">
                    <image :src="imgEdit" class="imgEdit" @click="btnEdit"></image>
                </view>
            </view>
            <view class="assetPrice">
                <view class="title">
                    {{$t('content.user[0]')}}(USDT)
                    <image :src="imgShow"@click="isShowImg"></image>
                </view>
                <view class="price" v-if="isPrice">{{usdt}} <text>≈{{cny}} CNY</text></view>
                <view class="price" v-else>******</view>
            </view>
        </view>
        <view class="userNav">
            <block v-for="(item,index) in userNav" :key="index">
                <view class="line"@click="routeSkip(item.url)">
                    <image :src="item.imgUrl"></image>
                    <text>{{item.text}}</text>
                </view>
            </block>
        </view>
        <view class="userList">
            <view class="cu-item" @click="myOrder"><image src="@/static/list_1.png"></image> {{$t('content.user[5]')}}</view>
            <view class="cu-item" @click="invite"><image src="@/static/list_2.png"></image> {{$t('content.user[6]')}}</view>
            <view class="cu-item" @click="setSafety"><image src="@/static/list_3.png"></image> {{$t('content.user[7]')}}</view>
            <view class="cu-item" @click="usSkip"><image src="@/static/list_4.png"></image> {{$t('content.user[8]')}}</view>
            <view class="cu-item" @click="versions"><image src="@/static/list_5.png"></image> {{$t('content.user[9]')}}</view>
        </view>
    </scroll-view>
</template>

<script>
    import {getInfoUser,editNice,editHead,get_wallet_list} from '@/api/api.js'
    export default {
        data(){
            return{
                isPrice:true,
                isEdit:true,
                isFocus:false,
                nameTel:'',
				cny:null,
				usdt:null,
                vipLevel:null,
                imgUser:require('@/static/userLogo.png'),
                imgEdit:require('@/static/edit.png'),
                imgSuper:require('@/static/super.png'),
                imgShow:require('@/static/show.png'),
                userNav:[
                    {
                        text:this.$t('content.user[1]'),
                        imgUrl:require('@/static/user_1.png'),
                        url:'topUp',
                    },
                    {
                        text:this.$t('content.user[2]'),
                        imgUrl:require('@/static/user_2.png'),
                        url:'extract',
                    },
                    {
                        text:this.$t('content.user[3]'),
                        imgUrl:require('@/static/user_3.png'),
                        url:'transfer',
                    },
                    {
                        text:this.$t('content.user[4]'),
                        imgUrl:require('@/static/user_4.png'),
                        url:'asset',
                    }
                ]
            }
        },
        onShow() {
            this.init()
        },
		onPullDownRefresh() {
			this.init()
		    //刷新完成后关闭
		    setTimeout(function () {
		      uni.stopPullDownRefresh(); //停止下拉刷新动画
		    }, 1000);
		 },
        onReady() {
            uni.setNavigationBarTitle({
                title: this.$t('header[13]')
            })
        },
        watch:{
            'nameTel'(o,n){}
        },
        methods:{
            init(){
                let _this = this;
                _this.getUserInfo()
				get_wallet_list({}).then(res=>{
					this.cny = res.data.cnyTotal;
					this.usdt = res.data.usdtTotal;
				})
            },
            getUserInfo(){
                let _this = this;
                getInfoUser().then(res=>{
                    if (res.code == 200){
                        _this.vipLevel = res.data.vipLevel;
                        if (res.data.nick){
                            _this.nameTel = res.data.nick
                        } else {
                            _this.nameTel = _this.$public.phoneEncryption(res.data.tel)
                        }
                        if(res.data.headUrl==null){
                            this.imgUser = require('@/static/userLogo.png')
                        }else{
                            this.imgUser =this.$public.img_host + res.data.headUrl
                        }
                    }
                })
            },
            btnEdit(){
                let _this = this;
                _this.isEdit = !_this.isEdit;
                _this.isFocus = false;
                if (_this.isEdit){
                    _this.imgEdit = require('@/static/edit.png')
                    editNice(
                        {nick:_this.nameTel}
                    ).then(res=>{
                        _this.$public.msg(res.message)
                        if (res.code == 200){
                            _this.getUserInfo()
                        }
                    })
                } else {
                    setTimeout(()=>{
                        _this.isFocus = true;
                    },0)
                    _this.imgEdit = require('@/static/edit_1.png')
                }
            },
            isShowImg(){
                let _this = this;
                _this.isPrice = !_this.isPrice;
                if (_this.isPrice){
                    _this.imgShow = require('@/static/show.png')
                } else {
                    _this.imgShow = require('@/static/hide.png')
                }
            },
            getImg(){
                let _this = this;
                uni.chooseImage({
                    count: 1,
                    success: function (res) {
                        uni.uploadFile({
                            url:`${_this.$public.img_host}/app/upload/imgUpload`,
                            filePath: res.tempFilePaths[0],
                            header: {'auth-token': _this.$ComTools.getToken() || ''},
                            success:(e) => {
                                let imgUser = JSON.parse(e.data).data;
                                editHead({
                                    head:imgUser
                                }).then(res=>{
                                    _this.$public.msg(res.message)
                                    if (res.code == 200){
										_this.getUserInfo()
                                        // _this.imgUser = `${_this.$public.img_host}${imgUser}`
                                    }
                                })
                            },
                            fail: (err) => {}
                        })
                    }
                });
            },
            routeSkip(url){
				if(url=='extract'||url=='transfer'){
					if(uni.getStorageSync('user').jyPasswprd){
						let _this = this;
						uni.navigateTo({
						    url:`/pages/view/user/`+url
						})
					}else{
						this.$public.msg('请先设置交易密码',1000)
					}
				}else{
					uni.navigateTo({
					    url:`/pages/view/user/`+url
					})
				}


            },
            myOrder(){
                let _this = this;
                uni.navigateTo({
                    url:'/pages/view/user/myOrder'
                })
            },
            invite(){
                let _this = this;
                uni.navigateTo({
                    url:'/pages/view/user/invite'
                })
            },
            setSafety(){
                let _this = this;
                uni.navigateTo({
                    url:'/pages/view/user/setSafety'
                })
            },
            usSkip(){
                let _this = this;
                uni.navigateTo({
                    url:'/pages/view/user/us'
                })
            },
            versions(){
                uni.showToast({
                    title: '已是最新版本',
                    icon: 'none'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .userContent{
        .userHead{
            background-color: #fff;
            border-radius: 32rpx;
            padding: 40rpx 30rpx;
            .userImg{
                display: flex;
                align-items: center;
                .imgCode{
                    width: 122rpx;
                    height: 122rpx;
                    border-radius: 100%;
                }
                .imgBox{
                    width: 122rpx;
                    height: 122rpx;
                    padding: 6rpx;
                    position: relative;
                    border-radius: 100%;
                    background: linear-gradient(135deg,#ffe5a1, #f0b41a);

                    .imgClass{
                        width: 122rpx;
                        height: 36rpx;
                        border-radius: 100%;
                        position: absolute;
                        left: 8rpx;
                        bottom: -6rpx;
                        z-index: 99;
                    }
                }

                .iptName{
                    margin-left: 30rpx;
                    display: flex;
                    align-items: center;
                    .userIpt{
                        width: 210rpx;
                        font-size: 28rpx;
                        font-weight: 700;
                        color: #495068;
                        /*text-align: center;*/
                    }
                    .imgEdit{
                        width: 45rpx;
                        height: 45rpx;
                    }
                }
            }
            .assetPrice{
                margin-top: 45rpx;
                .title{
                    display: flex;
                    align-items: center;
                    font-size: 28rpx;
                    font-weight: 600;
                    color: #a4acc2;
                    image{
                        display: block;
                        width: 50rpx;
                        height: 50rpx;
                        margin-left: 26rpx;
                    }
                }
                .price{
                    font-size: 36rpx;
                    font-weight: 700;
                    color: #495068;
                    margin-top: 20rpx;
                    text{
                        font-size: 24rpx;
                        color: #495068;
                        padding-left: 16rpx;
                    }
                }
            }
        }
        .userNav{
            background-color: #fff;
            border-radius: 32rpx;
            margin: 20rpx 0;
            padding: 30rpx 15rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .line{
                flex: 1;
                margin: 0 30rpx;
                text-align: center;
                image{
                    display: block;
                    margin: 0 auto;
                    width: 64rpx;
                    height: 64rpx;
                }
                text{
                    font-size: 28rpx;
                    font-weight: 500;
                    color: #495068;
                }
            }
        }
        .userList{
            background-color: #fff;
            border-radius: 32rpx;
            padding: 20rpx 0;
            .cu-item{
                font-size: 28rpx;
                font-weight: 500;
                color: #495068;
                line-height: 90rpx;
                margin-left: 96rpx;
                padding-right: 44rpx;
                position: relative;
                border-bottom: 1px solid rgba(0,0,0,0.10);
                image{
                    width: 44rpx;
                    height: 44rpx;
                    position: absolute;
                    left: -66rpx;
                    top: 50%;
                    margin-top: -22rpx;
                }
            }
            .cu-item:after{
                content: '';
                display: block;
                width: 40rpx;
                height: 40rpx;
                background-image: url("../../static/more.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                position: absolute;
                right: 44rpx;
                top: 50%;
                margin-top: -20rpx;
            }
            .cu-item:last-child{
                border: none;
            }
        }
    }
</style>
