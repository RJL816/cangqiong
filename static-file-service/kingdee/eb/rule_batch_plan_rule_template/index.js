(function (KDApi, $) {
  //使用Map并根据页面ID区分多页签
  var componentMap = window.componentMap;
  if (!componentMap) {
    componentMap = new Map();
    window.componentMap = componentMap;
  }
  //获取VUE实例唯一标识
  function getElString(model) {
    return model.key + "_" + model.pageId;
  }
  //构造函数
  function MyComponent(model) {
    this._setModel(model)
  }
  MyComponent.prototype = {
    //绑定model
    _setModel: function (model) {
      this.model = model
    },
    //生命周期：初始化
    init: function (props) {
      var elString = getElString(this.model);
      //根据页面ID获取对象
      var componentPojo = componentMap.get(elString);
      if (!componentPojo) {
        componentPojo = {};
        //这里特意在页面ID前面拼接上"vue"字符串,一是防止页面ID重复,而是防止页面ID由数字开头,防止vue对应elString出现问题
        componentPojo.elString = elString;
        //放到Map中
        componentMap.set(elString, componentPojo);
      }
      setHtml(this.model, props);
    },
    //生命周期：更新
    update: function (props) {
      var componentPojo = componentMap.get(getElString(this.model));
      if (!componentPojo) {
        return;
      }
      if (componentPojo.inited) {
        updateHtml(this.model, props);
      } else {
        //页面加载的时候第一次不用执行
        componentPojo.inited = true;
      }
    },
    //生命周期：销毁
    destoryed: function () {
      var elString = getElString(this.model);
      //根据页面ID获取对象
      var componentPojo = componentMap.get(elString);
      if (componentPojo && componentPojo.vm && componentPojo.vm.$destroy) {
        //调用vue的$destroy,销毁该vue实例的各种监听等
        componentPojo.vm.$destroy();
        //从Map中移除该页面ID对应的元素
        componentMap.delete(elString);
      }
    }
  }

  //按顺序加载CSS
  function loadFile(model, cssPathStringArray, currentIndexInt) {
    if (!cssPathStringArray || cssPathStringArray.length === 0) {
      return;
    }
    var cssPathStringArrayLength = cssPathStringArray.length;
    if (currentIndexInt >= cssPathStringArrayLength) {
      return;
    }
    var cssPathString = cssPathStringArray[currentIndexInt];
    //获取命名空间
    if ($('link[href="' + KDApi.getNameSpace(model) + cssPathString + '"]').length === 0) {
      //加载css文件
      KDApi.loadFile(cssPathString, model, function () {
        loadFile(model, cssPathStringArray, currentIndexInt + 1);
      })
    } else {
      loadFile(model, cssPathStringArray, currentIndexInt + 1);
    }
  }

  //载入css文件,通用型最强的放最后
  function loadCssFile(model, cssPathStringArray) {
    loadFile(model, cssPathStringArray, 0);
  }

  //初始化页面,该方法只会执行一次
  var setHtml = function (model, props) {
    //获取命名空间
    var namespaceString = KDApi.getNameSpace(model);
    var cssPathStringArray = [];
    //加载element_ui.css样式
    cssPathStringArray.push('lib/prod/element_ui/2.15.5/index.css');
    //加载vue_template.css样式
    cssPathStringArray.push('css/vue_template.css');
    //加载通用的CSS样式(作为对tailwindcss的补充)
    cssPathStringArray.push('lib/dev/common/1.0.0/common.css');
    //加载tailwind的css样式
    //var tailwindCssPathString = 'lib/dev/tailwindcss/2.2.8/tailwind.css';
    //只加载使用到的tailwind的css样式,解决CSS样式与平台冲突,减少依赖文件大小,提升响应速度
    cssPathStringArray.push('css/used_tailwind.css');
    loadCssFile(model, cssPathStringArray);
    //下面为了确保后面的变量能够取到前面的变量,进行同步处理,以后有时间再改为异步,只需要在执行后面的逻辑前通过一个小循环判断前面的变量们是否存在,不存在则轮询
    //通用的工具类
    var commonUtilsJsPathString = 'lib/dev/common/1.0.0/common_utils.js';
    KDApi.loadFile(commonUtilsJsPathString, model, function () {
      console.log("success to load file: " + commonUtilsJsPathString);
      //加载Vue.js
      var veuJsPathString = 'lib/dev/vue/2.6.14/vue.js';
      KDApi.loadFile(veuJsPathString, model, function () {
        console.log("success to load file: " + veuJsPathString);
        //加载element_ui.js
        var elementUiJsPathString = 'lib/prod/element_ui/2.15.5/index.js';
        KDApi.loadFile(elementUiJsPathString, model, function () {
          console.log("success to load file: " + elementUiJsPathString);
          //VUE模板
          var vueTemplateUrlString = namespaceString + "vue_template.html?version=" + new Date().getTime();
          $.get(vueTemplateUrlString, {}, function (vueTemplateString) {
            console.log("success to load file: " + vueTemplateUrlString);
            //注意:由于允许同时存在多个页签,为了避免相互影响,这里使用唯一的ID
            model.dom.innerHTML = '<div id="' + getElString(model) + '">' + vueTemplateString + '</div>';
            //如果props不存在或props.modelPojo不存在,则获取模拟数据
            if (!props || !props.data || !props.data.endToFrontObject || !(props.data.endToFrontObject.constructor === Object) || Object.keys(props.data.endToFrontObject).length === 0) {
              //获取模拟json数据
              var mockJsonUrlString = namespaceString + "mock/mock.json?version=" + new Date().getTime();
              $.get(mockJsonUrlString, {}, function (mockJsonString) {
                if (!props) {
                  props = {};
                }
                props.data.endToFrontObject = JSON.parse(mockJsonString);
                //获取json数据的方法是异步的,因此在回调里初始化VUE,否则初始化VUE时可能获取不到模拟json数据
                //将VUE实例存储到model中,以便在update时可以获取到VUE实例
                initVue(model, props);
              });
            } else {
              //将VUE实例存储到model中,以便在update时可以获取到VUE实例
              initVue(model, props);
            }
          })
        })
      })
    })
  }
  //初始化VUE
  var initVue = function (model, props) {
    //字符串静态常量
    var StringConstant = {
      //类型
      "type": "type",
      //字符类型,如:123,+,-,*
      "text": "text",
      //member类型,如:"公司一"
      "member": "member",
      //逻辑符号
      "logic": "logic",
      //其他函数,如:"@Round(,)"
      "other": "other",
      //光标所在位置的标识
      "rangeTypeString": "rangeTypeString",
      //UUID的Attribute的key
      "uuidstring": "uuidstring",
      //函数
      "function": "function",
      //不可分割的
      "indivisible": "indivisible",
      //前后端交互模型
      "modelPojo": "modelPojo",
      //行对象
      "ruleManageRowPojo": "ruleManageRowPojo",
      //事件
      "event": "event",
      //下一个节点的UUID
      "nextNodeUuidString": "nextNodeUuidString",
      //版本号
      "versionString": "versionString",
      //模糊匹配对象
      "fuzzyMatchingMemberPojo": "fuzzyMatchingMemberPojo",
      //鼠标移动到匹配的项上方时,设置其背景色
      "selectedBoolean": "selectedBoolean",
      //输入法状态
      "compositionStatusString": "compositionStatusString",
      //按键编码
      "keyCode": "keyCode",
      //自定义属性弹框
      "ruleRangMemberPojo": "ruleRangMemberPojo",
      //自定义属性弹框CSS样式
      "ruleRangMemberPojoStylePojo": "ruleRangMemberPojoStylePojo",
      //自定义属性弹框的方法
      "ruleRangMemberPojoMethodNameString": "ruleRangMemberPojoMethodNameString",
      //规则所属维度
      "selectDimensionNumberString": "selectDimensionNumberString",
      //date
      "date": "date",
      //SPAN
      "SPAN": "SPAN",
      //key
      "key": "key"
    };
    //如果props不为空且props.data不为空,则设置为props.data,否则设置为null
    var modelPojo = (props && props.data && props.data.endToFrontObject) ? props.data.endToFrontObject : null;
    var ruleManageRowPojoList = modelPojo.ruleManageRowPojoList;
    if (ruleManageRowPojoList && ruleManageRowPojoList.length > 0) {
      for (var ruleManageRowPojo of ruleManageRowPojoList) {
        ruleManageRowPojo.formulaDivKeyString = CommonUtils.getUuidString();
      }
    }
    //关闭日志(通过CommonUtils打印的日志)
    CommonUtils.enableLogBoolean = false;
    CommonUtils.log(StringConstant.modelPojo, modelPojo);
    var vm = new Vue({
      el: '#' + getElString(model),
      data: {
        model: model,
        //字符串静态常量
        StringConstant: StringConstant,
        //工具类
        CommonUtils: CommonUtils,
        //规则表达式对象,前端基于这个对象进行页面的渲染
        modelPojo: modelPojo,
        //当前点击了"公式项"打开"成员范围"的"公式项"的UUID
        showMemberUuidString: null,
        //当前点击了"公式项"打开"成员范围"时的行ID
        showMemberRuleManageRowPojoIdString: null,
        //自定义属性
        ruleRangMemberPojo: null,
        //自定义属性的样式
        ruleRangMemberPojoStylePojo: null,
        //自定义属性弹框的方法
        ruleRangMemberPojoMethodNameString: null
      },
      //在实例创建完成后被立即调用
      created() {
        vm = this;
      },
      methods: {
        //前端方法代理
        //methodNameString:方法名称
        //argumentArray:可变长参数
        frontMethodProxy(methodNameString, ...argumentArray) {
          CommonUtils.log(methodNameString, argumentArray);
          //js中有个变量arguments,可以访问所有传入的值
          if (argumentArray === null || argumentArray.length === 0) {
            //如果有前端方法名称操作则调用前端方法
            if (methodNameString) {
              //调用前端方法
              vm.$options.methods[methodNameString]();
            }
            return;
          }
          if (argumentArray.length === 1) {
            //如果有前端方法名称操作则调用前端方法
            if (methodNameString) {
              //调用前端方法
              vm.$options.methods[methodNameString](argumentArray[0]);
            }
            return;
          }
          var argMap = new Map();
          if (argumentArray.length % 2 === 0) {
            argMap = CommonUtils.getArgMap(argumentArray);
            //设置聚焦的行
            var ruleManageRowPojo = argMap.get(StringConstant.ruleManageRowPojo);
            if (ruleManageRowPojo && ruleManageRowPojo.idString) {
              vm.$options.methods.setFocusIdString(ruleManageRowPojo.idString);
            }
          }
          //如果有前端方法名称操作则调用前端方法
          if (methodNameString) {
            //调用前端方法
            //注意:这里传的是argMap,之所以传Map是为了以后的拓展性
            if (vm.$options.methods[methodNameString]) {
              vm.$options.methods[methodNameString](argMap);
            } else {
              //始终将modelPojo带到后端
              argMap.set(StringConstant.modelPojo, vm.$data.modelPojo);
              vm.$options.methods.invoke(methodNameString, argMap);
            }
          }
        },
        //多语言
        getLangMsg(key, defaultValueString) {
          if (!vm || !vm.$data || !vm.$data.model) {
            return defaultValueString;
          }
          var valueString = KDApi.getLangMsg(vm.$data.model, key)
          if (!valueString) {
            return defaultValueString;
          }
          return valueString;
        },
        //外部的方法建议在mothods包装一下,这样其他地方可以直接通过"vm.$options.methods.方法名"进行调用,与外部依赖解耦
        //调后端接口,通过通过customEvent方法接收
        //eventNameString:事件名称
        //eventArgsObject:参数对象,前端框架应该会自动将其转为字符型,后端用String接收
        invoke(eventNameString, eventArgsObject) {
          if (eventArgsObject && eventArgsObject instanceof Map) {
            eventArgsObject = CommonUtils.convertMapToObject(eventArgsObject);
          }
          vm.$data.model.invoke(eventNameString, eventArgsObject)
        },
        //启用或禁用
        switchRadio(argMap) {
          var event = argMap.get(StringConstant.event);
          //注意:千万不要忘记阻止默认事件,否则每次会调两次该方法
          CommonUtils.eventPreventDefault(event);
          var keyString = argMap.get(StringConstant.key);
          //这里可以直接设置
          var ruleManageRowPojo = argMap.get(StringConstant.ruleManageRowPojo);
          ruleManageRowPojo[keyString] = ruleManageRowPojo[keyString] !== true;
          vm.$options.methods.updateVersionString();
        },
        //更新版本
        updateVersionString() {
          if (!vm.$data.modelPojo) {
            return;
          }
          var versionString = vm.$data.modelPojo.versionString;
          var versionInt = 0;
          if (versionString && versionString.length > 0 && parseInt(versionString)) {
            versionInt = parseInt(versionString);
          }
          //将数字转为字符串,在最后面拼一个''
          Vue.set(vm.$data.modelPojo, StringConstant.versionString, versionInt + 1 + '');
        },
        //生成新的FormulaPojo对象
        getNewFormulaPojo(typeString, valueString, uuidString) {
          var formulaPojo = {};
          formulaPojo.typeString = typeString;
          formulaPojo.valueString = valueString;
          formulaPojo.uuidString = uuidString;
          return formulaPojo;
        },
        //字符串的FormulaPojo集合
        getTextFormulaPojoArray(string) {
          var textFormulaPojoArray = [];
          if (!string || string.length === 0) {
            return textFormulaPojoArray;
          }
          //去除前后空格
          string = string.trim();
          if (!string || string.length === 0) {
            return textFormulaPojoArray;
          }
          for (var itemString of string) {
            if (itemString && itemString.length > 0) {
              var formulaPojo = vm.$options.methods.getNewFormulaPojo(StringConstant.text, itemString, CommonUtils.getUuidString());
              textFormulaPojoArray.push(formulaPojo);
            }
          }
          return textFormulaPojoArray;
        },
        //迭代获取FormulaPojo数组
        getFormulaPojoArrayFromElement(element, uuidStringFormulaPojoMap) {
          var newItemArray = [];
          if (!element) {
            return newItemArray;
          }
          var childNodeArray = element.childNodes;
          if (childNodeArray == null || childNodeArray.length === 0) {
            return newItemArray;
          }
          for (var childNode of childNodeArray) {
            if (childNode.nodeType === 3) {
              //"childNode.nodeValue"为text类型的节点
              newItemArray = CommonUtils.getConcatArray(newItemArray, vm.$options.methods.getTextFormulaPojoArray(childNode.nodeValue));
              continue;
            }
            if (childNode.nodeType === 1) {
              //uuidString
              var uuidString = childNode.getAttribute(StringConstant.uuidstring);
              //元素类型
              if (vm.$data.StringConstant.SPAN === childNode.nodeName) {
                var typeString = childNode.getAttribute(StringConstant.type);
                if (StringConstant.text === typeString) {
                  //注意:这里用的是innerText而非innerHTML,否则会被转义
                  var innerTextString = childNode.innerText;
                  if (!innerTextString) {
                    continue;
                  }
                  //去除前后空格
                  innerTextString = innerTextString.trim();
                  if (innerTextString.length > 0) {
                    if (innerTextString.length === 1) {
                      //根据uuidString从Map中获取对象
                      var uuidStringFormulaPojo = uuidStringFormulaPojoMap.get(uuidString);
                      //这里一定要加上"=null;",否则前端会复用该对象,换句话说,不设置的话下一次循环时currentUuidString并不是null而是上一次的值
                      var currentUuidString = null;
                      //如果输入一样的字符,会导致出现多个uuidString一样的元素
                      if (uuidStringFormulaPojo && uuidStringFormulaPojo.uuidString && uuidStringFormulaPojo.uuidString.length > 0 && uuidStringFormulaPojo.valueString === innerTextString) {
                        currentUuidString = uuidStringFormulaPojo.uuidString;
                      }
                      if (!currentUuidString) {
                        currentUuidString = CommonUtils.getUuidString();
                      }
                      var formulaPojo = vm.$options.methods.getNewFormulaPojo(typeString, innerTextString, currentUuidString);
                      if (formulaPojo) {
                        newItemArray.push(formulaPojo);
                      }
                    } else if (innerTextString.length === 2) {
                      var completeBoolean = false;
                      //根据uuidString从Map中获取对象
                      var uuidStringFormulaPojo = uuidStringFormulaPojoMap.get(uuidString);
                      if (uuidStringFormulaPojo && uuidStringFormulaPojo.uuidString && uuidStringFormulaPojo.valueString && uuidStringFormulaPojo.valueString.length > 0) {
                        if (completeBoolean === false && uuidStringFormulaPojo.valueString === innerTextString[0]) {
                          newItemArray.push(uuidStringFormulaPojo);
                          var formulaPojo = vm.$options.methods.getNewFormulaPojo(typeString, innerTextString[1], CommonUtils.getUuidString());
                          if (formulaPojo) {
                            newItemArray.push(formulaPojo);
                          }
                          completeBoolean = true;
                        }
                        if (completeBoolean === false && uuidStringFormulaPojo.valueString === innerTextString[1]) {
                          var formulaPojo = vm.$options.methods.getNewFormulaPojo(typeString, innerTextString[0], CommonUtils.getUuidString());
                          if (formulaPojo) {
                            newItemArray.push(formulaPojo);
                          }
                          newItemArray.push(uuidStringFormulaPojo);
                          completeBoolean = true;
                        }
                      }
                      if (completeBoolean === false) {
                        newItemArray = CommonUtils.getConcatArray(newItemArray, vm.$options.methods.getTextFormulaPojoArray(innerTextString));
                      }
                    } else {
                      newItemArray = CommonUtils.getConcatArray(newItemArray, vm.$options.methods.getTextFormulaPojoArray(innerTextString));
                    }
                  }
                } else if (StringConstant.member === typeString || StringConstant.logic === typeString || StringConstant.other === typeString || StringConstant.function === typeString) {
                  //注意:这里直接从uuidStringFormulaPojoMap提取,不要自己解析,否则会丢失数据
                  var formulaPojo = uuidStringFormulaPojoMap.get(uuidString);
                  if (formulaPojo) {
                    newItemArray.push(formulaPojo);
                  }
                }
              } else {
                newItemArray = CommonUtils.getConcatArray(newItemArray, vm.$options.methods.getFormulaPojoArrayFromElement(childNode, uuidStringFormulaPojoMap));
              }
            }
          }
          return newItemArray;
        },
        //获取下一个节点的uuidString
        getNextNodeUuidString(node) {
          if (!node) {
            return null;
          }
          var signNodeNextNodeUuidString = vm.$options.methods.getSignNodeNextNodeUuidString(node);
          if (signNodeNextNodeUuidString) {
            return signNodeNextNodeUuidString;
          }
          //获取下一个节点
          var nextNode = window.jQuery(node).next();
          if (!nextNode || !nextNode.attr) {
            return null;
          }
          //uuidString
          //注意:由于使用jquery进行了包装,因此不能使用getAttribute而应该使用attr获取属性
          var uuidString = nextNode.attr(StringConstant.uuidstring);
          if (uuidString && uuidString.length > 0) {
            return uuidString;
          }
          return null;
        },
        //获取标识节点的下一个节点的UUID
        //针对如下场景,在字符前面插入数据,那么光标的下一个节点的uuid其实就是当前span的uuid
        //<span type="text" uuidstring="uuidbb594d21a5f94649b96c45f241e2a4ec"><span type="rangeTypeString" date="1659076796329"></span>)</span>
        getSignNodeNextNodeUuidString(spanElement) {
          try {
            var jquerySpanElementArray = window.jQuery(spanElement);
            if (!jquerySpanElementArray || jquerySpanElementArray.length === 0) {
              return null;
            }
            var childNodeArray = jquerySpanElementArray[0].childNodes;
            if (!childNodeArray || childNodeArray.length === 0) {
              return null;
            }
            var lastestChildNodePojo = {};
            var textIndexIntArray = [];
            for (var i = 0; i < childNodeArray.length; i++) {
              var childNode = childNodeArray[i];
              if ("#text" === childNode.nodeName) {
                if (!childNode.textContent || !childNode.textContent.length || childNode.textContent.length === 0) {
                  continue;
                }
                textIndexIntArray.push(i);
                continue;
              }
              if ("SPAN" === childNode.nodeName) {
                var type = childNode.getAttribute(StringConstant.type);
                if (StringConstant.rangeTypeString !== type) {
                  continue;
                }
                var date = childNode.getAttribute(StringConstant.date);
                if (!lastestChildNodePojo.date || (date && date > lastestChildNodePojo.date)) {
                  lastestChildNodePojo.indexInt = i;
                  lastestChildNodePojo.childNode = childNode;
                  lastestChildNodePojo.date = date;
                }
              }
            }
            if (lastestChildNodePojo.indexInt && textIndexIntArray.length > 0) {
              if (lastestChildNodePojo.indexInt < textIndexIntArray[textIndexIntArray.length - 1]) {
                return spanElement.getAttribute(StringConstant.uuidstring);
              }
            }
            return null;
          } catch (error) {
            return null;
          }
        },
        //获取光标所在位置的下一个节点的uuidString及光标的绝对位置
        getSelectionPojo(containerNode) {
          if (!containerNode) {
            return null;
          }
          var selection = window.getSelection();
          //判断是否位于"公式输入框"内,如果不是则跳过,否则会导致光标无法聚焦其他元素
          //注意:getAttribute方法返回的是字符串值(String)
          //注意:selection.anchorNode可能为text类型,而text类型没有getAttribute方法,因此需要进行判断,全是细节,马虎不得
          //检测在一个DOM节点中是否包含另外一个DOM节点,如果包含,返回true,否则,返回false值,调用格式为:$.contains(container,contained);
          if (!selection || !selection.anchorNode || !($.contains(containerNode, selection.anchorNode))) {
            return null;
          }
          //返回选区包含的指定区域(Range)的引用
          var range = selection.getRangeAt(0);
          //这里插入一个空的span元素作为标识
          var spanElement = document.createElement("span");
          try {
            //光标所在位置的标识
            spanElement.setAttribute(StringConstant.type, StringConstant.rangeTypeString);
            spanElement.setAttribute(StringConstant.date, "" + new Date().getTime());
            range.insertNode(spanElement);
            //注意要在insertNode方法后执行getElementPagePositionObject方法,否则返回的是(0,0)
            var positionObject = CommonUtils.getElementPagePositionObject(spanElement);
            //这里分为以下情况
            //1.在type为text的span中,则直接获取后一个text的uuidString,回显的时候,直接将光标插入到该uuidString对应的元素前即可
            //2.光标在div中
            //3.已经是最后一个或解析时出现问题则默认将光标移动到最后
            var nextNodeUuidString = null;
            if (spanElement.parentNode) {
              var signNode = null;
              if (vm.$data.StringConstant.SPAN === spanElement.parentNode.nodeName) {
                //如果父Node为SPAN则说明关闭在"项"中
                signNode = spanElement.parentNode;
              } else if ("DIV" === spanElement.parentNode.nodeName) {
                //如果父Node为DIV则说明光标在直接的区域内
                signNode = spanElement;
              }
              if (signNode) {
                //获取下一个节点的uuidString
                nextNodeUuidString = vm.$options.methods.getNextNodeUuidString(signNode);
              }
            }
            //返回结果
            var resultObject = {};
            resultObject.nextNodeUuidString = nextNodeUuidString;
            if (positionObject) {
              resultObject.actualTopInteger = positionObject.actualTopInteger;
              resultObject.actualLeftInteger = positionObject.actualLeftInteger;
            }
            //const { clientWidth, clientHeight, scrollWidth, scrollHeight } = document.body || document.documentElement;
            var bodyOrDocumentElement = document.body || document.documentElement;
            if (bodyOrDocumentElement) {
              resultObject.clientWidthInteger = bodyOrDocumentElement.clientWidth;
              resultObject.clientHeightInteger = bodyOrDocumentElement.clientHeight;
            }
            if (containerNode.style && containerNode.style.width) {
              resultObject.widthInteger = containerNode.style.width;
            } else if (containerNode.clientWidth) {
              resultObject.widthInteger = containerNode.clientWidth;
            }
            if (containerNode.style && containerNode.style.height) {
              resultObject.heightInteger = containerNode.style.height;
            } else if (containerNode.clientHeight) {
              resultObject.heightInteger = containerNode.clientHeight;
            }
            return resultObject;
          } finally {
            //无论try/catch结果如何都会执行的代码块
            //删除新增的节点
            window.jQuery(spanElement).remove();
          }
        },
        //存储下一个节点的UUID及光标位置
        getSelectionPojoByArgMap(argMap) {
          //获取行对象
          var ruleManageRowPojo = argMap.get(StringConstant.ruleManageRowPojo);
          //当前的可编辑框
          var formulaDivElement = vm.$options.methods.getFormulaDivElement(ruleManageRowPojo);
          //获取光标下一个节点的UUID
          return vm.$options.methods.getSelectionPojo(formulaDivElement);
        },
        //获取上一个"计算符号"(+-*/)的UUID
        getLastComputeNodeUuidString(ruleManageRowPojo, nextNodeUuidString) {
          if (!ruleManageRowPojo) {
            return null;
          }
          //判断是否有"下一个节点的UUID"
          var nextNodeUuidStringBoolean = false;
          if (nextNodeUuidString && nextNodeUuidString.length && nextNodeUuidString.length > 0) {
            nextNodeUuidStringBoolean = true;
          }
          //获取行对象
          if (!ruleManageRowPojo || !ruleManageRowPojo.formulaPojoList) {
            return null;
          }
          var formulaPojoListLengthInt = ruleManageRowPojo.formulaPojoList.length;
          if (formulaPojoListLengthInt === 0) {
            return null;
          }
          //反序查询
          for (var i = formulaPojoListLengthInt - 1; i >= 0; i--) {
            var formulaPojo = ruleManageRowPojo.formulaPojoList[i];
            //如果有"下一个节点的UUID",则先找到这个节点
            if (nextNodeUuidStringBoolean) {
              //在匹配中"下一个节点的UUID"前都跳过去
              if (nextNodeUuidString === formulaPojo.uuidString) {
                nextNodeUuidStringBoolean = false;
              }
              continue;
            }
            //发现非文本类型则直接return,否则可能会出现未知的异常
            if (!(StringConstant.text === formulaPojo.typeString)) {
              return;
            }
            //匹配前一个指定字符
            var matchingIdentificationStringArray = ["+", "-", "*", "/", "=", ")", "(", ">", "<", ","];
            //array.indexOf(item,start):元素在数组中的位置,如果没与搜索到则返回-1
            if (formulaPojo.valueString && matchingIdentificationStringArray.indexOf(formulaPojo.valueString) >= 0) {
              return formulaPojo.uuidString;
            }
          }
          //return null表示没有找到
          return null;
        },
        //前端点击公式输入框时,需要计算一下下一个节点的UUID
        setNextNodeUuidString(argMap) {
          //获取光标对象
          var selectionPojo = vm.$options.methods.getSelectionPojoByArgMap(argMap);
          if (selectionPojo) {
            if (selectionPojo.nextNodeUuidString && selectionPojo.nextNodeUuidString.length && selectionPojo.nextNodeUuidString.length > 0) {
              //存储下一个节点的UUID
              Vue.set(vm.$data.modelPojo, StringConstant.nextNodeUuidString, selectionPojo.nextNodeUuidString);
            }
          }
        },
        //获取FormulaPojo与uuidString对应的Map
        getUuidStringFormulaPojoMap(ruleManageRowPojo) {
          //解析formulaPojoList以获取member对应的Map
          var uuidStringFormulaPojoMap = new Map();
          if (ruleManageRowPojo && ruleManageRowPojo.formulaPojoList) {
            for (var formulaPojo of ruleManageRowPojo.formulaPojoList) {
              //如果是member类型,由于用户可以输入任何内容,因此这里一点要判断一下对象是否存在,否则可能报:undefined
              if (formulaPojo) {
                if (formulaPojo.uuidString) {
                  uuidStringFormulaPojoMap.set(formulaPojo.uuidString, formulaPojo);
                }
                if (formulaPojo.subFormulaPojoList) {
                  for (var subFormulaPojo of formulaPojo.subFormulaPojoList) {
                    if (subFormulaPojo.uuidString) {
                      uuidStringFormulaPojoMap.set(subFormulaPojo.uuidString, subFormulaPojo);
                    }
                  }
                }
              }
            }
          }
          return uuidStringFormulaPojoMap;
        },
        //键弹起的事件
        keyup(argMap) {
          //获取事件
          var event = argMap.get(StringConstant.event);
          //获取行对象
          var ruleManageRowPojo = argMap.get(StringConstant.ruleManageRowPojo);
          //设置聚焦行ID
          vm.$options.methods.setFocusIdString(ruleManageRowPojo.idString);
          //注意这里不能直接判断是否不为'compositionupdate',而应采取下面的方式以确保当前通过输入法输入且未输入完成
          if (CommonUtils.getFunctionNameString(vm.$options.methods.compositionstart) === ruleManageRowPojo.compositionStatusString || CommonUtils.getFunctionNameString(vm.$options.methods.compositionupdate) === ruleManageRowPojo.compositionStatusString) {
            return;
          }
          //compositionend:输入法结束
          if (!(CommonUtils.getFunctionNameString(vm.$options.methods.compositionend) === ruleManageRowPojo.compositionStatusString) && event.keyCode) {
            //获取光标对象
            var selectionPojo = vm.$options.methods.getSelectionPojoByArgMap(argMap);
            if (selectionPojo) {
              Vue.set(vm.$data.modelPojo, 'selectionPojo', selectionPojo);
              //始终都存储最新的下一个节点的UUID
              if (selectionPojo.nextNodeUuidString && selectionPojo.nextNodeUuidString.length && selectionPojo.nextNodeUuidString.length > 0) {
                //存储下一个节点的UUID
                Vue.set(vm.$data.modelPojo, StringConstant.nextNodeUuidString, selectionPojo.nextNodeUuidString);
              } else {
                //如果下一个节点不存在,将值置空,否则光标会一直跳到之前的位置
                Vue.set(vm.$data.modelPojo, StringConstant.nextNodeUuidString, null);
              }
            }
            //判断是否需要重新渲染
            if (vm.$options.methods.getNeedUpdateBoolean(event.keyCode) === false) {
              //如果不需要则直接退出方法
              return;
            }
            //获取键对应的keyCode,把event.keyCode传给blur方法
            Vue.set(ruleManageRowPojo, StringConstant.keyCode, event.keyCode);
            //空格的keyCode为32
            //vm.$data.modelPojo && vm.$data.modelPojo.fuzzyMatchingPojo && vm.$data.modelPojo.fuzzyMatchingPojo.showBoolean === true
            if (event.keyCode === 32) {
              //获取上一个计算符号的节点的UUID,以便替换"上一个计算符号的节点的UUID"与"下一个节点"之间的内容
              var lastComputeNodeUuidString = vm.$options.methods.getLastComputeNodeUuidString(ruleManageRowPojo, vm.$data.modelPojo.nextNodeUuidString);
              CommonUtils.log("空格", "argMap", argMap, StringConstant.nextNodeUuidString, vm.$data.modelPojo.nextNodeUuidString, "lastComputeNodeUuidString", lastComputeNodeUuidString);
              if (lastComputeNodeUuidString && lastComputeNodeUuidString.length && lastComputeNodeUuidString.length > 0) {
                Vue.set(vm.$data.modelPojo, 'lastComputeNodeUuidString', lastComputeNodeUuidString);
                vm.$options.methods.invoke('fuzzyMatching', argMap);
                return;
              }
            }
          }
          //当前的可编辑框
          var formulaDivElement = vm.$options.methods.getFormulaDivElement(ruleManageRowPojo);
          if (!formulaDivElement) {
            return;
          }
          //解析formulaPojoList以获取member对应的Map
          var uuidStringFormulaPojoMap = vm.$options.methods.getUuidStringFormulaPojoMap(ruleManageRowPojo);
          //解析输入框
          var newFormulaPojoList = vm.$options.methods.getFormulaPojoArrayFromElement(formulaDivElement, uuidStringFormulaPojoMap);
          //注意:newFormulaPojoList.length为0是正常的,表示数据都被删除了
          if (!newFormulaPojoList) {
            return;
          }
          ruleManageRowPojo.formulaPojoList = newFormulaPojoList;
          if (newFormulaPojoList.length === 0 || (newFormulaPojoList.length > 1 && newFormulaPojoList[0].typeString === StringConstant.text)) {
            vm.$options.methods.invoke('clearFormulaPojoList');
            return;
          }
          //设置新的key以便丢掉旧的DOM(含用户输入的),生成新的DOM(解析之后的)
          Vue.set(ruleManageRowPojo, 'formulaDivKeyString', CommonUtils.getUuidString());
          //替换起始下标为ruleManageRowPojoIndexInt,长度为1
          vm.$data.modelPojo.ruleManageRowPojoList.splice(argMap.get('ruleManageRowPojoIndexInt'), 1, ruleManageRowPojo);
          //如果打开的"适用范围"对应的成员被删除了,则让后端清空"成员范围"
          var showMemberRuleManageRowPojoIdString = vm.$data.showMemberRuleManageRowPojoIdString;
          if (showMemberRuleManageRowPojoIdString && showMemberRuleManageRowPojoIdString.length > 0 && showMemberRuleManageRowPojoIdString === ruleManageRowPojo.idString) {
            var showMemberUuidString = vm.$data.showMemberUuidString;
            if (showMemberUuidString && showMemberUuidString.length > 0) {
              var newUuidStringFormulaPojoMap = vm.$options.methods.getUuidStringFormulaPojoMap(ruleManageRowPojo);
              var uuidStringFormulaPojo = newUuidStringFormulaPojoMap.get(showMemberUuidString);
              if (!uuidStringFormulaPojo) {
                Vue.set(vm.$data, 'showMemberUuidString', null);
                Vue.set(vm.$data, 'showMemberRuleManageRowPojoIdString', null);
                vm.$options.methods.invoke('clearMemberRange');
              }
            }
          }
        },
        //得益于自动聚焦(focus),那么可以监听focus的相反事件blur(失焦)
        blur(argMap) {
          vm.$nextTick(function () {
            var ruleManageRowPojo = argMap.get(StringConstant.ruleManageRowPojo);
            //如果ruleManageRowPojo.keyCode为null说明并没有走keyup,也就是说可能是用户点击了其他区域,因此这里不用进行聚焦
            if (!ruleManageRowPojo) {
              return;
            }
            //判断是否为输入法输入结束
            var needUpdateBoolean = CommonUtils.getFunctionNameString(vm.$options.methods.compositionend) === ruleManageRowPojo.compositionStatusString;
            if (needUpdateBoolean === false && !ruleManageRowPojo.keyCode) {
              return;
            }
            if (needUpdateBoolean === true) {
              //别忘了重置这个字段为null
              Vue.set(ruleManageRowPojo, StringConstant.compositionStatusString, null);
            }
            try {
              if (needUpdateBoolean === false) {
                //获取从keyup传来的keyCode而后判断是否需要更新,如果不需要更新则直接退出
                if (vm.$options.methods.getNeedUpdateBoolean(ruleManageRowPojo.keyCode) === false) {
                  return;
                }
              }
              //设置聚焦的行ID
              vm.$options.methods.setFocusIdString(ruleManageRowPojo.idString);
              //光标回显
              vm.$options.methods.cursorEcho(ruleManageRowPojo);
            } finally {
              //将ruleManageRowPojo.keyCode置空,以免产生脏数据
              Vue.set(ruleManageRowPojo, StringConstant.keyCode, null)
            }
          });
        },
        //光标回显
        cursorEcho(ruleManageRowPojo) {
          //当前的可编辑框
          var formulaDivElement = vm.$options.methods.getFormulaDivElement(ruleManageRowPojo);
          if (!formulaDivElement) {
            return;
          }
          //还原光标
          vm.$options.methods.selectionToTarget(formulaDivElement, vm.$data.modelPojo.nextNodeUuidString);
        },
        //事件触发于一段文字的输入之前(类似于 keydown 事件,但是该事件仅在若干可见字符的输入之前,而这些可见字符的输入可能需要一连串的键盘操作、语音识别或者点击输入法的备选词)
        compositionstart(argMap) {
          Vue.set(argMap.get(StringConstant.ruleManageRowPojo), StringConstant.compositionStatusString, CommonUtils.getFunctionNameString(arguments.callee));
        },
        //当文本段落的组成完成或取消时,compositionend 事件将被激发(具有特殊字符的激发,需要一系列键和其他输入,如语音识别或移动中的字词建议)
        compositionend(argMap) {
          Vue.set(argMap.get(StringConstant.ruleManageRowPojo), StringConstant.compositionStatusString, CommonUtils.getFunctionNameString(arguments.callee));
        },
        //输入过程中每次击键时触发 compositionupdate,包括 start 事件以后立即触发,end 事件以前立即触发
        compositionupdate(argMap) {
          Vue.set(argMap.get(StringConstant.ruleManageRowPojo), StringConstant.compositionStatusString, CommonUtils.getFunctionNameString(arguments.callee));
        },
        //是否需要刷新页面,true表示需要走下面的流程,false表示直接返回
        getNeedUpdateBoolean(keyCodeInt) {
          if (!keyCodeInt) {
            return true;
          }
          //上下左右
          if (keyCodeInt === 37 || keyCodeInt === 38 || keyCodeInt === 39 || keyCodeInt === 40) {
            return false;
          }
          return true;
        },
        //获取可编辑框
        getFormulaDivElement(ruleManageRowPojo) {
          if (!ruleManageRowPojo || !ruleManageRowPojo.formulaDivKeyString) {
            return null;
          }
          var refArray = vm.$refs[ruleManageRowPojo.formulaDivKeyString];
          if (refArray && refArray.length === 1) {
            return refArray[0];
          }
          return null;
        },
        //将光标移动到指定uuidString对应的项前面
        selectionToTarget(element, uuidString) {
          //IE9 and non-IE
          if (!element || !window.getSelection) {
            return;
          }
          //如果element不可见则不进行光标回显
          if (window.jQuery(element).is(':hidden') === true) {
            return;
          }
          if (element.focus) {
            element.focus();
          }
          //一般来说，插入光标的位置可通过 Selection 获取，这时它被标记为 Collapsed，这表示选区被压缩至一点，即光标位置
          var selection = window.getSelection();
          if (selection.focusNode && element !== selection.focusNode && !$.contains(element, selection.focusNode)) {
            return;
          }
          //如果没有内容则直接return
          if (!selection.rangeCount || selection.rangeCount === 0) {
            return;
          }
          //创建一个虚拟的节点对象，或者说，是用来创建文档碎片节点。它可以包含各种类型的节点，在创建之初是空的
          //文档片段存在于内存中，并不在DOM中，所以将子元素插入到文档片段中时不会引起页面回流（对元素位置和几何上的计算）
          //因此使用DocumentFragment可以起到性能优化的作用
          var fragment = document.createDocumentFragment();
          //每一个节点(临时变量)
          var itemChildNode = null;
          //光标插入到beforeChildNode前面
          var beforeChildNode = null;
          //最后一个子节点
          var lastChildNode = null;
          while ((itemChildNode = element.firstChild)) {
            if (!itemChildNode || !itemChildNode.getAttribute) {
              continue;
            }
            //fragment.appendChild()具有移动性,相当于把el中节点移动过去
            lastChildNode = fragment.appendChild(itemChildNode);
            //uuidString
            var itemUuidString = itemChildNode.getAttribute(StringConstant.uuidstring);
            //判断uuidString是否匹配
            if (uuidString && itemUuidString && uuidString === itemUuidString) {
              //注意:找到后不要直接break
              beforeChildNode = itemChildNode;
            }
          }
          //返回选区包含的指定区域（Range）的引用
          var range = selection.getRangeAt(0);
          //删除当前 Range 对象表示的文档区域
          range.deleteContents();
          //把指定的节点插入文档范围的开始点
          range.insertNode(fragment);
          //判断beforeChildNode是否存在
          if (beforeChildNode) {
            //如果你需要保留这个子节点在原先位置的显示,则你需要先用Node.cloneNode方法复制出一个节点的副本,然后在插入到新位置
            range = range.cloneRange();
            //在指定的节点后开始范围
            range.setStartBefore(beforeChildNode);
            //collapse(true)移动光标到range的开始
            //设置选中区域为一个点
            range.collapse(true);
            //将所有的区域都从选区中移除
            //移除所有的选中范围
            selection.removeAllRanges();
            //一个区域（Range）对象将被加入选区
            selection.addRange(range);
          } else if (lastChildNode) {
            //如果你需要保留这个子节点在原先位置的显示,则你需要先用Node.cloneNode方法复制出一个节点的副本,然后在插入到新位置
            range = range.cloneRange();
            //在指定的节点后开始范围
            range.setStartAfter(lastChildNode);
            //collapse(true)移动光标到range的开始
            //设置选中区域为一个点
            range.collapse(true);
            //将所有的区域都从选区中移除
            //移除所有的选中范围
            selection.removeAllRanges();
            //一个区域（Range）对象将被加入选区
            selection.addRange(range);
          }
        },
        //还原光标(Selection是光标对象)
        restoreSelection() {
          var modelPojo = vm.$data.modelPojo;
          if (!modelPojo || !modelPojo.focusIdString) {
            return;
          }
          //所有行
          var ruleManageRowPojoList = modelPojo.ruleManageRowPojoList;
          if (!ruleManageRowPojoList || ruleManageRowPojoList.length === 0) {
            return;
          }
          //找到聚焦的行
          var targetRuleManageRowPojo = null;
          for (var ruleManageRowPojo of ruleManageRowPojoList) {
            if (modelPojo.focusIdString === ruleManageRowPojo.idString) {
              targetRuleManageRowPojo = ruleManageRowPojo;
              break;
            }
          }
          if (!targetRuleManageRowPojo) {
            return;
          }
          //当前的可编辑框
          var formulaDivElement = vm.$options.methods.getFormulaDivElement(ruleManageRowPojo);
          if (!formulaDivElement) {
            return;
          }
          //将光标还原到指定位置
          vm.$options.methods.selectionToTarget(formulaDivElement, vm.$data.modelPojo.nextNodeUuidString);
        },
        //调用后端方法
        //event:原始的 DOM 事件
        customEventWithArgs(eventNameString, ...arguments) {
          CommonUtils.log(eventNameString, arguments);
          //js中有个变量arguments,可以访问所有传入的值
          if (arguments == null || arguments.length === 0) {
            vm.$options.methods.invoke(eventNameString, null);
            return;
          }
          if (arguments.length === 1) {
            vm.$options.methods.invoke(eventNameString, arguments[0]);
            return;
          }
          //传入的参数是奇数,去除第一个方法名,剩下的是偶数对,作为KEY和VALUE
          if (arguments.length % 2 === 0) {
            var argMap = CommonUtils.getArgMap(arguments);
            //设置聚焦的行
            var ruleManageRowPojo = argMap.get(StringConstant.ruleManageRowPojo);
            if (ruleManageRowPojo && ruleManageRowPojo.idString) {
              vm.$options.methods.setFocusIdString(ruleManageRowPojo.idString);
            }
            //"公式项"打开成员范围
            if ('showMembRange' === eventNameString) {
              var uuidString = null;
              var subFormulaPojo = argMap.get('subFormulaPojo');
              if (subFormulaPojo) {
                uuidString = subFormulaPojo.uuidString;
              } else {
                var formulaPojo = argMap.get('formulaPojo');
                if (formulaPojo) {
                  uuidString = formulaPojo.uuidString;
                }
              }
              var ruleManageRowPojo = argMap.get('ruleManageRowPojo');
              if (uuidString && uuidString.length && uuidString.length > 0 && ruleManageRowPojo && ruleManageRowPojo.idString && ruleManageRowPojo.idString > 0) {
                Vue.set(vm.$data, 'showMemberUuidString', uuidString);
                Vue.set(vm.$data, 'showMemberRuleManageRowPojoIdString', ruleManageRowPojo.idString);
              }
            }
            //始终将modelPojo带到后端
            argMap.set(StringConstant.modelPojo, vm.$data.modelPojo);
            vm.$options.methods.invoke(eventNameString, argMap);
          }
        },
        //保存,将对象发送给后端
        saveModelPojo(data) {
          //回调后端方法
          vm.$options.methods.invoke(data.callbackEndMethodNameString, vm.$data.modelPojo);
        },
        //获取适用成员范围的标签
        getLabelString(valueString) {
          if ("ALL" === valueString) {
            return vm.$options.methods.getLangMsg('all', "都适用");
          }
          if ("LEAF" === valueString) {
            return vm.$options.methods.getLangMsg('leaf', "仅明细");
          }
          if ("NOTLEAF" === valueString) {
            return vm.$options.methods.getLangMsg('notleaf', "仅非明细");
          }
        },
        //后端调用前端更新modelPojo的方法
        updateModelPojo(data) {
          var modelPojo = data.endToFrontObject;
          var ruleManageRowPojoList = modelPojo.ruleManageRowPojoList;
          if (ruleManageRowPojoList && ruleManageRowPojoList.length > 0) {
            for (var ruleManageRowPojo of ruleManageRowPojoList) {
              ruleManageRowPojo.formulaDivKeyString = CommonUtils.getUuidString();
            }
          }
          vm.$data.modelPojo = modelPojo;
          //还原光标
          //nextTick:将回调函数延迟在下一次dom更新数据后调用,简单的理解是:当数据更新了,在dom中渲染后,自动执行该函数
          vm.$nextTick(function () {
            vm.$options.methods.restoreSelection();
            //回调
            if (vm.$data.modelPojo && vm.$data.modelPojo.callbackEndMethodNameString) {
              vm.$options.methods.invoke(vm.$data.modelPojo.callbackEndMethodNameString, vm.$data.modelPojo);
            }
          });
        },
        //聚焦行的ID
        setFocusIdString(focusIdString) {
          if (focusIdString) {
            Vue.set(vm.$data.modelPojo, 'focusIdString', focusIdString);
          }
        },
        //鼠标移动到上方
        mousemoveFuzzyMatching(argMap) {
          Vue.set(argMap.get(StringConstant.fuzzyMatchingMemberPojo), StringConstant.selectedBoolean, true);
        },
        //鼠标离开上方
        mouseoutFuzzyMatching(argMap) {
          Vue.set(argMap.get(StringConstant.fuzzyMatchingMemberPojo), StringConstant.selectedBoolean, false);
        },
        //点击模糊匹配项
        selectFuzzyMatchingMember(argMap) {
          //始终将modelPojo带到后端
          argMap.set(StringConstant.modelPojo, vm.$data.modelPojo);
          //回调后端方法
          vm.$options.methods.invoke(CommonUtils.getFunctionNameString(arguments.callee), argMap);
        },
        //关闭模糊匹配弹框
        closeFuzzyMatching(argMap) {
          //注意:需要修改的是fuzzyMatchingPojo中showBoolean的值
          Vue.set(argMap.get('fuzzyMatchingPojo'), 'showBoolean', false);
        },
        //点击适用范围中的自定义属性
        clickRuleRangMemberPojo(argMap) {
          var ruleRangMemberPojo = argMap.get(StringConstant.ruleRangMemberPojo);
          if (ruleRangMemberPojo && ruleRangMemberPojo.propValueRuleRangMemberPojoList && ruleRangMemberPojo.propValueRuleRangMemberPojoList.length && ruleRangMemberPojo.propValueRuleRangMemberPojoList.length > 0) {
            var event = argMap.get(StringConstant.event);
            var ruleRangMemberPojoStylePojo = {};
            var bodyOrDocumentElementObject = document.body || document.documentElement;
            if (bodyOrDocumentElementObject.clientHeight - event.clientY - 20 > 360) {
              ruleRangMemberPojoStylePojo.topInteger = event.clientY + 20;
            } else {
              ruleRangMemberPojoStylePojo.topInteger = event.clientY - 360 - 20;
            }
            ruleRangMemberPojoStylePojo.leftInteger = event.clientX + 20;
            Vue.set(vm.$data, StringConstant.ruleRangMemberPojo, ruleRangMemberPojo);
            Vue.set(vm.$data, StringConstant.ruleRangMemberPojoStylePojo, ruleRangMemberPojoStylePojo);
            Vue.set(vm.$data, StringConstant.ruleRangMemberPojoMethodNameString, CommonUtils.getFunctionNameString(vm.$options.methods.clickRuleRangMemberPojo));
          } else {
            vm.$options.methods.invoke('clickRuleRangMemberPojo', argMap);
          }
        },
        //关闭自定义属性值包含的维度成员弹框
        closeRuleRangMemberPojo() {
          Vue.set(vm.$data, StringConstant.ruleRangMemberPojo, null);
          Vue.set(vm.$data, StringConstant.ruleRangMemberPojoStylePojo, null);
          Vue.set(vm.$data, StringConstant.ruleRangMemberPojoMethodNameString, null);
        },
        //改变规则所属维度
        changeDimensionNumberString(argMap) {
          var selectDimensionNumberString = argMap.get(StringConstant.selectDimensionNumberString);
          var ruleManageRowPojo = argMap.get(StringConstant.ruleManageRowPojo);
          if (selectDimensionNumberString && selectDimensionNumberString === ruleManageRowPojo.dimensionNumberString) {
            return;
          }
          Vue.set(ruleManageRowPojo, StringConstant.selectDimensionNumberString, ruleManageRowPojo.dimensionNumberString);
          //始终将modelPojo带到后端
          argMap.set(StringConstant.modelPojo, vm.$data.modelPojo);
          //回调后端方法
          vm.$options.methods.invoke(CommonUtils.getFunctionNameString(arguments.callee), argMap);
        }
      }
    })
    //将vue实例的引用存储到Map中,以便在update时可以获取到VUE实例
    var componentPojo = componentMap.get(getElString(model));
    if (componentPojo) {
      //将vue实例的引用存储到Map中
      componentPojo.vm = vm;
    }
  }
  //监听对象发生变化则更新页面
  var updateHtml = function (model, props) {
    //VUE实例
    var componentPojo = componentMap.get(getElString(model));
    var vm = componentPojo.vm;
    if (!props || !props.data || !props.data.frontMethodNameString) {
      return;
    }
    //调用前端方法
    if (vm.$options.methods[props.data.frontMethodNameString]) {
      vm.$options.methods[props.data.frontMethodNameString](props.data);
    }
  }
  //注册自定义控件
  window.KDApi.register('rule_batch_plan_rule_template', MyComponent, {
    isMulLang: true
  })
})(window.KDApi, jQuery)