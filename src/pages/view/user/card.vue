<template>
    <view class="cardContent">
        <image src="@/static/left_1.png" class="cardBack"@click="cardBack"></image>
        <r-canvas ref="rCanvas"></r-canvas>
        <view class="save"@click="save">长按保存图片</view>
    </view>
</template>

<script>
	import {member_qrcode,baseUrl} from '@/api/api.js'
    import rCanvas from "@/components/r-canvas/r-canvas.vue"
    export default {
        name: "card",
        data(){
            return{
                imgUrl:'',
				baseUrl:baseUrl,
				invitation_img:''
            }
        },
        onShow(){
            this.get_invitation_list()
		},
        methods:{
			get_invitation_list(){
			    let _this = this;
				member_qrcode().then(res=>{
                    if (res.code == 200){
                        this.invitation_img = baseUrl+res.data.qrcodeUrl;
                        _this.$nextTick(async ()=>{
                            await _this.$refs.rCanvas.init({
                                canvas_id:"rCanvas"
                            })
                            await _this.$refs.rCanvas.drawImage({
                                url:"/static/poster.jpg",
                                x:0,
                                y:0,
                                w:375,
                                h:667
                            }).catch(err_msg=>{
                                uni.showToast({
                                    title:err_msg,
                                    icon:"none"
                                })
                            })
                            await _this.$refs.rCanvas.drawImage({
                                url:this.invitation_img,
                                x:130,
                                y:455,
                                w:116,
                                h:116
                            }).catch(err_msg=>{
                                uni.showToast({
                                    title:err_msg,
                                    icon:"none"
                                })
                            })
                            await _this.$refs.rCanvas.draw((res)=>{
                                _this.imgUrl = res.tempFilePath
                            })
                        })
                    }

				})
			},
            save(){
                let _this = this;
                _this.$refs.rCanvas.saveImage(_this.imgUrl)
            },
            cardBack(){
                let _this = this;
                uni.navigateTo({
                    url:'/pages/view/user/invite'
                })
            }
        },
        onReady(){

        },
        components:{
            rCanvas
        }
    }
</script>

<style lang="scss" scoped>
    page{padding: 0;}
    .cardContent{
        position: relative;
        .cardBack{
            width: 20rpx;
            height: 34rpx;
            position: absolute;
            left: 40rpx;
            top: 35rpx;
            z-index: 9;
        }
        .save{
            width: 228rpx;
            height: 64rpx;
            line-height: 64rpx;
            text-align: center;
            background: #87a2fe;
            border-radius: 32rpx;
            font-size: 28rpx;
            font-weight: 600;
            color: #ffffff;
            position: absolute;
            left: 50%;
            margin-left: -114rpx;
            bottom: 60rpx;
        }
    }
</style>
