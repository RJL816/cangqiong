define([
	"jquery",
    "js/Module.js"], function($,Module) {
	return {
		whichModule: function(obj,temp, curNode, parentsType=[]) {
			var _self = this,x;
			try{
				x = new Module.renderWidget(obj,temp, curNode, parentsType).get(0);
			}catch(e){
				x = "";
			}
			return x;
		}
	}
});