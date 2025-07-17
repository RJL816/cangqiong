import React from 'react';
import ReactDOM from 'react-dom';
import eventBus from '../../../../../util/eventBus';
(function (KDApi) {
  function MyComponent(model) {
    this._setModel(model);
  }

  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model;
    },
    init: function (props) {
      // console.log('-----init', this.model, props)
      setHtml(this.model, props);
    },
    update: function (props) {
      // console.log(props);
      eventBus.pub(this.model, 'opmcdropdownfromupdate', props);
    },
    destoryed: function () {
      // console.log('-----destoryed', this.model)
      ReactDOM.unmountComponentAtNode(this.model.dom);
    }
  };

  var setHtml = function (model, primaryProps) {
    KDApi.loadFile('./css/index.css', model, () => {
      class Root extends React.Component {
        constructor(props) {
          super(props);
          const datas = props.customProps.data;
          if (
            typeof datas == 'undefined' ||
            '' + datas == 'undefined' ||
            datas == null
          ) {
            props.customProps.data = { value: 0 };
          }
          this.state = {
            customProps: props.customProps,
            model: props.model,
            show: false,
            fromPageId: props.model.key + props.model.pageId,
            fromStyle: {
              display: 'none'
            }
          };
          this.showFrom = this.showFrom.bind(this);
        }
        handleAfterChange(value) {
          this.state.model.invoke('handleAfterChange', value);
        }
        getShowList() {
          const configItems = this.state.customProps.configItems;
          let iconConfig = { icon: 'kdfont kdfont-shaixuan' };
          let styleConfig = {
            color: this.state.customProps.themeNum,
            fontSize: '16px'
          };
          if (configItems) {
            for (var i = 0; i < configItems.length; i++) {
              let item = configItems[i];
              if (item.key == 'icon') {
                iconConfig['icon'] = item.value;
              } else if (item.key == 'color') {
                styleConfig.color = item.value;
              } else if (item.key == 'fontSize') {
                styleConfig.fontSize = item.value;
              } else if (item.key == 'closeicon') {
                iconConfig['closeicon'] = item.value;
              }
              if (iconConfig['closeicon'] && this.state.show == false) {
                iconConfig['icon'] = iconConfig['closeicon']
              }
            }
          }
          return {
            iconConfig,
            styleConfig
          };
        }
        componentDidMount() {
          const { model } = this.state;
          this.updateSub = eventBus.sub(
            model,
            'opmcdropdownfromupdate',
            (updateProps) => {
              if (updateProps.data.show == 'true') {
                this.setState({
                  show: true
                });
                document.getElementById(this.state.fromPageId).style.display =
                  'block';
              } else {
                this.setState({
                  show: false
                });
                document.getElementById(this.state.fromPageId).style.display =
                  'none';
              }
            }
          );
        }

        componentWillUnmount() {
          eventBus.unsub(this.updateSub);
        }
        showFrom(e) {
          let fromPageId = this.state.fromPageId;
          let rect = e.target.getBoundingClientRect();
          console.log(rect);
          var windowHeight = document.documentElement.clientHeight; // 视窗高度-也就是浏览器可视区域高度
          var windowWidth = document.documentElement.clientWidth; // 视窗宽度-也就是浏览器可视区域高度
          var thresholdheigth = $('#' + fromPageId).height(); // 可以指定提前加载的距离
          var thresholdwidth = $('#' + fromPageId).width(); // 可以指定提前加载的距离
          let fromStyle = {
            position: 'fixed',
            fontSize: '14px',
            background: '#FFFFFF',
            boxShadow: '0px 2px 9px 0px rgba(150,150,150,0.5)',
            zIndex: 99,
            whiteSpace: 'pre-wrap',
            fontSize: '12px',
            color: '#999999',
            letterSpacing: 0,
            lineHeight: '20px',
            fontWeight: 400,
            overflowY: 'auto',
            top: 0,
            left: 0
          };
          if (rect.top > windowHeight - thresholdheigth) {
            fromStyle['top'] = rect.top - thresholdheigth + 'px';
          } else {
            fromStyle['top'] = rect.top + 20 + 'px';
          }
          if (rect.left > windowWidth - thresholdwidth - 20) {
            fromStyle['left'] = rect.left - thresholdwidth - 30 + 'px';
          } else {
            fromStyle['left'] = rect.left + 5 + 'px';
          }
          const configItems = this.state.customProps.configItems;
          let iconConfig = { icon: 'kdfont kdfont-shaixuan' };
          let styleConfig = {
            color: this.state.customProps.themeNum,
            fontSize: '16px'
          };
          if (configItems) {
            for (var i = 0; i < configItems.length; i++) {
              let item = configItems[i];
              if (item.key == 'placement') {
                if (item.value == 'bottomRight') {
                  fromStyle['top'] = rect.top + 20 + 'px';
                  fromStyle['left'] = rect.left - thresholdwidth - 5 + 'px';
                } else if (item.value == 'bottomLeft') {
                  fromStyle['top'] = rect.top - thresholdheigth + 'px';
                  fromStyle['left'] = rect.left + 5 + 'px';
                }
              } 
            }
          }
          this.setState({
            fromStyle: fromStyle
          });
          this.state.model.invoke('opmcdropdownfrom', this.state.show);
        }
        render() {
          const { iconConfig, styleConfig } = this.getShowList();
          console.log(iconConfig, styleConfig);
          let fromStyle = this.state.fromStyle;
          return (
            <div className={['opmcmore']}>
              <div id={this.state.fromPageId} style={fromStyle}></div>
              <i
                onClick={(e) => {
                  this.showFrom(e);
                }}
                className={[iconConfig['icon']]}
                style={styleConfig}
              ></i>
            </div>
          );
        }
      }
      ReactDOM.render(
        <Root model={model} customProps={primaryProps} />,
        model.dom
      );
    });
  };
  // 注册自定义组件
  KDApi.register('opmcdropdownfrom', MyComponent);
})(window.KDApi);
