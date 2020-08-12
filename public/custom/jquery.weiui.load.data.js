;(function($){
    var defaults = {
        url:location.href,
        dataName:'data_list',
        tplName:'#list_tpl',
        listName:'#list_box',
        isCache:false,
        cacheName:location.href,
        range:0//距离底部多高开始加载,
    };
    var obj;
    var loading = false;
    var pageNum = 1;
    var isPage = true;
    $.fn.extend({
        initLoad:function(opts){
            
            var pageNum = sessionStorage.getItem('pageNum');
            var srollPosNow = sessionStorage.getItem('srollPosNow');
            if(opts.isCache && pageNum && srollPosNow != null){
                for(i=1;i<=pageNum;i++){
                    var cacheData = sessionStorage.getItem(opts.url+i);
                    if(cacheData){
                        cacheData = eval('(' + cacheData + ')');
                        $.fn.handleData(cacheData,opts)
                    }else{
                        $.fn.getData(opts);
                    }
                }
                obj.scrollTop(srollPosNow);
            }else{
                
                $.fn.getData(opts);
            }
            
        },
        
        loadData:function(options){
            var opts = $.extend(defaults, options);
            obj = $(this)
            $.fn.initLoad(opts);
            obj.scroll(function (){
                if(opts.isCache) {
                    sessionStorage.setItem('srollPosNow', obj.scrollTop());
                }
            })
            obj.infinite(opts.range).on("infinite", function() {
                $.fn.getData(opts);
            });
        },
        //获取数据
        getData:function(opts){
            if(loading || isPage == false) return;
            loading = true;
            if(opts.isCache){
                sessionStorage.setItem('pageNum',pageNum);
            }
            $.ajax({
                url:opts.url,
                async:true,
                data:{'Page':pageNum},
                dataType: 'json', type: 'GET',
                success:function(data){
                    if(opts.isCache){
                        var cache_data = JSON.stringify(data)
                        sessionStorage.setItem(opts.url + pageNum,cache_data);
                    }
                    $.fn.handleData(data,opts);
                },
                error:function(){
                    loading = false;
                }
            })
        },
        //处理返回数据
        handleData:function(data,opts){
            if (data[opts.dataName] != '') {
                laytpl($(opts.tplName).html()).render(data, function(html){
                    $(opts.listName).append(html);
                });
            }else{
                $('.weui-infinite-scroll').html('没有更多数据了');
                throw ('data is null');
            }
           
            pageNum+= 1;
            loading = false;
            if(data.is_page == 0){
                $('.weui-infinite-scroll').html('没有更多数据了');
                isPage = false;
            }else{
                isPage = true;
            }
        },
        reloadData:function(options){
            var opts = $.extend(defaults, options);
            obj = $(this);
            $.ajax({
                url:opts.url,
                async:true,
                data:{'Page':pageNum},
                dataType: 'json', type: 'GET',
                success:function(data){
                    if(opts.isCache){
                        var cache_data = JSON.stringify(data)
                        sessionStorage.setItem(opts.url + pageNum,cache_data);
                    }
                    $.fn.handleData(data,opts);
                },
                error:function(){
                    loading = false;
                }
            })
        }
        
    })
})(jQuery);

