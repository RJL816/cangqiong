;window.IDS_Utils=(function(){
    ooS=Object.prototype.toString;
    return {
        $$createElement:function(label){
            return document.createElement(label);
        },
        $$createDocFragment:function(){
            return document.createDocumentFragment();
        },
        getTypeOfData:function(data){
            return ooS.apply(data);
        },
        isObject:function(obj){
            
        },
        extend:function(target){
            let sources=[].slice.call(arguments,1)
            sources.forEach(source=>{
                for(let key in source){
                    target[key]=source[key];
                }
            })
            return target;
        },
        getMaxFromArr: function (arr) {
            return Math.max.apply(null, arr);
        },
        bindEvent:function(target,eventName,fn){
            target.addEventListener(eventName,fn,false);
        },
        unBindEvent:function(target,eventName,fn){
            target.removeEventListener(eventName,fn,false);
        },
        //节流函数
        throttle:function(fn,delay){
            var _this=this;
            return function(){
                console.log("arguments is ",arguments);
                var args=[].slice.apply(arguments);
                console.log("throttle args is ",args);
                clearTimeout(fn.timeID);

                fn.timeID=setTimeout(function(){
                    fn.apply(_this,args)
                },delay)

            }
        }

    }  
})();