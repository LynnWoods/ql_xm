<template name='sunui-stepper'>
	<view style="display: inline-block;">
		<view class="sunui-stepper">
			<view class="addSubtract" @tap="less">-</view>
			<input type="number" :value="stepperCacheNum" @input="iptVal" :disabled="true" />
			<view class="addSubtract" @tap="add">+</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stepperNum: 0,
				stepperCacheNum: 0
			};
		},
		name: 'sunui-stepper',
		props: {
			val: {
				type: [String, Number],
				default: 0
			},
			min: {
				type: [String, Number],
				default: 0
			},
			max: {
				type: [String, Number],
				default: 0
			},
			step: {
				type: Number,
				default: 1
			},
			label: {
				type: Number,
				default: 0
			},
			disabled: {
				type: Boolean,
				default: false
			},
			active: {
				type: String,
				default: '#666'
			},
			unactive: {
				type: String,
				default: '#ddd'
			}
		},
		created() {
			this.stepperNum = this.val;
			this.stepperCacheNum = this.val;
		},
		watch: {
			val: function(val) {
				this.stepperNum = this.val;
			}
		},
		methods: {
			less() {
				this.stepperNum <= this.min ? this.stepperNum = this.min : this.stepperNum -= Math.ceil(this.step * 10) / 10;
				this.stepperCacheNum = Number(this.stepperNum.toFixed(1));
				this.emit(this.stepperCacheNum, this.label);
			},
			add() {
				this.stepperNum >= this.max ? this.stepperNum = this.max : this.stepperNum += Math.ceil(this.step * 10) / 10;
				this.stepperCacheNum = Number(this.stepperNum.toFixed(1));
				this.emit(this.stepperCacheNum, this.label);
			},
			emit(val, label) {
				if (Number(val.toFixed(1)) > this.max) {
					val = this.max;
					this.stepperCacheNum = this.max;
				}
				if (Number(val.toFixed(1)) < this.min) {
					val = this.min;
					this.stepperCacheNum = this.min;
				}
				this.$emit('change', {
					val: val,
					label: label
				});
			},
			iptVal(e) {
				// 暂未开发输入框->sunUI1.0.0,预计sunUI1.0.1
				Number(e.detail.value) > this.max ? this.stepperNum = this.max : this.stepperNum;
			}
		}
	}
</script>

<style lang="scss">
	.sunui-stepper {
		display: flex;
		align-items: center;
		view {
			display: inline-block;
			font-size: 1.5em;
			font-weight: bold;
			// 如果需要边框,则打开本样式 --1
			line-height: 1em; //1
			padding: 4upx 10upx; //1
			border: 1upx solid #eee; //1
		}
		.addSubtract{
			width: 36rpx;
			height: 36rpx;
			line-height: 36rpx;
			text-align: center;
			font-size: 32rpx;
			border: none;
			background-color: #eaebe5;
			border-radius: 8rpx;
		}
		input {
			width: 100upx;
			// 如果不需要边框,则关闭本样式 --2
			// margin: 0 20upx; //2
			text-align: center;
			background-color: #fff;
		}
	}
</style>
