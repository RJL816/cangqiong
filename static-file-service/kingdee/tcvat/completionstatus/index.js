/**
 *  自定义控件书写模板
 */
(function(KDApi, $){
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function Mycomponent (model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    Mycomponent.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            // TO DO
			//console.log("----init",this.model,props);
            initFunc(this.model, props)
        },
        update: function(props){
            // TO DO
        },
        destoryed: function(){
            // TO DO
        }
    }

    var initFunc = function(model, props) {
        // KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数
        KDApi.loadFile('./js/completion.js', model, function() {
            // 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
            KDApi.templateFilePath('./html/completion.html', model, {
                //text: ''
            }).then(function(result) {
                model.dom.innerHTML = result
				//console.log(result);
				
				var animationData = {"v":"4.6.2","fr":60,"ip":0,"op":61,"w":136,"h":136,"nm":KDApi.getLangMsg(model,'completestatedeep'),"ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":KDApi.getLangMsg(model,'shapelayer''),"parent":2,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":5,"s":[-2.75,-0.86,0],"e":[-2.75,0.14,0],"to":[0,0.16666667163372,0],"ti":[0,-0.16666667163372,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":15,"s":[-2.75,0.14,0],"e":[-2.75,0.14,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":20,"s":[-2.75,0.14,0],"e":[-2.75,-1.86,0],"to":[0,-0.33333334326744,0],"ti":[0,0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":30,"s":[-2.75,-1.86,0],"e":[-2.75,0.14,0],"to":[0,0,0],"ti":[0,-0.33333334326744,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":40,"s":[-2.75,0.14,0],"e":[-2.75,0.14,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":45,"s":[-2.75,0.14,0],"e":[-2.75,-0.86,0],"to":[0,-0.16666667163372,0],"ti":[0,0.16666667163372,0]},{"t":50}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[8,8]},"p":{"a":0,"k":[0,0]},"nm":KDApi.getLangMsg(model,'ellipticalpath'),"mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":KDApi.getLangMsg(model,'fill'),"mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[22,0.985],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":KDApi.getLangMsg(model,'changel')}],"nm":"KDApi.getLangMsg(model,'ellipse') 4","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[8,8]},"p":{"a":0,"k":[0,0]},"nm":KDApi.getLangMsg(model,'ellipticalpath'),"mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":KDApi.getLangMsg(model,'fill'),"mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[9,0.985],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":KDApi.getLangMsg(model,'changel')}],"nm":"KDApi.getLangMsg(model,'ellipse') 3","np":3,"cix":2,"ix":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[8,8]},"p":{"a":0,"k":[0,0]},"nm":KDApi.getLangMsg(model,'ellipticalpath'),"mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":KDApi.getLangMsg(model,'fill'),"mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-4,0.985],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":KDApi.getLangMsg(model,'changel')}],"nm":"KDApi.getLangMsg(model,'ellipse') 2","np":3,"cix":2,"ix":3,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[8,8]},"p":{"a":0,"k":[0,0]},"nm":KDApi.getLangMsg(model,'ellipticalpath'),"mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":KDApi.getLangMsg(model,'fill'),"mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-17,0.985],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":KDApi.getLangMsg(model,'changel')}],"nm":"KDApi.getLangMsg(model,'ellipse') 1","np":3,"cix":2,"ix":4,"mn":"ADBE Vector Group"}],"ip":-8,"op":2667.66766766767,"st":12,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":KDApi.getLangMsg(model,'shapelayer2'),"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"n":"0p667_1_0p333_0","t":0,"s":[67.75,66.25,0],"e":[67.75,70.25,0],"to":[0,0.66666668653488,0],"ti":[0,-0.66666668653488,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0.333},"n":"0p833_0p833_0p333_0p333","t":10,"s":[67.75,70.25,0],"e":[67.75,70.25,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":15,"s":[67.75,70.25,0],"e":[67.75,63.25,0],"to":[0,-1.16666662693024,0],"ti":[0,-0.16666667163372,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":25,"s":[67.75,63.25,0],"e":[67.75,71.25,0],"to":[0,0.16666667163372,0],"ti":[0,-1.33333337306976,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":35,"s":[67.75,71.25,0],"e":[67.75,71.25,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":40,"s":[67.75,71.25,0],"e":[67.75,66.25,0],"to":[0,-0.83333331346512,0],"ti":[0,0.83333331346512,0]},{"t":45}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[64,18]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":20},"nm":KDApi.getLangMsg(model,'rectangularpath'),"mn":"ADBE Vector Shape - Rect"},{"ty":"fl","c":{"a":0,"k":[0.1372549,0.1372549,0.372549,1]},"o":{"a":0,"k":100},"r":1,"nm":KDApi.getLangMsg(model,'fill'),"mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":KDApi.getLangMsg(model,'changel')}],"nm":KDApi.getLangMsg(model,'rectangle'),"np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group"}],"ip":0,"op":2723.71771771772,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[67.75,66.25,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[80,80]},"p":{"a":0,"k":[0,0]},"nm":KDApi.getLangMsg(model,'ellipticalpath'),"mn":"ADBE Vector Shape - Ellipse"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":KDApi.getLangMsg(model,'changel')}],"nm":"KDApi.getLangMsg(model,'ellipse') 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group"},{"ty":"gf","o":{"a":0,"k":100},"r":2,"g":{"p":7,"k":{"a":0,"k":[0,0.992,0.992,1,0.255,0.98,0.976,1,0.64,0.969,0.961,1,0.841,0.892,0.914,1,0.911,0.816,0.867,1,0.973,0.861,0.896,1,1,0.906,0.925,1]}},"s":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":0,"s":[0,-5],"e":[0,-5],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":10,"s":[0,-5],"e":[0,-5],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":15,"s":[0,-5],"e":[0,-5],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":25,"s":[0,-5],"e":[0,-5],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":35,"s":[0,-5],"e":[0,-5],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":40,"s":[0,-5],"e":[0,-5],"to":[0,0],"ti":[0,0]},{"t":45}]},"e":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":0,"s":[30,27],"e":[34,27],"to":[0.66666668653488,0],"ti":[-0.66666668653488,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":10,"s":[34,27],"e":[34,27],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":15,"s":[34,27],"e":[30,27],"to":[-0.66666668653488,0],"ti":[0.16666667163372,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":25,"s":[30,27],"e":[33,27],"to":[-0.16666667163372,0],"ti":[-0.5,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":35,"s":[33,27],"e":[33,27],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":40,"s":[33,27],"e":[30,27],"to":[-0.5,0],"ti":[0.5,0]},{"t":45}]},"t":2,"h":{"a":0,"k":0},"a":{"a":0,"k":0},"nm":"Gradient Fill1","mn":"ADBE Vector Graphic - G-Fill"}],"ip":0,"op":91,"st":0,"bm":0,"sr":1}]};
				var params = {
					container: document.getElementById('bodymovin'),
					renderer: 'svg',
					loop: true,
					autoplay: true,
					animationData: animationData
				};

				var anim;

				anim = bodymovin.loadAnimation(params);
            })
        })
    }

    // KDApi注册一个id号，这个id号要和控件方案的id号对应
KDApi.register('completionstatus', MyComponent, {
  isMulLang: true
})
})(window.KDApi, jQuery) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4