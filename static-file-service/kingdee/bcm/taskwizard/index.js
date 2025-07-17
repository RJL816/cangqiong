(function (KDApi, $) {
  // 构造函数
  function MyComponent (model) {
    this._setModel(model)
  }

  MyComponent.prototype = {
    // 绑定model
    _setModel: function (model) {
      this.model = model
    },
    // 生命周期：初始化
    init: function (props) {
      setHtml(this.model, props)
    },
	// 生命周期：更新
    update: function (props) {
		updateHtml(this.model, props)
    },
    // 生命周期：销毁
    destoryed: function () {
    }

  }
  
  //初始化
  var setHtml = function (model, props) {
	//updateHtml(model, props)

  }

  //v1.0
  //修改向导控件步骤样式
  var updateHtml = function (model, props) {
	var currentStep = props.data.currentStep;
	var currentStatus = props.data.currentStatus
	var stepSize = props.data.stepSize;
	//只适用向导类型:页签向导
	var wizard = document.getElementById(props.data.wizardId);
	if (null == wizard) {
		return;
	}
	var wizardapSteps = wizard.getElementsByClassName('MSpB_DNG')
	wizardapSteps.forEach(function(title,index,arr){
		var info = title.parentElement.getElementsByClassName("_2_OFjX7N")[0];
		// 步骤-完成，修改为“绿色”
		if (index < currentStep) {
			title.style.borderColor='#18BC71';
			title.style.color='#18BC71';
			info.style.color='#18BC71';
		}
		// 步骤-当前，修改为选中样式
		if (index == currentStep) {
			if ('finish' == currentStatus) {
				// 完成
				title.style.borderColor='#18BC71';
				title.style.color='#18BC71';
				info.style.color='#18BC71';
			} else {
				// 进行中
				title.style.borderColor='#5582F3';
				title.style.color='#5582F3';
				info.style.removeProperty("color");
			}
		}
		// 步骤-未开始，修改为初始颜色
		if (index > currentStep) {
			title.style.borderColor='#e4e6ea';
			title.style.removeProperty("color");
			info.style.removeProperty("color");
		}
		
	})
	
	//去掉卡片的hover样式
	var card = document.getElementById('usertaskinfocard');
	if (null == card) {
		return;
	}
	var cards = card.parentElement.childNodes;
	cards.forEach(function(title,index,arr){
		title.classList.remove('QURGpD1V');
	})
    
  }

  // 注册自定义控件
  KDApi.register('taskwizard', MyComponent)
})(window.KDApi, jQuery)
