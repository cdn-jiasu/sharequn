/**
 * Created by 赖钊菱 on 2016/11/24.
 */
$(function(){
    /*if ($(".valid_form").length > 0) {
        if(is_mobile()){
            $.Tipmsg.r=null;
            $(".valid_form").Validform({
                tiptype:function(msg){
                    layer_error(msg);
                },
                beforeSubmit:function(){
                    ajax_loading($(this))
                }
            });
        }else{
            $(".valid_form").validator({
                beforeSubmit:function(e){
                    ajax_loading(e)
                }
            });
        }
    }*/
    if ($(".valid_form").length > 0) {
        if(is_mobile()){
            $('.valid_form').validator({
                valid: function(form){
                    AjaxFormSubmit($(form));
                }
            });
        }else{
            $('.valid_form').validator({
                valid: function(form){
                    AjaxFormSubmit($(form));
                }
            });
        }
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
});
function ajax_init(obj, type) {
    if (typeof BeforeSubmit === 'function') {
        var is_submit = BeforeSubmit();
        if (!is_submit) {
            return false;
        }
    }
    
    if (obj.hasClass('confirm')) {
        text = '您确定要执行此操作吗？';
        if (typeof(obj.attr("data-confirm-msg")) != "undefined") {
            text = obj.attr("data-confirm-msg");
        }
        if(is_mobile()){
            inquiry = layer.open({
                content: text
                ,btn: ['确定', '取消']
                ,yes: function(index){
                    layer.close(inquiry);
                    ajax_type(obj, type);
                    return false;
                }
                ,no:function(){
                    layer.close(inquiry);
                }
            });
        }else{
            inquiry = layer.confirm(text, {
                btn: ['确定', '取消']
            }, function () {
                layer.close(inquiry);
                ajax_type(obj, type);
                return false;
            }, function () {
                layer.close(inquiry);
            });
        }


        return false;
    }
    ajax_type(obj, type);
    return false;
}
function is_mobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        return true;
    }else{
        return false;
    }
}
function ajax_type(obj, type) {
    
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
        var layer_obj;
        if (typeof(obj.attr("data-load-msg")) != "undefined") {
            layer_obj = layer.msg((obj.attr("data-load-msg")), {icon: 16, shade: [0.1, '#fff']});
        } else {
            layer_obj = layer.load(1, {shade: [0.1, '#fff']});
        }
        return layer_obj;
    }
}
function AjaxButtonGet(obj) {
    layer_obj = ajax_loading(obj);
    var target;
    if ((target = obj.attr('href')) || (target = obj.attr('data-url'))) {
        $.ajax({
            url: target,
            dataType: 'json', type: 'GET',
            success: function (data) {
                callBackNotify(obj,data);
                layer.close(layer_obj);
            },
            error: function () {
                layer_error('网络遇到问题，请稍后再试',false);
                layer.close(layer_obj);
            }
        });
    }
}
function AjaxButtonPost(obj) {
    layer_obj = ajax_loading(obj);
    var form, target, submit_data;
    /*console.log(form.attr('action'));
    return;*/
    form = $('#' + obj.attr('data-target-form'));
    if(typeof (obj.attr('data-url')) != 'undefined'){
        target = obj.attr('data-url');
    }else{
        target = form.attr('action');
    }
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
            layer.close(layer_obj);
        },
        error:function(){
            obj.attr('disabled',false);
            //layer_error('网络遇到问题，请稍后再试',false);
            layer.msg('网络遇到问题，请稍后再试', {icon: 2,time: 1500});
            layer.close(layer_obj);
        }
    })
}
//validform扩展提交(传入表单对象)
function AjaxFormSubmit(form) {
    layer_obj = ajax_loading(form);
    var target,submit_data;
    target= form.attr('action');
    submit_data = form.serialize();
    form.find("[type='submit']").attr('disabled',true);
    $.ajax({
        url:target,data:submit_data,dataType:'json',type:'POST',
        success: function(data){
            form.find("[type='submit']").attr('disabled',false);
            callBackNotify(form,data);
            layer.close(layer_obj);
        },
        error:function(){
            form.find("[type='submit']").attr('disabled',false);
            //layer_error('网络遇到问题，请稍后再试',false);
            layer.msg('网络遇到问题，请稍后再试', {icon: 2,time: 1500});
            layer.close(layer_obj);
        }
    })
    
}
/**
 * 回调函数
 */
function callBackNotify(obj,data){
    layer.closeAll();
    var func_name = obj.attr('data-function');
    if(func_name){
        eval(func_name)(data);
    }else{
        var layer_success_style = 1;
        var layer_error_style = 1;
        if(typeof(obj.attr("data-layer-success")) != "undefined"){
            layer_success_style = obj.attr("data-layer-success");
        }
        if(typeof(obj.attr("data-layer-error")) != "undefined"){
            layer_error_style = obj.attr("data-layer-error");
        }
        if (data.code == 1) {
            //成功弹框
            //layer_success(data.msg,data.url,data.data);
            jump_func = function(url){
                if (self != top) {
                    if (url) {
                        window.parent.location.href = data.url;
                    } else {
                        window.parent.location.reload();
                    }
                    parent.layer.closeAll()();
                } else {
                    if (url !== false) {
                        location.href = url;
                    }
                    layer.closeAll();
                }
            };
            switch (parseInt(layer_success_style)){
                case 0:
                    jump_func(data.url);
                    break;
                case 1:
                    layer.msg(data.msg, {icon:1,time:1000}, function(){
                        jump_func(data.url);
                    });
                    break;
                case 2:
                    layer.open({
                        content: data.msg,
                        btn: '确定',
                        shade: [0.1, '#fff'],
                        yes: function(){
                            jump_func(data.url);
                        }
                    });
                    break;
                case 3:
                    layer.msg(data.msg, {icon: -1,time: 1000},function(){
                        jump_func(data.url);
                    });
            }
        } else {
            //失败弹框
            //layer_error(data.msg,data.url,data.data);
            jump_func = function(url,id){
                if (self != top) {
                    if (url !== false && url !='') {
                        window.parent.location.href = url;
                    }
                    //parent.layer.closeAll();
                    layer.close(id)
                } else {
                    if (data !== false && url !='') {
                        location.href = url;
                    }
                    layer.close(id)
                }
            };
            var error_layer = '';
            switch (parseInt(layer_error_style)){
                case 0:
                    jump_func(data.url,error_layer);
                    break;
                case 1:
                    error_layer = layer.msg(data.msg, {icon: 2,time: 1500},function(){
                        jump_func(url,error_layer);
                    })
                    break;
                case 2:
                    error_layer = layer.open({
                        content: data.msg,
                        btn: '确定',
                        shade: [0.1, '#fff'],
                        yes: function(){
                            jump_func(data.url,error_layer);
                        }
                    });
                    break;
                case 3:
                    error_layer = layer.msg(data.msg, {icon: -1},function(){
                        jump_func(data.url,error_layer);
                    });
            }
        }
    }
}