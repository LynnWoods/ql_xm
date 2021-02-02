<template>
    <view class="usContent">
        <view class="showCont" v-html="about_html"></view>
    </view>
</template>

<script>
	import {cms_type} from '@/api/api.js'
    export default {
        name: "us",
        data(){
            return{
				about_html:null
			}
        },
        onShow() {
			this.get_data()
		},
        methods:{
			get_data(){
				cms_type({type:1}).then(res=>{
					this.about_html = res.data.content
					this.about_html = this.about_html.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
    .usContent{
        .showCont{
            background-color: #fff;
            border-radius: 32rpx;
            padding: 20rpx;
        }
    }
</style>
