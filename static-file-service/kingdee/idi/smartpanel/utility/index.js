;(function(window){
     function Smart_Utils(){

     }
     Smart_Utils.prototype={
         constructor:Smart_Utils,
         getRelative:function(){
             console.log('getRelative')
         },
     }
     if(typeof module!='undefined' && module.exports){
         module.Smart_Utils=new Smart_Utils();
     }else if(typeof define!='undefined' && define.amd){
         define(function(){return new Smart_Utils()})
     }else {
         window.Smart_Utils=new Smart_Utils();
     }
})(window);