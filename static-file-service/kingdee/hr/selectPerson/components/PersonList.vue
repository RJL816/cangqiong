<template>
  <div class="overtime_search">
    <div style="display: flex;flex-direction: column;align-items: stretch;flex-grow: 1;flex-shrink: 1;height: 10px">
      <div class="search_content" @scroll="handleScroll" v-if="resultShowList.length">
        <div class="search_item" v-for="(item,index) in resultShowList" :key="index+'search'"
             @click="selectItem(item)">
          <div class="select_ap">
            <i v-if="selectedArr.includes(item.id)" class="kdfont kdfont-fuxuanxuanzhong"></i>
            <i v-else class="kdfont kdfont-fuxuankuangweixuanzhong_yuan"></i>
          </div>
          <div class="img_box"><img
              :src="item.headImg ? item.headImg : 'images/pc/emotion/default_person_82_82.png?v=1.0'" alt=""></div>
          <div class="item">
            <div class="person" v-html="item.personName ? highlightHTML(item.personName) : '--'"></div>
            <div class="department">
              {{ item.adminorgName }}
              <span v-if="item.adminorgName && item.positionName" style="margin: 0 2px">·</span>
              {{ item.positionName }}
              <span v-if="!item.adminorgName && !item.positionName">--</span>
            </div>
          </div>
        </div>
      </div>
      <!--      <div class="noData" v-if="!resultShowList.length && !searchParam.searchContent ">-->
      <!--        <img :src="searchImgUrl" alt=""><span>请输入关键词进行搜索</span>-->
      <!--      </div>-->
      <div class="noData" v-if="!resultShowList.length">
        <img :src="noDataImgUrl" alt=""><span>暂无数据</span>
      </div>
    </div>
    <div class="bottom_block">
      <div style="display:flex;align-items:center;font-size: 14px;color: #666">
        <span style="display: flex;align-items: center;margin-right: 16px" @click="selectAll">
          <i v-if="this.selectedArr.length === this.resultList.length" class="kdfont kdfont-fuxuanxuanzhong"></i>
          <i v-else class="kdfont kdfont-fuxuankuangweixuanzhong_yuan"></i>
          <span style="margin-left: 12px">全选</span>
        </span>
        <span>已选</span><span style="margin: 0 4px">{{
          isClickSelectAllBtn ? searchParam.totalNum - (resultList.length - selectedArr.length) : selectedArr.length
        }}</span><span>个</span>
      </div>
      <div class="submit" :style="{'background':selectedArr.length ? '#276FF5':'#999'}" @click="submit">确定</div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    cusParam_result: Object,
  },
  computed: {},
  watch: {
    cusParam_result(resultObj) {
      this.searchParam = resultObj.searchParam;
      if (this.searchParam.pageNum == 0) {
        this.resultShowList = this.resultList = [];
        this.selectedArr = [];
        this.isClickSelectAllBtn = false;
        if (document.querySelector('.search_content')) {
          document.querySelector('.search_content').scrollTop = 0;
        }
      }
      if (this.searchParam.pageNum <= this.searchParam.totalPage) {
        if (this.isClickSelectAllBtn) {
          resultObj.userList.forEach((item, index) => {
            this.selectedArr.push(item.id);
          })
        }
        this.resultShowList = this.resultList = this.resultList.concat(resultObj.userList);
        console.log(" this.resultList", this.resultList)
      } else {
        this.isEnd = true;
      }

    }

  },
  data() {
    return {
      timer: null,
      timerSearch: null,
      selectedArr: [],
      isClickSelectAllBtn: false,
      searchParam: {
        searchType: '0',
        userId: null,
        searchContent: '本人',
        pageSize: 0,
        pageNum: 0,
        totalPage: 1,
      },
      isEnd: false,
      isfresh: false,
      resultList: [],
      resultShowList: [],
      searchImgUrl: "data:image/png;base64,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",
      noDataImgUrl: "data:image/png;base64,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"
    }
  },
  mounted() {

  },
  methods: {
    search() {
      console.log(this.searchParam)
      clearTimeout(this.timerSearch);
      this.timerSearch = setTimeout(() => {
        this.invoke("employee_search", this.searchParam);
      }, 300)
    },

    close() {
      this.invoke("employee_close");
    },
    selectItem(item) {
      if (this.selectedArr.includes(item.id)) {
        this.selectedArr.splice(this.selectedArr.indexOf(item.id), 1)
      } else {
        this.selectedArr.push(item.id);
      }
    },
    highlightHTML: function (text) {
      if (!text || !this.searchParam.searchContent) {
        return text;
      } else {
        const highlightStr = `<span style="color:#276FF5">${this.searchParam.searchContent}</span>`
        const reg = new RegExp(this.searchParam.searchContent, 'gi')
        return text.replace(reg, highlightStr)
      }
    },
    handleScroll() {
      //这里使用个延时加载，不然滑动屏幕的时候会不断触发方法，去计算高度，浪费性能
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        let innerHeight = document.querySelector('.search_content').clientHeight
        //这三个是获取窗口高度
        let outerHeight = document.querySelector('.search_content').scrollHeight
        let scrollTop = document.querySelector('.search_content').scrollTop
        console.log(innerHeight + '-' + outerHeight + '-' + scrollTop)
        if (innerHeight >= (outerHeight - scrollTop)) {
          if (!this.isEnd) {
            this.searchParam.pageNum++; //请求接口的第几页的页码
            if (this.searchParam.pageNum <= this.searchParam.totalPage - 1) {
              this.search()  //请求接口的函数
            }
          }
        }
      }, 500);
    },
    selectAll() {
      if (this.selectedArr.length !== this.resultList.length) {
        this.isClickSelectAllBtn = true;
        this.selectedArr = [];
        this.resultList.forEach((item, index) => {
          this.selectedArr.push(item.id);
        })
      } else {
        this.selectedArr = [];
        this.isClickSelectAllBtn = false;
      }
    },
    submit() {
      if (!this.selectedArr.length) {
        return;
      }
      let selectedList = [];
      let noSelectedList = [];
      this.resultList.forEach((item, index) => {
        if (this.selectedArr.includes(item.id)) {
          selectedList.push(item);
        } else {
          noSelectedList.push(item);
        }
      })
      let returnParam = {
        isClickSelectAllBtn: this.isClickSelectAllBtn,
        userList: this.isClickSelectAllBtn ? noSelectedList : selectedList
      }
      console.log(returnParam)
      this.invoke("employee_select", returnParam);
    }
  }
}
</script>
<style lang="less">
.overtime_search {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;

  .kdfont-fuxuanxuanzhong {
    font-size: 22px;
    color: #276FF5;
  }

  .kdfont-fuxuankuangweixuanzhong_yuan {
    font-size: 22px;
    color: #eee;
  }

  .search_content {
    display: flex;
    background: white;
    flex-direction: column;
    overflow: scroll;
    flex-grow: 1;
    flex-shrink: 1;

    .search_item {
      display: flex;
      height: 64px;
      flex-direction: row;
      padding: 12px;
      border-bottom: 1px solid #E5E5E5;
      align-items: center;

      .img_box {
        height: 32px;
        width: 32px;
        border-radius: 50%;
        margin: 0 12px;
        overflow: hidden;

        img {
          height: 32px;
          width: 32px;
        }

      }

      .item {
        display: flex;
        flex-direction: column;

        .person {
          display: flex;
          flex-direction: row;
          color: #212121;
          font-size: 14px;
          letter-spacing: 0;
          line-height: 20px;
          font-weight: 400;
          margin-bottom: 4px;
        }

        .department {
          font-size: 12px;
          color: #999999;
          letter-spacing: 0;
          line-height: 16px;
          font-weight: 400;
        }
      }
    }
  }

  .noData {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;

    img {
      width: 224px;
      height: 128px;
      margin-bottom: 16px;
    }

    span {
      font-size: 14px;
      color: #999999;
      letter-spacing: 0;
      text-align: center;
      line-height: 20px;
      font-weight: 400;
    }
  }

  .bottom_block {
    height: 48px;
    background: #FFF;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #E5E5E5;

    .submit {
      padding: 8px 30px;
      border-radius: 4px;
      background: #276FF5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
  }
}
</style>