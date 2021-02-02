export const ComTools = {
	//判断是否是空字符串
	isEmptyString(data) {
		if (typeof data === 'undefined')
		  return true
		if (data === '')
		  return true
		if (data === null)
		  return true
		if (data === 'null')
		  return true
		if (data == 'undefined')
		  return true
		return false
	},
	//判断是否是空对象
	isNullObject(obj) {
	    if (typeof obj === 'undefined') {
	      return true
	    }
	    if (obj === null) {
	      return true
	    }
	    return false
	},
	//存储获取token
	setToken(value) {
	    uni.setStorageSync('token', value)
	},
	getToken() {
	    return uni.getStorageSync('token')
	},
	setUser(value) {
	    uni.setStorageSync('user', value)
	},
	getUser() {
	    return uni.getStorageSync('user')
	},
}
//app版本
function version() {
    return { id: 1 };
}