$(function(){
    var getParams = getArgs();
    var shop = getParams.shop;
    var login = getParams.login;
    console.log(shop);
    console.log(login);
    var originalhref = $('#header a').attr('href','/shop/PublicPage/center.html'+'?shop='+shop);
    console.log(originalhref);


});