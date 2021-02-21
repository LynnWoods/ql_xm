<template>
	<view class="iframe-wrap">
		<web-view src="https://fgas.io"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.$t('header[5]')
			})
		},
	}
</script>

<style lang="scss">
.iframe-wrap{
	position: relative;
	overflow: hidden;
	width: 700rpx;height: 1300px;  background: #eee;
}

</style>
