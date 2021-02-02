<template>
    <view class="myOrderContent">
        <view class="orderNav">
            <view :class="isClass ? '':'active'"@click="orderNav('1')">算力</view>
            <view :class="isClass ? 'active':''"@click="orderNav('2')">质押</view>
        </view>
        <view class="contOrder" v-if="isClass">
            <view class="listOrder" @click="orderDetail(item.id)" v-for="(item,index) in order_list" :key="index">
                <view class="stateOrder">
                    <image src="@/static/filecoin.png"></image>
                    <view class="name">{{item.productName}}</view>
					<view class="state yellow" v-if="item.status=='WAITINYG'">待收益</view>
					<view class="state" v-if="item.status=='COMPLETE'">已完成</view>
					<view class="state violet" v-if="item.status=='CANCELED'">已解锁</view>
					<view class="state red" v-if="item.status=='CANCEL'">解锁中</view>
                    <view class="state green" v-if="item.status=='HAVING'">收益中</view>
                </view>
                <view class="infoOrder">
                    <view>质押时间</view>
                    <view>
                        <text>{{item.createTime}}</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>质押数量</view>
                    <view>
                        <text>{{item.money}} FIL</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>质押期限</view>
                    <view>
                        <text>{{item.frofitPledge}} 天 /</text>
                        <text class="gray"> {{item.cycel}} 天</text>
                    </view>
                </view>
            </view>
           <!-- <view class="listOrder">
                <view class="stateOrder">
                    <image src="@/static/lf.jpg"></image>
                    <view class="name">质押产品名称</view>
                    <view class="state yellow">待收益</view>
                </view>
                <view class="infoOrder">
                    <view>质押时间</view>
                    <view>
                        <text>2020-20-20 15:55:30</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>质押数量</view>
                    <view>
                        <text>8 fil</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>质押期限</view>
                    <view>
                        <text>3 天 /</text>
                        <text class="gray"> 7 天</text>
                    </view>
                </view>
            </view>
            <view class="listOrder">
                <view class="stateOrder">
                    <image src="@/static/lf.jpg"></image>
                    <view class="name">质押产品名称</view>
                    <view class="state">已完成</view>
                </view>
                <view class="infoOrder">
                    <view>质押时间</view>
                    <view>
                        <text>2020-20-20 15:55:30</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>质押数量</view>
                    <view>
                        <text>8 fil</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>质押期限</view>
                    <view>
                        <text>3 天 /</text>
                        <text class="gray"> 7 天</text>
                    </view>
                </view>
            </view>
            <view class="listOrder">
                <view class="stateOrder">
                    <image src="@/static/lf.jpg"></image>
                    <view class="name">质押产品名称</view>
                    <view class="state violet">已解锁</view>
                </view>
                <view class="infoOrder">
                    <view>质押时间</view>
                    <view>
                        <text>2020-20-20 15:55:30</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>质押数量</view>
                    <view>
                        <text>8 fil</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>质押期限</view>
                    <view>
                        <text>3 天 /</text>
                        <text class="gray"> 7 天</text>
                    </view>
                </view>
            </view>
            <view class="listOrder">
                <view class="stateOrder">
                    <image src="@/static/lf.jpg"></image>
                    <view class="name">质押产品名称</view>
                    <view class="state red">解锁中</view>
                </view>
                <view class="infoOrder">
                    <view>质押时间</view>
                    <view>
                        <text>2020-20-20 15:55:30</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>质押数量</view>
                    <view>
                        <text>8 fil</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>质押期限</view>
                    <view>
                        <text>3 天 /</text>
                        <text class="gray"> 7 天</text>
                    </view>
                </view>
            </view> -->
        </view>
        <view class="nullBox" v-else>
            <view class="listOrder"@click="hashrate(item.id)" v-for="(item,index) in order_list" :key="index">
                <view class="stateOrder">
                    <image src="@/static/filecoin.png"></image>
                    <view class="name">{{item.powerName}}</view>
                    <view class="state green" v-if="item.status == 'WAITINYG'">待分发</view>
                    <view class="state yellow" v-if="item.status == 'HAVING'">分发中</view>
                    <view class="state" v-if="item.status == 'COMPLETE'">已完成</view>
                </view>
                <view class="infoOrder">
                    <view>时间</view>
                    <view>
                        <text>{{item.createTime}}</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>数量</view>
                    <view>
                        <text>{{item.amount}} T</text>
                    </view>
                </view>
                <view class="infoOrder">
                    <view>开挖时间</view>
                    <view>
                        <text>{{item.lockTime}} 天 /</text>
                        <text class="gray"> {{item.lockDay}} 天</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	import {order_page,porderPageList} from '@/api/api.js'
    export default {
        data(){
            return{
                isClass:true,
				order_list:[],
				total:'',
				page:0,
                pages:null
            }
        },
        onShow(){
            if (this.isClass){
                this.get_order_page()
            }else {
                this.getPorderList()
            }
		},
        onReachBottom() {
            this.page = this.page + 1;
            if (this.page > this.pages) {
                return false;
            }
            if (this.isClass){
                this.get_order_page()
            }else {
                this.getPorderList()
            }
        },
        onPullDownRefresh() {
            this.page = 1
            if (this.isClass){
                this.get_order_page()
            }else {
                this.getPorderList()
            }
            //刷新完成后关闭
            setTimeout(function () {
                uni.stopPullDownRefresh(); //停止下拉刷新动画
            }, 1000);
        },
        methods:{
			get_order_page(){
                this.order_list = []
				order_page({pageNo:this.page,pageSize:15}).then(res=>{
                    this.pages = res.data.pages;
					this.total = res.data.total;
					this.order_list = res.data.list;
				})
			},
            orderNav(index){
                let _this = this;
                if (index == 1){
                    _this.isClass = false
                    _this.getPorderList()
                } else if (index == 2){
                    _this.isClass = true
                    _this.get_order_page()
                }
            },
            getPorderList(){
                this.order_list = []
                porderPageList({pageNo:this.page,pageSize:15}).then(res=>{
                    this.pages = res.data.pages;
                    this.total = res.data.total;
                    this.order_list = res.data.list;
                })
            },
            orderDetail(state){
                let _this = this;
                uni.navigateTo({
                    url:`/pages/view/user/orderDetail?id=`+state
                })
            },
            hashrate(id){
                uni.navigateTo({
                    url:`/pages/view/user/hashrate?id=`+id
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myOrderContent{
       .orderNav{
           display: flex;
           justify-content: space-between;
           align-items: center;
           width: 488rpx;
           margin: 0 auto;
           background-color: #fff;
           border-radius: 32rpx;
           padding: 4rpx;
           view{
               flex: 1;
               height: 75rpx;
               line-height: 75rpx;
               text-align: center;
               font-size: 32rpx;
               font-weight: 500;
               color: #495068;
           }
           .active{
               background-color: #547eff;
               border-radius: 26rpx;
               color: #fff;
           }
       }
        .contOrder{
            padding: 20rpx 0;
            .listOrder{
                background-color: #fff;
                border-radius: 32rpx;
                padding: 40rpx;
                margin-bottom: 20rpx;
                .stateOrder{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16rpx;
                    image{
                        width: 40rpx;
                        height: 40rpx;
                        border-radius: 100%;
                    }
                    .name{
                        flex: 1;
                        font-size: 32rpx;
                        font-weight: 600;
                        color: #495068;
                        padding-left: 12rpx;
                    }
                    .state{
                        width: 124rpx;
                        height: 64rpx;
                        line-height: 64rpx;
                        font-size: 28rpx;
                        font-weight: 600;
                        color: #ffffff;
                        background-color: #c5c5c5;
                        border-radius: 16rpx;
                        text-align: center;
                    }
                    .green{background-color: #35ceab;}
                    .yellow{background-color: #ffb74a;}
                    .violet{background-color: #b66dff;}
                    .red{background-color: #ff6d6d;}
                }
                .infoOrder{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    view{
                        line-height: 60rpx;
                        font-size: 28rpx;
                    }
                    view:nth-child(1){
                        font-weight: 600;
                        color: #979797;
                    }
                    view:nth-child(2){
                        font-weight: 700;
                        color: #495068;
                        .gray{
                            color: #979797;
                        }
                    }
                }
            }
        }
        .nullBox{
            padding: 20rpx 0;
            .listOrder{
                background-color: #fff;
                border-radius: 32rpx;
                padding: 40rpx;
                margin-bottom: 20rpx;
                .stateOrder{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16rpx;
                    image{
                        width: 40rpx;
                        height: 40rpx;
                        border-radius: 100%;
                    }
                    .name{
                        flex: 1;
                        font-size: 32rpx;
                        font-weight: 600;
                        color: #495068;
                        padding-left: 12rpx;
                    }
                    .state{
                        width: 124rpx;
                        height: 64rpx;
                        line-height: 64rpx;
                        font-size: 28rpx;
                        font-weight: 600;
                        color: #ffffff;
                        background-color: #c5c5c5;
                        border-radius: 16rpx;
                        text-align: center;
                    }
                    .green{background-color: #35ceab;}
                    .yellow{background-color: #ffb74a;}
                    .violet{background-color: #b66dff;}
                    .red{background-color: #ff6d6d;}
                }
                .infoOrder{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    view{
                        line-height: 60rpx;
                        font-size: 28rpx;
                    }
                    view:nth-child(1){
                        font-weight: 600;
                        color: #979797;
                    }
                    view:nth-child(2){
                        font-weight: 700;
                        color: #495068;
                        .gray{
                            color: #979797;
                        }
                    }
                }
            }
            /*text-align: center;*/
            /*image{*/
            /*    display: block;*/
            /*    margin: 240rpx auto 80rpx auto;*/
            /*    width: 408rpx;*/
            /*    height: 310rpx;*/
            /*}*/
            /*text{*/
            /*    font-size: 28rpx;*/
            /*    font-weight: 600;*/
            /*    color: #495068;*/
            /*}*/
        }
    }
</style>
