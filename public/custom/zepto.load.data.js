;(function($){
    var defaults = {
        data_name:'data_list',
        is_cache:true,
        range:0,//距离底部多高开始加载,
        load_type:'scroll',
        obj : null
    };
    var obj;
    var load_lock = false;
    var load_finish = false;
    var load_page = 1;
    $.fn.extend({
        InitLoad:function(opts){
            var pageNum = sessionStorage.getItem('page_num');
            var srollPosNow = sessionStorage.getItem('srollPosNow');
            //$(document).scrollTop(srollPosNow);
            if(opts.is_cache && pageNum && srollPosNow){
                for(i=1;i<=pageNum;i++){
                    var cache_data = sessionStorage.getItem(opts.data_name+i);
                    cache_data = eval('(' + cache_data + ')');
                    $.fn.HandleData(cache_data,opts)
                    $(document).scrollTop(srollPosNow);
                }
            }else{
                $.fn.GetData(opts);
                var srollPos = $(window).scrollTop();
                totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
                if($(document).height() - opts.range <= totalheight){
                    $.fn.InitLoad(opts);
                }
            }
        },
        RollingLoad:function(options){
            var opts = $.extend(defaults, options);
            obj = $(this)
            $.fn.InitLoad(opts);
            $(window).scroll(function (){
                //var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
                var srollPos = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                var totalheight = 0;
                //console.log("滚动条到顶部的垂直高度: "+$(document).scrollTop());
                //console.log("页面的文档高度 ："+$(document).height());
                //console.log('浏览器的高度：'+$(window).height());
                totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
                if (($(document).height() - opts.range) <= totalheight) {
                    $.fn.GetData(opts);
                }
                if(opts.is_cache){
                    sessionStorage.setItem('srollPosNow',srollPos);
                }
            });
            
        },
        //获取数据
        GetData:function(opts){
            if(obj.length > 1){
                console.log('length error');
                return false;
            }
            var url = obj.attr('data-url') + "?Page=" + load_page;
            var data='';
            if (load_lock ||  load_finish) {
                return false;
            }
            
            if(opts.is_cache){
                sessionStorage.setItem('page_num',load_page);
            }
            //layer_loading_msg('加载中...');
            load_lock = true;
            $.ajax({
                async:false,
                url: url,
                dataType: 'json', type: 'GET',
                success:function(data){
                    //layer_close_all();
                    var page_num = load_page
                    $.fn.HandleData(data,opts);
                    if(opts.is_cache){
                        data = JSON.stringify(data)
                        sessionStorage.setItem(opts.data_name + page_num,data);
                    }
                    
                }
            })
        },
        //处理返回数据
        HandleData:function(data,opts){
            var tpl = obj.attr('data-tpl');
            if (data[opts.data_name]) {
                /*$('#' + tpl).tmpl(data[opts.data_name]).appendTo(obj.selector);
                if (data.next_page == false) {
                    load_finish = true;
                }*/
                if (data.article_list) {
                    obj.append(template(tpl,data));
                    if (data.next_page == false){
                        load_finish = true;
                        return;
                    }
                }
                load_page ++ ;
                load_lock = false;
            }
        }

    })
})(zepto);

