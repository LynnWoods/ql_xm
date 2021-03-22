<template>
    <view class="bazaarContent">
        <view class="bazaarList"@click="etpDetails(item.id,item.isSell)" v-for="(item,index) in product_list" :key="index">
            <view class="header">
                <image src="@/static/filecoin.png" class="bazaarLogo"></image>
                <view class="introduce">{{item.name}}</view>
                <view v-if="item.isSell=='ACTIVE'">
                    <view v-if="item.isHold" class="blast">
						<image src="@/static/blast.png"></image>
                        {{$t('content.bazaar[0]')}}
					</view>
					<view v-else></view>
                </view>
				<view v-else>
					<image src="@/static/soldout.png" class="finishImg"></image>
				</view>
            </view>
            <view class="body">
                <view class="line">
                    <text>{{$t('content.bazaar[24]')}}</text>
                    <text>{{item.price}} USDT</text>
                </view>
                <view class="line">
                    <text>{{$t('content.bazaar[25]')}}</text>
                    <text>{{item.cycelDay}} {{$t('content.bazaar[26]')}}</text>
                </view>
                <view class="line">
                    <text>{{$t('content.bazaar[27]')}}</text>
                    <text>{{item.remainderAmount}} T</text>
                </view>
                <view class="line">
                    <text>{{$t('content.bazaar[28]')}}</text>
                    <text>{{item.lockDay}} {{$t('content.bazaar[26]')}}</text>
                </view>
            </view>
            <view class="bottom" v-if="item.downTime > 0&&item.isSell=='ACTIVE'">
                <text>{{$t('content.bazaar[1]')}}</text>
                <text>{{$public.countDown(item.downTime)}}</text>
            </view>
			<view class="bottom" v-if="item.downTime < 0&&item.isSell=='ACTIVE'">
			    <text class="gray">{{$t('content.bazaar[2]')}}</text>
			</view>
<!--			<view class="bottom" v-if="item.isSell!='ACTIVE'"></view>-->
        </view>
    </view>
</template>

<script>
	import {power_page_list} from '@/api/api.js'
    export default {
        data(){
            return{
				product_list:null,
				page:0,
			}
        },
        onLoad(){},
		onShow(){
			this.get_data()
		},
        onReady() {
            uni.setNavigationBarTitle({
                title: this.$t('header[11]')
            })
        },
        methods:{
			get_data(){
				power_page_list({pageNo:this.page,pageSize:1000}).then(res=>{
					this.product_list = res.data.list
					this.count_down()
				})
			},
			count_down(time_over){
			    let _this = this
			    clearInterval(_this.timer);
			    _this.timer = setTimeout(()=>{
			        _this.product_list.forEach((time,index)=>{
			            time.downTime -= 1
			        })
			        _this.count_down()
			    },1000)
			},
            etpDetails(id,status){
				if(status=='ACTIVE'){
					uni.navigateTo({
					    url:'/pages/view/bazaar/etpDetails?id='+id
					})
				}
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bazaarContent{
        .bazaarList{
            background: #ffffff;
            border-radius: 32rpx;
            padding: 40rpx 30rpx 30rpx 30rpx;
            margin-bottom: 20rpx;
            .header{
                display: flex;
                align-items: center;
                .bazaarLogo{
                    width: 36rpx;
                    height: 36rpx;
                }
                .introduce{
                    flex: 1;
                    font-size: 28rpx;
                    font-weight: 600;
                    color: #474650;
                    line-height: 40rpx;
                    padding: 0 10rpx;
                    /*overflow:hidden;*/
                    /*white-space: nowrap;*/
                    /*text-overflow: ellipsis;*/
                }
                .blast{
                    /*width: 80rpx;*/
                    display: flex;
                    align-items: center;
                    height: 36rpx;
                    background: #f24e5a;
                    border-radius: 8rpx;
                    line-height: 36rpx;
                    text-align: center;
                    font-size: 20rpx;
                    font-weight: 500;
                    color: #ffffff;
                    padding: 0 10rpx;
                    image{
                        width: 18rpx;
                        height: 20rpx;
                        margin-right: 5rpx;
                    }
                }
                .finishImg{
                    display: block;
                    width: 126rpx;
                    height: 113rpx;
                }
            }
            .body{
                padding: 20rpx 0;
                border-bottom: 2rpx solid #f3f3f3;
                .line{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 24rpx;
                    font-weight: 600;
                    color: #979797;
                    line-height: 40rpx;
                    margin-bottom: 10rpx;
                }
            }
            .bottom{
                height: 34rpx;
                line-height: 34rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 18rpx;
                font-size: 24rpx;
                font-weight: 600;
                color: #ff9d2a;
                .gray{
                    color: #979797;
                }
            }
        }
    }
</style>
