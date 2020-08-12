/**
 * Created by Administrator on 2016/9/13.
 */
KindEditor.plugin('images', function(K) {
    var editor = this, name = 'images';
    // 点击图标时执行
    editor.clickToolbar(name, function() {
        $.openAlbum(window.uploadUrl,'editor',editor.srcElement.attr('name'));
    });
});