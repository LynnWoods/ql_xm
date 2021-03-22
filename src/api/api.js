import request from '@/utils/request.js'
// #ifdef APP-PLUS
export let baseUrl = 'http://wjykcs.wisvalley.cn';
// #endif
// #ifndef APP-PLUS
export let baseUrl = process.env.NODE_ENV === "development"? "/api" :'http://wjykcs.wisvalley.cn';
//
// export let baseUrl = process.env.NODE_ENV === "development"? "/api" :'http://192.168.0.114:8081';
// #endif
export function submitLogin(params){//登录
    return request.globalPost(
        '/app/auth/login',
        params)
}
export function submitRegister(params){//注册
    return request.globalPost(
        '/app/auth/register',
        params)
}
export function getCode(params){//验证码
    let data = {tel:params.tel}
    return request.globalGet(
        `/app/sms/get/${params.type}`,
        data)
}
export function forgetPass(params){//忘记密码
    return request.globalPost(
        '/app/auth/forgetPwd',
        params)
}
export function editTel(params){//设置交易密码
    return request.globalPost(
        '/app/auth/editTel',
        params)
}
export function updatePwd(params){//修改登录密码
    return request.globalPost(
        '/app/auth/updatePwd',
        params)
}
export function jyPassword(params){//设置交易密码
    return request.globalPost(
        '/app/auth/jyPassword',
        params)
}
export function getInfoUser(params){//获取用户信息
    return request.globalGet(
        '/app/auth/info',
        params)
}
export function editNice(params){//编辑用户昵称
    return request.globalPost(
        '/app/auth/editNice',
        params)
}
export function editHead(params){//编辑用户头像
    return request.globalPost(
        '/app/auth/editHead',
        params)
}
export function getBanner(params){//获取轮播图
    return request.globalGet(
        `/app/cms/page-advertise/${params.type}`)
}
export function banner_info(params){//获取轮播图详情
    return request.globalGet(
        `/app/cms/info-advertise`,params)
}
export function cms_advisory(params){//获取新闻资讯列表
    return request.globalGet(
        `/app/cms/page-advisory`,params)
}
export function get_advisory_info(params){//获取新闻资讯详情
    return request.globalGet(
        `/app/cms/advisory/${params.id}`)
}
export function get_announcement(params){//获取公告
    return request.globalGet(
        `/app/cms/page-announcement`)
}
export function get_announcement_info(params){//获取公告详情
    return request.globalGet(
        `/app/cms/announcement/${params.id}`)
}
export function market_thumb(params){//行情查询
    return request.globalGet(
        `/app/market/thumb`)
}
export function wallet_withdraw(params){//提币
    return request.globalPost(
        '/app/wallet/withdraw',
        params)
}
export function withdraw_detail(params){//提币明细
    return request.globalGet(
        `/app/wallet/withdraw-page`,params)
}
export function get_coin_info(params){//查询币种配置
    return request.globalGet(
        `/app/coin/info`,params)
}
export function get_product_list(params){//质押产品列表
    return request.globalGet(
        `/app/product/page-list`,params)
}
export function get_wallet_list(params){//资产列表
    return request.globalGet(
        `/app/wallet/list`)
}
export function wallet_detail(params){//资产明细
    return request.globalGet(
        '/app/wallet/page-detail',
        params)
}
export function wallet_transfer(params){//转账
    return request.globalPost(
        '/app/wallet/transfer',
        params)
}
export function transfer_detail(params){//转账明细
    return request.globalGet(
        '/app/wallet/transfer-page',
        params)
}
export function deposit_detail(params){//充值明细
    return request.globalGet(
        '/app/wallet/deposit-page',
        params)
}
export function order_page(params){//质押列表==>我的订单
    return request.globalGet(
        '/app/order/page',
        params)
}
export function member_invitation(params){//邀请列表
    return request.globalGet(
        '/app/member/page-invitation',
        params)
}
export function member_qrcode(params){//生成邀请二维码
    return request.globalGet(
        '/app/member/qrcode')
}
export function getProduct(params){//根据查询产品
    return request.globalGet(
        `/app/product/${params.id}`)
}
export function cms_type(params){//查询锁仓协议、关于我们、用户协议
    return request.globalGet(
        '/app/cms/type',params)
}
export function order_create(params){//质押生成订单
    return request.globalPost(
        '/app/order/create',
        params)
}
export function order_info(params){//质押订单详情
    return request.globalGet(
        '/app/order/info',params)
}
export function order_unlock(params){//解锁
    return request.globalPost(
        '/app/order/unlock',params)
}
export function deposit_create_addr(params){//解锁
    return request.globalPost(
        '/app/deposit/create-addr',params)
}
export function order_unlock_info(params){//解锁手续费查询
    return request.globalGet(
        '/app/order/unlock-info',params)
}
export function power_page_list(params){//算力产品列表
    return request.globalGet(
        '/app/power/page-list',params)
}
export function power_info(params){//算力产品详情
    return request.globalGet(
        `/app/power/${params.id}`)
}

export function porderCreate(params){//下单
    return request.globalPost(
        '/app/porder/create',params)
}

export function porderPageList(params){//订单列表
    return request.globalGet(
        '/app/porder/page-list',params)
}
export function getPorderInfo(params){//订单详情
    return request.globalGet(
        '/app/porder/info',params)
}


export function cms_version(params){//查看版本
    return request.globalGet(
        '/app/cms/version',params)
}

export function getRankHank(params){//获取榜单信息算力
    return request.globalGet(
        '/app/power/hank',params)
}

export function getPorderHank(params){//获取榜单信息理财
    return request.globalGet(
        '/app/product/hank',params)
}











