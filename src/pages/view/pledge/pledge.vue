<template>
    <view class="pledgeContent" v-if="pledge_data">
        <view class="headBox">
            <view class="earnings">{{$t('content.pledge[10]')}}</view>
            <view class="percentum">{{pledge_data.yearProfit}}%</view>
        </view>
		<uniPopup ref="popup" type="center">
			<view v-html="agreement"></view>
		</uniPopup>
        <view class="productCon">
            <view class="numInfo">
                <view class="title">{{$t('content.pledge[11]')}}</view>
                <view class="iptBox">
					<input type="number" v-model="number" :placeholder="numbers"placeholder-style="color: #a9adbe">
					<text class="part">{{$t('content.pledge[4]')}}</text>
					<text class="small_font">({{$t('content.pledge[12]')}}{{pledge_data.minAmount}})</text>
				</view>
                <view class="usable">{{$t('content.pledge[13]')}} {{balance}} fil <text @click="all(balance)">{{$t('content.pledge[14]')}}</text></view>
                <view class="balance">
                    <view class="num">{{$t('content.pledge[15]')}} {{pledge_data.remainderAmount}} {{$t('content.pledge[4]')}}</view>
                </view>
            </view>
            <view class="navInfo">
                <view class="navli">
                    <text>{{$t('content.pledge[7]')}}</text>
                    <text>{{pledge_data.cycel}} {{$t('content.pledge[8]')}}</text>
                </view>
                <view class="navli">
                    <text>{{$t('content.pledge[5]')}}</text>
                    <text>{{pledge_data.unit}} FIL</text>
                </view>
                <view class="navli">
                    <text>{{$t('content.pledge[16]')}}</text>
                    <text>{{pledge_data.remainderAmount*pledge_data.unit}} FIL</text>
                </view>
            </view>
            <view class="ruleList">
                <view class="rule">{{$t('content.pledge[17]')}}</view>
                <view class="listLine">{{pledge_data.rule}}</view>
            </view>
        </view>
        <view class="botmFixed">
            <view class="protocol">
                <view class="content">
                    <mrpzx-checker-box ref="questionChecker":type="type">
                        <mrpzx-checker-item @checkItem="contentClick" iconType="box" :checked="false" index="question">
                        </mrpzx-checker-item>
                    </mrpzx-checker-box>
                </view>
                <view class="protText">{{$t('content.pledge[18]')}} <text @click="open">{{$t('content.pledge[19]')}}</text></view>
            </view>
            <view class="btnBox">
                <button class="cu-btn" @click="affirmSkip">{{$t('content.pledge[20]')}}</button>
            </view>
        </view>
    </view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {getProduct,get_wallet_list,cms_type} from '@/api/api.js'
    export default {
		components:{uniPopup},
        data() {
            return {
                type: 'checker',
				id:null,
				pledge_data:null,
				balance:'',
				agreement:null,
				isCheck:null,
				number:'',
				numbers:''
            }
        },
		watch:{
			number(o,n){}
		},
        onLoad(option){
			this.id = option.id

		},
		onShow(){
			this.get_data()
		},
        onReady() {
            uni.setNavigationBarTitle({
                title: this.$t('header[8]')
            })
        },
        computed: {},
        methods:{
			get_data(){
				getProduct({id:this.id}).then(res=>{
					this.pledge_data = res.data
					this.numbers = this.pledge_data.minAmount.toString()
				})
				get_wallet_list({}).then(res=>{
					this.balance = res.data.wallet[0].balance
				})
			},
			all(balance){
				this.number = parseInt(balance/10)
			},
			open(){
				cms_type({type:2}).then(res=>{
					this.agreement = res.data.content;
				})
				this.$refs.popup.open()
			},
            contentClick (isCheck) {
				this.isCheck = isCheck
            },
            affirmSkip(){
				if(!this.isCheck){
					this.$public.msg(this.$t('content.pledge[21]'))
					return false
				}
				if(this.number.toString().indexOf('.')!=-1){
					this.number = this.pledge_data.minAmount
					this.$public.msg(this.$t('content.pledge[22]'))
					return false
				}
				if(this.number<=0){
					this.$public.msg(this.$t('content.pledge[23]'))
					return false
				}else if(this.number<this.pledge_data.minAmount){
					this.$public.msg(this.$t('content.pledge[24]')+this.pledge_data.minAmount)
					return false
				}else if(this.number>this.pledge_data.remainderAmount){
					this.$public.msg(this.$t('content.pledge[25]')+this.pledge_data.remainderAmount)
					return false
				}
				uni.navigateTo({
					    url:'/pages/view/pledge/affirm?number='+this.number+'&id='+this.id+'&unit='+this.pledge_data.unit+'&day='+this.pledge_data.cycel})
            }
        }
    }
</script>

<style lang="scss" scoped>
    page{padding: 0}
    .pledgeContent{
        .headBox{
            background-color: #547eff;
            border-radius: 0 0 50rpx 50rpx;
            padding: 40rpx 66rpx 160rpx 66rpx;
            .earnings{
                font-size: 24rpx;
                font-weight: 600;
                color: #ffffff;
                margin-bottom: 26rpx;
            }
            .percentum{
                font-size: 64rpx;
                font-weight: 900;
                color: #ffffff;
            }
        }
        .productCon{
            padding: 0 30rpx;
            margin-top: -130rpx;
            padding-bottom: 300rpx;
            .numInfo{
                background-color: #fff;
                border-radius: 32rpx;
                padding: 40rpx 0;
                .title{
                    text-align: center;
                    font-size: 28rpx;
                    font-weight: 600;
                    color: #474650;
                }
                .iptBox{
                    margin: 20rpx auto 18rpx auto;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    input{
                        // flex: 1;
						width: 50%;
                        text-align: right;
                        font-size: 60rpx;
                        font-weight: 700;
                        color: #474650;
                    }
                    .part{
						// inlin
                        display: block;
                        // flex: 1;
                        margin-left: 10rpx;
                        font-size: 28rpx;
                        font-weight: 700;
                        color: #474650;
                    }
					.small_font{
						font-size: 14rpx;
					}
                }
                .usable{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 24rpx;
                    font-weight: 700;
                    color: #495068;
                    text{
                        font-size: 24rpx;
                        font-weight: 600;
                        color: #3466ff;
                        padding-left: 20rpx;
                    }
                }
                .balance{
                    display: flex;
                    justify-content: center;
                    padding-top: 20rpx;
                    .num{
                        background: #f8f8f8;
                        border-radius: 32rpx;
                        padding: 8rpx 50rpx;
                        font-size: 24rpx;
                        font-weight: 600;
                        color: #a4acc2;
                    }
                }
            }
            .navInfo{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 20rpx 0;
                .navli{
                    flex: 1;
                    background: #ffffff;
                    border-radius: 32rpx;
                    padding: 20rpx 0 16rpx 30rpx;
                    text{font-size: 24rpx;font-weight: 600;color: #858ca4;display: block}
                    text:nth-child(2){
                        font-size: 32rpx;
                        font-weight: 700;
                        color: #495068;
                    }
                }
                .navli:nth-child(2){
                    margin: 0 10rpx;
                }
            }
            .ruleList{
                background: #ffffff;
                border-radius: 32rpx;
                padding: 30rpx;
                box-sizing: border-box;
                .rule{
                    font-size: 28rpx;
                    font-weight: 600;
                    color: #474650;
                    margin-bottom: 20rpx;
                }
                .listLine{
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #979797;
                    margin-bottom: 20rpx;
                }
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
            .protocol{
                display: flex;
                align-items: center;
                padding-left: 30rpx;
                .checker-box{min-height: 46rpx;width: 46rpx;background-color: transparent;box-shadow:none;}
                .checker-box .checker-item{
                    padding: 0;
                    position: relative;
                    top: -42rpx;
                    left: 30rpx;
                }
                .protText{
                    font-size: 24rpx;
                    font-weight: 600;
                    color: #474650;
                    text{
                        color: #547eff;
                    }
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
    }
</style>
