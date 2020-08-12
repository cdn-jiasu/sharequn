/**
 * Created by 赖钊菱 on 2016/11/24.
 */
$(function(){
    if ($(".valid_form").length > 0) {
        $.Tipmsg.r=null;
        $(".valid_form").Validform({
            tiptype:function(msg){
                $.toast(msg, "text");
            },
            beforeSubmit:function(){
                ajax_loading($(this))
            }
        });
        
    }
    
    
    $('.ajax_get').click(function () {
        ajax_init($(this), 'get');
        return false;
    });
    $('.ajax_post').click(function () {
        ajax_init($(this), 'post');
        return false;
    });
    //ajax 表单提交
    $('.ajax_form').submit(function () {
        ajax_init($(this), 'ajax_form');
        return false;
    })
    
    
})
function ajax_init(obj, type) {
    if (typeof BeforeSubmit === 'function') {
        var is_submit = BeforeSubmit();
        if (!is_submit) {
            return false;
        }
    }
    if (obj.hasClass('confirm')) {
        var text = '您确定要执行此操作吗？';
        if (typeof(obj.attr("confirm")) != "undefined") {
            text = obj.attr("confirm");
        }
        $.confirm(text, "提示信息", function() {
            ajax_type(obj, type);
            return false;
        }, function() {
            //取消操作
        });
        return false;
    }
    ajax_type(obj, type);
    return false;
}
function ajax_type(obj, type) {
    ajax_loading(obj);
    switch (type) {
        case 'get':
            AjaxButtonGet(obj);
            break;
        case 'post':
            AjaxButtonPost(obj);
            break;
        case 'ajax_form':
            AjaxFormSubmit(obj);
            break;
        default :
            return false;
    }
}
function ajax_loading(obj) {
    if (typeof AlertLoading === 'function') {
        AlertLoading();
    } else {
        if (typeof(obj.attr("load_msg")) != "undefined") {
            $.showLoading(obj.attr("load_msg"));
        } else {
            $.showLoading();
        }
    }
}
function AjaxButtonGet(obj) {
    var target;
    if ((target = obj.attr('href')) || (target = obj.attr('url'))) {
        $.ajax({
            url: target,
            dataType: 'json', type: 'GET',
            success: function (data) {
                callBackNotify(obj,data)
            },
            error: function () {
                $.toast('请求失败', "forbidden");
            }
        });
    }
}
function AjaxButtonPost(obj) {
    var form, target, submit_data;
    form = $('.' + obj.attr('target_form'));
    target = form.attr('action');
    submit_data = form.serialize();
    if (typeof(obj.attr("name")) != "undefined" && typeof(obj.attr("value")) != "undefined") {
        submit_data += '&' + obj.attr('name') + '=' + obj.attr('value');
    }
    obj.attr('disabled', true);
    $.ajax({
        url:target,data:submit_data,dataType:'json',type:'POST',
        success: function(data){
            obj.attr('disabled',false);
            callBackNotify(obj,data);
        },
        error:function(){
            obj.attr('disabled',false);
            $.toast('请求失败', "forbidden");
        }
    })
}
//validform扩展提交(传入表单对象)
function AjaxFormSubmit(form) {
    var target,submit_data;
    target= form.attr('action');
    submit_data = form.serialize();
    form.find("[type='submit']").attr('disabled',true);
    $.ajax({
        url:target,data:submit_data,dataType:'json',type:'POST',
        success: function(data){
            form.find("[type='submit']").attr('disabled',false);
            callBackNotify(form,data)
        },
        error:function(){
            form.find("[type='submit']").attr('disabled',false);
            $.hideLoading();
        }
    })
}
/**
 * 回调函数
 */
function callBackNotify(obj,data){
    $.hideLoading();
    var func_name = obj.attr('data-function');
    if(func_name){
        eval(func_name)(data);
    }else{
        weiui_notify(data);
    }
}
//结果通知
function weiui_notify(data) {
    if (data.status == 1) {
        $.toast(data.info,function(){
            location.href = data.url;
        });
    } else {
        $.toast(data.info, "forbidden");
    }
}