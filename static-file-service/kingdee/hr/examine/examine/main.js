import React, { useReducer, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import eventBus from "../../../../../util/eventBus";
import { getReactComponent } from "../../../../../util/reactComponent";
import { Table, Icon, Radio, InputNumber, Rate } from "@kdcloudjs/kdesign";
import "@kdcloudjs/kdesign/dist/kdesign.css";
import "./main.less";
import { mockData } from "./helpers/mock";

(function (KDApi) {
  const setHtml = function (model, primaryProps, { I18N }) {
    KDApi.loadFile("./css/index.css", model, () => {
      function Item(props) {
        const {
          topGroupName,
          topGroupId,
          fieldList,
          capItems: dataSource,
        } = props?.data;
        const [expandStatus, setExpandStatus] = React.useState({
          selfAssess: true,
        });
        const onChangeExtendStatus = (curStatus, changeValue) => {
          setExpandStatus((state) => ({ ...state, ...curStatus }));
        };

        const changeCurrentValue = (rowIndex, value) => {
          console.log(rowIndex, value);
          props.changeCurrentValue(rowIndex, value);
        };

        const columns = fieldList.map(({ code, name, children }) => {
          const otherProps = children
            ? {
                features: {
                  showExtendIcon: true,
                },
                children: children.map((item) => {
                  return {
                    name: item.name,
                    code: item.code,
                    align: "left",
                    width: item.code === "selfAssSum" ? 200 : 100,
                    render: (value, record, rowIndex) => {
                      return item.code === "fileNum" ? (
                        <div
                          className="attachment-wrapper"
                          onClick={() =>
                            model.invoke("downloadSelfAssFile", record.itemId)
                          }
                        >
                          <Icon type="attachment" />
                          {value}
                        </div>
                      ) : (
                        value
                      );
                    },
                  };
                }),
              }
            : code === "itemName"
            ? {
                render: (value, record) => (
                  <div
                    style={{ color: "var(--theme-color)", cursor: "pointer" }}
                    onClick={() =>
                      model.invoke("viewItemDetail", record.itemId)
                    }
                  >
                    {value}
                  </div>
                ),
              }
            : code === "reviewType"
            ? {
                width: 300,
                render: (xxxx, record, rowIndex) => {
                  const {
                    reviewType,
                    decimal,
                    scoreLow,
                    scoreHigh,
                    optionTags,
                    currentValue,
                  } = xxxx;
                  // 10单选 20输入计分 30打星
                  console.log(currentValue, record, xxxx);
                  if (reviewType === "10") {
                    console.log(currentValue, optionTags);
                    return (
                      <Radio.Group
                        value={currentValue}
                        onChange={(_, v) => changeCurrentValue(rowIndex, v)}
                      >
                        {optionTags.map(({ name, value }) => (
                          <Radio value={value}>{name}</Radio>
                        ))}
                      </Radio.Group>
                    );
                  } else if (reviewType === "20") {
                    return (
                      <InputNumber
                        style={{ maxWidth: 100 }}
                        borderType="bordered"
                        min={scoreLow}
                        max={scoreHigh}
                        value={currentValue}
                        onChange={(e) =>
                          changeCurrentValue(rowIndex, e.target.value)
                        }
                        decimalLength={decimal}
                      />
                    );
                  } else if (reviewType === "30") {
                    return (
                      <Rate
                        allowHalf={false}
                        value={currentValue}
                        onChange={(value) =>
                          changeCurrentValue(rowIndex, value)
                        }
                      />
                    );
                  }
                  return currentValue;
                },
              }
            : {};
          return {
            code,
            name,
            width: children ? 400 : code === "itemGroupLongName" ? 200 : 100,
            align: "left",
            ...otherProps,
          };
        });
        const isExpend = useMemo(
          () =>
            Object.keys(expandStatus).filter(
              (key) => expandStatus[key] === true
            )?.length,
          [expandStatus]
        );
        return (
          <div>
            <div className="examine-header">{topGroupName}</div>
            <Table
              className={isExpend ? "expend-table" : "unexpend-table"}
              useOuterBorder={false}
              dataSource={dataSource}
              columns={columns}
              columnGroupExtend={{
                extendStatus: expandStatus,
                onChangeExtendStatus: onChangeExtendStatus,
              }}
            />
          </div>
        );
      }
      const Root = (props) => {
        const [store, setStore] = useState({
          model: props?.model,
          customProps: props?.customProps,
          data: props?.customProps?.data?.data, // 所有数据
          isEdit: props?.customProps?.data?.pageStatus === "edit", // 组件状态  edit or  view
          I18N: props?.I18N,
        });

        useEffect(() => {
          const updateSub = eventBus.sub(model, "update", (customProps) => {
            const isEdit = customProps?.data?.pageStatus === "edit";
            const data = customProps?.data?.data;
            setStore((state) => ({ ...state, data, isEdit }));
          });
          return () => {
            eventBus.unsub(updateSub);
          };
        }, []);
        const changeCurrentValue = (index, rowIndex, value) => {
          const newData = [...data];
          newData[index].capItems[rowIndex].reviewType.currentValue = value;
          setStore((state) => ({ ...state, data: newData }));

          model.invoke("changeCurrentValue", {
            itemId: newData[index].capItems[rowIndex].itemId,
            value,
          });
        };
        const { isEdit, data } = store;
        return (
          <div
            className={
              isEdit
                ? "qualification-examine-container"
                : " qualification-examine-container qualification-examine-container-view"
            }
          >
            <div className="qualification-examine-warpper">
              {data && data.length
                ? data.map((item, index) => (
                    <Item
                      key={item.topGroupId}
                      data={item}
                      changeCurrentValue={(rowIndex, value) =>
                        changeCurrentValue(index, rowIndex, value)
                      }
                    ></Item>
                  ))
                : null}
            </div>
          </div>
        );
      };

      ReactDOM.render(
        <Root model={model} customProps={primaryProps} I18N={I18N} />,
        model.dom
      );
    });
  };

  const ReactComponent = getReactComponent(setHtml);

  // 注册自定义组件
  KDApi.register("examine", ReactComponent);
})(window.KDApi);
