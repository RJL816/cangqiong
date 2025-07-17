import React from 'react'
import { Dropdown, Button, Icon } from '@kdcloudjs/kdesign'
class MoreButton extends React.Component {
    constructor (props) {
      super(props)
      console.log(props)
      console.log(props.customProps)
      console.log(props.model)
      this.state = {
        customProps: props.customProps,
        model: props.model,
        list: (this.props.data && this.props.data.list) || []
      }
      this.addList = this.addList.bind(this)
      this.update = this.update.bind(this)
      this.remove = this.remove.bind(this)
      this.Click = this.Click.bind(this)
    }
    addList (value) {
      const list = this.state.list.map(item => item)
      list.push({value, done: false, id: list.length, isRemove: false})
      this.setState({
        list
      })
    }
    update (index) {
      const list = this.state.list.map(item => item)
      list[index].done = !list[index].done
      this.setState({
        list
      })
    }
  
    remove (index) {
        console.log(index);
    }
    getShowList () {
      const demoButtonStyle = { margin: '0px 8px 8px 0', minWidth: '36px' }
      const itemList = [{"key":"邀请评价","value":"test1"},{"key":"邀请评价","value":"test"}]
      const menu = (
        <Dropdown.Menu >
          {itemList.map((item) =>(
                  <Dropdown.Item>
                  <Button type="text" style={demoButtonStyle} size='small' onClick={() => { this.Click(item.value) }}>
                  { item.key}
                  </Button>
                </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )
      return {
        menu
      }
    }
  
    Click (data) {
      console.log(data)
      console.log(this.state)
      console.log(this.props)
      this.state.model.invoke('handleAfterChange', data)
      const { model } = this.props
      console.log(data)
      model && model.invoke('click', data)
    }
    render () {
      const {menu} = this.getShowList()
      const triggers = ['hover']
      return (
        <>
        {triggers.map((trigger) => (
          <Dropdown key={trigger} menu={menu} trigger={trigger}>
            <Button style={{ fontSize: '16px', display: 'block', minWidth: '28px'}} type="ghost">
              <Icon type={"more"} />
            </Button>
          </Dropdown>
        ))}
      </>
      )
    }
  }
  
  export default MoreButton