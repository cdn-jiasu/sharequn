/**
 * jquery cookie插件
 * 使用：
 * $.cookie('key'); //读取Cookie值
 * $.cookie('key', 'value'); // 设置/新建cookie的值
 * $.cookie('key', 'value', {expires: 7, path: '/', domain: 'dh89.com', secure: true});//新建一个cookie 包括有效期(天数) 路径 域名等
 * $.cookie('key', null); //删除一个cookie
 */
jQuery.cookie = function (name, value, options) {
    if (typeof value != "undefined") {
        options = options || {};
        if (value === null) {
            value = "";
            options.expires = -1;
        }
        var expires = "";
        if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == "number") {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = "; expires=" + date.toUTCString();
        }
        var path = options.path ? "; path=" + options.path : "";
        var domain = options.domain ? "; domain=" + options.domain : "";
        var secure = options.secure ? "; secure" : "";
        document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("");
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != "") {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
$(function () {
    var menu_active = $.cookie('menu_active');
    if (menu_active) {
        $(".menu-list[href='" + menu_active + "']").parent().addClass('active');
    } else {
        $('.menu-list:first').parent().addClass('active');
    }
    if ($(".menu-list[href='" + menu_active + "']").parent().parent().parent().hasClass('treeview')) {
        $(".menu-list[href='" + menu_active + "']").parent().parent().parent().addClass('active menu-open');
    }
    $('.menu-list').click(function () {
        //$('.left-navi').parent().removeClass('active');
        //$(this).parent().addClass('active');
        //$(this).find('span').addClass('icon-wrench');
        var menu_active = $(this).attr('href')
        $.cookie('menu_active', menu_active, {path: '/'});
    });
    //隐藏没有权限的导航菜单
})