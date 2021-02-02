<template>
    <mescroll-uni :down="downOption" @emptyclick="downCallback" @down="downCallback" :up="upOption" @up="upCallback":fixed="false">
        <view class="noticeContent">

            <view class="nullBox" v-show="!announcement_list">
                <image src="@/static/null_1.png"></image>
                <text>暂无数据哦～</text>
            </view>

            <view class="noticeList" @click="noticeDeta(item.id)" v-for="(item,index) in announcement_list" :key="index">
                <view class="title">{{item.title}}</view>
                <view class="time">
                    <text>{{item.createTime}}</text>
                    <text>了解详情 > </text>
                </view>
            </view>
        </view>
    </mescroll-uni>

</template>

<script>
	import {get_announcement} from '@/api/api.js'
    import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
    export default {
        components: {
            MescrollUni
        },
        data() {
            return {
                // imgUrl:require(''),
                downOption: {
                    // use: false,
                    auto: false,
                },
                upOption: {
                    // use: false,
                    auto: false,
                    page: {
                        num: 0,
                        size: 10
                    },
                    noMoreSize: 5,
                    empty: {
                        tip: '暂无相关数据'
                    },
                    textNoMore: '没有更多数据了'
                },
				announcement_list:null
            }
        },
        onShow() {
			this.get_list()
		},
        methods:{
			get_list(){
				get_announcement({}).then(res=>{//获取公告
					this.announcement_list = res.data.list
				})
			},
            downCallback(mescroll) {
                mescroll.resetUpScroll()
				this.get_list()
            },
            upCallback(mescroll) {
                setTimeout(function () {
                    mescroll.endErr()
                },2000)
            },
            noticeDeta(id){
                uni.navigateTo({
                    url:`/pages/view/home/noticeDeta?id=${id}`
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .noticeContent{
        .nullBox{
            text-align: center;
            image{
                display: block;
                margin: 240rpx auto 80rpx auto;
                width: 408rpx;
                height: 310rpx;
            }
            text{
                font-size: 28rpx;
                font-weight: 600;
                color: #495068;
            }
        }
        .noticeList{
            background-color: #fff;
            padding: 36rpx 0 36rpx 30rpx;
            border-radius: 32rpx;
            margin-bottom: 20rpx;
            .title{
                font-size: 28rpx;
                font-weight: 600;
                color: #495068;
                padding-bottom: 24rpx;
                overflow:hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                padding-right: 42rpx;
                border-bottom: 2rpx solid #eeeeee;
            }
            .time{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 22rpx;
                padding-right: 42rpx;
                text{
                    font-size: 24rpx;
                    font-weight: 600;
                    color: #979797;
                }
            }
        }
    }
</style>
