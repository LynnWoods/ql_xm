<template>
    <view class="actiDetaContent" v-html="content">
    </view>
</template>

<script>
	import {get_advisory_info} from '@/api/api.js'
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
        onReady() {
            uni.setNavigationBarTitle({
                title: this.$t('header[7]')
            })
        },
        methods:{
			get_data(){
				get_advisory_info({id:this.id}).then(res=>{
					this.content = res.data.content
					this.content = this.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
    page{background-color: #fff}
    .actiDetaContent{

	}
</style>
