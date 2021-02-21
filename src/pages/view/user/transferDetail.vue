<template>
    <view class="transferDetail" v-if="transfer.length!=0">
        <view class="transferDetail_list" v-for="(item,index) in transfer" :key="index">
            <image src="@/static/filecoin.png" class="transferImg"></image>
            <view class="message">
                <view>
                    <text class="text" v-if="item.status=='ACTIVE'">{{$t('content.user[40]')}}</text>
            		<text class="text" v-else>{{$t('content.user[41]')}}</text>
                    <text class="priceNum black" v-if="item.status=='ACTIVE'">{{'-'+item.amount}}</text>
            		<text class="priceNum" v-else>{{'+'+item.amount}}</text>
                </view>
                <view>
                    <text class="times">{{item.createTime}}</text>
                    <text class="code">{{item.unit}}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	import {transfer_detail} from '@/api/api.js'
    export default {
        name: "transferDetail",
        data(){
            return{
				transfer:[],
				total:'',
				page:1,
				pages:null
			}
        },
        onReady() {
            uni.setNavigationBarTitle({
                title: this.$t('header[14]')
            })
        },
		onReachBottom() {
		  this.page = this.page + 1;
		  if (this.page > this.pages) {
		    return false;
		  }
		  this.get_wallet_info();
		},
		onPullDownRefresh() {
			this.page = 1
		    this.get_wallet_info();
		    //刷新完成后关闭
		    setTimeout(function () {
		      uni.stopPullDownRefresh(); //停止下拉刷新动画
		    }, 1000);
		 },
        onShow(){
			this.get_wallet_info()
		},
        methods:{
			get_wallet_info(){
				transfer_detail({pageNo:this.page,pageSize:15}).then(res=>{
					this.pages = res.data.pages;
					if(this.page==1){
						this.transfer = res.data.list;
					}else{
						this.transfer = this.transfer.concat(res.data.list);
					}
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
    .transferDetail{
        background-color: #fff;
        border-radius: 32rpx;
        padding: 36rpx 0 36rpx 30rpx;
        &_list{
            display: flex;
            align-items: center;
            .transferImg{
                width: 60rpx;
                height: 60rpx;
                border-radius: 100%;
            }
            .message{
                flex: 1;
                padding: 18rpx 30rpx 18rpx 0;
                margin-left: 30rpx;
                border-bottom: 2rpx solid rgba(0,0,0,0.10);
                view{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 40rpx;
                    line-height: 40rpx;
                    .text{
                        font-size: 28rpx;
                        font-weight: 600;
                        color: #495068;
                    }
                    .priceNum{
                        font-size: 32rpx;
                        font-weight: 700;
                        color: #ff9500;
                    }
                    .green{color: #36bc5c;}
                    .black{color: #495068;}
                    .times{
                        font-size: 24rpx;
                        font-weight: 500;
                        color: #979797;
                    }
                    .code{
                        font-size: 24rpx;
                        font-weight: 700;
                        color: #979797;
                    }
                }
            }
        }
        &_list:last-child{
            .message{
                border: none;
            }
        }
    }
</style>
