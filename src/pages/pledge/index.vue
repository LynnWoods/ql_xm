<template>
    <view class="pledgeContent">
        <view class="pledgeList"@click="pledgeSkip(item.id,item.isSell,item.downTime)" v-for="(item,index) in product_list" :key="index">
            <view class="top">
                <view class="left">
                    <view class="titleImg">
                        <image src="../../static/filecoin.png"></image>
                        <text :class="item.isSell=='ACTIVE'?'':'fontText'">{{item.name}}</text>
                    </view>
                    <view class="nodeList" v-if="item.keyWord.indexOf(',')==-1">
                        <view>{{item.keyWord}}</view>
                    </view>
					<view v-else class="nodeList">
						<view v-for="(em,dex) in item.keyWord.split(',')" :key="dex+'1'">{{em}}</view>
					</view>
					<image v-if="item.isSell!='ACTIVE'" src="../../static/soldout.png" class="imgFinish"></image>
                </view>
                <view class="right">
                    <view :class="item.isSell=='ACTIVE'?'':'finish'">{{item.yearProfit}}%</view>
                    <text :class="item.isSell=='ACTIVE'?'':'fontText'">年化收益率</text>
                </view>
            </view>
            <view class="botm"v-if="item.downTime > 0">
                <text>开始销售倒计时</text>
                <text>{{$public.countDown(item.downTime)}}</text>
            </view>
			<view class="botm" v-if="item.isSell!='ACTIVE'">
			    <text>活动已结束</text>
			</view>
        </view>
    </view>
</template>

<script>
	import {get_product_list} from '@/api/api.js'
    export default {
        data(){
            return{
				product_list:[],
				total:'',
				page:0,
				timer:null,
				isover:true
			}
        },
        onLoad(){},
		onShow(){
			this.get_product()
		},
        onUnload(){},
        methods:{
			get_product(){
			    let _this = this;
                clearInterval(this.timer);
				get_product_list({pageNo:_this.page,pageSize:1000}).then(res=>{
                    _this.product_list = res.data.list
                    _this.count_down()
				})

			},
            pledgeSkip(id,status,time){
				if(status=='ACTIVE' && time <= 0){
					uni.navigateTo({
					    url:'/pages/view/pledge/pledge?id='+id
					})
				}
            },
			count_down(time_over){
			    let _this = this
                clearInterval(_this.timer);
                _this.timer = setTimeout(()=>{
                    _this.product_list.forEach((time,index)=>{
                        time.downTime-=1
                    })
                    _this.count_down()
                },1000)
			},
        }
    }
</script>

<style lang="scss" scoped>
    .pledgeContent{
        .pledgeList{
            border-radius: 32rpx;
            background-color: #fff;
            padding: 40rpx 0 20rpx 32rpx;
            margin-bottom: 20rpx;
            .top{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 40rpx;
                padding-right: 48rpx;
                .left{
                    flex: 1;
                    width: 200rpx;
                    position: relative;
                    .titleImg{
                        display: flex;
                        align-items: center;
                        margin-bottom: 32rpx;
                        image{
                            width: 36rpx;
                            height: 36rpx;
                        }
                        text{
                            font-size: 28rpx;
                            font-weight: 600;
                            color: #474650;
                            padding-left: 20rpx;
                        }
                        .fontText{
                            color: #a4a4a4;
                        }
                    }
                    .nodeList{
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        view{
                            font-size: 20rpx;
                            background: rgba(63,97,221,0.15);
                            border-radius: 16rpx;
                            font-weight: 600;
                            color: #6c738c;
                            padding: 2rpx 10rpx;
                            margin-right: 12rpx;
                            margin-bottom: 14rpx;
                        }
                        .nodeColor{
                            color: #b1b1b1;
                            background: rgba(172,172,172,0.15);
                        }
                    }
                    .imgFinish{
                        display: block;
                        width: 126rpx;
                        height: 113rpx;
                        position: absolute;
                        top: 0;
                        right: 0;
                    }
                }
                .right{
                    text-align: center;
                    view{
                        font-size: 50rpx;
                        font-weight: 700;
                        color: #ff9d2b;
                    }
                    .finish{
                        color: #a4a4a4;
                    }
                    text{
                        font-size: 24rpx;
                        font-weight: 600;
                        color: #979797;
                    }
                    .fontText{
                        color: #a4a4a4;
                    }
                }
            }
            .botm{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-right: 48rpx;
                padding-top: 12rpx;
                border-top: 2rpx solid #f3f3f3;;
                text{
                    font-size: 24rpx;
                    font-weight: 600;
                    color: #979797;
                }
            }
        }
    }
</style>
