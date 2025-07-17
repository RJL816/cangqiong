import React from 'react'
import ReactDOM from 'react-dom'
import eventBus from '../../../../../util/eventBus'
(function (KDApi) {
  function MyComponent(model) {
    this._setModel(model)
  }

  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model
    },
    init: function (props) {
      setHtml(this.model, props)
    },
    update: function (props) {
      // console.log(props);
      eventBus.pub(this.model, 'opmcdrawer', props)
    },
    destoryed: function () {
      ReactDOM.unmountComponentAtNode(this.model.dom)
    }
  }

  var setHtml = function (model, primaryProps) {
    KDApi.loadFile('./css/index.css', model, () => {
      class Root extends React.Component {
        constructor(props) {
          super(props)
          this.state = {
            customProps: props.customProps,
            model: props.model,
            visible: false,
            mask: true,
            maskClosable: true,
            fromPageId: props.model.key + props.model.pageId,
            maskPageId: "mask" + props.model.key + props.model.pageId,
            width: 'auto',
            height: '100%',
          }
          const configItems = props.customProps.configItems;
          if (configItems) {
            for (var i = 0; i < configItems.length; i++) {
              let item = configItems[i];
              if (item.key == 'height') {
                this.state = {
                  height: item.value
                }
              } else if (item.key == 'width') {
                this.state = {
                  width: item.value
                }
              } else if (item.key == 'placement') {
                this.state = {
                  placement: item.value
                }
              } else if (item.key == 'mask' && item.value == "false") {
                this.state = {
                  mask: false
                }
              }
            }
          }
          this.Click = this.Click.bind(this);
        }

        isNotNull(data) {
          return !(typeof (data) == "undefined" || "" + data == "undefined" || data == null);
        }


        Click(e) {
          this.setState({
            visible: !this.state.visible
          })
          this.state.model.invoke('opmcdrawer', this.state.visible);
        }

        setVisible(flag, e) {
          this.setState({ visible: flag });
        }
        componentDidMount() {
          const { model } = this.state;
          this.updateSub = eventBus.sub(
            model,
            'opmcdrawer',
            (updateProps) => {
              if (updateProps.data.show == 'true') {
                this.setState({
                  visible: true
                });
                // document.getElementById(this.state.maskPageId).style.width =
                //   '100%';
                // document.getElementById(this.state.maskPageId).style.height =
                //   '100%';
                if (this.state.mask) {
                  document.getElementById(this.state.maskPageId).style.opacity =
                    1;
                }
                document.getElementById(this.state.maskPageId).style.transition =
                  'all calc(var(--kd-g-duration, 0.3s) - 0.1s) var(--kd-g-ease-out, cubic-bezier(0, 0.4, 0.4, 1))';
                document.getElementById(this.state.maskPageId).style.visibility =
                  'visible';
                // document.getElementById(this.state.maskPageId).style.display = 'block'
                document.getElementById(this.state.fromPageId).style.width =
                  this.state.width;
                document.getElementById(this.state.fromPageId).style.visibility =
                  'visible';
                document.getElementById(this.state.fromPageId).style.opacity =
                  1;
              } else {
                this.setState({
                  visible: false
                });
                document.getElementById(this.state.fromPageId).style.visibility =
                  'hidden';
                document.getElementById(this.state.fromPageId).style.width =
                  '0px';
                // document.getElementById(this.state.maskPageId).style.display = 'none'
                // document.getElementById(this.state.maskPageId).style.width =
                //   '0px';
                // document.getElementById(this.state.maskPageId).style.height =
                // '0px';
                document.getElementById(this.state.maskPageId).style.opacity =
                  0;
                document.getElementById(this.state.maskPageId).style.transition =
                  'opacity calc(var(--kd-g-duration, 0.3s) - 0.1s) var(--kd-g-ease-out, cubic-bezier(0, 0.4, 0.4, 1))';
                document.getElementById(this.state.fromPageId).style.opacity =
                  0;
                const id = this.state.maskPageId;
                setTimeout(function () {
                  document.getElementById(id).style.visibility =
                    'hidden';
                }, 100)
              }
            }
          );
        }

        componentWillUnmount() {
          eventBus.unsub(this.updateSub);
        }
        isIE() { //ie?
          if (!!window.ActiveXObject || "ActiveXObject" in window)
            return true;
          else
            return false;
        }
        getShowStyle() {
          let maskStyleConfig = {
            position: 'fixed',
            backgroundColor: 'rgba(55, 55, 55, 0.5)',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0,
            zIndex: 1000,
            visibility: 'hidden',
            transition: 'opacity calc(var(--kd-g-duration, 0.3s) - 0.1s) var(--kd-g-ease-out, cubic-bezier(0, 0.4, 0.4, 1))',
          };
          let contentStyleConfig = {
            position: 'fixed',
            backgroundColor: '#fff',
            transition: 'all calc(var(--kd-g-duration, 0.3s) - 0.1s) var(--kd-g-ease-out, cubic-bezier(0, 0.4, 0.4, 1))',
            visibility: 'hidden',
            right: 0,
            bottom: 0,
            top: 0,
            height: '100%',
            zIndex: 1002
          };
          if (this.state && this.state.customProps) {
            const configItems = this.state.customProps.configItems;
            let config = {};
            if (configItems) {
              for (var i = 0; i < configItems.length; i++) {
                let item = configItems[i];
                if (item.key == 'mask') {
                  config['mask'] = item.value;
                } else if (item.key == 'visible') {
                  config['visible'] = item.value;
                } else if (item.key == 'placement') {
                  config['placement'] = item.value;
                }
              }
            }
            if (config['mask'] && config['mask'] == 'true') {
              maskStyleConfig['backgroundColor'] = 'rgba(0, 0, 0, 0.45)'
            }
            if (config['mask']) {
              if (config['mask'] == 'right') {
                // maskStyleConfig['flexDirection'] = 'row-reverse'
                contentStyleConfig["right"] = 0
                contentStyleConfig["height"] = "100%"
              } else if (config['mask'] == 'left') {
                // maskStyleConfig['flexDirection'] = 'row'
                contentStyleConfig["left"] = 0
              } else if (config['mask'] == 'top') {
                // maskStyleConfig['flexDirection'] = 'column'
                contentStyleConfig["top"] = 0
              } else if (config['mask'] == 'bottom') {
                // maskStyleConfig['flexDirection'] = 'column-reverse'
                contentStyleConfig["bottom"] = 0
              }
            }
          }
          return {
            maskStyleConfig,
            contentStyleConfig
          };
        }
        render() {
          const { maskStyleConfig, contentStyleConfig } = this.getShowStyle();
          return (
            <div>
              <div id={this.state.maskPageId} style={maskStyleConfig} onClick={this.Click.bind(this)}>
              </div>
              <div id={this.state.fromPageId} style={contentStyleConfig}></div>
            </div>
          )
        }
      }
      ReactDOM.render(<Root model={model} customProps={primaryProps} />, model.dom)
    })
  }
  // 注册自定义组件
  KDApi.register('opmcdrawer', MyComponent, { isMulLang: true })
})(window.KDApi)
