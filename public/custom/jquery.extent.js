/**
 * Created by Administrator on 2016/11/23.
 */
jQuery.extend({
    attrThumbImg: function (preview, imgUrl, size) {
        var img = new Image();
        img.src = imgUrl;
        img.onload = function () {
            var img_height = 0;
            var img_width = 0;
            var real_height = img.height;
            var real_width = img.width;
            if (real_height > real_width && real_height > size) {
                var persent = real_height / size;
                real_height = size;
                real_width = real_width / persent;
            } else if (real_width > real_height && real_width > size) {
                var persent = real_width / size;
                real_width = size;
                real_height = real_height / persent;
            }
            if (real_height < size) {
                img_height = (size - real_height) / 2;
            }
            if (real_width < size) {
                img_width = (size - real_width) / 2;
            }
            preview.attr('src', imgUrl).removeClass('hidden').css({
                width: (size - img_width) + 'px',
                height: (size - img_height) + 'px',
                paddingTop: img_height + 'px',
                paddingLeft: img_width + 'px'
            });
        }
    },
    openAlbum: function (url,type,class_name) {
        if(type != 'only' && type !='multi' && type != 'editor'){
            throw ('type is not define');
        }
        url = url + "?for_id=" + class_name + "&type="+type;
        layer.open({
            type: 2,
            title: false,
            shadeClose: true,
            closeBtn: 0,
            shade: [0.5, '#000'],
            maxmin: false, //开启最大化最小化按钮
            area: ['790px', '518px'],
            content: [url, 'no'], //iframe的url
            cancel: function (index) {
                if (typeof close_iframe === 'function') {
                    close_iframe(index);
                } else {
                    return true;
                }
            }
        });
    },
    openFolder: function (url ,type ,class_name){
        if(type != 'only' && type !='multi' && type != 'editor'){
            throw ('type is not define');
        }
        url = url + "?for_id=" + class_name + "&type="+type;
        layer.open({
            type: 2,
            title: false,
            shadeClose: true,
            closeBtn: 0,
            shade: [0.5, '#000'],
            maxmin: false, //开启最大化最小化按钮
            area: ['790px', '518px'],
            content: [url, 'no'], //iframe的url
            cancel: function (index) {
                if (typeof close_iframe === 'function') {
                    close_iframe(index);
                } else {
                    return true;
                }
            }
        });
    }
});
(function($){
    $.fn.serializeJson=function(){
        var serializeObj={};
        var array=this.serializeArray();
        var str=this.serialize();
        $(array).each(function(){
            if(serializeObj[this.name]){
                if($.isArray(serializeObj[this.name])){
                    serializeObj[this.name].push(this.value);
                }else{
                    serializeObj[this.name]=[serializeObj[this.name],this.value];
                }
            }else{
                serializeObj[this.name]=this.value;
            }
        });
        return serializeObj;
    };
})(jQuery);