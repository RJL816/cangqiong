<template v-if="relationGraphShowBoxPojo && relationGraphShowBoxPojo.showBoxBoolean === true">
  <!-- 点击时触发的弹框 -->
  <div class="relation_graph_show_box">
    <!-- 点击或鼠标操作 -->
    <template v-if="relationGraphShowBoxPojo.typeString === ComponentStringConstant.CLICK || relationGraphShowBoxPojo.typeString === ComponentStringConstant.MOURCE">
      <template v-if="relationGraphShowBoxPojo.boxStyleTypeString === 'HTML'">
        <div class="background_color_white" :style="relationGraphShowBoxPojo.relationGraphShowBoxStylePojo" style="position: absolute;z-index: 2021;transform-origin: center top;box-shadow: rgba(0, 0, 0, 0.2) 0 1px 8px 0;white-space: nowrap;">
          <div v-html="relationGraphShowBoxPojo.showMessageString"></div>
        </div>
      </template>
      <template v-else>
        <div class="background_color_white" :style="relationGraphShowBoxPojo.relationGraphShowBoxStylePojo" style="position: absolute;z-index: 2021;transform-origin: center top;box-shadow: rgba(0, 0, 0, 0.2) 0 1px 8px 0;white-space: nowrap;">
          <div class="background_color_white" style="transform-origin: center top;z-index: 2021;box-shadow: rgba(0, 0, 0, 0.2) 0 1px 8px 0;white-space: nowrap;">
            <div>
              <el-input type="textarea" :autosize="{minRows: 2, maxRows: 6}" resize="both" placeholder="请输入内容" v-model="relationGraphShowBoxPojo.showMessageString"></el-input>
            </div>
            <div class="background_color_white">
              <!-- 设置文字颜色 -->
              <div class="color_0E5FD8 text_align_center font_size_14px cursor_pointer" @click.stop="closeShowBox(relationGraphShowBoxPojo)">关闭</div>
            </div>
          </div>
        </div>
      </template>
    </template>
    <!-- 鼠标右键 -->
    <template v-if="relationGraphShowBoxPojo.typeString === ComponentStringConstant.CONTEXTMENU">
      <div class="background_color_white" :style="relationGraphShowBoxPojo.relationGraphShowBoxStylePojo" style="position: absolute;z-index: 2022;transform-origin: center top;box-shadow: rgba(0, 0, 0, 0.2) 0 1px 8px 0;white-space: nowrap;">
        <div class="background_color_white" style="padding: 10px 10px 0 10px;display:inline-block;">
          <template v-for="(contextmenuItemComponent,contextmenuItemComponentIndexInt) of relationGraphShowBoxPojo.contextmenuItemComponentList">
            <div :key="contextmenuItemComponentIndexInt" :class="[contextmenuItemComponent.selectedBoolean === true ? 'background_color_rgb_245_245_245' : '', 'cursor_pointer', 'font_size_14px', 'height_30px', 'rgb_102_102_102', 'line_height_30px']" @mousemove.stop="contextmenuMousemove(contextmenuItemComponent)" @mouseout.stop="contextmenuMouseout(contextmenuItemComponent)" @click.stop="frontMethodProxy('METHOD_NAME_STRING', 'actionMethod', 'idString', relationGraphShowBoxPojo.idString, 'typeString', contextmenuItemComponent.typeString)">{{contextmenuItemComponent.valueString}}</div>
          </template>
          <div style="width: 100%">
            <!-- 设置文字颜色 -->
            <div class="color_0E5FD8 text_align_center font_size_14px cursor_pointer font_size_12px height_30px line_height_30px" @click.stop="closeShowBox(relationGraphShowBoxPojo)">关闭</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  //单文件子组件中写的是module.exports = {},而不是export default {}
  module.exports = {
    props: ["relationGraphShowBoxPojo"],
    data: function () {
      var ComponentStringConstant = {
        CLICK: "CLICK",
        MOURCE: "MOURCE",
        CONTEXTMENU: "CONTEXTMENU",
        showBoxBoolean: "showBoxBoolean",
        selectedBoolean: "selectedBoolean"
      };
      return {
        ComponentStringConstant: ComponentStringConstant
      };
    },
    methods: {
      closeShowBox(relationGraphShowBoxPojo) {
        //关闭弹框
        Vue.set(
          relationGraphShowBoxPojo,
          this.ComponentStringConstant.showBoxBoolean,
          false
        );
      },
      contextmenuMousemove(contextmenuItemComponent) {
        Vue.set(
          contextmenuItemComponent,
          this.ComponentStringConstant.selectedBoolean,
          true
        );
      },
      contextmenuMouseout(contextmenuItemComponent) {
        Vue.set(
          contextmenuItemComponent,
          this.ComponentStringConstant.selectedBoolean,
          false
        );
      },
      frontMethodProxy() {
        this.$emit("front_method_proxy", arguments);
      }
    }
  };
</script>

<style scoped>
    /* 普通的style标签只支持普通的样式,如果想要启用scss或less,需要为style元素,设置lang属性 */
    /* .vue页面中用scoped,代表当前样式只作用于当前.vue页面,不作用于其它.vue页面 */

    /* 金蝶有事件文字的颜色 scoped*/
    .relation_graph_show_box .color_0E5FD8 {
        color: #0e5fd8;
    }

    .relation_graph_show_box .text_align_center {
        text-align: center;
    }

    .relation_graph_show_box .font_size_14px {
        font-size: 14px;
    }

    .relation_graph_show_box .cursor_pointer {
        cursor: pointer;
    }

    .relation_graph_show_box .background_color_white {
        background-color: white;
    }

    .relation_graph_show_box .background_color_rgb_245_245_245 {
        background-color: rgb(245, 245, 245);
    }

    .relation_graph_show_box .font_size_12px {
        font-size: 12px;
    }

    .relation_graph_show_box .height_30px {
        height: 30px;
    }

    .relation_graph_show_box .rgb_102_102_102 {
        color: rgb(102, 102, 102);
    }

    .relation_graph_show_box .line_height_30px {
        line-height: 30px;
    }
</style>