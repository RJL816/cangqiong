var ff = document.createElement('script');
ff.setAttribute('src','./public/thirdjs/jquery.min.js');
document.head.appendChild(ff);
setTimeout(function(){
  $("body").on('focus','#select_qty_flex input[type="number"]',function(){
    $(this).select();
  });
  $("body").on('click','#select_qty_flex #add',function(){
    var cn = 0;
	if($(this).siblings('div').find('input[type="number"]').length>0){
	   cn = $(this).siblings('div').find('input[type="number"]').val();
	}else if($(this).siblings('div').find('div>div>div').length>0){
	   cn = $(this).siblings('div').find('div>div>div').text();
	}
	cn = cn || 0;
	cn = (cn+'').replace(/,/g,'');
	cn = Number(cn);
	var fn = cn + 1;
	if($(this).siblings('div').find('input[type="number"]').length>0){
	   $(this).siblings('div').find('input[type="number"]').val(fn);
	}else if($(this).siblings('div').find('div>div>div').length>0){
	   var fnarr = (fn+'').split('').reverse();
	   var nfn = [];
	   for(var i = 0;i<fnarr.length;i++){
	    if(i>0 && (i%3 === 0)){
	      nfn.push(',')
	    }
	    nfn.push(fnarr[i]);
	   }
	   fn = nfn.reverse().join('');
	   $(this).siblings('div').find('div>div>div').text(fn);
	}
  });
  $("body").on('click','#select_qty_flex #reduce',function(){
    var cn = 0;
	if($(this).siblings('div').find('input[type="number"]').length>0){
	   cn = $(this).siblings('div').find('input[type="number"]').val();
	}else if($(this).siblings('div').find('div>div>div').length>0){
	   cn = $(this).siblings('div').find('div>div>div').text();
	}
	cn = cn || 0;
	cn = (cn+'').replace(/,/g,'');
	cn = Number(cn);
	var fn = cn - 1;
    if($(this).siblings('div').find('input[type="number"]').length>0){
	   $(this).siblings('div').find('input[type="number"]').val(fn);
	}else if($(this).siblings('div').find('div>div>div').length>0){
	   var fnarr = (fn+'').split('').reverse();
	   var nfn = [];
	   for(var i = 0;i<fnarr.length;i++){
	     if(i>0 && (i%3 === 0)){
	       nfn.push(',')
	     }
	     nfn.push(fnarr[i]);
	   }
	   fn = nfn.reverse().join('');
	   $(this).siblings('div').find('div>div>div').text(fn);
	}
  });
},1000);