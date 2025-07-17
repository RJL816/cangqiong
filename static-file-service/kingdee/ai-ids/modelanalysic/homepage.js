window.ai_ids = window.ai_ids || {};
ai_ids["homePage_template"] = (function () {
  return {
    width: 0,
    containerId: "", //苍穹：customcontrolapsankey 本地：ids__modelAna_container
    containerWidth: "",
    svg: null,
    mode: -1, // 浏览模式  -1：全览模式   0：点击第一层的模式（看某个客户或仓库的详情） 1:点击第二层的模式（看某个物料分组的详情）

    containerHAndW: null,
    templateData: [
      {
        chartKey: "homePage",
        viewType: "d3chart",
        chartTitle: {
          text: "",
          bottom: "0",
          left: "40%"
        },
        beforeMount: function (options) {
          let chartData = options.chartData;
          let status =
            (chartData && chartData.data && chartData.data.status) || "3";
          let pageId = chartData && chartData.pageId;
          const appArr = [
            [
              {
                appName: "应用配置",
                formId: "ids_application_config",
                imgPath: "app_setting_load.png"
              },
              {
                appName: "设置数据来源",
                formId: "ids_application_config",
                imgPath: "data_source_setting.png"
              },
              {
                appName: "评估数据质量",
                formId: "ids_application_config",
                imgPath: "data_mulation.png"
              },
              {
                appName: "设置预测目标",
                formId: "ids_application_config",
                imgPath: "permit_target_setting.png"
              }
            ],
            [
              {
                appName: "数据分析",
                formId: "ids_material_sale_ana",
                imgPath: "ana_data_load.png"
              },
              {
                appName: "物料销售分析",
                formId: "ids_material_sale_ana",
                imgPath: "material_sale.png"
              },
              {
                appName: "数据标注",
                formId: "ids_model_ana_outlier",
                imgPath: "data_error_ana.png"
              }
              // {
              //   appName: '分析报告',
              //   formId: 'ids_data_analysis_report',
              //   imgPath: 'ana_report.png',
              // },
            ],
            [
              {
                appName: "模型效果",
                formId: "ids_model_analysis",
                imgPath: "model_result_load.png"
              },
              {
                appName: "模型分析",
                formId: "ids_model_analysis",
                imgPath: "model_ana.png"
              },
              {
                appName: "预测明细",
                formId: "ids_predict_detail_list",
                imgPath: "predict_detail.png"
              },
              {
                appName: "总览",
                formId: "ids_sf_home_overview",
                imgPath: "overview.png"
              }
            ]
          ];

          console.log("chartData is ", chartData);

          function welcomXiaoK() {
            var params = {
              container: document.getElementById("xiaok"),
              renderer: "svg",
              loop: false,
              autoplay: true,
              animationData: window.animationData
            };

            var anim;

            anim = bodymovin.loadAnimation(params);
          }
          function calculateXiaoK() {
            var params = {
              container: document.getElementById("xiaok"),
              renderer: "svg",
              loop: true,
              autoplay: true,
              animationData: window.xiaoKCalcData
            };

            var anim;

            anim = bodymovin.loadAnimation(params);
          }
          function defaultXiaoK() {
            var params = {
              container: document.getElementById("xiaok"),
              renderer: "svg",
              loop: true,
              autoplay: true,
              animationData: window.xiaoDefaultData
            };

            var anim;

            anim = bodymovin.loadAnimation(params);
          }
          //卡片间的箭头动画
          function arrowAnimation(status) {
            // 兼容IE11 特性
            const arrowId = "#arrow_" + status + " img"; // `#arrow_${status} img`;
            clearOtherAnimationCls(status); //清除其他箭头动画
            const curArrow = document.querySelector(arrowId);
            if (curArrow) {
              curArrow.classList.add("ids__arrow__animation");
            }
          }
          //清除其他不在新status的箭头动画
          function clearOtherAnimationCls(status) {
            const curAnimArrow = document.querySelector(
              ".ids__arrow__animation"
            );
            // 兼容IE11 特性
            const curArrowId = "arrow_" + status; //  `arrow_${status}`;
            if (curAnimArrow) {
              const id = curAnimArrow.id;
              if (id != curArrowId) {
                curAnimArrow.classList.remove("ids__arrow__animation");
              }
            }
          }
          // arrowAnimation('#arrow_2')

          //清除其他选中的card
          function clearOtherSelcted(status) {
            const curCard = document.querySelector(".card_status_selected");
            // 兼容IE11 特性
            const curStatusId = "card_status_" + status; // `card_status_${status}`;
            if (curCard) {
              const id = curCard.id;
              console.log("id is ", id);
              if (id != curStatusId) {
                curCard.classList.remove("card_status_selected");
              }
            }
          }
          //切换card的整体效果
          function changeCardStatus(status) {
            console.log("status is ", status);
            clearOtherSelcted(status);
            // 兼容IE11 特性
            const curCardId = "#card_status_" + status; // `#card_status_${status}`;
            const curCard = document.querySelector(curCardId);
            console.log("curCard is ", curCard);
            if (curCard) {
              //background-image
              // curCard.style['backgroundImage'] = '../assets/module_selected.png'
              // console.log('curCard is ', curCard.style.backgroundImage)
              curCard.classList.add("card_status_selected");
            }
          }
          changeCardStatus(status);
          //设置小K的对话框背景
          function setXialKDialog(status) {
            status = String(status);
            const xiaokDialogBG = document.querySelector(".ids__info_tip");
            let cls = "";
            switch (status) {
              case "1":
                cls = "app_setting_dialog";
                break;
              case "2":
                cls = "data_analysic_dialog";
                break;
              case "3":
                cls = "model_result_dialog";
                break;
            }
            if (xiaokDialogBG) {
              xiaokDialogBG.classList.add(cls);
            }
          }
          //设置小K 话术
          function setxiaokTip(status) {
            const xiaokTip = document.querySelector(".ids__BIC__text");
            let xiaoKText = "";
            status = String(status);
            switch (status) {
              case "1":
                xiaoKText =
                  "欢迎使用智能销售预测应用，点击 应用配置 开始相关内容的配置；<br/>配置完成后，小K会运用AI算法为您自动进行数据分析及模型分析。";
                break;
              case "2":
                xiaoKText =
                  "您已配置完成，小K正在为您快马加鞭的运算；<br/>结果输出前，您可点击 数据分析 预先进行数据概况的了解。";
                break;
              case "3":
                xiaoKText =
                  "您的模型结果已输出，点击 模型效果 进行结果查看；<br/>结合预测明细及分析报告可理解结果影响因子及效果评估。";
                break;
            }
            console.log("dddd is", xiaoKText);
            xiaokTip.innerHTML = xiaoKText;
          }
          //缓存动画对象
          let cache = {};
          //设置卡片内应用的动画
          function changeCardAppAnim(status) {
            status = String(status);
            // 兼容IE11 特性
            const cardId = "#card_status_" + status + " .ids__animation"; //`#card_status_${status} .ids__animation`;

            if (cache.hasOwnProperty(status)) {
              cache[status].play();
            } else {
              var params1 = {
                container: document.querySelector(cardId), //document.getElementById('ids__app_setting'),
                renderer: "svg",
                loop: true,
                autoplay: true,
                animationData: window.imgAnimatinData
              };
              var anim2 = bodymovin1.loadAnimation(params1);
              cache[status] = anim2;
            }

            //隐藏其他静态图片
            // const hideImgCls = `#card_status_${status} .ids__app_circle`
            // const hideDom = document.querySelector(hideImgCls)
            // if (hideDom) {
            //   hideDom.style.display = 'none'
            // }
          }
          //清除其他卡片内动画
          function clearOtherAppAnim(status) {
            const allAppCircles = document.querySelectorAll(".ids__app_circle");
            for (let i = 0; i < allAppCircles.length; i++) {
              // const display=
            }
          }

          function setStatus(status) {
            console.log("set status is ", status);
            if (status == 1) {
              welcomXiaoK();
            } else if (status == 2) {
              calculateXiaoK();
            } else if (status == 3) {
              defaultXiaoK();
            }
            changeCardStatus(status);

            arrowAnimation(status);
            setXialKDialog(status);
            //设置xiao K 话术
            setxiaokTip(status);

            //卡片内应用动画
            // changeCardAppAnim(status)
            for (let i = 1; i <= 3; i++) {
              changeCardAppAnim(i);
            }
          }
          function getTargetElement(target, attr, attrVal) {
            while (target && !target.getAttribute(attr)) {
              target = target.parentNode;
            }
            return target;
          }
          //注册事件
          function initEvent() {
            //各个卡片的事件注册
            const moduleList = document.querySelectorAll(".ids__app_bg");
            for (let i = 0; i < moduleList.length; i++) {
              const module = moduleList[i];
              module.addEventListener(
                "click",
                function (e) {
                  const target = getTargetElement(e.target, "data-formId");
                  const formId = target.getAttribute("data-formId");
                  console.log("you click formID is ", formId);
                  window.IDS_ModelAna_Utils.sendEvent(
                    "menuClick",
                    {
                      // fdate,  //接口改版 fdate 弃     用 fstartdate   fenddate 表示起始和结束时间，如果是同一天则相同
                      formId: formId
                    },
                    pageId
                  );
                },
                true
              );
            }
            //文本点击
            const appList = document.querySelectorAll(".ids__app_name");
            for (let i = 0; i < appList.length; i++) {
              const app = appList[i];
              app.addEventListener(
                "click",
                function (e) {
                  const target = e.target;
                  const formId = target.getAttribute("data-formId");
                  console.log("formId is ", formId);
                  window.IDS_ModelAna_Utils.sendEvent(
                    "menuClick",
                    {
                      // fdate,  //接口改版 fdate 弃     用 fstartdate   fenddate 表示起始和结束时间，如果是同一天则相同
                      formId: formId
                    },
                    pageId
                  );
                },
                false
              );
            }
            const cardImgs = document.querySelectorAll(".ids__load");
            for (let i = 0; i < cardImgs.length; i++) {
              const app = cardImgs[i];
              app.addEventListener(
                "click",
                function (e) {
                  const target = getTargetElement(e.target, "data-formId");
                  const formId = target.getAttribute("data-formId");
                  console.log("formId is ", formId);
                  window.IDS_ModelAna_Utils.sendEvent(
                    "menuClick",
                    {
                      // fdate,  //接口改版 fdate 弃     用 fstartdate   fenddate 表示起始和结束时间，如果是同一天则相同
                      formId: formId
                    },
                    pageId
                  );
                },
                false
              );
            }
          }

          function renderCard(container, appList) {
            const moduleInfo = appList.shift();
            console.log("renderCard moduleInfo is ", moduleInfo);

            const moduleTitleDom = document.createElement("span");
            moduleTitleDom.className = "ids__app_name";
            moduleTitleDom.setAttribute("data-formId", moduleInfo.formId);
            moduleTitleDom.textContent = moduleInfo.appName;

            container.appendChild(moduleTitleDom);

            const moduleDom = document.createElement("div");
            moduleDom.className = "ids__load";
            moduleDom.setAttribute("data-formId", moduleInfo.formId);
            const moduleImgDom = document.createElement("img");
            moduleImgDom.className = "ids__app_img";
            //"./homePage/assets/"
            moduleImgDom.src =
              "./kingdee/ai-ids/modelanalysic/homePage/assets/" +
              moduleInfo.imgPath;
            moduleImgDom.style.cssText = "left:50%;margin-left:-105px;"; // ie11 兼容时调整一下
            // "./kingdee/ai-ids/modelanalysic/homePage/assets/" +   // ie11 兼容
            // moduleInfo.imgPath;

            moduleDom.appendChild(moduleImgDom);
            const animDom = document.createElement("div");
            animDom.className = "ids__animation";
            animDom.id = "ids__app_setting";
            moduleDom.appendChild(animDom);

            // const circleDom = document.createElement('div')
            // circleDom.className = 'ids__app_circle'

            // const circleImg1 = document.createElement('img')
            // circleImg1.className = 'ids__app_circle__inner'
            // circleImg1.src =
            //   './kingdee/ai-ids/modelanalysic/homePage/images/img_5.png'

            // const circleImg2 = document.createElement('img')
            // circleImg2.className = 'ids__app_circle__outer'
            // circleImg2.src =
            //   './kingdee/ai-ids/modelanalysic/homePage/images/img_4.png'

            // circleDom.appendChild(circleImg1)
            // circleDom.appendChild(circleImg2)
            // moduleDom.appendChild(circleDom)

            container.appendChild(moduleDom);
            const appListDom = document.createElement("div");
            appListDom.className = "ids__card__app_list";
            appList.forEach(function (appInfo, appIdx) {
              renderAppList(appInfo, appIdx, appListDom);
            });
            container.appendChild(appListDom);
          }

          function renderAppList(appInfo, appIdx, container) {
            const appWrapper = document.createElement("div");
            appWrapper.className = "ids__app_bg";
            appWrapper.setAttribute("data-formId", appInfo.formId);
            let img_path =
              "./kingdee/ai-ids/modelanalysic/homePage/assets/" +
              appInfo.imgPath;
            // "./kingdee/ai-ids/modelanalysic/homePage/assets/" +  // ie11 兼容
            // appInfo.imgPath;
            //     const innerHTMLStr = `<img
            //   src="./kingdee/ai-ids/modelanalysic/homePage/assets/${appInfo.imgPath}"
            //   style="width: 65px; height: 82px; margin-left: 40px;"
            // />
            // <div class="ids__app_tip">
            //   <span>${appInfo.appName}</span>
            // </div>`;

            // ./assets/
            const innerHTMLStr =
              '<img src="' +
              img_path +
              '" style="width: 65px; height: 82px; margin-left: 40px;"/><div class="ids__app_tip"><span>' +
              appInfo.appName +
              "</span></div>";
            appWrapper.innerHTML = innerHTMLStr;
            container.appendChild(appWrapper);
          }

          function renderXiaoK(fragment) {
            const xiaoKDom = document.createElement("div");
            xiaoKDom.className = "ids__line";
            //   xiaoKDom.innerHTML = `          <div id="xiaok"></div>
            // <div class="ids__info_tip"><div class="ids__BIC__text"></div></div>`;
            xiaoKDom.innerHTML =
              '<div id="xiaok"></div><div class="ids__info_tip"><div class="ids__BIC__mask"></div><div class="ids__BIC__text"></div></div>';

            // fragment.append(xiaoKDom);
            fragment.appendChild(xiaoKDom);
          }
          function render() {
            const fragment = document.createDocumentFragment();
            const ballDom = document.createElement("div");
            ballDom.className = "ids__ball";
            // fragment.append(ballDom);
            fragment.appendChild(ballDom);
            const innerWrapper = document.createElement("div");
            innerWrapper.className = "inner_wrapper";
            // fragment.append(innerWrapper);
            fragment.appendChild(innerWrapper);
            renderXiaoK(innerWrapper);
            const app_listDom = document.createElement("div");
            app_listDom.className = "ids__app_list";
            // innerWrapper.append(app_listDom);
            innerWrapper.appendChild(app_listDom);
            appArr.forEach(function (appList, idx) {
              const cardDom = document.createElement("div");
              cardDom.classList.add("ids__card");
              // 兼容IE11 特性
              // cardDom.classList.add(`ids__card_${idx + 1}`);
              cardDom.classList.add("ids__card_" + (idx + 1));
              // 兼容IE11 特性
              cardDom.id = "card_status_" + (idx + 1); //`card_status_${idx + 1}`;
              renderCard(cardDom, appList);
              // app_listDom.append(cardDom);
              app_listDom.appendChild(cardDom);
              if (idx != 2) {
                const arrowDom = document.createElement("div");
                arrowDom.className = "ids__arrow";
                // 兼容IE11 特性
                arrowDom.id = "arrow_" + (idx + 2); //`arrow_${idx + 2}`;
                const imgDom = document.createElement("img");
                imgDom.src =
                  "./kingdee/ai-ids/modelanalysic/homePage/assets/arrow.png"; //"./homePage/assets/arrow.png";
                arrowDom.appendChild(imgDom);

                const bgDom = document.createElement("div");
                bgDom.className = "ids__arrow_bgAnim";
                // 兼容IE11 特性
                bgDom.id = "ids__arrow_bgAnim__" + (idx + 2); //`ids__arrow_bgAnim__${idx + 2}`;
                // arrowDom.append(bgDom);
                arrowDom.appendChild(bgDom);
                // app_listDom.append(arrowDom);
                app_listDom.appendChild(arrowDom);
              }

              // cardDom.className="ids__card"
            });
            const root = document.querySelector("#saleforecasthomepage");
            root.appendChild(fragment);
          }
          function startParticalLineAnim(id) {
            var params = {
              container: document.querySelector(id),
              renderer: "svg",
              loop: true,
              autoplay: true,
              animationData: window.partical_line_animData
            };

            var anim;

            anim = particalLine.loadAnimation(params);
          }
          render();
          startParticalLineAnim("#ids__arrow_bgAnim__2"); //  // 兼容IE11 特性
          startParticalLineAnim("#ids__arrow_bgAnim__3"); // 兼容IE11 特性
          setStatus(status);
          initEvent();
        },
        mounted: function () { }
      }
    ]
  };
})();
