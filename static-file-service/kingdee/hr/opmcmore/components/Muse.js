import React from 'react'
import { Dropdown, Button, Icon } from '@kdcloudjs/kdesign'
function Muse() {
  const demoButtonStyle = { margin: '0px 8px 8px 0', minWidth: '36px' }
  const menu = (
    <Dropdown.Menu >
      <Dropdown.Item>
        <Button type="text" style={demoButtonStyle} size='small'>
          更新
        </Button>
      </Dropdown.Item>
      <Dropdown.Item>
        <Button type="text" style={demoButtonStyle} size='small'>
          修改
        </Button>
      </Dropdown.Item>
      <Dropdown.Item>
        <Button type="text" style={demoButtonStyle} size='small'>
          废弃
        </Button>
      </Dropdown.Item>
    </Dropdown.Menu>
  )

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

export default Muse