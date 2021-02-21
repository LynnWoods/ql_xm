<template>
    <view class="notDetaContent">
		{{content}}
    </view>
</template>

<script>
	import {get_announcement_info} from '@/api/api.js'
    export default {
        data(){
            return{
				id:'',
				content:''
            }
        },
        onLoad(option){
			this.id = option.id

        },
		onShow(){
			this.get_data()
		},
        onReady() {
            uni.setNavigationBarTitle({
                title: this.$t('header[1]')
            })
        },
        methods:{
			get_data(){
				get_announcement_info({id:this.id}).then(res=>{
					this.content = res.data.content
					this.content = this.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
    page{background-color: #fff}
    .notDetaContent{}
</style>
