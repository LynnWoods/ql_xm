<template>
    <view>
        <uni-nav-bar background-color="#F3F3F3" shadow="false" fixed="true">
            <view class="navBar">
                <image src="@/static/left.png" @click="returnIndex"></image>
                <view class="tit">提币</view>
                <view class="rightTit"@click="extractDetail">明细</view>
            </view>
        </uni-nav-bar>
        <view class="extractContent" >
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
            <view class="chainName" v-if="vlaTxt == 'USDT'">
                <view class="name">链名称</view>
                <view class="trc">ERC20</view>
            </view>
            <view class="chainName">
                <view class="name">提币地址</view>
                <view class="iptNum">
                    <input type="text" value=""placeholder-style="color: #c4c4c4" v-model="withdraw.address" placeholder="请输入或长按粘贴地址">
                    <image src="@/static/scan.png"></image>
                </view>
            </view>
            <view class="chainName">
                <view class="name">数量</view>
                <view class="iptNum">
                    <input type="number" value=""placeholder-style="color: #c4c4c4" v-model="number" :placeholder="`最小提币数量 ${minWithdrawAmount}`">
                    <view class="suffix">
                        <text>{{vlaTxt}}</text>
                        <text class="long"></text>
                        <text @click="all">全部</text>
                    </view>
                </view>
            </view>
            <view class="usableNum">可用 {{banlance}} {{vlaTxt}}</view>
            <view class="chainName">
                <view class="name">手续费</view>
                <view class="iptNum">
					<!-- <view>{{withdraw.fee}}</view> -->
                    <input type="text" :value="withdraw.fee"placeholder-style="color: #c4c4c4" disabled>
                    <view class="suffix">
                        <text>{{vlaTxt}}</text>
                    </view>
                </view>
            </view>
			<view class="chainName">
			    <view class="iptNum">
			        <view class="suffix">
			            <text>交易密码</text>
			        </view>
			        <input type="password" v-model="jyPassword"placeholder-style="color: #c4c4c4" style="text-align: right" placeholder="请输入交易密码">
			    </view>
			</view>
			<view class="chainName">
				<view class="name">提币验证码</view>
				<div class="iptNum">
					<input type="text" v-model="withdraw.code" placeholder="请输入验证码"placeholder-style="color: #c4c4c4">
					<text @click="getAuthCodeBefore" class="send_code">{{sendCodeFlag ? intervalTime : '获取验证码'}}</text>
				</div>
			</view>
            <view class="showClass" v-if="showList" @click="closePopup"></view>
        </view>
        <view class="botmFixed">
            <view class="accountNum">
                <text>预计到账数量</text>
                <text> {{withdraw.totalAmount}} {{withdraw.totalAmount?vlaTxt:''}}</text>
            </view>
            <view class="btnBox">
                <button class="cu-btn" @click="submit_data">提币</button>
            </view>
        </view>
    </view>
</template>

<script>
	import {getCode,wallet_withdraw,get_coin_info,get_wallet_list} from '@/api/api.js'
    import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    export default {
        components: {uniNavBar},
        data(){
            return{
                showList:false,
				sendCodeFlag:false,
				intervalTime:90,
                vlaTxt:'FIL',
				number:'',
				jyPassword:'',
				withdraw:{
					coin:'',
					address:'',
					totalAmount:'',
					fee:'',
					jyPassword:'',
					code:'',
					number:''
				},
                minWithdrawAmount:'',
				banlance:'',
            }
        },
        onShow(){
			this.get_coin()
		},
		watch:{
			number(n,o){
				if(n==''){
					this.withdraw.totalAmount=0
				}else{
					this.withdraw.totalAmount = Number(n) - this.withdraw.fee;
				}
			},
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
			get_coin(){//查询币种配置minWithdrawAmount
				get_coin_info({unit:this.vlaTxt}).then(res=>{
					this.withdraw.fee=res.data[0].fee
					this.minWithdrawAmount=res.data[0].minWithdrawAmount
				})
				get_wallet_list({}).then(res=>{
					if(this.vlaTxt=='FIL'){
						this.banlance = res.data.wallet[0].balance;
					}else if(this.vlaTxt=='USDT'){
						this.banlance = res.data.wallet[1].balance;
					}
				})
			},
			getAuthCodeBefore(){
			    let _this = this;
			    if (!_this.sendCodeFlag){
			        getCode({
			            type:'WITHDRAW',
			        }).then(res=>{
			            if (res.code == 200){
			                _this.sendCodeFlag = true
			            }
			            _this.$public.msg(res.message)
			        })
			    }
			},
			submit_data(){
				this.withdraw.jyPassword =this.$utils.encrypt(this.jyPassword)
				this.withdraw.coin = this.vlaTxt;
				// console.log(this.withdraw)
				wallet_withdraw({
					coin:this.withdraw.coin,
					address:this.withdraw.address,
					totalAmount:this.number,
					fee:this.withdraw.fee,
					jyPassword:this.withdraw.jyPassword,
					code:this.withdraw.code
				}).then(res=>{
					if(res.code==200){
						this.withdraw.address = ''
						this.withdraw.totalAmount = ''
						this.number = ''
						this.jyPassword = ''
						this.withdraw.code = ''
						this.sendCodeFlag=false
						this.intervalTime=90
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
            extractDetail(){
                let _this = this;
                uni.navigateTo({
                    url:'/pages/view/user/extractDetail'
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
    .extractContent{
		// width: 100%;
		height: 100%;
        padding:  12rpx 28rpx 308rpx;
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
	.send_code{
		font-size: 14px;
		font-weight: 600;
		color: #495068;
	}
</style>
