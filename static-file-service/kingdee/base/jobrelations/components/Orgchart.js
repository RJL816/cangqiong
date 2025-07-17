import React from 'react'
import '../utils/jquery-3.7.0.min.js'
import OrgChart from "../utils/jqueryOrgchart.js"
import xssFilters from '../utils/xssFilters.js'
import "../css/jquery.orgchart.less"
import "../css/style.less"

class Orgchart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orgChartArray: [],
            scale: 1
        }
        this.orgchartItemFocuseTimer = null
    }

    componentDidMount() {
        const { data } = this.props
        if (data && data.length > 0) {
            data.forEach(item => {
                item && this.doControlMethods(item.methodName, item.value)
            })
        }
    }

    componentDidUpdate(prevProps) {
        // 更新数据
        const { data } = this.props
        if (data && data !== prevProps.data && data.length > 0) {
            data.forEach(item => {
                item && this.doControlMethods(item.methodName, item.value)
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.orgchartItemFocuseTimer)
    }

    doControlMethods = (methodName, data) => {
        switch (methodName) {
            case 'setData':
                this.setOrgChartData(data)
                break
            case 'setPositionFocus':
                this.setFocus(data)
        }
    }

    // 设置焦点
    setFocus = (id) => {
        const { model } = this.props
        if (this.orgchartItemFocuseTimer) clearInterval(this.orgchartItemFocuseTimer)
        this.orgchartItemFocuseTimer = setInterval(() => {
            $(`#${id}_${model.pageId}_input`).focus()
            this.setOrgchartItemFocused(`${id}_${model.pageId}_input`)
            clearInterval(this.orgchartItemFocuseTimer)
            this.orgchartItemFocuseTimer = null
        }, 300)
    }

    setOrgChartData(dataArr) {
        this.setState({ orgChartArray: [...dataArr] }, () => {
            this.forceUpdate()
        })
    }

    setOrgchartItemFocused = (id) => {
        const { model } = this.props
        $(`.orgchartBox_${model.pageId} .orgFocused`).removeClass('orgFocused')
        $(`#${id}`).closest('.node').addClass('orgFocused')
    }

    setScale = () => {
        this.setState({
            scale: this.state.scale + 0.1
        })
    }

    render() {
        const { orgChartArray, scale } = this.state
        const { model } = this.props
        return (
            <div className={`orgchartBox_${model.pageId} orgchartBox`}>
                {
                    orgChartArray.map(item => (
                        <OrgchartItem data={item} model={model} setOrgchartItemFocused={this.setOrgchartItemFocused} scale={scale}/>
                    ))
                }
                {/* <div onClick={this.setScale}>- 100% +</div> */}
            </div>
        )
    }
}

class OrgchartItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.orgchartItemRef = React.createRef()
        this.orgchartItem = null
    }

    componentDidMount() {
        const { data } = this.props
        this.setOrgchartItemData(data)
    }

    componentDidUpdate(prevProps) {
        const { data, scale, model } = this.props
        // 更新数据
        if (prevProps.data !== data) {
            this.setOrgchartItemData(data)
        } 
        if (prevProps.scale !== scale) {
            this.orgchartItem.setChartScale($(`#${data.id}_box_${model.pageId}`), scale)
        }
    }

    setOrgchartItemData = (data) => {
        const { model } = this.props
        this.orgchartItemRef.current.innerHTML = ''
        this.orgchartItem = OrgChart($(`#${data.id}_box_${model.pageId}`), {
            data: data,
            nodeTemplate: this.nodeTemplate,
            zoominLimit: 7,
            zoomoutLimit: 0.5
        });
        $('.orgchart').addClass('noncollapsable'); // 禁掉展开/折叠
    }

    nodeTemplate = (data) => {
        const { model } = this.props
        const btnState = data.children ? 'true' : 'false'
		const param = data.data
		const paramMap = (param && (new Map(Object.entries(param)))) || new Map({})
        const text = xssFilters(data.text)
        const id = xssFilters(data.id)
        return `
        <div contentId="${id}_${model.pageId}" class="contentItem" show="${btnState}">
            <input id="${id}_${model.pageId}_input" class="contentItemInput"/>
            <div class="contentTitle" title=${text}>${text}</div>
            <div class="contentFoot">
                <span><span>${KDApi.getLangMsg(model, 'job.key001')}： </span><span class="contentFootNum">${xssFilters(paramMap.get("p") || 0)}</span></span>
                <span><span>${KDApi.getLangMsg(model, 'job.key002')}： </span><span class="contentFootNum">${xssFilters(paramMap.get("u") || 0)}</span></span>
            </div>
            <div id="${id}_${model.pageId}" class="btn" isdel="true">
                <svg width="13" height="13" style="vertical-align:middle;fill:currentColor;overflow:hidden;pointer-events:none;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M843.75 776.041666C843.75 797.916666 834.375 843.75 812.5 843.75L203.125 843.75C181.25 843.75 156.25 818.75 156.25 796.875L156.25 203.125C156.25 181.25 165.624999 156.25 187.5 156.25L807.291666 156.25C829.166666 156.25 843.75 170.833333 843.75 192.708334L843.75 776.041666zM795.454544 93.75L204.545455 93.75C145.454545 93.75 93.75 145.454545 93.75 204.545455L93.75 795.454544C93.75 854.545453 145.454545 906.25 204.545455 906.25L795.454544 906.25C854.545453 906.25 906.25 854.545453 906.25 795.454544L906.25 204.545455C906.25 145.454545 854.545453 93.75 795.454544 93.75zM537.5 468.75L462.5 468.75L318.75 468.75C296.25 468.75 281.25 481.25 281.25 500C281.25 518.75 296.25 531.25 318.75 531.25L462.5 531.25L537.5 531.25L681.25 531.25C703.75 531.25 718.75 518.75 718.75 500C718.75 481.25 703.75 468.75 681.25 468.75L537.5 468.75z"></path></svg>
            </div>
            <div id="${id}_${model.pageId}" class="btn add" isdel="false">
                <svg width="13" height="13" style="vertical-align:middle;fill:currentColor;overflow:hidden;pointer-events:none;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M795.454544 93.75C854.545453 93.75 906.25 145.454545 906.25 204.545455L906.25 204.545455L906.25 795.454544C906.25 854.545453 854.545453 906.25 795.454544 906.25L795.454544 906.25L204.545455 906.25C145.454545 906.25 93.75 854.545453 93.75 795.454544L93.75 795.454544L93.75 204.545455C93.75 145.454545 145.454545 93.75 204.545455 93.75L204.545455 93.75zM807.291666 156.25L187.5 156.25C165.624999 156.25 156.25 181.25 156.25 203.125L156.25 203.125L156.25 796.875C156.25 818.75 181.25 843.75 203.125 843.75L203.125 843.75L812.5 843.75C834.375 843.75 843.75 797.916666 843.75 776.041666L843.75 776.041666L843.75 192.708334C843.75 170.833333 829.166666 156.25 807.291666 156.25L807.291666 156.25zM500 281.25C517.258897 281.25 531.25 295.241102 531.25 312.5L531.25 468.75L687.5 468.75C704.758897 468.75 718.75 482.741103 718.75 500C718.75 517.258897 704.758897 531.25 687.5 531.25L531.25 531.25L531.25 687.5C531.25 704.758897 517.258897 718.75 500 718.75C482.741103 718.75 468.75 704.758897 468.75 687.5L468.75 531.25L312.5 531.25C295.241102 531.25 281.25 517.258897 281.25 500C281.25 482.741103 295.241102 468.75 312.5 468.75L468.75 468.75L468.75 312.5C468.75 295.241102 482.741103 281.25 500 281.25z"></path></svg>
            </div>
        </div>`
    }

    hanldeOrgchartItem = (e) => {
        const { model, setOrgchartItemFocused } = this.props
        const contentDom = $(e.target).closest('.contentItem')
        const contentId = contentDom.attr('contentId')
        if (!contentId) return
        const id = contentId.split("_")[0]
        id && model.invoke('clickPosition', id)
        setOrgchartItemFocused(contentId)
        if (e.target.id) {
            const domId = $(e.target).closest(`#${id}`)
            const state = $(e.target).attr('isdel')
            if (state === 'true') {
                this.orgchartItem.hideChildren(domId)
            } else {
                this.orgchartItem.showChildren(domId)
            }
        }
    }

    render() {
        const { data, model } = this.props
        return (
            <div id={`${data.id}_box_${model.pageId}`} ref={this.orgchartItemRef} className={'orgchartItemClass'} onClick={this.hanldeOrgchartItem}/>
        )
    }
}

export default Orgchart