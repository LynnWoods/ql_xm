<template>
    <view class="actiDetaContent" v-html="content">
    </view>
</template>

<script>
	import {banner_info} from '@/api/api.js'
    export default {
        data(){
            return{
				id:'',
				content:''
            }
        },
        onLoad(obj){
			this.id = obj.id
        },
		onShow(){
			this.get_data()
		},
        methods:{
			get_data(){
				banner_info({id:this.id}).then(res=>{
					this.content = res.data.content
					this.content = this.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
    page{background-color: #fff}
    .actiDetaContent{}
</style>
