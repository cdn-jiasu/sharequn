$(function () {
    $('.sidebar-menu li ul li a').click(function () {
        menu_href = $(this).attr('href');
        if ($(this).parent().parent().parent().hasClass('treeview')) {
            sessionStorage['menu_active'] = menu_href;
        }
    });
    $('.sidebar-menu li a').click(function () {
        menu_href = $(this).attr('href');
        if (!$(this).parent().hasClass('treeview')) {
            sessionStorage['menu_active'] = menu_href;
        }
    });
    menu_active = sessionStorage['menu_active'];
    var nav_a = $(".sidebar-menu li ul li a[href='" + menu_active + "']");
    if (menu_active && nav_a) {
        nav_a.parent().addClass('active');
        nav_a.find('.fa').removeClass('fa-circle-o').addClass('fa-dot-circle-o');
        if (nav_a.parent().parent().parent().hasClass('treeview')) {
            nav_a.parent().parent().parent().addClass('active menu-open');
        }
    } else {
        $('.sidebar-menu li:first').addClass('active');
    }
    var nav_t = $(".sidebar-menu li a[href='" + menu_active + "']");
    if (menu_active && nav_t) {
        nav_t.parent().addClass('active');
    }
    //隐藏没有权限的导航菜单
    $('.treeview').each(function (i, index) {
        if ($(this).find('ul li').length == 0) {
            $(this).remove();
        }
    });
    //***
    $('.checkall').click(function () {
        var e = $(this);
        var name = e.attr("name");
        var checkfor = e.attr("data-checkfor");
        var type;
        if (checkfor != '' && checkfor != null && checkfor != undefined) {
            type = $("input[name='" + checkfor + "']");
        } else {
            type = e.closest('form').find("input[type='checkbox']");
        }
        if (name == "checkall") {
            $(type).each(function (index, element) {
                element.checked = true;
            });
            e.attr("name", "ok");
        } else {
            $(type).each(function (index, element) {
                element.checked = false;
            });
            e.attr("name", "checkall");
        }
    });
    $('.webuploader-view').click(function () {
        var alt = "图片查看";
        img_src = $(this).parent().parent().parent().find('.form-control').val();
        if (!img_src) {
            layer.msg('没有图片可预览');
            return;
        }
        img_data = {
            "title": "相册", //相册标题
            //"id": 0, //相册id
            //"start": false, //初始显示的图片序号，默认0
            "data": [{
                "alt": alt, "pid": 0, //图片id
                "src": img_src, //原图地址
                "thumb": "" //缩略图地址
            }]
        };
        layer.photos({
            photos: img_data //格式见API文档手册页
            , anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机
        });
    });
    $('.webuploader-delete').click(function () {
        $(this).parent().parent().parent().find('.form-control').val('');
    });
    $(document).delegate('.image-view', 'click', function () {
        var alt = "图片查看";
        if (typeof($(this).attr('data-alt')) != 'undefined') {
            alt = $(this).attr('data-alt');
        }
        img = {
            "title": "相册", //相册标题
            //"id": 0, //相册id
            //"start": false, //初始显示的图片序号，默认0
            "data": [{
                "alt": alt, "pid": 0, //图片id
                "src": $(this).attr('data-src'), //原图地址
                "thumb": "" //缩略图地址
            }]
        };
        layer.photos({
            photos: img //格式见API文档手册页
            , anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机
        });
    });
    $('.copy_btn').click(function () {
        //todo
    });
    $('.layer-dialog').click(function () {
        if (typeof($(this).attr("data-url")) != "undefined") {
            url = $(this).attr('data-url');
        } else {
            throw ('地址不正确');
        }
        if (typeof($(this).attr("title")) != "undefined") {
            title = $(this).attr('title');
        } else if ($(this).html() != '') {
            title = $(this).html();
        } else {
            title = '信息';
        }
        if (typeof($(this).attr("data-w")) != "undefined") {
            width = $(this).attr('data-w')
        } else {
            width = 800;
        }
        if (typeof($(this).attr("data-h")) != "undefined") {
            height = $(this).attr('data-h')
        } else {
            height = ($(window).height() - 50);
        }
        layer.open({
            type: 2, area: [width + 'px', height + 'px'], fix: false, //不固定
            maxmin: false, shade: [0.1, '#fff'], title: title, content: url
        });
        return false;
    });
});
$(function () {
    var sortVal = '';
    $('.ajax_sort').focus(function () {
        $(this).select();
        sortVal = $(this).val();
    }).blur(function () {
        var setSortVal = $(this).val();
        if (sortVal != setSortVal) {
            var id = $(this).attr('data-id');
            var target = '';
            if($(this).attr('data-target') != 'undefined'){
                target = $(this).attr('data-target');
            }
            $.get(SET_SORT_URL, {'sort': setSortVal, 'id': id ,'target':target}, function (data) {
                if (data.code == 0) {
                    layer.msg('设置失败');
                } else {
                    location.href = '';
                }
            });
        }
    });

    var nameVal = '';
    $('.ajax_name').focus(function () {
        nameVal = $(this).val();
    }).blur(function () {
        var setNameVal = $(this).val();
        if (nameVal != setNameVal) {
            var id = $(this).attr('data-id');
            var target = '';
            if($(this).attr('data-target') != 'undefined'){
                target = $(this).attr('data-target');
            }
            $.post(SET_NAME_URL, {'name': setNameVal, 'id': id , 'target':target}, function (data) {
                if (data.code == 0) {
                    layer.msg('设置失败');
                } else {
                    location.href = '';
                }
            });
        }
    });
});