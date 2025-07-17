import React from 'react'
import { Dropdown, Button, Icon, Avatar } from '@kdcloudjs/kdesign'

class Person extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            model: props.model,
            customProps: props.customProps,
            isMouseEnter: false,
            isItemShow: false
        };
    }
    componentDidMount() {

    }
    handleMouseIn(flag, e) {
        this.setState({ isMouseEnter: flag })

    }
    handleMouseOut(flag, e) {
        if (!this.state.isItemShow) {
            this.setState({
                isMouseEnter: flag
            })
        }
    }
    handleMeutClose(flag, e) {
        this.setState({ isItemShow: flag, isMouseEnter: flag })
    }
    handleSetting(flag, e) {
        this.setState({ isItemShow: flag })
    }
    handlePersonClick(index, e) {
        this.props.handlePersonClick(index);
    }

    getShowList() {
        const demoButtonStyle = { margin: '0px 8px 8px 0', minWidth: '36px' }
        const itemList = this.props.itemList;
        let menu = null;
        if (itemList && itemList.length > 0) {
            menu = (
                <Dropdown.Menu className={["opmcmore"]}>
                    {itemList.map((item) => (
                        <Dropdown.Item key={item.value} className={["opmcmore"]}>
                            <Button type="text" style={demoButtonStyle} size='small' onClick={this.Click.bind(this, item.value)}>
                                {item.key}
                            </Button>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            )
        }
        return {
            menu
        };
    }

    Click(action) {
        const model = this.state.model;
        model && model.invoke(action, this.props.person.id);
        this.handleMeutClose(false);
    }

    render() {
        if (this.props.type == 'difference') {
            return this.getDifferenceAvatar();
        } else {
            return this.getCommonAvatar();
        }
    }
    getCommonAvatar() {
        const {
            buttonStyle, hiddentStyle, buttonIconStyle, flexPersonStyle, personAvaterStyle, personSelectAvaterStyle, selectIconStyle
        } = this.getCommonStyle();
        return (
            <div style={flexPersonStyle} title={this.props.person.name} id={this.state.model.key + this.props.person.id}>
                <div style={personAvaterStyle}>
                    <img style={{ width: 24, height: 24, borderRadius: '50%' }}
                        src={this.props.person.image}
                        onError={(e) => { e.target.onerror = null; e.target.src = this.props.defaultImg }} />
                </div>
                <Icon type={"arrow-up-solid"} style={this.props.selectIndex == this.props.person.id ? selectIconStyle : hiddentStyle} />
            </div>);
    }
    getDifferenceAvatar() {
        const { menu } = this.getShowList();
        const {
            buttonStyle, hiddentStyle, buttonIconStyle, flexPersonStyle, personAvaterStyle, personSelectAvaterStyle, selectIconStyle
        } = this.getDifferenceStyle();
        if (menu) {
            return (
                <div style={flexPersonStyle} title={this.props.person.name} id={this.state.model.key + this.props.person.id}>
                    <div style={{ position: 'relative' }} >
                        <div onMouseEnter={this.handleMouseIn.bind(this, true)}
                            onMouseLeave={this.handleMouseOut.bind(this, false)}
                            onClick={this.handlePersonClick.bind(this, this.props.person.id)}>
                            <img src={this.props.person.image}
                                onError={(e) => { e.target.onerror = null; e.target.src = this.props.defaultImg }}
                                style={this.props.selectIndex == this.props.person.id ? personSelectAvaterStyle : personAvaterStyle}
                            />
                        </div>
                        <div className={["opmcmore"]}>
                            <Dropdown popperClassName={["opmcmore"]} placement="bottomLeft" menu={menu} trigger={['click']} visible={this.state.isItemShow} onVisibleChange={(visible) => this.handleMeutClose(visible)}>
                                <div onMouseEnter={this.handleMouseIn.bind(this, true)}
                                    onMouseLeave={this.handleMouseOut.bind(this, false)} style={{
                                        display: "block",
                                        position: 'absolute',
                                        height: '18px',
                                        width: '18px',
                                        right: '0px',
                                        top: '-5px',
                                    }}>
                                    <img src={ this.props.settingImg } style={(!this.state.isMouseEnter) ? hiddentStyle : buttonStyle} onClick={this.handleSetting.bind(this, this.state.isItemShow)}>
                                        {/* <Button type="primary" shape="circle" style={(!this.state.isMouseEnter) ? hiddentStyle : buttonStyle} onClick={this.handleSetting.bind(this, this.state.isItemShow)}>
                                            <Icon type={"setting"} style={buttonIconStyle} />
                                        </Button> */}
                                    </img>
                                </div>
                            </Dropdown >
                        </div>
                    </div>
                    <Icon type={"arrow-up-solid"} style={this.props.selectIndex == this.props.person.id ? selectIconStyle : hiddentStyle} />
                </div>);
        } else {
            return (
                <div style={flexPersonStyle} title={this.props.person.name} id={this.state.model.key + this.props.person.id}>
                    <div style={{ position: 'relative' }} >
                        <div onMouseEnter={this.handleMouseIn.bind(this, true)}
                            onMouseLeave={this.handleMouseOut.bind(this, false)}
                            onClick={this.handlePersonClick.bind(this, this.props.person.id)}>
                            <img src={this.props.person.image}
                                onError={(e) => { e.target.onerror = null; e.target.src = this.props.defaultImg }}
                                style={this.props.selectIndex == this.props.person.id ? personSelectAvaterStyle : personAvaterStyle}
                            />
                        </div>
                    </div>
                    <Icon type={"arrow-up-solid"} style={this.props.selectIndex == this.props.person.id ? selectIconStyle : hiddentStyle} />
                </div>);
        }
    }

    getCommonStyle() {
        const buttonStyle = {
            display: "block",
            height: '18px',
            width: '19px',
            backgroundColor: '#7f7f7f',
            color: '#7f7f7f',
            lineHeight: '16px',
            opacity: '0.8',
            textAlign: 'center',
            verticalAlign: 'middle'
        };
        const hiddentStyle = {
            display: "none"
        };
        const buttonIconStyle = {
            opacity: '0.8',
            fontSize: '16px',
            color: 'rgb(255 255 255)',
            margin: '0px 1px 3px 1px'

        };

        const flexPersonStyle = { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '24px', margin: '2px 4px 2px 4px', flexShrink: 0 };
        const personSelectAvaterStyle = { borderStyle: 'solid', borderColor: this.props.customProps.themeNum, position: 'relative', borderRadius: '50%' };
        const personAvaterStyle = { borderWidth: '0px', position: 'relative' };
        const selectIconStyle = { position: 'absolute', fontSize: '18px', color: this.props.customProps.themeNum, top: '24px',right:'3px' };
        return { buttonStyle, hiddentStyle, buttonIconStyle, flexPersonStyle, personAvaterStyle, selectIconStyle, personSelectAvaterStyle }

    }

    getDifferenceStyle() {
        const buttonStyle = {
            display: "block",
            height: '18px',
            width: '18px',
            lineHeight: '16px',
            opacity: '0.8',
            textAlign: 'center',
            verticalAlign: 'middle'
        };
        const hiddentStyle = {
            display: "none"
        };
        const buttonIconStyle = {
            opacity: '0.8',
            fontSize: '16px',
            color: 'rgb(255 255 255)',
            paddingBottom: '2.5px'

        };

        const flexPersonStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40px', height: 50, margin: '5px 6px 0px 6px', padding: '0 5px 0 0', flexShrink: 0 };
        const personSelectAvaterStyle = { borderStyle: 'solid', borderColor: this.props.customProps.themeNum, position: 'relative', borderRadius: '50%', width: 40, height: 40 };
        const personAvaterStyle = { borderWidth: '0px', position: 'relative', width: 40, height: 40, borderRadius: '50%' };
        const selectIconStyle = { fontSize: '18px', color: this.props.customProps.themeNum };
        return { buttonStyle, hiddentStyle, buttonIconStyle, flexPersonStyle, personAvaterStyle, selectIconStyle, personSelectAvaterStyle }
    }


}

export default Person