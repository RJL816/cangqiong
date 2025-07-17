var ff = document.createElement('script');
ff.setAttribute('src','./public/thirdjs/jquery.min.js');
document.head.appendChild(ff);
setTimeout(function(){
  $("body").on('focus','#qty input[type="number"]',function(){
    $(this).select();
  });
  $("body").on('focus','#auxqty input[type="number"]',function(){
    $(this).select();
  });
},1000);