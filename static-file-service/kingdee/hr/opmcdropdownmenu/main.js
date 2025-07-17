import React from 'react'
import ReactDOM from 'react-dom'
import { Dropdown, Button, Icon } from '@kdcloudjs/kdesign'
(function (KDApi) {
  function MyComponent(model) {
    this._setModel(model)
  }
  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model
    },
    init: function (props) {
      console.log('-----init', this.model, props)
      setHtml(this.model, props)
    },
    update: function (props) {
      setHtml(this.model, props)
    },
    destoryed: function () {
      // console.log('-----destoryed', this.model)
      ReactDOM.unmountComponentAtNode(this.model.dom)
    }
  }

  var setHtml = function (model, primaryProps) {
    KDApi.loadFile('./css/index.css', model, () => {
      class Root extends React.Component {
        constructor(props) {
          super(props)
          const datas = props.customProps.data
          if (typeof (datas) == "undefined" || "" + datas == "undefined" || datas == null) {
            props.customProps.data = { "value": 0 };
          }
          console.log(props.customProps)
          this.state = {
            customProps: props.customProps,
            model: props.model
          }
          this.Click = this.Click.bind(this)
        }
        getShowList() {
          const demoButtonStyle = { margin: '0px 8px 8px 0', minWidth: '36px' };
          let itemList = this.state.customProps.data;
          if (this.state.customProps.cardRowData) {
            const rowindex = this.state.customProps.cardRowData.rowKey;
            if(typeof itemList === 'object' && itemList !== null && !Array.isArray(itemList)) 
            {
              console.log("data-----init", itemList, rowindex);
              itemList=itemList[rowindex];
            }
          }
          const configItems = this.state.customProps.configItems;
          let iconConfig = [{"key":"icon", "value":"more"}];
          let colerConfig = { color: 'var(--theme-color)' };
          let fontSizeConfig = { fontSize:"13px" };
          if (typeof configItems != "undefined" && configItems != 0) {
            let icon = configItems.filter((item)=> {
              return item.key == "icon";
            })
            if (typeof icon != "undefined" && icon != 0) {
              iconConfig = icon;
            }
            let color = configItems.filter((item)=> {
              return item.key == "color";
            })
            if (typeof color != "undefined" && color != 0) {
              colerConfig.color = color[0].value;
            }
            let fontSize = configItems.filter((item)=> {
              return item.key == "fontSize";
            })
            if (typeof fontSize != "undefined" && fontSize != 0) {
              fontSizeConfig.fontSize = fontSize[0].value;
            }
          }
          const menu = (
            <Dropdown.Menu className={["opmcmore"]}>
              {itemList.map((item) => (
                <Dropdown.Item key={item.value} className={["opmcmore"]}>
                  <Button type="text" style={demoButtonStyle} size='small' onClick={() => { this.Click(item.value) }}>
                    {item.key}
                  </Button>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          )
          return {
            menu, iconConfig, colerConfig,fontSizeConfig
          }
        }

        Click(data) {
          model && model.invoke('click', data)
        }
        render() {
          const { menu, iconConfig, colerConfig, fontSizeConfig } = this.getShowList();
          const triggers = 'hover';
          return (
            <div className={["opmcmore"]}>
                <Dropdown key={triggers} menu={menu} trigger={triggers} popperClassName={["opmcmore"]}>
                    <Button  type="text" style={colerConfig}>
                      <Icon style={fontSizeConfig} type={iconConfig ? iconConfig[0].value : "more"} />
                  </Button>
                </Dropdown>
            </div>
          )
        }
      }
      ReactDOM.render(<Root model={model} customProps={primaryProps} />, model.dom)
    })
  }
  // 注册自定义组件
  KDApi.register('opmcdropdownmenu', MyComponent)
})(window.KDApi)
