$(function(){
    var form = $('#select_form');
    var url = form.attr('action');
    getImgList(url, form);
    $(document).delegate('.pagination a', 'click', function () {
        var url = $(this).attr('href');
        getImgList(url);
        return false;
    });
    $(document).delegate('.image_search', 'click', function () {
        getImgList(url, form);
        return false;
    });
    $('#column-img').click(function () {
        getImgList(url, form);
    });
    function getImgList(url, form) {
        senddata = '';
        if (form) {
            var senddata = form.serialize();
        }
        $.ajax({
            type: "GET",
            url: url,
            data: senddata,
            async: false,
            success: function (data) {
                $('#image_list').empty().html(data.content);
                $("#page").empty().html(data.page);
                $("#totalspan").empty().html("总共"+data.total+"条记录");
                return false;
            }
        });
    }
    $('.close_layer').click(function(){
        parent.layer.closeAll();
    });
    //选中效果
    $(document).on('click', '.select_a', function () {
        var album_type = $("#album_type").val();
        var img_url = $(this).find('img').attr('data-url');//图片地址
        var img_id = $(this).find('img').attr('data-id');//图片id
        var img_src = $(this).find('img').attr('src');//图片压缩地址
        var img_name = $(this).find('img').attr('data-name');//获取图片名称
        var selected_mark = $('.selected_mark');//选中标记
        var view_box = $('#view_box');
        var data = {
            'img_id': img_id,
            'img_src': img_src,
            'img_url': img_url,
            'img_name': img_name
        };
        if($(this).hasClass("selected")){
            //取消效果
            $(this).removeClass('selected');
            //删除容器里的图片
            $('[data-selectd-id=' + data.img_id + ']').remove();
        }else{
            //选中效果
            if (album_type == 'only') {
                $('.select_a').removeClass('selected');
            }
            $(this).addClass('selected');
            //往容器里面添加已选中的图片
           /* var html = '';
            laytpl(tpl).render(data, function (render) {
                html = render;
            });*/
            if (album_type == 'only'){
                view_box.empty();
            }
            view_box.append(template('selected_image_view',data));
        }
        if (album_type != 'only') {
            //显示选中图片的数量
            $('#selectd_num').html(view_box.children().length)
        }
    });

    /**
     * 查看已选中图片
     */
    $(document).on('click', '.selected-button', function () {
        $('.select_imgs').html();
        $('#view_box,.return-button').show();
        $('#image_list,#pageinfo,.selected-button').hide();
    });
    /**
     * 返回选择列表
     */
    $(document).on('click', '.return-button', function () {
        $('.select_imgs').html();
        $('#view_box,.return-button').hide();
        $('#image_list,#pageinfo,.selected-button').show();
        $('').show();
    });
    /**
     *删除已选中图片
     */
    $(document).on('click', '.selected_del', function () {
        var id = $(this).find('img').attr('data-id');
        var view_box = $('#view_box');
        //删除容器里的图片
        $('[data-selectd-id=' + id + ']').remove();
        //取消原来的选中效果
        $('[data-image-id=' + id + ']').removeClass('selected');
        $('#selectd_num').html(view_box.children().length)
    });

    /**
     * 使用选中图片
     */
    $(".use_image").click(function () {
        var album_type = $("#album_type").val();
        var for_id = $("#for_id").val();
        var data = [];
        var view_box = $('#view_box');
        if (view_box.children().length > 0) {
            view_box.find('img').each(function () {
                var id = $(this).attr('data-id');
                var url = $(this).attr('data-url');
                var thumb = $(this).attr('src');
                var name = $(this).attr('data-name');
                var item = {
                    id: id,
                    src: url,
                    thumb: thumb,
                    name: name
                };
                data.push(item);
            })
        }else {
            layer.msg('您没有选中任何图片哦', {icon: 2,time: 1500});
            return false;
        }
        var index = parent.layer.getFrameIndex(window.name);
        if (album_type == 'only') {
            if (typeof parent.handleOnly === 'function') {
                //单图片选择回调函数
                parent.handleOnly(index, data, for_id);
            } else {
                
                parent.uploadImage(index,data, for_id);
            }
        } else if (album_type == 'multi') {
            if (typeof ( parent.handleMulti) === 'function') {
                /*多图片选择回调函数*/
                parent.handleMulti(index,data, for_id);
            } else {
                parent.uploadImages(index,data, for_id);
            }
        } else {
            if (typeof ( parent.handleEditor) === 'function') {
                /*编辑器图片选择回调函数*/
                parent.handleEditor(index,data, for_id);
            } else {
                parent.uploadEditor(index,data, for_id);
            }
        }
    });
});