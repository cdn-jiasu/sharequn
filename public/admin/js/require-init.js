require.config({
    waitSeconds: 0,
    baseUrl:'/public/',
    paths:{
        'adminlte'      :['admin/js/adminlte.min'],
        'demo'          :['admin/js/demo'],
        
        //资源包
        'jquery'            :['libs/jquery/dist/jquery.min'],
        'cookie'            :['libs/jquery/jquery.cookie'],
        'jquery-ui'         :['libs/jquery-ui/jquery-ui.min'],
        'bootstrap'         :['libs/bootstrap/dist/js/bootstrap.min'],
        'moment'            :['libs/moment/min/moment.min'],
        'daterangepicker'   :['libs/bootstrap-daterangepicker/daterangepicker'],
        'datepicker'        :['libs/bootstrap-datepicker/dist/js/bootstrap-datepicker.min'],
        'slimscroll'        :['libs/jquery-slimscroll/jquery.slimscroll.min'],
        'fastclick'         :['libs/fastclick/lib/fastclick'],
        'validator-core'    :['libs/nice-validator/dist/jquery.validator'],
        'validator_lang'    :['libs/nice-validator/dist/local/zh-CN'],
        
        //插件包
        'wysihtml5'         :['plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min']
    }
    // shim依赖配置
})
require(['jquery'],function($, undefined){
    $("[type='submit']").removeAttr('disabled');
    alert(456)
})