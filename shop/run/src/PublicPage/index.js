$(function(){
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
    $(".shop-classify").click(function(e){
        e.stopPropagation();
        $('.classify-content').stop(true).animate({width:'6rem'},100,function(){
            $('html,body').addClass('overflowHiden');
            $('#mask-body').removeClass('hidden');
        });
    });

})