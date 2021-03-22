<template>
    <view>
        <uni-nav-bar background-color="#fff" hides="false" fixed="true">
            <view class="navBar">
                <image src="@/static/left.png" @click="returnIndex"></image>
                <view class="tit">榜单</view>
                <view></view>
            </view>
        </uni-nav-bar>
        <view class="rankListCont">
            <view class="rankTab">
                <view :class="isClass ? 'active':''" @click="rankTab('1')">算力</view>
                <view :class="isClass ? '':'active'" @click="rankTab('2')">理财</view>
            </view>
            <view class="threeBox" v-if="topThree.length">
                <view class="rankBoxImg two">
                    <view class="imgRank">
                        <image v-if="!topThree[1].imgUrl" src="@/static/userLogo.png" class="userImg"></image>
                        <image v-else :src="baseUrl + topThree[1].imgUrl" class="userImg"></image>
                        <image src="@/static/top02.png" class="oneImg"></image>
                    </view>
<!--                    <view class="userName">{{topThree[1].nickname}}</view>-->
                    <view class="userPhone">{{topThree[1].tel}}</view>
                    <view class="userPrice twoColor">{{topThree[1].amount}}FIL</view>
                </view>
                <view class="rankBoxImg one">
                    <view class="imgRank">
                        <image v-if="!topThree[0].imgUrl" src="@/static/userLogo.png" class="userImg"></image>
                        <image v-else :src="baseUrl + topThree[0].imgUrl" class="userImg"></image>
                        <image src="@/static/top01.png" class="oneImg"></image>
                    </view>
<!--                    <view class="userName">{{topThree[0].nickname}}</view>-->
                    <view class="userPhone">{{topThree[0].tel}}</view>
                    <view class="userPrice oneColor">{{topThree[0].amount}}FIL</view>
                </view>
                <view class="rankBoxImg three">
                    <view class="imgRank">
                        <image v-if="!topThree[2].imgUrl" src="@/static/userLogo.png" class="userImg"></image>
                        <image v-else :src="baseUrl + topThree[2].imgUrl" class="userImg"></image>
                        <image src="@/static/top03.png" class="oneImg"></image>
                    </view>
<!--                    <view class="userName">{{topThree[2].nickname}}</view>-->
                    <view class="userPhone">{{topThree[2].tel}}</view>
                    <view class="userPrice threeColor">{{topThree[2].amount}}FIL</view>
                </view>
            </view>
        </view>
        <view class="rankingListCont">
            <view class="rankingLin" v-for="(item,index) in rankingList" :key="index">
                <image v-if="!item.imgUrl" src="@/static/userLogo.png" class="rankingImg"></image>
                <image v-else :src="baseUrl + item.imgUrl" class="rankingImg"></image>
                <view class="infor">
<!--                    <text class="name">{{item.nickname}}</text>-->
                    <text class="name">{{item.tel}}</text>
                    <view class="phonePrice">
<!--                        <text>{{item.tel}}</text>•-->
                        <text>{{item.amount}} FIL</text>
                    </view>
                </view>
                <view class="radiusNum">{{index + 4}}</view>
            </view>
        </view>
    </view>
</template>

<script>
    import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    import {baseUrl,getRankHank,getPorderHank} from '@/api/api.js'
    export default {
        components: {uniNavBar},
        name: "rank_list",
        data() {
            return {
                isClass:true,
                topThree:[],
                rankingList:[],
                baseUrl:baseUrl
            }
        },
        onLoad() {},
        onShow(){
            this.getData()
        },
        methods:{
            returnIndex(){
                let _this = this;
                uni.switchTab({
                    url:'/pages/index/index'
                })
            },
            getData(){
                this.topThree = [];
                this.rankingList = [];
                getRankHank().then(res=>{
                    this.topThree = res.data;
                    // for (let i=0;i<=2;i++){
                    //     this.topThree.push(res.data[i])
                    // }
                    // for (let i=3;i < res.data.length;i++){
                    //     this.rankingList.push(res.data[i])
                    // }
                    if (res.data.length>3){
                        for (let i=3;i < res.data.length;i++){
                            this.rankingList.push(res.data[i])
                        }
                    }
                })
            },
            getPorder(){
                this.topThree = [];
                this.rankingList = [];
                getPorderHank().then(res=>{
                    this.topThree = res.data;
                    if (res.data.length>3){
                        for (let i=3;i < res.data.length;i++){
                            this.rankingList.push(res.data[i])
                        }
                    }
                })
            },
            rankTab(index){
                let _this = this;
                if (index == 1){
                    _this.isClass = true
                    _this.getData();
                } else if (index == 2){
                    _this.isClass = false
                    _this.getPorder();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    page{background-color: #fff;padding: 0}
    .navBar{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30rpx;
        background-image: url("../../../static/fixed.png");
        background-size: 100% 100%;
        image{
            width: 18rpx;
            height: 35rpx;
        }
        .tit{
            font-weight: 600;
        }
    }
    .rankListCont{
        padding-top: 35rpx;
        padding-bottom: 70rpx;
        background-image: url("../../../static/bg-rank.png");
        background-size: 100% 100%;
        .rankTab{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 250rpx;
            margin: 0 auto 25rpx auto;
            background-color: #fff;
            border-radius: 32rpx;
            padding: 6rpx;
            view{
                flex: 1;
                height: 50rpx;
                line-height: 50rpx;
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
        .threeBox{
            background-image: url("../../../static/pic-cele.png");
            background-size: 100% 100%;
            padding: 30rpx 25rpx 55rpx 25rpx;
            display: flex;
            justify-content: space-between;
            text-align: center;
            .rankBoxImg{
                width: 30%;
                flex: 1;
                padding: 0 10rpx;
                text-align: center;
                .imgRank{
                    position: relative;
                    width: 120rpx;
                    height: 120rpx;
                    margin: 0 auto 10rpx auto;
                    .userImg{
                        display: block;
                        width: 120rpx;
                        height: 120rpx;
                        border-radius: 100%;
                        margin: 0 auto;
                    }
                    .oneImg{
                        position: absolute;
                        width: 50rpx;
                        height: 50rpx;
                        right: -15rpx;
                        top: -15rpx;
                    }
                }
                .userName{
                    font-size: 26rpx;
                    font-weight: 700;
                    line-height: 40rpx;
                    overflow:hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #464751;
                }
                .userPhone{
                    font-size: 20rpx;
                    line-height: 60rpx;
                    color: #79778a;
                }
                .userPrice{
                    line-height: 40rpx;
                    font-size: 20rpx;
                    font-weight: 700;
                    border-radius: 20rpx;
                    color: #676360;
                    overflow:hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .oneColor{
                    background-color: #ffedac;
                }
                .twoColor{
                    background-color: #d7e2ef;
                }
                .threeColor{
                    background-color: #e7cc99;
                }
            }
            .two ,.three{
                padding-top: 80rpx;
            }
        }
    }
    .rankingListCont{
        background-color: #fff;
        border-radius: 50rpx 50rpx 0 0;
        margin-top: -70rpx;
        padding: 40rpx 30rpx;
        .rankingLin{
            display: flex;
            align-items: center;
            margin-bottom: 25rpx;
            .rankingImg{
                width: 100rpx;
                height: 100rpx;
                border-radius: 100%;
            }
            .infor{
                flex-grow: 1;
                padding: 0 14rpx;
                color: #b8b8c3;
                .name{
                    font-size: 28rpx;
                    font-weight: 700;
                    color: #474650;
                }
                .phonePrice{
                    text{
                        font-size: 25rpx;
                        padding-right: 15rpx;
                    }
                    text:nth-child(2){
                        padding-left: 15rpx;
                    }
                }
            }
            .radiusNum{
                background-color: #ecedf1;
                border-radius: 100%;
                padding: 5rpx;
                font-size: 26rpx;
                color: #55555e;
                font-weight: 600;
                height: 40rpx;
                width: 40rpx;
                line-height: 40rpx;
                text-align: center;
            }
        }
    }
</style>
