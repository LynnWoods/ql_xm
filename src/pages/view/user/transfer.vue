<template>
    <view>
        <uni-nav-bar background-color="#F3F3F3" shadow="false" fixed="true">
            <view class="navBar">
                <image src="@/static/left.png" @click="returnIndex"></image>
                <view class="tit">{{$t('content.user[35]')}}</view>
                <view class="rightTit"@click="transferDetail">{{$t('content.user[11]')}}</view>
            </view>
        </uni-nav-bar>
        <view class="transferContent">
            <view class="chainName">
                <view class="iptNum">
                    <view class="suffix">
                        <text>{{$t('content.user[36]')}}</text>
                    </view>
                    <input type="text" v-model="transfer.address" :placeholder="$t('content.user[37]')" style="padding: 0 15rpx;text-align: right">
                    <image src="@/static/scan.png"></image>
                </view>
            </view>
            <view class="dropdownItem">
                <view class="dropdownSelected" @click="changePopup">
                    <view class="iptCode">
                        <text>{{$t('content.user[12]')}}</text>
                        <view>{{vlaTxt}}  <image src="@/static/more.png"></image></view>
                    </view>
                </view>
                <view class="dropdownContent" v-if="showList">
                    <view @click="valueBtn('FIL')">FIL</view>
                    <view @click="valueBtn('USDT')">USDT</view>
                </view>
            </view>
            <view class="chainName">
                <view class="iptNum">
                    <view class="suffix">
                        <text>{{$t('content.user[38]')}}</text>
                    </view>
                    <input type="number" v-model="number" value="" placeholder="" style="padding-left: 15rpx">
                    <view class="suffix">
                        <text>{{vlaTxt}}</text>
                        <text class="long"></text>
                        <text @click="all">{{$t('content.user[20]')}}</text>
                    </view>
                </view>
            </view>
            <view class="usableNum">{{$t('content.user[23]')}} {{banlance+vlaTxt}}</view>
            <view class="chainName">
                <view class="name">{{$t('content.user[24]')}}</view>
                <view class="iptNum">
                    <input type="text" :value="transfer.fee" disabled>
                    <view class="suffix">
                        <text>{{vlaTxt}}</text>
                    </view>
                </view>
            </view>
            <view class="chainName">
                <view class="iptNum">
                    <view class="suffix">
                        <text>{{$t('content.user[25]')}}</text>
                    </view>
                    <input type="password" v-model="jyPassword" value="" style="text-align: right" :placeholder="$t('content.user[26]')">
                </view>
            </view>
            <view class="showClass" v-if="showList" @click="closePopup"></view>
        </view>
        <view class="botmFixed">
            <view class="accountNum">
                <text>{{$t('content.user[30]')}}</text>
                <text>{{transfer.totalAmount}} {{transfer.totalAmount?vlaTxt:''}}</text>
            </view>
            <view class="btnBox">
                <button class="cu-btn" @click="submit_btn">{{$t('content.user[39]')}}</button>
            </view>
        </view>
    </view>
</template>

<script>
	import {get_coin_info,get_wallet_list,wallet_transfer} from '@/api/api.js'
    import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    export default {
        name: "transfer",
        components: {uniNavBar},
        data(){
            return{
                showList:false,
                vlaTxt:'FIL',
				banlance:'',
				number:'',
				jyPassword:'',
				transfer:{
					address:'',
					symbol:'',
					fee:'',
					jyPassword:'',
					totalAmount:'',
				}
            }
        },
        onShow(){
			this.get_coin()
		},
		watch:{
			number(n,o){
				if(n==''){
					this.transfer.totalAmount=0
				}else{
					this.transfer.totalAmount = Number(n)
				}
			},
		},
        methods:{
			get_coin(){//查询币种配置
				get_coin_info({unit:this.vlaTxt}).then(res=>{
					this.transfer.fee=res.data[0].transferFee
				})
				get_wallet_list({}).then(res=>{
					if(this.vlaTxt=='FIL'){
						this.banlance = res.data.wallet[0].balance;
					}else if(this.vlaTxt=='USDT'){
						this.banlance = res.data.wallet[1].balance;
					}
				})
			},
			submit_btn(){
				this.transfer.jyPassword =this.$utils.encrypt(this.jyPassword)
				this.transfer.symbol = this.vlaTxt;
				// console.log(this.transfer)
				wallet_transfer({
					balance:this.transfer.totalAmount,
					jyPassword:this.transfer.jyPassword,
					receiveTel:this.transfer.address,
					symbol:this.transfer.symbol
				}).then(res=>{
					if(res.code==200){
						this.transfer.address = ''
						this.transfer.totalAmount = ''
						this.number = ''
						this.jyPassword = ''
						this.$public.msg(res.message)
					}else{
						this.$public.msg(res.message)
					}
				})
			},
			all(){
				this.number = this.banlance;
			},
            returnIndex(){
                let _this = this;
                uni.switchTab({
                    url:'/pages/user/index'
                })
            },
            valueBtn(val){
                let _this = this;
                _this.vlaTxt = val
				this.get_coin()
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
            transferDetail(){
                let _this = this;
                uni.navigateTo({
                    url:'/pages/view/user/transferDetail'
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

    .transferContent{
        padding:  12rpx 28rpx;
        .dropdownItem{
            position: relative;
            z-index: 9;
            padding: 30rpx 0 0 0;
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
            padding: 30rpx 0 0 0;
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
            .iptNum{
                display: flex;
                align-items: center;
                background-color: #fff;
                border-radius: 32rpx;
                padding: 0 30rpx;
                margin-top: 16rpx;
                input{
                    flex: 1;
                    font-size: 28rpx;
                    font-weight: 600;
                    color: #333;
                    height: 90rpx;
                }
                image{
                    width: 42rpx;
                    height: 42rpx;
                }
                .suffix{
                    display: flex;
                    align-items: center;
                    font-size: 28rpx;
                    font-weight: 600;
                    color: #495068;
                    .long{
                        display: block;
                        width: 4rpx;
                        height: 24rpx;
                        background-color: #ebebeb;
                        margin: 0 28rpx;
                    }
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
        .usableNum{
            font-size: 28rpx;
            font-weight: 600;
            color: #495068;
            line-height: 80rpx;
        }
    }

    .botmFixed{
        background-color: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 228rpx;
        padding-top: 40rpx;
        .accountNum{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 26rpx;
            text:nth-child(1){
                font-size: 28rpx;
                font-weight: 500;
                color: #979797;
            }
            text:nth-child(2){
                font-size: 28rpx;
                font-weight: 700;
                color: #495068;
            }
        }
        .btnBox{
            padding: 40rpx 26rpx;
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
