import React from 'react'
import ReactDOM from 'react-dom'
import Person from './components/person.js'
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
      // console.log('-----update', this.model, props)
      setHtml(this.model, props)
    },
    update: function (props) {
      // console.log('-----update', this.model, props)
      eventBus.pub(this.model, 'opmcpersonlistupdate', props)
    },
    destoryed: function () {
      ReactDOM.unmountComponentAtNode(this.model.dom)
    }
  }

  var setHtml = function (model, primaryProps) {
    KDApi.loadFile('./css/index.css', model, () => {
      class PersonList extends React.Component {
        constructor(props) {
          super(props)
          let datas;
          if (!this.isNotNull(props.customProps.data)) {
            datas = { selectIndex: 0, personList: [], itemList: [] };
          } else {
            datas = props.customProps.data;
          }
          if (!this.isNotNull(datas)) {
            datas = { selectIndex: 0, personList: [], itemList: [] };
          }
          if (!this.isNotNull(datas.personList)) {
            datas.personList = [];
          }
          if (!this.isNotNull(datas.itemList)) {
            datas.itemList = [];
          }
          if (this.isNotNull(datas.personList) && !this.isNotNull(datas.selectIndex)) {
            datas.selectIndex = datas.personList[0].id
          }
          const configItems = props.customProps.configItems;
          let type = 'difference';
          if (typeof configItems != "undefined" && configItems != 0) {
            let typeConfig = configItems.filter((item) => {
              return item.key == "type";
            })
            if (typeof typeConfig != "undefined" && typeConfig != 0) {
              type = typeConfig.value;
            }
          }
          this.state = {
            customProps: props.customProps,
            model: props.model,
            selectIndex: datas.selectIndex,
            itemList: datas.itemList,
            personList: datas.personList,
            type: type,
            defaultImg: KDApi.getNameSpace(props.model) + './img/default.png',
            settingImg: KDApi.getNameSpace(props.model) + './img/setting.png'
          }
        }

        isNotNull(data) {
          return !(typeof (data) == "undefined" || "" + data == "undefined" || data == null);
        }

        componentDidMount() {
          const { model } = this.state
          this.updateSub = eventBus.sub(model, 'opmcpersonlistupdate', (updateProps) => {
            this.setState({
              customProps: updateProps
            });

            if (this.isNotNull(updateProps.data.updatefiles)) {
              let updatefiles = updateProps.data.updatefiles.split(',');
              for (let i = 0; i < updatefiles.length; i++) {
                this.updateCompent(updatefiles[i], updateProps.data, model);
              }
            }
          })
        }
        updateCompent(file, data, model) {
          switch (file) {
            case 'personList':
              this.setState({
                personList: data.personList
              });
              break;
            case 'itemList':
              this.setState({
                itemList: data.itemList
              });
              break;
            case 'selectIndex':
              this.setState({
                selectIndex: data.selectIndex
              });
              break;
            case 'scrollIntoId':
              let getEle = document.getElementById(model.key + data.scrollIntoId);
              if (!(typeof (getEle) == "undefined" || "" + getEle == "undefined" || getEle == null)) {
                // getEle.scrollIntoViewIfNeeded({ behavior: "smooth" });
                getEle.scrollIntoView();
              }
              let diff = document.getElementById("diffapplyperson");
              if (!(typeof (diff) == "undefined" || "" + diff == "undefined" || diff == null)) {
                diff.scrollTop=0;
              }
              let comm = document.getElementById("commapplyperson");
              if (!(typeof (comm) == "undefined" || "" + comm == "undefined" || comm == null)) {
                comm.scrollTop=0;
              }
              
              break;
          }
        }

        componentWillUnmount() {
          eventBus.unsub(this.updateSub)
        }

        handlePersonClick = index => {
          if (index != this.state.selectIndex) {
            this.setState({
              selectIndex: index
            })
            model && model.invoke('select', index);
          }
        }
        render() {
          let type = this.state.type;
          if (this.isNotNull(this.state.personList) && this.state.personList.length != 0) {
            let person = this.state.personList.map((people, index) =>
              <Person model={this.state.model} customProps={this.state.customProps} key={people.id.toString()} person={people} selectIndex={this.state.selectIndex} index={index}
                handlePersonClick={this.handlePersonClick} type={type} itemList={this.state.itemList} defaultImg={this.state.defaultImg} settingImg={this.state.settingImg}
                className={["opmcpersonlist"]} />
            );
            const flexStyle = { display: 'flex' };
            return <div style={flexStyle}>{person}</div>;
          } else {
            return null;
          }

        }
      }
      ReactDOM.render(<PersonList model={model} customProps={primaryProps} />, model.dom)
      if (!(typeof (primaryProps.data) == "undefined" || "" + primaryProps.data == "undefined" || primaryProps.data == null)
        && !(typeof (primaryProps.data.scrollIntoId) == "undefined" || "" + primaryProps.data.scrollIntoId == "undefined" || primaryProps.data.scrollIntoId == null)) {
        let getEle = document.getElementById(model.key + primaryProps.data.scrollIntoId);
        if (!(typeof (getEle) == "undefined" || "" + getEle == "undefined" || getEle == null)) {
          getEle.scrollIntoView();
        }
      }
    })
  }
  // 注册自定义组件
  KDApi.register('opmcpersonlist', MyComponent)
})(window.KDApi)
