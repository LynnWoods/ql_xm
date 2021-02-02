<template>
    <view class="activityContent">
        <view class="nullBox" v-show="!activity_list">
            <image src="@/static/null_1.png"></image>
            <text>敬请期待</text>
        </view>
        <view class="activityList" v-for="(item,index) in activity_list" :key="index" @click="activityDeta(item.id)">
            <image :src="baseUrl+activity_list[0].url"></image>
        </view>
    </view>
</template>

<script>
	import {getBanner,baseUrl} from '@/api/api.js'
    export default {
        data() {
            return {
				baseUrl:baseUrl,
                // imgUrl:require('@/static/null_1.png'),
                imgsUrl:require('@/static/bbc.png'),
				activity_list:null
            }
        },
        onShow() {
			this.get_data()
		},
        methods:{
			get_data(){
				getBanner({type:1}).then(res=>{
					this.activity_list = res.data.list//获取活动
				})
			},
            activityDeta(id){
                uni.navigateTo({
                    url:`/pages/view/home/activityDeta?id=${id}`
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .activityContent{
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
        .activityList{
            height: 128rpx;
            border-radius: 32rpx;
            overflow: hidden;
            margin-bottom: 20rpx;
            image{
                height: 100%;
                width: 100%;
            }
        }
    }
</style>
