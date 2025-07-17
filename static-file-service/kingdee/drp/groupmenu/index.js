(function (KDApi) {
  function MyComponent(model) {
    this._setModel(model);
  }
  var propsData
  var pageId
  var curId
  var formId
  var curModel
  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model;
      pageId = model.pageId
      curId = model.key
      curModel = model
    },
    init: function (props) {
	  console.log(props)
      // this.model.invoke("getPointData", "");
    },
    update: function (props) {
      if(props&&props.data){
        propsData = props.data
        setHtml(this.model, props); //设置html
      }
    },
    destoryed: function () {},
  };
  var setHtml = function (model, props) {
    KDApi.loadFile("./assets/js/u-jquery-3.6.0.min.js", model, () => {
	    KDApi.loadFile("./css/avatar.css", model, () => {
        KDApi.templateFilePath("./html/avatar.html", model, {
          path: KDApi.nameSpace(model) + "./img/time.png",
        }).then((result) => {
          $('body').append(result)
          $('.cutom-menu-list').find('ul').attr('pageid',model.pageId)
          if(props.configItems && props.configItems.length>0){
            props.configItems.forEach((cc,kk)=>{
              if(cc.key === 'title'){
                $(model.dom).text(props.configItems[kk]['value'])
              }
              if(cc.key === 'width'){
                $(`.cutom-menu-list`).width(props.configItems[kk]['value'])
              }
              if(cc.key === 'height'){
                $(`.cutom-menu-list`).height(props.configItems[kk]['value'])
              }
              if(cc.key === 'formid'){
                formId = props.configItems[kk]['value']
              }
            })
          }
          let pos = model.dom.parentElement.getBoundingClientRect()
          $('.cutom-menu-list')[0].style.cssText +=`;top:${pos.top + 32}px;left:${pos.left}px;`
		      if(props && props.data && props.data.length>0){
		        let ul_1 = getLevelItem(props.data,'level1')
            $(`#levellist[pageid="${model.pageId}"]`).html(ul_1.html())
            if(props.data[0] && props.data[0].children){
              let ul_2 = getLevelItem(props.data[0].children,'level2')
              $(`#levelWrapper[pageid="${model.pageId}"]`).html(ul_2.html())
            }
          }
          initEvents()
        })
      })
	  })
  };
  var getLevelItem = function(arr,flag){
    let n_ul = $('<ul>')
    arr.forEach((d,i)=>{
	    let n_li = $('<li>');
	    let n_span = $('<span>');
	    n_span.text(d.text)
	    n_span.attr('type',flag);
      n_li.append(n_span);
      n_li.attr('key',i);
	    if(flag === 'level2' && d.children){
	      let n_i = $('<i>');
		    n_i.attr('class','el-icon el-icon-arrow-right');
        n_li.append(n_i)
        let ul_3 = getLevelItem(d.children,'level3')
        ul_3.addClass('level3')
        n_li.append(ul_3)
      }
      n_li.attr('data',JSON.stringify({id:d.id,parentid:d.parentid,text:d.text,isParent:d.leaf}))
	    n_ul.append(n_li)
	  })
	  return n_ul
  }
  var initEvents = function(){
    $('body').on('click mouseover',`.cutom-menu-list .level1[pageid="${pageId}"] li`,function(){
      let index = $(this).attr('key')
      let cur_item = propsData[Number(index)]
      let wrapper = $(`#levelWrapper[pageid="${pageId}"]`)
      wrapper.empty()
      if(cur_item && cur_item.children){
        let ul_2 = getLevelItem(cur_item.children,'level2')
        wrapper.html(ul_2.html())
      }
    })
    $('body').on('click',`.cutom-menu-list ul li`,function(e){
      e.stopPropagation()
      let curdata = JSON.parse($(this).attr('data'))
      if(curdata){
        curModel.invoke("treeNodeClick", {formId,value:curdata.id});
      }
    })
    $('body').on('mouseover',function(e){
      if($(e.target).parents('.cutom-menu-list').length > 0 || $(e.target).parents(`#${curModel.dom.parentElement.id}`).length > 0 || e.target.id === curModel.dom.parentElement.id){
        if(!$('.cutom-menu-list').hasClass('show')){
          $('.cutom-menu-list').addClass('show')
        }
      }else{
        if($('.cutom-menu-list').hasClass('show')){
          $('.cutom-menu-list').removeClass('show')
        }
      }
    })
  }
  KDApi.register("groupmenu", MyComponent);
})(window.KDApi);
