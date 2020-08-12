;
$(function () {
    $('.use_file').click(function () {
        var $file_url = $(this).attr('data-value');
        var $index = parent.layer.getFrameIndex(window.name);
        var $for_id = $('[name="for_id"]').val();
        var $type = $('[name="type"]').val();
        if ($type == 'only') {
            if (typeof parent.handleOnly === 'function') {
                //单图片选择回调函数
                parent.handleOnly($index, $file_url, $for_id);
            } else {
                parent.uploadFile($index, $file_url, $for_id);
            }
        } else if (album_type == 'multi') {
            if (typeof ( parent.handleMulti) === 'function') {
                /*多图片选择回调函数*/
                parent.handleMulti($index, $file_url, $for_id);
            } else {
                parent.uploadFiles($index, $file_url, $for_id);
            }
        }
    });
    $('.close_layer').click(function () {
        parent.layer.closeAll();
    });
});