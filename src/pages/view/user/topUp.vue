<template>
    <view>
        <uni-nav-bar background-color="#F3F3F3" shadow="false" fixed="true">
            <view class="navBar">
                <image src="@/static/left.png" @click="returnIndex"></image>
                <view class="tit">充币</view>
                <view class="rightTit"@click="topupDetail">明细</view>
            </view>
        </uni-nav-bar>
		<!-- <view id="qrCode" ref="qrCodeDiv"></view> -->

        <view class="topUpContent">
            <view class="dropdownItem">
                <view class="dropdownSelected" @click="changePopup">
                    <view class="iptCode">
                        <text>币种</text>
                        <view>{{vlaTxt}}  <image src="@/static/more.png"></image></view>
                    </view>
                </view>
                <view class="dropdownContent" v-if="showList">
                    <view @click="valueBtn('FIL')">FIL</view>
                    <view @click="valueBtn('USDT')">USDT</view>
                </view>
            </view>
            <view class="chainName" v-if="vlaTxt=='USDT'">
                <view class="name">链名称</view>
                <view class="trc">ERC20</view>
            </view>
            <view class="imageCode">
                <view class="code">
					 <view class="qrimg">
					     <tki-qrcode
					     ref="qrcode"
					     :val="val"
					     :size="size"
					     :unit="unit"
					     :background="background"
					     :foreground="foreground"
					     :pdground="pdground"
					     :icon="icon"
					     :iconSize="iconsize"
					     :lv="lv"
					     :onval="onval"
					     :loadMake="loadMake"
					     :usingComponents="true"
					     @result="qrR" />
					 </view>
                </view>
                <view class="preserve" @tap="saveQrcode">保存二维码至相册</view>
                <text class="addr">充币地址</text>
                <view class="copyAddr">
                    <view class="textAddr">{{addrVla}}</view>
                    <image src="@/static/copy.png" @click="copy(addrVla)"></image>
                </view>
            </view>
            <view class="showClass" v-if="showList" @click="closePopup"></view>
        </view>
    </view>
</template>

<script>
	import {deposit_create_addr} from '@/api/api.js'
    import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
    import uniCopy from '@/utils/uni-copy.js'
	// import {qrCode} from 'qrcodejs2'
    export default {
        components: {uniNavBar,tkiQrcode},
        data(){
            return{
                showList:false,
                vlaTxt:'FIL',
                addrVla:'',
				chainEnum:'',
				ifShow: true,
				val: 'f1wx7ftxgwnwk47hdi5tfowoh7kidt3mcmaxdcbka', // 要生成的二维码值
				size: 300, // 二维码大小
				unit: 'upx', // 单位
				background: '#fff', // 背景色
				foreground: '#333333', // 前景色
				pdground: '#333', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: false, // 组件加载完成后自动生成二维码
				codesrc: '' // 二维码生成后的图片地址或base64
            }
        },
        onShow(){
			this.get_addr()
		},
		onReady(){

		},
        methods:{
			get_addr(){
				if(this.vlaTxt=='FIL'){
					this.chainEnum= 'FILECOIN'
				}else{
					this.chainEnum = 'ERC20'
				}
				deposit_create_addr({chainEnum:this.chainEnum}).then(res=>{
					let _this = this
					_this.addrVla = res.data
					this.ifShow = true
					this.val = this.addrVla
					this.$refs.qrcode._makeCode()
				})
			},
			qrR(res) {
				// console.log(res)
				this.codesrc = res
			},
			saveQrcode() {

				this.$refs.qrcode._saveCode()
			},
			// saveImg(url){
			// 	var oA = document.createElement('a');
			// 	oA.download = '';// 设置下载的文件名，默认是’下载’
			// 	oA.href = url;
			// 	document.body.appendChild(oA);
			// 	oA.click();
			// 	oA.remove(); // 下载之后把创建的元素删除
			// },
            returnIndex(){
                let _this = this;
                uni.switchTab({
                    url:'/pages/user/index'
                })
            },
            valueBtn(val){
                let _this = this;
                _this.vlaTxt = val
				this.get_addr()
                _this.closePopup()
            },
            changePopup(){
                let _this = this;
                if(_this.showList) {
                    _this.closePopup()
                } else {
                    _this.openPopup()
                }
            },
            openPopup() {
                let _this = this;
                _this.showList = true
            },
            closePopup() {
                let _this = this;
                _this.showList = false
            },
            topupDetail(){
                let _this = this;
                uni.navigateTo({
                    url:'/pages/view/user/topupDetail'
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    page{background-color: #F3F3F3;padding: 0}
    .navBar{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30rpx;
        image{
            width: 18rpx;
            height: 35rpx;
        }
        .tit{
            font-weight: 600;
        }
        .rightTit{
            height: 40rpx;
            width: 90rpx;
            line-height: 40rpx;
            text-align: center;
            background-color: #3466ff;
            border-radius: 16rpx;
            font-size: 24rpx;
            font-weight: 500;
            color: #ffffff;
        }
    }
	#qrCode{
	      // position: absolute;
	      // top: 358px;
	      // left: 119px;
	      width: 122px;
	      height: 122px;
	      // overflow: hidden;
	      padding: 3px;
	      img{
	        width: 100%;
	        height: 100%;
	      }
	    }
    .topUpContent{
        padding:  12rpx 28rpx;
        .dropdownItem{
            position: relative;
            z-index: 9;
            .dropdownSelected{
                background-color: #fff;
                border-radius: 32rpx;
                padding: 34rpx 30rpx;
                .iptCode{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    text{
                        font-size: 28rpx;
                        font-weight: 700;
                        color: #495068;
                    }
                    view{
                        display: flex;
                        align-items: center;
                        font-size: 28rpx;
                        font-weight: 500;
                        color: #979797;
                        image{
                            width: 38rpx;
                            height: 38rpx;
                        }
                    }
                }
            }
            .dropdownContent{
                position: absolute;
                height: auto;
                left: 20rpx;
                right: 20rpx;
                padding: 0 20rpx;
                background-color: #fff;
                -moz-box-shadow:0px 2px 6px #ebebeb;
                -webkit-box-shadow:0px 2px 6px #ebebeb;
                box-shadow:0px 2px 6px #ebebeb;
                view{
                    border-bottom: 1rpx solid #d8d8d8;
                    font-size: 28rpx;
                    line-height: 80rpx;
                    font-weight: 700;
                    color: #495068;
                }
                view:last-child{
                    border:none;
                }
            }
        }
        .chainName{
            padding: 20rpx 0 0 0;
            .name{
                font-size: 34rpx;
                font-weight: 600;
                color: #495068;
            }
            .trc{
                width: 138rpx;
                height: 52rpx;
                line-height: 52rpx;
                text-align: center;
                border-radius: 16rpx;
                background-color: #9aa6cd;
                font-size: 14px;
                color: #ffffff;
                margin-top: 20rpx;
            }
        }
        .imageCode{
            background-color: #fff;
            border-radius: 32rpx;
            margin: 20rpx 0;
            text-align: center;
            padding: 100rpx 0;
            .code{
                width: 300rpx;
                height: 300rpx;
                margin: 0 auto;
                image{
                    width: 100%;
                    height: 100%;
                }
            }
            .preserve{
                width: 288rpx;
                height: 64rpx;
                line-height: 64rpx;
                text-align: center;
                margin: 32rpx auto 60rpx auto;
                font-size: 28rpx;
                font-weight: 600;
                color: #3466ff;
                background-color: #ecf0ff;
                border-radius: 16rpx;
            }
            .addr{
                font-size: 24rpx;
                font-weight: 600;
                color: #9aa6cd;
            }
            .copyAddr{
                display: flex;
                align-items: center;
                background-color: #f3f6ff;
                border-radius: 32rpx;
                margin: 12rpx 30rpx 0 30rpx;
                padding: 20rpx;
                .textAddr{
                    // flex: 1;
					// height: 42px;
					width: 90%;
                    text-align: center;
                    font-size: 20rpx;
                    font-weight: 400;
					word-wrap:break-word;
                    color: #495068;
                }
                image{
                    height: 50rpx;
                    width: 50rpx;
                }
            }
        }
        .showClass{
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }
</style>
