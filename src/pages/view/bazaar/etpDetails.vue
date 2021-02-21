<template>
    <view class="etpDetailsContent" v-if="product_data">
        <view class="headBox">
            <view class="earnings">{{$t('content.bazaar[3]')}}</view>
            <view class="percentum">{{product_data.remainderAmount}} T</view>
        </view>
        <view class="etpCon">
            <view class="numInfo">
                <view class="line">
                    <text>算力名称</text>
                    <text>{{product_data.name}}</text>
                </view>
                <view class="line">
                    <text>算力价格</text>
                    <text>{{product_data.price}} USDT</text>
                </view>
                <view class="line">
                    <text>数量</text>
                    <text>{{product_data.publishAmount}} T</text>
                </view>
                <view class="line">
                    <text>有效期</text>
                    <text>{{product_data.cycelDay}}天</text>
                </view>
                <view class="line">
                    <text>开挖时间</text>
                    <text>{{product_data.lockDay}}天</text>
                </view>
            </view>
            <view class="details">{{$t('content.bazaar[4]')}}</view>
            <view class="editCont"v-if="product_data.rule" v-html="product_data.rule"></view>
        </view>

        <view class="botmFixed">
            <view class="btnBox">
                <button class="cu-btn"@click="pay(product_data.id)" v-if="product_data.downTime < 0">{{$t('content.bazaar[5]')}}</button>
				<button class="cu-btn color-btn" v-if="product_data.downTime > 0">{{$t('content.bazaar[6]')}} {{$public.countDown(product_data.downTime)}}</button>
            </view>
        </view>
        <view class="showModal" v-if="isShowModal">
            <view class="modal">
                <text class="content">{{$t('content.bazaar[7]')}}</text>
                <view class="btn">
                    <view class="cancel"@click="isShowModal = false">{{$t('content.bazaar[8]')}}</view>
                    <view class="confirm" @click="set_password">{{$t('content.bazaar[9]')}}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	import {power_info} from '@/api/api.js'
    export default {
        name: "etpDetails",
        data(){
            return{
				id:'',
                isShowModal:false,
				product_data:null
            }
        },
        onShow(){
			this.get_info()
			this.isShowModal = false
		},
        onLoad(option){
			this.id = option.id
		},
        onReady() {
            uni.setNavigationBarTitle({
                title: this.$t('header[12]')
            })
        },
        methods:{
			get_info(){
				power_info({id:this.id}).then(res=>{
					this.product_data = res.data
					this.count_down()
				})
			},
			count_down(time_over){
			    let _this = this
			    clearInterval(_this.timer);
			    _this.timer = setTimeout(()=>{
					_this.product_data.downTime -= 1
			        _this.count_down()
			    },1000)
			},
            pay(id){
				if(uni.getStorageSync('user').jyPasswprd){
					uni.navigateTo({
					    url:'/pages/view/bazaar/payEtp?id=' + id
					})
				}else{
					this.isShowModal = true
				}
            },
			set_password(){
				uni.navigateTo({
				    url:'/pages/view/user/setDeal'
				})
			}
        }
    }
</script>

<style lang="scss" scoped>
    page{padding: 0}
    .etpDetailsContent{
        .headBox{
            background-color: #547eff;
            border-radius: 0 0 50rpx 50rpx;
            padding: 40rpx 66rpx 160rpx 55rpx;
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
        .etpCon{
            padding: 0 30rpx;
            margin-top: -130rpx;
            padding-bottom: 300rpx;
            .numInfo {
                background-color: #fff;
                border-radius: 32rpx;
                padding: 40rpx 25rpx 10rpx 25rpx;
                .line{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 28rpx;
                    font-weight: 600;
                    color: #474650;
                    line-height: 40rpx;
                    margin-bottom: 30rpx;
                    text:nth-child(2){
                        padding-left: 5rpx;
                    }
                }
            }
            .details{
                font-size: 32rpx;
                font-weight: 600;
                color: #474650;
                line-height: 40rpx;
                margin: 40rpx 0 20rpx 0;
            }
            .editCont{
                background: #dbdbdb;
                border-radius: 32rpx;
                font-size: 32rpx;
                padding: 20rpx;
                image{
                    width: 100%;
                }
            }
        }
        .botmFixed{
            background-color: #fff;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 40rpx 0;
            .btnBox{
                padding: 0 26rpx;
                .cu-btn{
                    background-color: #3466ff;
                    font-size: 32rpx;
                    font-weight: 500;
                    color: #ffffff;
                    border-radius: 32rpx;
                }
                .color-btn{
                    background-color: #f24e5a!important;
                }
            }

        }
        .showModal{
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: rgba(2,2,2,.7);
            z-index: 9999;
            .modal{
                background-color: #fff;
                width: 532rpx;
                /*height: 220rpx;*/
                border-radius: 32rpx;
                margin: 60% auto 0 auto;
                padding: 66rpx 34rpx;
                text-align: center;
                .content{
                    font-size: 32rpx;
                    font-weight: 500;
                    color: #474650;
                }
                .btn{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 50rpx;
                    view{
                        width: 224rpx;
                        height: 76rpx;
                        border-radius: 32rpx;
                        text-align: center;
                        line-height: 76rpx;
                        font-size: 32rpx;
                        font-weight: 500;
                    }
                    .cancel{background: #ededed;color: #979797;}
                    .confirm{background: #3466ff;color: #ffffff;}
                }
            }
        }
    }
</style>
