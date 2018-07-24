$(function(){
    var getParams = getArgs();
    var shop = getParams.shop;
    var originalHref = $('#doc-header a').attr('href');
    $('#doc-header a').attr('href', originalHref + '?shop=' + shop);
    var storage = window.localStorage;
    var cookieId = storage.id_shopCookie;
    var cookieToken = storage.token_shopCookie;
    var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true,
        },
        pagination: {
            el: '.swiper-pagination',
        },
    });
    toastr.options = {
        "newestOnTop": false,
        "timeOut": 1500,
        "extendedTimeOut": 0,
        "escapeHtml": true,
        "positionClass": "toast-bottom-center"
    };
    $(".shop-classify").click(function(e){
        e.stopPropagation();
        $('.classify-content').stop(true).animate({width:'6rem'},100,function(){
            $('html,body').addClass('overflowHiden');
            $('#mask-body').removeClass('hidden');
        });
    });
    toggleLoading(true);
    var docBody = $('#doc-body');
    var managePanel = $('#manage-panel');
    var domain = 'http://localhost:1300/api';
    //店铺介绍
    ajaxRequest(domain+'/shop/intro/'+shop, {}, 'get', function(data) {
        toggleLoading(false);
        var info = data.data;
        $('title').text(info.shopname);
        $('.navbar-title').text(info.shopname);
        docBody.find('.swiper-container .cover-images').attr("src",info.shoplogo);
        managePanel.find('.main-pic').css("background-image","url("+info.managerhead+")").css("background-size","100% 100%");
        managePanel.find('.collect').text(info.like);
        managePanel.find('.stores-description').text(info.shopdescription);
        managePanel.find('.hotel-panel-special').html(info.note.content);
        managePanel.find('.stores-panel-address').html(info.shopaddress);
        managePanel.find('.stores-panel-mobile').html(info.managermobile);
        managePanel.find('.stores-panel-wechat').html(info.managerwechat);
        managePanel.find('.hotel-panel-contact').html(info.managername);
        managePanel.find('.background-cover').attr("src",info.note.cover);
        if(parseFloat(info.charity)>0){
            /*义卖金额大于0就显示出来*/
            managePanel.find('.rummageSale-box').removeClass('hidden');
            managePanel.find('.rummageSale').text(info.charity);
        }
        var LabelHTML = '';
        $.each(info.label, function(key, value) {
            var templateLabelHTML = $($('#templateLabel').clone().html());
            templateLabelHTML.html(value);
            LabelHTML += templateLabelHTML.prop('outerHTML');
        });
        managePanel.find('.sign-content').html(LabelHTML);
        $('#doc-foot .shop-contact').attr('href', 'tel:' + info.managermobile);
        $('.swiper-container').on('click','.cover-images',function(e){
            e.stopPropagation();
        });
    }, function(error) {
        toggleLoading(false);
    });
    /*展开店铺信息*/
    docBody.on('click', '.stores-more-info-trigger', function(e) {
        e.preventDefault();//preventDefault() 方法阻止元素发生默认的行为（例如，当点击提交按钮时阻止对表单的提交）。
        var trigger = $(this);
        if (trigger.hasClass('revert')) {
            $('#manage-panel .stores-more-info').addClass('hidden');
        } else {
            $('#manage-panel .stores-more-info').removeClass('hidden');
        }
        trigger.toggleClass('revert');//revert用于控制旋转。
        // 该方法检查每个元素中指定的类。如果不存在则添加类，如果已设置则删除之。这就是所谓的切换效果。
    });
    var getGoodsRequest = function(){
        var params = {};
        params.id = cookieId;
        params.token = cookieToken;
        ajaxRequest(domain+'/goods/show/'+shop, {}, 'get', function(data) {
            toggleLoading(false);
            var info = data.data;
            $.each(info.label, function(key, value) {
                var templateLabelHTML = $($('#templateLabel').clone().html());
                templateLabelHTML.html(value);
                LabelHTML += templateLabelHTML.prop('outerHTML');
            });
            managePanel.find('.sign-content').html(LabelHTML);
            $('#doc-foot .shop-contact').attr('href', 'tel:' + info.managermobile);
            $('.swiper-container').on('click','.cover-images',function(e){
                e.stopPropagation();
            });
        }, function(error) {
            toggleLoading(false);
        });
    }

})