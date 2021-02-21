<script>
	// 引入检查更新模块
	import { checkUpdater } from "@/utils/checkUpdater";
	export default {
		onLaunch: function() {
			// console.log(this.$ComTools.getToken())
            // if (!this.$ComTools.getToken()){
            //     uni.navigateTo({
            //         url:'/pages/login/login'
            //     })
            // }
			// #ifdef APP-PLUS
			// plus.screen.lockOrientation("portrait-primary"); //竖屏正方向锁定
			// const updated = uni.getStorageSync("updated"); // 尝试读取storage

			// if (updated.completed === true) {
			//   // 如果上次刚更新过
			//   // 删除安装包及安装记录
			//   // console.log("安装记录被删除，更新成功");
			//   uni.removeSavedFile({
			//     filePath: updated.packgePath,
			//     success: (res) => {
			//       uni.removeStorageSync("updated");
			//     },
			//   });
			// } else if (updated.completed === false) {
			  // uni.removeStorageSync("updated");
			  // plus.runtime.install(updated.packgePath, { force: true });
			  // uni.setStorage({
			  //   key: "updated",
			  //   data: {
			  //     completed: true,
			  //     packgePath: updated.packgePath,
			  //   },
			  //   success: (res) => {
			  //     console.log("成功安装上次的更新，应用需要重启才能继续完成");
			  //   },
			  // });
			  // uni.showModal({
			  //   title: "提示",
			  //   content: "应用将重启以完成更新",
			  //   showCancel: false,
			  //   complete: () => {
			  //     plus.runtime.restart();
			  //   },
			  // });
			// } else {
			//   // 检查更新，参数：{ 当前版本号，跳转到更新页面的url }
			//   checkUpdater(this.$current.id);
			// }
			// #endif
			//-------end
            this.setTabBarText()
        },
		onShow: function() {
			// console.log('App Show')
            this.$store.dispatch('getUserInfo',this.$ComTools.getUser())
		},
		onHide: function() {
			// console.log('App Hide')
		},
        methods:{
            setTabBarText() {
                uni.setTabBarItem({
                    index: 0,
                    text: this.$t('footer[0]')
                })
                uni.setTabBarItem({
                    index: 1,
                    text: this.$t('footer[1]')
                })
                uni.setTabBarItem({
                    index: 2,
                    text: this.$t('footer[2]')
                })
                uni.setTabBarItem({
                    index: 3,
                    text: this.$t('footer[3]')
                })
            },
        }
	}
</script>

<style>
    page{background-color: #F3F3F3;padding: 12rpx 28rpx}
</style>
