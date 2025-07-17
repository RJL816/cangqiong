/**
 *  自定义控件书写模板
 */
(function (KDApi, $) {
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function DeptRankBookInadvancedDays(model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    var isUpdate = false;
    DeptRankBookInadvancedDays.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {
            isUpdate = false;
			setHtml(this.model, props, isUpdate)
        },
        update: function (props) {
            isUpdate = true;
            setHtml(this.model, props, isUpdate)
        },
        destoryed: function () {
        }
    }

    var setHtml = function (model, props, isUpdate) {
        var jsPath = ["./css/tripboard.css"];
		 KDApi.loadFile(jsPath, model, function () {
        			 if (isUpdate&&props.data&&props.data.bookInAdvancedDays.others.length>0) {
        				   KDApi.templateFilePath('./html/container_bookinadvance.html', model, {}).then(
                        function (result) {
                            model.dom.innerHTML = result;
                            loadData(model, props);
                        }
                    )
        			 }else{
							 KDApi.templateFilePath('./html/container_bookinadvance.html', model, {}).then(
                        function (result) {
                            model.dom.innerHTML = result;
                            var chartDom = document.getElementById('dept-rank-bookinadvanceddays-table-container');
						 var emptyDom = document.getElementsByClassName('kd-cq-empty-bookinadvanceddays');
						 emptyDom[0].setAttribute("style","display:block;text-align:center;mix-blend-mode:multiply;");
						 chartDom.setAttribute("style","display:none");
                        }
                    )
					 }

                })
    }

        function createRankingContainer(top3) {
            const content = document.getElementById('dept-rank-bookinadvanceddays-content');
			var w=content.style.width;
			var h=content.style.height;
            const container = document.getElementById('dept-rank-bookinadvanceddays-ranking-container');
			container.style.width=content.clientWidth+"px";
			container.style.height=content.clientHeight+"px";
            top3.forEach(item => {
                const rankingItem = document.createElement('div');
                rankingItem.className = `ranking-item ${item.class}`;
                rankingItem.innerHTML = `
                    <div class="airline">${item.deptName}</div>
                    <div class="orders">${item.bookinadvanceddays}</div>
                `;
                container.appendChild(rankingItem);
            });

            return container;
        }

        function createTable(others) {
          const content = document.getElementById('dept-rank-bookinadvanceddays-table-container');
		   const emptyDom = document.getElementsByClassName('kd-cq-empty-bookinadvanceddays');
			   	emptyDom[0].setAttribute("style","display:none");
				content.setAttribute("style","display:block;");
            const table = document.createElement('table');
			table.setAttribute("id","dept-rank-bookinadvanceddays-innertable");

            table.innerHTML = `
                <thead>
                    <tr>
                        <th>排名</th>
                        <th>部门</th>
                        <th>平均提前天数</th>
                       
                    </tr>
                </thead>
                <tbody>
                    ${others.map(item => `
                        <tr>
                            <td>${item.rank}</td>
                            <td>${item.deptName}</td>
                            <td>${item.bookinadvanceddays}</td>
                            
                        </tr>
                    `).join('')}
                </tbody>
            `;
			content.appendChild(table);
            return content;
        }

    

       

    var loadData = function (model, props) {
			  const content = document.getElementById('dept-rank-bookinadvanceddays-content');
			const parentNode=content.parentNode;
			var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			var h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			console.log("浏览器宽度:"+parentNode.clientHeight*0.3*0.95);
			content.style.width=w*0.3+"px";
			content.style.height=h*0.3+"px";
           // const rankingContainer = createRankingContainer(props.data.bookInAdvancedDays.top3);
            const table = createTable(props.data.bookInAdvancedDays.others);

          //  content.appendChild(rankingContainer);
            content.appendChild(table);

    }

    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('kingdee-fi-deptrank-bookinadvance', DeptRankBookInadvancedDays)
})(window.KDApi) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4