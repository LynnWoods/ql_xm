import dtime from "time-formater";
let Public = new Object()
// #ifdef APP-PLUS
Public.img_host = 'http://wjykcs.wisvalley.cn';
// #endif

// #ifndef APP-PLUS
Public.img_host = process.env.NODE_ENV === "development"? "/api" :'http://wjykcs.wisvalley.cn';
// Public.img_host = process.env.NODE_ENV === "development"? "/api" :'http://api.wjyk.website';
// #endif

//传一个手机号 返回手机号的前3位和后四位 其他的显示* (手机号加密)
Public.phoneEncryption = function (num) {
    //获得手机号的前3位
    var a = num.slice(0, 3)
    var b = num.slice(7)
    var ok = a + '****' + b
    return ok
}
// 手机正则
Public.checkMobile = function (sMobile) {
    var phone = sMobile.trim()
    var reg = /^1\d{10}$/
    // var reg = /^[0-9]*$/
    return reg.test(phone)
}
// 时间戳转化
Public.timestampToTime = function (timestamp) {
    if (timestamp.length == 10) {
        var date = new Date(Number(timestamp) * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    } else {
        var date = new Date(Number(timestamp)) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    }
    var Y, M, D, h, m, s
    Y = date.getFullYear() + '-'
    M =
        (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
        '-'
    D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    m =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return h + m + s
}
// 时间戳转化
Public.timestampToTime1 = function (timestamp) {
    var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y, M, D, h, m, s
    Y = date.getFullYear() + '-'
    M =
        (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
        '-'
    D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    m =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + D + h + m + s
}
// 时间戳转化
Public.timestampToTime2 = function (timestamp) {
    var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y, M, D, h, m, s
    Y = date.getFullYear() + '-'
    M =
        (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
        '-'
    D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    m =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + D
}
//倒计时
Public.down= function (time_over){
	//时间差
	var date = new Date();
  var now = date.getTime();
  // var limit_time = limit*60*1000
  let differTime = time_over - now;
  // console.log(end,now)
	//定义变量,h,m,s保存倒计时的时间
	var h, m, s, down;
	if (differTime >= 0) {
		h = Math.floor(differTime / 1000 / 60 / 60);
		m = Math.floor(differTime / 1000 / 60 % 60);
		s = Math.floor(differTime / 1000 % 60);
		h = h < 10 ? ("0" + h) : h;
		m = m < 10 ? ("0" + m) : m;
    s = s < 10 ? ("0" + s) : s;
    down = h+':'+m+':'+s
		if(h==0){
      down = m+':'+s
		}else if(m==0){
      down = s
    }
    return down
	} else {
    down = false
	// console.log(down)
    return down
	}
}
//提示信息封装
Public.msg = function (msg,time,img) {
    uni.showToast({
        icon: img || 'none',
        title: msg,
        duration:time
    })
}
//保留2位小数，不够位数，则用0替补
Public.keepFull = function(num){
	// Math.floor(num*100 * 100) / 100
	 let result = Math.round(num*100 * 100) / 100;
	 let s_x = result.toString();
	 let pos_decimal = s_x.indexOf('.');
	 if (pos_decimal < 0) {
		 pos_decimal = s_x.length;

		 s_x += '.';
	 }
	 while (s_x.length <= pos_decimal + 2) {
		s_x += '0';
	 }
	 return s_x;
}
//倒计时封装
Public.countDown = function(time){
    if (time <= 0)return false
    let countdown = dtime.countdown(time)
    let token = 'd天H小时m分钟s秒'
    let times = countdown.format(token)
    return times
}
//数字千位符格式化
Public.toThousands = function(num){
    let nums = (num || 0).toString();
    let index = nums.indexOf('.')
    let result = '';
    let decimals = '';
    if (index !== -1){
        decimals = nums.substring(index)
        nums = nums.substring(0,index)
    }
    while (nums.length > 3) {
        result = ',' + nums.slice(-3) + result;
        nums = nums.slice(0, nums.length - 3);
    }
    if (nums) { result = nums + result; }
    return result+decimals;
}

export default Public
