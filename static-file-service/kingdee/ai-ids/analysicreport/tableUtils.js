;window.Table_Utils=(function(){
    return {
        renderTable:function(tableData,fragment){
            let data=tableData.data;
            let title=tableData.title;
            let columns=tableData.columns;
            if(data && data.length > 0){
                if(title){
                    $$title=document.createElement('H3');
                    $$title.textContent=title;
                    fragment.appendChild($$title);
                }
                var $$tableContainer=document.createElement('DIV');
                $$tableContainer.className="ids__report__table_wrapper"
                var $$table=document.createElement("TABLE");
                var $$body=document.createElement('TBODY')
                
                this._createTableHead(columns,$$table)

                this._createTableBody(data,columns,$$body);
                $$table.appendChild($$body);
                
                $$tableContainer.appendChild($$table);
                fragment.appendChild($$tableContainer);
            }
        },
        _createTableHead:function(columns,fragment){
            var l=columns.length;
            var tdWidth;
            if(columns.length > 10){
                tdWidth= '140px';
            }else{
                tdWidth= Math.floor(98 / l) + '%';
            }
            var str="";
            columns.forEach(column=>{
                str+="<th style='width:"+tdWidth+"'>"+column+"</th>"
            })
            var $$thead=document.createElement('THEAD');
            var $$tr=document.createElement('TR');

            // var $$headTr=document.querySelector('table thead tr');
            $$tr.innerHTML=str;
            $$thead.appendChild($$tr);
            fragment.appendChild($$thead);
        },
        _createTableBody:function(bodyData,columns,$$body){
            var l=columns.length;
            // var tdWidth= (92 / l) + '%'
            var tdWidth;
            if(l > 10){
                tdWidth= '140px';
            }else{
                tdWidth= Math.floor(98 / l) + '%';
            }
            bodyData.map(item=>{
                var $$bodyTr=document.createElement('TR');
                var bodyStr="";
                item.forEach(v=>{
                    v=String(v).split('\n');
                    bodyStr+="<td style='width:"+tdWidth+"'>";
                    v.forEach(function(str){
                        var cls="ids__report__block"
                        if(v.length > 1){
                            cls+=" ids__report__block_left";
                        }
                        bodyStr+="<span class='"+cls+"'>"+str+"</span>"
                    })
                    bodyStr+="</td>"
                    // bodyStr+="<td style='width:"+tdWidth+"'>"+v+"</td>"
                })
                $$bodyTr.innerHTML=bodyStr;
                $$body.appendChild($$bodyTr)
            })
        }
    }
})();