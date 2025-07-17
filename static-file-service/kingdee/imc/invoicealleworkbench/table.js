/* global $*/
// eslint-disable-next-line
function fpy_table() {
    const TClass = {};
    const Tool = {};
    const DataStore = {};
    const Option = {};
    Tool.createHeader = (htmls, dataStore, option) => {
        const columns = dataStore.columns;
        const dataSource = dataStore.dataSource;
        const selectedRowKeys = dataStore.selectedRowKeys;
        const disabledFun = dataStore.disabled;
        htmls.push(`
            <table
                class="workbench-table-header"
                style="width: 100%; border-spacing: 0; color: ${option.color}; font-size: ${option.size}px; text-align: ${option.align}"
            >
        `);

        Tool.createColgroup(htmls, dataStore);

        htmls.push(`<thead style="color: ${option.headerColor}; background-color: ${option.headerBgColor}; font-size: ${option.headerSize}px;">
        <tr style="height: ${option.rowHeight}px;">`);
        // 复选框
        if (selectedRowKeys) {
            const checked = selectedRowKeys.length === dataSource.length;
            let disabled = true;
            if (typeof disabledFun === 'function') {
                for (let i = 0; i < dataSource.length; i++) {
                    if (!disabledFun(dataSource[i])) {
                        disabled = false;
                        break;
                    }
                }
            } else {
                disabled = false;
            }
            htmls.push(`<th>
                <div class="checkbox">
                    <input data-type="all" type="checkbox" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} />
                    <div class="label"></div>
                </div>
            </th>`);
        }
        for (let i = 0; i < columns.length; i++) {
            let style = '';
            if (columns[i].align) {
                style = 'text-align: ' + columns[i].align;
            }
            htmls.push(`<th ${style ? `style="${style}"` : ''} class=${option.isResizer ? 'isResizer' : ''}>${columns[i].title}${option.isResizer ? '<div class="resizer"></div>' : ''}</th>`);
        }
        htmls.push('</tr></thead></table>');
    };
    Tool.createColgroup = (htmls, option) => {
        const columns = option.columns;
        const selectedRowKeys = option.selectedRowKeys;
        // 宽度
        htmls.push('<colgroup>');
        if (selectedRowKeys) {
            htmls.push('<col style="width: 40px; min-width: 40px"></col>');
        }
        for (let i = 0; i < columns.length; i++) {
            htmls.push('<col style="width: ' + (columns[i].width || '') + 'px; min-width: ' + (columns[i].width || '') + 'px;"></col>');
        }
        htmls.push('</colgroup>');
    };
    Tool.createRow = (htmls, index, dataStore, option) => {
        const columns = dataStore.columns;
        const dataSource = dataStore.dataSource[index];
        const rowKey = dataStore.rowKey;
        const selectedRowKeys = dataStore.selectedRowKeys;
        const disabledFun = dataStore.disabled;
        const openKey = option.openKey;
        htmls.push(`
            <tr
                data-key="${dataSource[rowKey]}"
                style="height: ${option.rowHeight}px; background-color: ${index % 2 ? option.oddBgColor : option.evenBgColor};"
            >`
        );
        if (selectedRowKeys) {
            const checked = selectedRowKeys.includes(dataSource[rowKey]);
            let disabled = false;
            if (typeof disabledFun === 'function') {
                disabled = disabledFun(dataSource);
            }
            htmls.push(`<td>
                <div class="checkbox">
                    <input type="checkbox" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} />
                    <div class="label"></div>
                </div>
            </td>`);
        }
        for (let i = 0; i < columns.length; i++) {
            let val = columns[i].dataIndex ? dataSource[columns[i].dataIndex] : index;
            let style = '';
            let title = '';
            if (columns[i].align) {
                style = 'text-align: ' + columns[i].align;
            }
            if (typeof columns[i].render === 'function') {
                val = columns[i].render(val, dataSource, index);
            }
            if (columns[i].ellipsis) {
                title = (val + '').replace(/<[^>]+>/g, '').trim();
            }
            
            htmls.push(`<td class="truncateText" ${style ? `style="${style}"` : ''} ${title ? `title="${title}"` : ''}>${val}</td>`);
        }
        htmls.push('</tr>');
        
        // 如果存在嵌套数据 (list)，则创建嵌套表格
        if (dataSource[openKey] && dataSource.id === option.negativeOpenKey) {
            Tool.createNestedTable(htmls, dataSource[openKey], option);
        }
    };
    Tool.render = (id, tag) => {
        const htmls = [];
        const dataStore = DataStore[id];
        const option = Option[id];

        // 分页
        const pagination = dataStore.pagination;
        if (pagination && pagination.totalPage > 1) {
            const { pageIndex, total, totalPage } = pagination;
            const selectedLength = dataStore.selectedRowKeys.length;
            
            // <span style="margin-left: 8px">（已选${option.allChecked ? total : selectedLength}/${total}）</span>
            htmls.push(`
                <div class="workbench-table-pagination">
                    ${dataStore.selectedRowKeys ? `<div class="page-header">
                        <div class="checkbox">
                            <input type="checkbox" ${option.allChecked ? 'checked' : ''}  data-type=allData />
                            <div class="label"></div>
                        </div>
                        <span style="margin-left: 8px">全选（全部数据）</span>
                    </div>` : `<div></div>`}
                    <section class="page-info">
                        <span style="margin-right: 12px">共${totalPage}页</span>
                        <span>
                            第
                            <input style="margin-left: 4px; margin-right: 4px; text-align: center;" data-type=all name=pageIndex value=${pageIndex} />
                            页
                        </span>
                        <div class=${pageIndex === 1 ? "tableFirstPageDisable" : "tableFirstPage"} data-key="first"  data-id=${id}></div>
                        <div class=${pageIndex === 1 ? "tablePreDisable" : "tablePre"} data-key="pre" data-id=${id}></div>
                        <div class=${pageIndex === totalPage ? "tableNextDisable" : "tableNext"} data-key="next" data-id=${id}></div>
                        <div class=${pageIndex === totalPage ? "tableLastPageDisable" : "tableLastPage"} data-key="last" data-id=${id}></div>
                    </section>
                </div>
            `)
            // htmls.push(`
            //     <div class="workbench-table-pagination">
            //         <span style="margin-right: 12px">共${totalPage}页</span>
            //         <span>
            //             第
            //             <input style="margin-left: 4px; margin-right: 4px; text-align: center;" data-type=all name=pageIndex value=${pageIndex} />
            //             页
            //         </span>
            //         <span class=${pageIndex === 1 ? "tableFirstPageDisable" : "tableFirstPage"} data-key="first"  data-id=${id}></span>
            //         <span class=${pageIndex === 1 ? "tablePreDisable" : "tablePre"} data-key="pre" data-id=${id}></span>
            //         <span class=${pageIndex === totalPage ? "tableNextDisable" : "tableNext"} data-key="next" data-id=${id}></span>
            //         <span class=${pageIndex === totalPage ? "tableLastPageDisable" : "tableLastPage"} data-key="last" data-id=${id}></span>   
            //     </div>
            // `);
        }

        // 头部滚动
        if (dataStore.scroll.y) {
            htmls.push(`<div class="hide-scrollbar" style="overflow-y: scroll; background-color: ${option.headerBgColor};">`);
        }
        // 头部
        Tool.createHeader(htmls, dataStore, option);

        if (dataStore.scroll.y) {
            htmls.push('</div>');
            htmls.push('<div class="workbench-scroll" style="height: ' + dataStore.scroll.y + 'px; overflow-y: scroll; margin: -1px 0">');
        }

        if (dataStore.scroll.x) {
            htmls.push('<div class="workbench-scroll" style="height: ' + dataStore.scroll.h + 'px; overflow-y: auto; overflow-x: hidden;width: ' + dataStore.scroll.x + 'px;">');
        }

        htmls.push(`
            <table
                class="workbench-table-tbody"
                rules="rows"
                style="
                    width: 100%;
                    border-spacing: 0;
                    color: ${option.color};
                    font-size: ${option.size}px;
                    text-align: ${option.align};
                    border: 2px solid ${option.headerBgColor};
                    margin: -1px 0;
                "
            >
        `);
        // 宽度
        Tool.createColgroup(htmls, dataStore);
        for (let i = 0; i < dataStore.dataSource.length; i++) {
            Tool.createRow(htmls, i, dataStore, option);
        }
        htmls.push('</table>');

        if (dataStore.scroll.y) {
            htmls.push('</div>');
        }
        if (dataStore.scroll.x) {
            htmls.push('</div>');
        }
        // 合计
        const showTotal = dataStore.showTotal;
        if (showTotal) {
            if (dataStore.scroll.y) {
                htmls.push(`<div class="hide-scrollbar" style="overflow-y: scroll; background-color: ${option.headerBgColor};">`);
            }
            htmls.push(`
                <table
                    class="workbench-table-footer"
                    rules="rows"
                    style="
                        width: 100%;
                        border-spacing: 0;
                        color: ${option.color};
                        font-size: ${option.size}px;
                        text-align: ${option.align};
                        border: 1px solid ${option.headerBgColor};
                        background-color: ${option.totalBgColor};
                    "
                >
            `);
            // 宽度
            Tool.createColgroup(htmls, dataStore);

            htmls.push(`<tr style="height: ${option.rowHeight}px;">`);

            if (dataStore.selectedRowKeys) {
                htmls.push('<td></td>');
            }
            for (let i = 0; i < dataStore.columns.length; i++) {
                const obj = dataStore.columns[i];
                let style = '';
                if (obj.align) {
                    style = 'text-align: ' + obj.align;
                }
                const val = showTotal[obj.dataIndex];
                if (obj.showTotal && typeof val !== 'undefined') {
                    htmls.push(`<td class="truncateText ${obj.dataIndex}" ${style ? `style="${style}"` : ''} title="${val}">${val}</td>`);
                } else {
                    htmls.push('<td></td>');
                }
            }

            htmls.push('</tr>');

            htmls.push('</table>');
            if (dataStore.scroll.y) {
                htmls.push('</div>');
            }
        }

        tag.html(htmls.join(''));
    };
    Tool.getValue = (value, defalutValue) => typeof value === 'undefined' ? defalutValue : value;
    Tool.resizer = (id) => {
        $(document).ready(function() {
            let startX, startWidth, resizer, headTableCol, bodyTableCol;
            
            $('#' + id).find(".resizer").on("mousedown", function(e) {
                const index = $(this).closest("th").index();
                headTableCol = $(this).closest("table").find('col').eq(index);
                startX = e.pageX;
                startWidth = headTableCol.width();

                bodyTableCol = $('#' + id).find('table').eq(1).find('col').eq(index);

                $(document).on("mousemove", onMouseMove);
                $(document).on("mouseup", onMouseUp);

                e.preventDefault(); // Prevent text selection
            });

            function onMouseMove(e) {
                const newWidth = startWidth + (e.pageX - startX);
                headTableCol.width(newWidth);
                bodyTableCol.width(newWidth);

                if ($('#' + id).find('.workbench-scroll')) {
                    const headTableWidth = $('#' + id).find('table').eq(0).width();
                    $('#' + id).find('.workbench-scroll').css({
                        'width': headTableWidth + 'px',
                        'overflow-x': 'hidden'
                    })
                }
            }

            function onMouseUp() {
                $(document).off("mousemove", onMouseMove);
                $(document).off("mouseup", onMouseUp);
            }
        });
    }
    Tool.mergeTableRows = (id, columnIndex) => {
        // columnIndex 根据第几行合并
        let prevCell = null;
        let rowspan = 1;
        $('#' + id).find('tbody tr').each(function() {
            let cell = $(this).find('td').eq(columnIndex);
            if (prevCell == null) {
                prevCell = cell;
            } else if (cell.text() === prevCell.text()) {
                rowspan++;
                cell.remove();
                prevCell.attr('rowspan', rowspan);
                prevCell.css({ border: '1px solid #f3f3f5' });
            } else {
                prevCell = cell;
                rowspan = 1;
            }
        });
    },
    Tool.createNestedTable = (htmls, nestedData, option) => {
        const openTitle = option.openTitle;
        const confirmstatusList = option.confirmstatusList;
        htmls.push(`<tr><td colspan="12">`);
        htmls.push(`
            <table class="nested-table" style="width: 100%; border-spacing: 0; border-collapse: collapse;">
        `);
        htmls.push('<thead><tr>');
        
        // 假设嵌套表格的列是固定的
        for (let i = 0; i < openTitle.length; i++) {
            htmls.push(`<th style="width: ${openTitle[i].width}px">${openTitle[i].name}</th>`);
        }
        htmls.push('</tr></thead><tbody>');

        if (!nestedData.length) {
            htmls.push('<tr>');
            htmls.push(`<td colspan="9">暂无数据</td>`);
            htmls.push('</tr>');
        }
        
        // 填充嵌套表格的行
        for (let i = 0; i < nestedData.length; i++) {
            htmls.push('<tr>');
            htmls.push(`<td>${i + 1}</td>`);
            htmls.push(`<td>${nestedData[i].originalinvoicecode || '--'}</td>`);
            htmls.push(`<td>${nestedData[i].originalinvoiceno || '--'}</td>`);
            htmls.push(`<td>${nestedData[i].number || '--'}</td>`);
            htmls.push(`<td>${nestedData[i].buyername || '--'}</td>`);
            htmls.push(`<td>${nestedData[i].oriinvoicetype || '--'}</td>`);
            htmls.push(`<td>${nestedData[i].matchamount ? Number(nestedData[i].matchamount).toFixed(2) : '--'}</td>`);
            htmls.push(`<td>${nestedData[i].isallred ? '是' : '否'}</td>`);
            htmls.push(`<td style="color: ${nestedData[i].confirmstatus ? confirmstatusList[nestedData[i].confirmstatus].color : '#666'}">${nestedData[i].confirmstatus ? confirmstatusList[nestedData[i].confirmstatus].name : '--'}</td>`);
            htmls.push('</tr>');
        }
        
        htmls.push('</tbody></table>');
        htmls.push('</td></tr>');
    },
    TClass.init = option => {
        const id = option.id;
        const tag = $('#' + id);
        const columns = option.columns;
        const dataSource = option.dataSource;
        const rowKey = option.rowKey;
        const selectedRowKeys = option.selectedRowKeys || false;
        const disabled = option.disabled || false;
        const scroll = option.scroll || {};
        const showTotal = option.showTotal || false;
        const isResizer = option.isResizer || false;
        const pagination = option.pagination;
        const columnIndex = option.columnIndex;
        DataStore[id] = {
            columns: columns,
            dataSource: dataSource,
            rowKey: rowKey,
            selectedRowKeys: selectedRowKeys,
            disabled: disabled,
            scroll: scroll,
            showTotal: showTotal,
            pagination: pagination
        };
        Option[id] = {
            headerColor: Tool.getValue(option.headerColor, '#333'),
            headerBgColor: Tool.getValue(option.headerBgColor, '#f3f3f5'),
            headerSize: Tool.getValue(option.headerSize, 12),
            color: Tool.getValue(option.color, '#666'),
            size: Tool.getValue(option.size, 12),
            align: Tool.getValue(option.align, 'center'),
            evenBgColor: Tool.getValue(option.evenBgColor, 'transparent'),
            oddBgColor: Tool.getValue(option.oddBgColor, 'transparent'),
            totalBgColor: Tool.getValue(option.totalBgColor, '#fff'),
            rowHeight: Tool.getValue(option.rowHeight, 34),
            isResizer: Tool.getValue(option.isResizer, false),
            openKey: option.openKey,
            openTitle: option.openTitle,
            negativeOpenKey: option.negativeOpenKey,
            allChecked: option.allChecked,
            confirmstatusList: option.confirmstatusList
        };
        Tool.render(id, tag);
        if (isResizer) {
            Tool.resizer(id);
        }
        if (columnIndex) {
            Tool.mergeTableRows(id, columnIndex);
        }
    };
    TClass.getValue = (id, row, column) => DataStore[id].dataSource[row - 1][column - 1];
    TClass.setValue = (id, row, column, value) => {
        DataStore[id].dataSource[row - 1][column - 1] = value;
    };
    TClass.getValues = id => DataStore[id].dataSource;
    TClass.addRow = (id, data) => {
        DataStore[id].dataSource.push(data);
        const htmls = [];
        const dataStore = DataStore[id];
        const option = Option[id];
        const index = DataStore[id].dataSource.length - 1;
        Tool.createRow(htmls, index, dataStore, option);
        $('#' + id).find('.workbench-table-tbody')
            .find('tbody')
            .append(htmls.join(''));
    };
    TClass.deleteRow = (id, row) => {
        DataStore[id].dataSource.splice(row, 1);
        $('#' + id).find('.workbench-table-tbody')
            .find('tr')
            .eq(row)
            .remove();
    };
    TClass.getRowCount = id => DataStore[id].dataSource.length;
    TClass.render = id => {
        Tool.render(id, $('#' + id));
    };
    return TClass;
}