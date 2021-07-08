// 注意：每次调用$.get() 或 $.post() 或 $.ajax()的时候 
// 会先调用ajaxPrefilter这个函数自动调用
// 在这个函数中 我们可以拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function(options) {
    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);


    // 统一为有权限的接口 设置headers请求头

    // 查看字符串中是否有/my有权限的地址
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {

            // 获取用户存储到本地数据库中的信息 如果没有就为空字符串
            Authorization: localStorage.getItem('token') || '',

        }
    }


    // 全局统一挂载complete 回调函数
    options.complete = function(res) {

        // console.log('执行conmlete');
        // console.log(res);
        // 在complet回调函数中，可以使用res.responseJSON
        // 拿到服务器响应回来的数据
        if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            // 1、强制清空token
            localStorage.removeItem('token');
            // 2、强制跳转到登录页面
            location.href = '../../login.html';
        }

    }



})