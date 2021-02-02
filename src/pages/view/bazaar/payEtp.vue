<template>
    <view class="payEtpContent">
        <view class="etpInfo">
            <view class="line">
                <text>算力名称</text>
                <text>{{powerData.name}}</text>
            </view>
            <view class="line">
                <text>单价</text>
                <text>{{powerData.price}} USDT/T</text>
            </view>
            <view class="line">
                <text>购买产品数量</text>
                <view>
                    <sunui-stepper :label='1' :max="9999999" :val="1" :min="1" @change="stepper2"></sunui-stepper>
                </view>
            </view>
            <view class="line">
                <text>产品总额</text>
                <text>{{num}} USDT</text>
            </view>
        </view>
        <view class="botmFixed">
            <view class="agreeEtp">
                <view class="state" :class="isClause ? 'active' : ''" @click="isClause = !isClause"></view>
                <text>我已阅读</text>
                <text class="blue" @click="open">《算力购买协议》</text>
            </view>
            <view class="btnBox">
                <view class="price">
                    <text>总计金额：</text>
                    <text>{{num}}USDT</text>
                </view>
                <view class="payBtn":class="isClause ? 'payBtn1' : ''" @click="pay">立即支付</view>
            </view>
        </view>
        <uni-popup ref="popup" type="bottom">
            <view class="titModal">
                <text>交易密码</text>
                <image src="@/static/cha.png" class="delete"@click="deles"></image>
            </view>
            <view class="payPrice">{{num}}USDT</view>
            <input class="uni-input payIpt"v-model="jyPasw"type="password" focus placeholder="请输入交易密码" placeholder-style="color: #c4c4c4"/>
            <view class="payButton"@click="confirmPay">确定</view>
        </uni-popup>
        <uni-popup ref="popups" type="center":maskClick="false" radius="32">
            <view class="successBox">
                <image src="@/static/chenggong.png" class="sucImg"></image>
                <view class="sucInfo">购买成功,请到我的订单查看</view>
                <view class="sucBtn"@click="returnDeles">返回</view>
            </view>
        </uni-popup>
        <uni-popup ref="popup1" type="center">
            <view v-html="agreement"></view>
        </uni-popup>
    </view>
</template>

<script>
    import sunuiStepper from "@/components/sunui-stepper/sunui-stepper.vue"
    import uniPopup from '@/components/uni-popup/uni-popup.vue'
    import {power_info,porderCreate,cms_type} from '@/api/api.js'
    export default {
        components:{sunuiStepper ,uniPopup},
        data(){
            return{
                isClause:false,
                isShowModal:false,
                valNum:1,
                jyPasw:'',
                id:null,
                agreement:null,
                powerData:{}
            }
        },
        onLoad(option){
            this.id = option.id
            this.getPowerInfo(option.id)
        },
        computed:{
            num:function () {
                return this.powerData.price * this.valNum
            }
        },
        methods:{
            stepper2(e){
                this.valNum = e.val
            },
            open(){
                this.agreement=''
                cms_type({type:5}).then(res=>{
                    this.agreement = res.data.content;
                    this.$refs.popup1.open()
                })
            },
            pay(){
                let _this = this;
                if (_this.isClause){
                    _this.$refs.popup.open()
                }else {
                    _this.$public.msg('请认真阅读购买协议！')
                }
            },
            deles(){
                this.$refs.popup.close()
            },
            returnDeles(){
                uni.navigateBack({
                    delta: 2
                });
                this.$refs.popups.close()
            },
            confirmPay(){
                let _this = this;
                porderCreate({
                    powerId:_this.id,
                    amount:_this.valNum,
                    jyPassword:_this.$utils.encrypt(_this.jyPasw),
                }).then(res=>{
                    _this.$refs.popup.close()
                    if (res.code == 200){
                        _this.$refs.popups.open()
                    }else {
                        _this.$public.msg(res.message)
                    }
                })
            },
            getPowerInfo(id){
                let _this = this;
                power_info({id:id}).then(res=>{
                    if (res.code == 200){
                        _this.powerData = res.data;
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .payEtpContent{
        .etpInfo{
            background: #ffffff;
            border-radius: 32rpx;
            padding: 30rpx 30rpx;
            .line{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 20rpx 0;
                text{
                    font-size: 28rpx;
                    font-weight: 600;
                    color: #474650;
                }
            }
        }
        .botmFixed{
            background-color: #fff;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            .agreeEtp{
                height: 80rpx;
                border-bottom: 2rpx solid #ededed;
                display: flex;
                align-items: center;
                padding: 0 30rpx;
                .state{
                    width: 32rpx;
                    height: 32rpx;
                    margin-right: 10rpx;
                    background-color: #e2e2e2;
                    border-radius: 8rpx;
                }
                .active{
                    background-image: url("@/static/gouxuan.png");
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
            .btnBox{
                height: 120rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 30rpx;
                .price{
                    font-size: 32rpx;
                    font-weight: 600;
                    color: #474650;
                    text:nth-child(2){
                        color: #f24e5a;
                    }
                }
                .payBtn{
                    width: 206rpx;
                    height: 120rpx;
                    line-height: 120rpx;
                    opacity: 0.5;
                    background: #3466ff;
                    text-align: center;
                    font-size: 32rpx;
                    font-weight: 500;
                    color: #ffffff;
                }
                .payBtn1{
                    opacity: 1;
                }
            }
        }
        .titModal{
            border-bottom: 2rpx solid rgba(0,0,0,0.10);
            padding-bottom: 22rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text{
                font-size: 32rpx;
                font-weight: 600;
                color: #9aa6cd;
            }
            .delete{
                width: 54rpx;
                height: 53rpx;
            }
        }
        .payPrice{
            font-size: 60rpx;
            font-weight: 700;
            color: #474650;
            margin: 45rpx 0;
        }
        .payIpt{
            border-bottom: 2rpx solid rgba(0,0,0,0.10);
            height: 80rpx;
            font-size: 32rpx;
            color: #333;
        }
        .payButton{
            height: 88rpx;
            margin: 60rpx 0 15rpx 0;
            background: #3466ff;
            border-radius: 32rpx;
            text-align: center;
            line-height: 88rpx;
            font-size: 32rpx;
            font-weight: 500;
            color: #ffffff;
        }
        .successBox{
            padding: 20rpx;
            text-align: center;
            .sucImg{
                width: 60rpx;
                height: 60rpx;
            }
            .sucInfo{
                font-size: 36rpx;
                font-weight: 500;
                color: #474650;
                margin: 38rpx 0 40rpx 0;
            }
            .sucBtn{
                background: #3466ff;
                border-radius: 32rpx;
                height: 76rpx;
                line-height: 76rpx;
                text-align: center;
                font-size: 32rpx;
                font-weight: 600;
                color: #ffffff;
            }
        }
    }
</style>
