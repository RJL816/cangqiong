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
            htmls.push(`<th ${style ? `style="${style}"` : ''}>${columns[i].title}</th>`);
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
    Tool.createRow = (htmls, index, dataStore, option, isAdit) => {
        const columns = dataStore.columns;
        const dataSource = dataStore.dataSource[index];
        const rowKey = dataStore.rowKey;
        const selectedRowKeys = dataStore.selectedRowKeys;
        const disabledFun = dataStore.disabled;
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
                val = columns[i].render(val, dataSource, index, isAdit);
            }
            if (columns[i].ellipsis) {
                title = (val + '').replace(/<[^>]+>/g, '').trim();
            }
            htmls.push(`<td class="truncateText" ${style ? `style="${style}"` : ''} ${title ? `title="${title}"` : ''}>${val}</td>`);
        }
        htmls.push('</tr>');
    };
    Tool.render = (id, tag) => {
        const htmls = [];
        const dataStore = DataStore[id];
        const option = Option[id];

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
                    border: 1px solid ${option.headerBgColor};
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
        DataStore[id] = {
            columns: columns,
            dataSource: dataSource,
            rowKey: rowKey,
            selectedRowKeys: selectedRowKeys,
            disabled: disabled,
            scroll: scroll,
            showTotal: showTotal
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
            rowHeight: Tool.getValue(option.rowHeight, 34)
        };
        Tool.render(id, tag);
    };
    TClass.getValue = (id, row, column) => DataStore[id].dataSource[row - 1][column - 1];
    TClass.setValue = (id, row, column, value) => {
        DataStore[id].dataSource[row - 1][column - 1] = value;
    };
    TClass.getValues = id => DataStore[id].dataSource;
    TClass.addRow = (id, data, isAdit = false) => {
        DataStore[id].dataSource.push(data);
        const htmls = [];
        const dataStore = DataStore[id];
        const option = Option[id];
        const index = DataStore[id].dataSource.length - 1;
        Tool.createRow(htmls, index, dataStore, option, isAdit);
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