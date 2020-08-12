/**
 * Created by Administrator on 2017/4/17 0017.
 */
function AlertLoading(){
    $('#submit').html('登录中，请稍后...');
}
function AjaxFormSubmit(form) {
    AlertLoading();
    var target,submit_data;
    target= form.attr('action');
    var account = $('[name="account"]').val();
    var passcode = $('[name="passcode"]').val();
    var captcha = $('[name="captcha"]').val();
    var key = form.attr('data-key');
    var iv = form.attr('data-iv');
    var data = form.serialize();
    /*submit_data = 'loginData='+doEncode(data,key,iv);*/
    form.find("[type='submit']").attr('disabled',true);
    $.ajax({
        url:target,data:{account:account,passcode:passcode,captcha:captcha},dataType:'json',type:'POST',
        success: function(data){
            form.find("[type='submit']").attr('disabled',false);
            var loginError = Number(form.attr('data-error'));
            if (data.code != 1) {
                loginError++;
                if(loginError >= 3 && $('.verify-group').length < 1){
                    $('#btn-box').before($('#verify_tpl').html());
                }
                form.attr('data-error',loginError);
                $('#submit').html(data.msg);
                $('#submit').removeClass('btn-primary');
                $('#submit').addClass('btn-danger');
                $('#verify_img').click();
                $('#verify_input').val('');
                $("#verify_input").focus();

                time = 1500;
            } else {
                $('#submit').html(data.msg);
                time = 5000;
                $('#submit').removeClass('btn-danger');
                $('#submit').addClass('btn-primary');
                location.href = data.url;
            }
            setTimeout(function () {
                $('#submit').removeClass('btn-danger');
                $('#submit').addClass('btn-primary');
                $('#submit').html('立 即 登 录');

            }, time);

        },
        error:function(){
            form.find("[type='submit']").attr('disabled',false);
            $('#submit').removeClass('btn-danger');
            $('#submit').addClass('btn-primary');
            $('#submit').html('立 即 登 录');
            layer.msg('网络遇到问题，请稍后再试',false);
        }
    })
}
/*
function doEncode(message,key,iv){
    var enkey = CryptoJS.enc.Utf8.parse(key);
    var eniv  = CryptoJS.enc.Utf8.parse(iv);
    var encrypted = CryptoJS.AES.encrypt(message, enkey, { iv: eniv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString();
    var wordArray = CryptoJS.enc.Utf8.parse(encrypted);
    codeData = CryptoJS.enc.Base64.stringify(wordArray);
    codeData=encodeURIComponent(codeData)
    return codeData;
}*/
