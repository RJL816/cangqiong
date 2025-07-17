window.ai_ids = window.ai_ids || {}

window.ai_ids['setting'] = (function () {
  return {
    //存放每个配置文件（相当于每个图形的配置数据，包括数据和echart图形实例） chartKey:{chartData:{},chartInstance:null,chartMetaData:null,}
    _$$page: {},
    _$$keys: [
      'chartData',
      'chartInstance',
      'chartMetaData',
      'containerId',
      'pageInfo',
    ],
    _$$models: {}, //保存每个页签的model   [pageId]:model
    setModel: function (pageId, model) {
      console.log('pageId is ', pageId)
      console.log('pageId model is ', model)
      if (!pageId || !model) {
        console.error('pageId 和model不能为空!')
        return
      }
      if (!Object.prototype.hasOwnProperty.call(this._$$models, pageId)) {
        this._$$models[pageId] = model
      }
    },
    getModel: function (pageId) {
      if (!pageId) {
        console.error('pageId 不能为空!')
        return
      }
      return this._$$models[pageId]
    },
    getPageDataByKey: function (key) {
      if (!Object.prototype.hasOwnProperty.call(this._$$page, key)) {
        console.error('没有关于' + key + '的相关配置')
        return
      }
      return this._$$page[key]
    },
    curPageId: '',
    //获取从服务器传来的源数据
    getChartDataByKey: function (key) {
      let pageData = this.getPageDataByKey(key)
      return pageData && pageData.chartData
    },
    getChartContainerByKey: function (key) {
      let pageData = this.getPageDataByKey(key)
      return pageData && pageData.containerId
    },
    getChartInstanceByKey: function (key) {
      let pageData = this.getPageDataByKey(key)
      return pageData && pageData.chartInstance
    },
    getChartMetaDataByKey: function (key) {
      let pageData = this.getPageDataByKey(key)
      return pageData && pageData.chartMetaData
    },
    //将配置相关的源数据保存
    setChartDataToPage: function (key, data) {
      if (Object.prototype.hasOwnProperty.call(this._$$page, key)) {
        this._$$page[key].chartData = data
      } else {
        this._$$page[key] = {
          chartData: data,
        }
      }
    },
    setPageInfoToPage: function (key, data) {
      if (Object.prototype.hasOwnProperty.call(this._$$page, key)) {
        this._$$page[key].pageInfo = data
      } else {
        this._$$page[key] = {
          pageInfo: data,
        }
      }
    },
    getPageInfoFromPage: function (key) {
      let pageData = this.getPageDataByKey(key)
      return pageData && pageData.pageInfo
    },
    //图的容器ID
    setContainerIdToPage: function (key, containerId) {
      if (Object.prototype.hasOwnProperty.call(this._$$page, key)) {
        this._$$page[key].containerId = containerId
      } else {
        this._$$page[key] = {
          containerId: containerId,
        }
      }
    },
    setChartInstanceToPage: function (key, instance) {
      //   debugger
      if (Object.prototype.hasOwnProperty.call(this._$$page, key)) {
        this._$$page[key].chartInstance = instance
      } else {
        this._$$page[key] = {
          chartInstance: instance,
        }
      }
    },
    removeChartInstanceFromPage: function (key) {
      if (Object.prototype.hasOwnProperty.call(this._$$page, key)) {
        delete this._$$page[key].chartInstance
        console.log('delete after is ', this._$$page)
      }
    },
    delPageDataByKey: function (key) {
      if (Object.prototype.hasOwnProperty.call(this._$$page, key)) {
        delete this._$$page[key]
        console.log('delete after is ', this._$$page)
      }
    },
  }
})()
