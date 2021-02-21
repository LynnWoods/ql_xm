
import { ComTools } from './tools.js'
import {Public} from './public.js'
// #ifdef APP-PLUS
const baseUrl = 'http://192.168.0.117:8081';
// #endif

// #ifndef APP-PLUS
const baseUrl = process.env.NODE_ENV === "development"? "/api" :'http://192.168.0.117:8081';
// const baseUrl = process.env.NODE_ENV === "development"? "/api" :'http://192.168.0.117:8081';
// #endif

let lang = uni.getStorageSync('_lang')
const request = {
    globalGet(url, data, contentType){
        return new Promise((resolve, reject) => {
            uni.request({
                url: baseUrl + url,
                data: data,
                method: 'GET',
				sslVerify: false,
                header: {
                    'Content-Type': contentType || 'application/x-www-form-urlencoded',
                    'auth-token': ComTools.getToken() || '',
                    'language': lang || 'zh_cn'
                },
                success: (response) => {
                    let res = response.data
					if(res.code==401){
						uni.navigateTo({
						    url:'/pages/login/login'
						})
					}
                    resolve(res)
                },
                fail: (err) => {
                    uni.showToast({
                        icon: 'none',
                        title: err.message,
                        duration: 2000
                    })
                    reject(err)
                }
            })
        }).catch((err) => {
			console.log(err);
		})
    },

    globalPost(url, data, contentType){
        return new Promise((resolve, reject) => {
            uni.request({
                url: baseUrl + url,
                data: data,
                method: 'POST',
				sslVerify: false,
                header: {
                    // 'Content-Type': contentType || 'application/json;charset=UTF-8'
                	'Content-Type': contentType || 'application/x-www-form-urlencoded',
                    'auth-token': ComTools.getToken() || '',
                    'language': lang || 'zh_cn',
                },
                success: (response) => {
                    let res = response.data
					if(res.code==401){
						uni.showToast({
						    title: res.message,
						})
						uni.removeStorageSync('token');
						uni.removeStorageSync('user');
						uni.navigateTo({
						    url:'/pages/login/login'
						})
					}
                    resolve(res)
                },
                fail: (err) => {
                    uni.showToast({
                        icon: 'none',
                        title: err.message,
                        duration: 2000
                    })
                    reject(err)
                },
            })
        }).catch((err) => {
			console.log(err);
		})
    },
}


export default request
