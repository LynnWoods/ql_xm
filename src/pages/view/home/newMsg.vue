<template>
    <view class="newmoreContent" :style="{height:autoHeights}">
        <view class="newBoxHeight" ref="newBox">
            <view class="listCon"  v-for="(item,index) in advisory_list" :key="index" @click="msg_info(item.id)">
                <image class="iconImg" :src="baseUrl+item.imgUrl"></image>
                <view class="titCon">
                	<text>{{item.title}}</text>
                	<text>{{item.createTime}}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	import {cms_advisory,baseUrl} from '@/api/api.js'
    export default {
        data(){
            return{
				baseUrl:baseUrl,
                winHeight:'',
                autoHeights:'',
                iconImg:require('@/static/bbc.png'),
				advisory_list:[]

            }
        },
        onLoad(){},
		onShow(){
			cms_advisory({}).then(res=>{//新闻资讯
				this.advisory_list = res.data.list
			})
            uni.getSystemInfo({
                success: res => {
                    this.winHeight = res.windowHeight
                }
            })
		},
        onReady(){
            let winHeights = this.$refs.newBox.$el.clientHeight
            if (winHeights >= this.winHeight){
                this.autoHeights = 'auto'
            }else {
                this.autoHeights = this.winHeight + 'px'
            }
            uni.setNavigationBarTitle({
                title: this.$t('header[2]')
            })
        },
        methods:{
			msg_info(id){
				uni.navigateTo({
				    url:`/pages/view/home/msg_info?id=${id}`
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
    .newmoreContent{
        background-color: #fff;
        border-radius: 32rpx;
        padding: 40rpx 30rpx;
        .listCon{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 36rpx;
            .iconImg{
                width: 88rpx;
                height: 88rpx;
                border-radius: 24rpx;
            }
            .titCon{
                flex: 1;
                width: 100rpx;
                padding: 0 10rpx 0 20rpx;
                text{
                    display: block;
                    line-height: 40rpx;
                }
                text:nth-child(1){
                    font-size: 28rpx;
                    font-weight: 600;
                    color: #474650;
                    overflow:hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                text:nth-child(2){
                    font-size: 24rpx;
                    color: #a7a7a7;
                }
            }
        }
    }
</style>
