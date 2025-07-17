const fixDarkModeStyle = `
.kd-cq-dropdown.kd-cq-select-dropdown .kd-cq-dropdown-menu,
.kd-cq-root .kd-cq-control.kd-cq-spread .kd-cq-spread-toolbar-container .kd-cq-spread-toolbar-top .kd-cq-spread-dropdown-container,
.kd-cq-root .kd-cq-control.kd-cq-spread .gc-ui-contextmenu-container { border: 1px solid #454847; box-shadow: rgba(0,0,0,0.2) 0 -3px 8px -1px; background-color: #2f3030 }
#kd-theme .kd-cq-dropdown.kd-cq-select-dropdown .kd-cq-dropdown-menu .kd-cq-dropdown-menu-item-active,
#kd-theme .kd-cq-control.kd-cq-spread .kd-cq-spread-toolbar-container .kd-cq-spread-toolbar-top .kd-cq-spread-dropdown-container .theme.select-selected { background-color: var(--theme-color-level6-opacity20) }
#kd-theme .kd-cq-control.kd-cq-spread .kd-cq-spread-toolbar-container .kd-cq-spread-toolbar-top .kd-cq-spread-dropdown-container .kd-cq-spread-dropdown:not(.kd-cq-spread-dropdown-disabled):hover,
#kd-theme .kd-cq-control.kd-cq-spread .gc-ui-contextmenu-container .gc-ui-contextmenu-hover  { background-color: #444545 }
#kd-theme .kd-cq-dropdown.kd-cq-select-dropdown .kd-cq-dropdown-menu .kd-cq-dropdown-menu-item.kd-cq-dropdown-bottom-menu-item:hover { background-color: transparent !important }
#kd-theme .kd-cq-dropdown.kd-cq-select-dropdown .kd-cq-dropdown-menu .kd-cq-dropdown-menu-item.hover-bg { background-color: #444545 }
#kd-theme .kd-cq-dropdown.kd-cq-select-dropdown .kd-cq-transfer-list-filter-input { background-color: #2f3030 }

#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-toolbar-more-dropdown .kd-cq-dropdown-menu-item:hover,
#kd-theme .kd-cq-control.kd-cq-spread .kd-cq-spread-dropdown.kd-cq-spread-dropdown-disabled:hover { background-color: transparent !important }
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-toolbar-more-dropdown .kd-cq-dropdown-menu-item .kd-cq-dropdown-menu-item-title:hover { background-color: #444545 }
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-toolbar-more-dropdown .kd-cq-dropdown-menu-item .kd-dropdown-trigger:hover { background-color: #444545 }
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-toolbar-more-dropdown .kd-cq-dropdown-menu-item-more:hover { background-color: transparent !important }
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-toolbar-more-dropdown .kd-cq-dropdown-menu-item-custom:hover { background-color: #444545 }

.kd-dropdown.kd-cq-dropdown.kd-cq-select-dropdown > .kd-dropdown-menu { border: 1px solid #454847; }
.kd-cq-dropdown:not(.kd-cq-dropdown-no-border):not(.kd-cq-select-dropdown):not(.kd-cq-theme-editor-dropdown):not(.kd-cq-dropdown-hide) { border: 1px solid #454847; box-shadow: rgba(0,0,0,0.2) 0 -3px 8px -1px; background-color: #2f3030 }
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type .kd-cq-dropdown-menu-item-active,.theme-bg-level1,
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type .kd-cq-dropdown-menu-item.select-selected { background-color: var(--theme-color-level6-opacity20) !important }
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type:not(.kd-cq-select-dropdown):not(.kd-cq-basedata-dropdown):not(.kd-cq-tile-search-dropdown):not(.kd-cq-listfilter-setting-dropdown):not(.kd-cq-mullangtext-dropdown) .kd-cq-dropdown-menu-item:not(.kd-cq-dropdown-menu-title):not(.kd-cq-dropdown-menu-item-input):not(.disabled-fc):not(.btn-ghost):hover { background-color: #444545 }
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type:not(.kd-cq-tile-search-dropdown):not(.kd-cq-listfilter-setting-dropdown) .kd-cq-dropdown-menu-item.kd-cq-dropdown-menu-item-btn:hover { background-color: #2f3030 }
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type:not(.kd-cq-tile-search-dropdown):not(.kd-cq-listfilter-setting-dropdown):not(.kd-cq-mullangtext-dropdown) .kd-cq-dropdown-menu-item.kd-cq-dropdown-menu-item-input .kd-cq-input { background-color: transparent }

#kd-theme .kd-select-dropdown-panel .kd-select-dropdown { border: 1px solid #454847; box-shadow: rgba(0,0,0,0.2) 0 -3px 8px -1px; background-color: #2f3030 }
#kd-theme .kd-select-dropdown-panel .kd-select-dropdown .kd-select-item-option:hover { background-color: #444545 }
#kd-theme .kd-select-dropdown-panel .kd-select-dropdown .kd-select-item-option-selected { background-color: var(--theme-color-level6-opacity20) !important }

.kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-basedata-dropdown .kd-cq-dropdown-menu-item { background-color: #2f3030 }
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-basedata-dropdown .kd-cq-dropdown-menu-item.hover-bg { background-color: #444545 }

#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-pagination-dropdown .kd-dropdown-menu-item:hover { background-color: #444545 }

#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-telephone-dropdown .kd-cq-dropdown-menu-item.hover-bg { background-color: var(--theme-color-level6-opacity20) }
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-telephone-dropdown .kd-cq-input { background-color: #2f3030 }

#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-search-result-dropdown .kd-cq-dropdown-menu-item.select-selected { background-color: var(--theme-color-level6-opacity20) }

#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-address-dropdown .kd-cq-dropdown-menu-item.hover-bg { background-color: #444545 }

#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-admindivision-dropdown .kd-cq-input,
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-dropdown-menu-qs-list > ul > li { background-color: #2f3030 }
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-dropdown-menu-qs-list .kd-cq-dropdown-menu-item-quick-tips { margin-left: 0; padding-left:13px}
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-dropdown-menu-qs-list > ul > li.kd-cq-dropdown-menu-item.hover-bg { background-color: #444545 !important; }

#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type .kd-dropdown-menu-item.kd-cq-dropdown-menu-item-btn.hover-theme-border-color1:hover { border-color: var(--darkreader-text--theme-color-level5) !important; }

#kd-theme .kd-cq-robertnumber-container,
#kd-theme .kd-cq-dropdown-loading-container,
#kd-theme .kd-custom-dropdown { border: 1px solid #454847; box-shadow: rgba(0,0,0,0.2) 0 -3px 8px -1px; background-color: #2f3030 }
#kd-theme .kd-custom-dropdown .kd-custom-dropdown-item:hover,
#kd-theme .kd-cq-robertnumber-container .kd-cq-robertnumber-item:hover { background-color: #444545 }
#kd-theme .kd-custom-dropdown .kd-custom-dropdown-item-selected { background-color: var(--theme-color-level6-opacity20) !important }

#kd-theme .kd-cq-custom-appearance-dropdown { border: 1px solid #454847; box-shadow: rgba(0,0,0,0.2) 0 -3px 8px -1px; background-color: #2f3030 }
#kd-theme .kd-cq-custom-appearance-dropdown .kd-cq-custom-appearance-dropdown-item:hover { background-color: #444545 }
#kd-theme .kd-cq-custom-appearance-dropdown .kd-cq-custom-appearance-dropdown-item-selected { background-color: var(--theme-color-level6-opacity20) !important }

#kd-theme .kd-custom-lang-dropdown { border: 1px solid #454847; box-shadow: rgba(0,0,0,0.2) 0 -3px 8px -1px; background-color: #2f3030 }
#kd-theme .kd-custom-lang-dropdown .kd-custom-lang-dropdown-item:hover { background-color: #444545 }
#kd-theme .kd-custom-lang-dropdown .kd-custom-lang-dropdown-item-selected { background-color: var(--theme-color-level6-opacity20) !important }

#kd-theme.kd-cq-root .kd-cq-context-menu { border: 1px solid #454847; box-shadow: rgba(0,0,0,0.2) 0 -3px 8px -1px; background-color: #2f3030 }
#kd-theme.kd-cq-root .kd-cq-context-menu .kd-cq-context-menu-item:hover { background-color: #444545 !important }
#kd-theme.kd-cq-root .kd-cq-context-menu .kd-cq-context-menu-item.ag-menu-option-active { background-color: var(--theme-color-level6-opacity20) }

#kd-theme #tabap > .kd-cq-tab-panel > [data-tab-hidden="false"] > .kd-cq-form { background-color: #303231 !important }

#kd-theme.kd-cq-root .kd-cq-sysnotification { border: 1px solid #454847; box-shadow: rgba(0,0,0,0.2) 0 -3px 8px -1px; background-color: #2f3030 }

#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-tabs-dropdown .kd-dropdown-menu-item:hover { background-color: #444545 }

.kd-cq-root .kd-cq-tooltip { background-color: #2f3030; border: 1px solid #454847; box-shadow: rgba(0,0,0,0.2) 0 -3px 8px -1px }

.kd-cq-root .kd-tooltip.arrow::after{ background-color: #2f3030 }

.kd-cq-root .kd-cq-checkbox .kd-cq-switch-handle, .kd-cq-root .kd-table-cell .kd-cq-switch-handle, .kd-cq-root .kd-cq-spread-dialog .kd-cq-switch-handle { background-color: #fff }

.kd-cq-root .kd-cq-control.kd-cq-table .kd-table-header-cell:not(.kd-leaf) { border-bottom: 1px solid rgb(69, 72, 71) !important }

input, textarea { background-color: transparent }

#kd-theme .kd-cq-dropdown.kd-cq-dropdown-date-type .kd-cq-calendar-date-range { background-color: #2f3030 }
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-date-type .kd-cq-date-picker-footer { background-color: #2f3030 }
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-date-type .kd-cq-dropdown-menu-item:not(.kd-cq-dropdown-menu-title):hover { background-color: #444545 }
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-date-type .kd-cq-dropdown-no-border { background-color: #2f3030 }

.kd-cq-root .kd-cq-control.kd-cq-table .kd-lock-shadow-mask .kd-left-lock-shadow.show-shadow { box-shadow: rgb(0 0 0 / 30%) 0 0 6px 2px }
.kd-cq-root .kd-cq-control.kd-cq-table .kd-lock-shadow-mask .kd-right-lock-shadow.show-shadow { box-shadow: rgb(0 0 0 / 30%) 0 0 6px 2px }

.kd-cq-root .kd-cq-control.kd-cq-steps .kd-cq-steps-no-end .kd-cq-steps-arrow-top { background: linear-gradient(to bottom left, #242525 51%,  var(--darkreader-bg--arrow-background-color) 50%) }
.kd-cq-root .kd-cq-control.kd-cq-steps .kd-cq-steps-no-end .kd-cq-steps-arrow-bottom { background: linear-gradient(to top left, #242525 51%, var(--darkreader-bg--arrow-background-color) 50%) }
.kd-cq-root .kd-cq-control.kd-cq-steps .kd-cq-steps-end { background-color: transparent }
.kd-cq-root .kd-cq-popup.kd-cq-theme-editor-popup { border: 1px solid #454847; box-shadow: rgba(0,0,0,0.2) 0 -3px 8px -1px; background-color: #2f3030 }
.kd-cq-root .kd-cq-popup.kd-cq-theme-editor-popup.kd-cq-color-pick-popup { width: 250px }
.kd-cq-root .kd-cq-spread-color-picker { border: 1px solid #454847; box-shadow: rgba(0,0,0,0.2) 0 -3px 8px -1px; background-color: #2f3030 }
.kd-cq-root .kd-cq-color-picker { border: 1px solid #454847; box-shadow: rgba(0,0,0,0.2) 0 -3px 8px -1px !important; background-color: #2f3030 !important }
.kd-cq-root .kd-cq-color-picker.kd-cq-designer-color-picker { width: 246px }
.kd-cq-root .kd-cq-color-picker.kd-cq-kdesigner-color-picker { width: 306px }
.kd-cq-root .kd-cq-color-picker.kd-cq-printd-color-picker { width: 246px }
.kd-cq-root .kd-cq-color-picker.kd-cq-printd-color-picker .customColorInput { border: 1px solid #454847; }
.kd-cq-root .gc-ui-contextmenu-container .gc-ui-contextmenu-icon,
.kd-cq-root .gc-ui-contextmenu-container .gc-ui-contextmenu-sup-indicator { filter: contrast(60%) }
.kd-cq-root .kd-cq-spread-img { filter: contrast(0); }
.kd-cq-root .tox .tox-menu.tox-swatches-menu { background-color: #fff; border: 1px solid #ccc; box-shadow: 0 4px 8px 0 rgba(34,47,62,.1) }
.kd-cq-root .tox .tox-swatch.tox-swatches__picker-btn:focus, .kd-cq-root .tox .tox-swatch.tox-swatches__picker-btn:hover { background-color: #dee0e2; box-shadow: 0 0 0 1px rgba(127,127,127,.3) inset; }

#kd-theme [data-baritem-show-type="2"] .kd-cq-btn:not(.kd-cq-toolbar-group):not(.disabled-fc):hover,
#kd-theme [data-baritem-show-type="2"] .kd-cq-toolbar-group:not(.kd-cq-toolbar-group):hover { background-color: var(--color-fill-1) }
#kd-theme [data-baritem-show-type="2"] .kd-cq-toolbar-group-item:hover, #kd-theme [data-baritem-show-type="2"] .kd-cq-toolbar-group-down:hover { background-color: var(--color-fill-1) }
#kd-theme .kd-cq-control.kd-cq-tree .kd-cq-tree-treenode.kd-cq-tree-treenode-selected { background-color: var(--theme-color-level6-opacity20) !important }
#kd-theme .kd-cq-control.kd-cq-tree .kd-cq-tree-treenode:not(.kd-cq-tree-treenode-selected):hover { background-color: var(--color-fill-1) !important; }

#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight > td:not(.kd-lock-left):not(.kd-lock-right) { background-color: var(--theme-color-level6-opacity20) !important }
#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight > td.kd-lock-left,
#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight > td.kd-lock-right { background-color: #242525 }
#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight > td.kd-lock-left::before,
#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight > td.kd-lock-right::before { content: ''; background-color: var(--theme-color-level6-opacity20) !important;width: calc(100% + 1px); height: calc(100% + 1px);top: -1px;left: -1px;position: absolute; z-index: -1 }

#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight:hover > td:not(.kd-lock-left):not(.kd-lock-right),
#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight.kd-row-hover > td:not(.kd-lock-left):not(.kd-lock-right) { background-color: var(--theme-color-level6-opacity30) !important }
#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight:hover > td.kd-lock-left,
#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight:hover > td.kd-lock-right,
#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight.kd-row-hover > td.kd-lock-left,
#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight.kd-row-hover > td.kd-lock-right { background-color: #242525 }
#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight:hover > td.kd-lock-left::before,
#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight:hover > td.kd-lock-right::before,
#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight.kd-row-hover > td.kd-lock-left::before,
#kd-theme .kd-table .kd-table-body tr:not(.no-highlight).highlight.kd-row-hover > td.kd-lock-right::before { content: ''; background-color: var(--theme-color-level6-opacity30) !important;width: calc(100% + 1px); height: calc(100% + 1px);top: -1px;left: -1px;position: absolute; z-index: -1 }

#kd-theme .kd-table .kd-table-body tr:not(.no-hover):hover > td:not(.kd-lock-left):not(.kd-lock-right),
#kd-theme .kd-table .kd-table-body tr.kd-row-hover > td:not(.kd-lock-left):not(.kd-lock-right) { background-color: var(--color-fill-1) }
#kd-theme .kd-table .kd-table-body tr:not(.no-hover):hover > td.kd-lock-left,
#kd-theme .kd-table .kd-table-body tr:not(.no-hover):hover > td.kd-lock-right,
#kd-theme .kd-table .kd-table-body tr.kd-row-hover > td.kd-lock-left,
#kd-theme .kd-table .kd-table-body tr.kd-row-hover > td.kd-lock-right { background-color: #242525 }
#kd-theme .kd-table .kd-table-body tr:not(.no-hover):hover > td.kd-lock-left::before,
#kd-theme .kd-table .kd-table-body tr:not(.no-hover):hover > td.kd-lock-right::before,
#kd-theme .kd-table .kd-table-body tr.kd-row-hover > td.kd-lock-left::before,
#kd-theme .kd-table .kd-table-body tr.kd-row-hover > td.kd-lock-right::before { content: ''; background-color: var(--color-fill-1);width: calc(100% + 1px); height: calc(100% + 1px);top: -1px;left: -1px;position: absolute; z-index: -1 }

#kd-theme .kd-city-picker-dropdown .kd-city-picker-list .kd-city-picker-list-item:not(.kd-city-picker-list-item-selected):not(.kd-city-picker-list-item-disabled):hover { background-color: #444545 }
#kd-theme .kd-city-picker-dropdown .kd-city-picker-list .kd-city-picker-list-item-selected:not(.kd-city-picker-list-item-disabled) { background-color: var(--theme-color-level6-opacity20) }

#kd-theme .kd-cq-dropdown.kd-cq-table-header-filter-dropdown .kd-cq-dropdown-menu-item:not(.kd-cq-dropdown-menu-item-active):hover { background-color: #444545 }
#kd-theme .kd-cq-dropdown.kd-cq-table-header-filter-dropdown .kd-cq-dropdown-menu-item-active { background-color: var(--theme-color-level6-opacity20) !important }

#kd-theme .calendar-date-cell-in-range.calendar-date-cell-range-hover.calendar-date-cell-range-hover-end:not(.calendar-date-cell-selected) div,.calendar-date-cell-in-range.calendar-date-cell-range-hover.calendar-date-cell-range-hover-start:not(.calendar-date-cell-selected) div { background: unset !important }
#kd-theme .kd-cq-calendar-date-cell:not(.calendar-date-cell-disabled):not(.calendar-date-cell-range-hover-end):not(.calendar-date-cell-range-hover-start):not(.calendar-date-cell-selected):hover > div, .kd-cq-picker-cell-inner:not(.kd-cq-picker-cell-inner-disabled):hover { background-color: #444545 !important }
#kd-theme .calendar-date-cell-in-range::before { background: var(--theme-color-level6-opacity20) }
#kd-theme .calendar-date-cell-range-hover::before { background-color: var(--theme-color-level6-opacity30) }
#kd-theme .calendar-date-cell-in-range.calendar-date-cell-hover.calendar-date-cell-range-start.calendar-date-cell-selected::before { background: var(--theme-color-level6-opacity30) }
#kd-theme .calendar-date-cell-in-range.calendar-date-cell-hover.calendar-date-cell-range-end.calendar-date-cell-selected::before { background: var(--theme-color-level6-opacity30) }

#kd-theme .kd-cq-date-picker-time .kd-cq-date-picker-time-header>a { color: #DBD5CC }

#kd-theme .kdfont.kdfont-fuxuankuangxuanzhong_fang::after {  background-color: #fff; }

#kd-theme .kd-cq-toolbar[data-baritem-show-type="1"] > .kd-cq-btn,
#kd-theme [data-baritem-show-type="1"] .kd-cq-toolbar-group:not(.kd-cq-toolbar-group-lock) .kd-cq-toolbar-group-item,
#kd-theme [data-baritem-show-type="1"] .kd-cq-toolbar-group:not(.kd-cq-toolbar-group-lock) .kd-cq-toolbar-group-down,
#kd-theme [data-baritem-show-type="1"] .kd-cq-toolbar-item .kd-dropdown-trigger,
#kd-theme .kd-cq-btn.kd-btn-second:hover,
#kd-theme .kd-cq-btn.hover-theme-border-color1:hover,
#kd-theme .theme.btn-ghost:hover,
#kd-theme .kd-cq-reportpanel .kd-cq-reportpanel-bottom-item:not(.hover-theme-bg1):hover { border-color: currentColor !important; }

#kd-theme.kd-cq-root .kd-cq-checkboxgroup .kd-cq-checkboxgroup-square-block.hover-theme-bdcolor:hover,
#kd-theme.kd-cq-root .kd-cq-checkboxgroup .kd-cq-checkboxgroup-square-block.kd-cq-checkboxgroup-squarechecked,
#kd-theme.kd-cq-root .kd-cq-checkboxgroup .kd-cq-checkboxgroup-square-block.kd-cq-checkboxgroup-squarechecked::before,
#kd-theme.kd-cq-root .kd-cq-checkboxgroup .kd-cq-checkboxgroup-square-block.theme-bdcolor,
#kd-theme.kd-cq-root .kd-cq-checkboxgroup .kd-cq-checkboxgroup-square-block.kd-cq-checkboxgroup-squarechecked:hover::before { border-color: currentColor; }

#kd-theme .kd-cq-splitcontainer-type-storage .kd-cq-kd-cq-splitcontainer-drag-bar-row + div { border-color: #303231; }

#kd-theme .kd-cq-tile-menu [data-frequent].kd-cq-tile-cloud-item-active,
#kd-theme .kd-cq-tile-menu .kd-cq-tile-app-list-item-active { background: var(--theme-color-level6-opacity20) }
#kd-theme .kd-cq-tile-menu .kd-cq-tile-cloud-item:not([data-frequent]):hover,
#kd-theme .kd-cq-tile-menu [data-frequent].kd-cq-tile-cloud-item:not(.kd-cq-tile-cloud-item-active):hover,
#kd-theme .kd-cq-tile-menu .kd-cq-tile-app-list-item:not(.kd-cq-tile-app-list-item-active):hover,
#kd-theme .kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-tile-search-dropdown .kd-cq-dropdown-menu-item-active,
#kd-theme .kd-cq-tile-menu .kd-cq-tile-menu-group-menu-item:hover { background-color: var(--color-fill-1) !important; }

#kd-theme.kd-cq-root input::placeholder,
#kd-theme.kd-cq-root textarea::placeholder,
#kd-theme.kd-cq-root .kd-cq-input::placeholder,
#kd-theme.kd-cq-root .kd-cq-input.lock-with-no-value,
#kd-theme.kd-cq-root .kd-cq-field .field-in-lock:not(.allBorder) input,
#kd-theme.kd-cq-root .kd-cq-field .field-in-lock:not(.allBorder) textarea,
#kd-theme.kd-cq-root .kd-cq-field .field-in-lock:not(.allBorder) .kd-city-picker-content,
#kd-theme.kd-cq-root .kd-cq-field .field-in-lock:not(.allBorder) .kd-cq-admindivision-region-input,
#kd-theme.kd-cq-root .kd-cq-admindivision .kd-cq-admindivision-region-input.kd-cq-admindivision-region-input-placeholder,
#kd-theme.kd-cq-root .kd-input-textarea::placeholder,
#kd-theme.kd-cq-root .kd-cq-btn.disabled-contain,
#kd-theme.kd-cq-root .kd-cq-btn.disabled-fc,
#kd-theme.kd-cq-root .kd-cq-btn.kq-cq-btn-toolbar-locked,
#kd-theme.kd-cq-root .kd-cq-dropdown.kd-cq-dropdown-select-type .kd-cq-dropdown-menu-item.disabled-fc,
#kd-theme.kd-cq-root .kdfont.disabled-fc,
#kd-theme.kd-cq-root .kd-cq-calendar-date-cell.calendar-date-cell-disabled > div,
#kd-theme.kd-cq-root .kd-cq-picker-cell-inner.kd-cq-picker-cell-inner-disabled,
#kd-theme.kd-cq-root .kd-cq-time-range-dropdown .kd-cq-time-column-list-item-disabled,
#kd-theme.kd-cq-root .kd-cq-select .placeholder-text-in-light,
#kd-theme.kd-cq-root .kd-cq-select-dropdown .kd-cq-select-item-disable,
#kd-theme.kd-cq-root .kd-cq-select .kd-cq-selected-grey-text,
#kd-theme.kd-cq-root .kd-cq-select.disabled-fc,
#kd-theme.kd-cq-root .kd-cq-reportpanel .kd-cq-reportpanel-bottom-item .kd-cq-reportpanel-sq-btn-disable,
#kd-theme.kd-cq-root .kd-city-picker-placeholder,
#kd-theme.kd-cq-root .kd-city-picker-focused .kd-city-picker-content-item:not(.kd-city-picker-content-item-seleted),
#kd-theme.kd-cq-root .kd-city-picker-content .kd-city-picker-content-info,
#kd-theme.kd-cq-root .kd-cq-querypanel .kd-cq-querypanel-header-text::placeholder,
#kd-theme.kd-cq-root .kd-cq-querypanel .kd-cq-querypanel-content .kd-cq-querypanel-btn-disable,
#kd-theme.kd-cq-root .kd-cq-tabs .kd-cq-tabs-tab.kd-cq-tabs-tab-locked:not(.follow-theme-bg-fc1),
#kd-theme.kd-cq-root .kd-table-cell.editable-cell > div > span > span,
#kd-theme.kd-cq-root .kd-cq-checkboxgroup .kd-cq-checkboxgroup-square-item .kd-cq-checkboxgroup-disabled,
#kd-theme.kd-cq-root .kd-cq-checkbox-disabled,
#kd-theme.kd-cq-root .kd-cq-checkbox-disabled .kdfont,
#kd-theme.kd-cq-root .kd-cq-checkbox-disabled .kd-cq-checkbox-content,
#kd-theme.kd-cq-root .kd-cq-select-item-disabled > span,
#kd-theme.kd-cq-root .kd-cq-spread .kd-cq-spread-toolbar-item-disable span,
#kd-theme.kd-cq-root .kd-cq-spread .kd-cq-spread-dropdown.kd-cq-spread-dropdown-disabled > div,
#kd-theme.kd-cq-root .kd-cq-tile-menu .kd-cq-tile-right-menu .kd-cq-tile-menu-group-menu-in-drag-item > div,
#kd-theme.kd-cq-root .kd-cq-tile-menu .kd-cq-tile-cloud-in-drag-item > span,
#kd-theme.kd-cq-root .kd-select .kd-select-placeholder,
#kd-theme.kd-cq-root .kd-pagination .kd-pagination-action .kd-pagination-action-item button[disabled] i { color: #555555 !important; }

#kd-theme.kd-cq-root .kd-cq-querypanel .kd-cq-querypanel-content .kd-cq-querypanel-item-selected { background: var(--theme-color-level6-opacity20) }
#kd-theme.kd-cq-root .kd-cq-querypanel .kd-cq-querypanel-content .kd-cq-querypanel-scheme-left .kd-cq-querypanel-item-text:not(.kd-cq-querypanel-item-selected):hover { background-color: var(--color-fill-1); }

#kd-theme.kd-cq-root .kd-cq-theme-editor .kd-cq-theme-editor-nav-bar .kd-cq-theme-editor-nav-bar-item:not(.kd-cq-theme-editor-nav-bar-item-active):hover { background-color: var(--color-fill-1); }
#kd-theme.kd-cq-root .kd-cq-theme-editor .kd-cq-theme-editor-nav-bar .kd-cq-theme-editor-nav-bar-item-active { background: var(--theme-color-level6-opacity20) }

#kd-theme.kd-cq-root .kd-cq-field.kd-cq-radiooptgroup .kd-cq-square-radio:not(.disabled-fc):hover,
#kd-theme.kd-cq-root .kd-cq-field.kd-cq-radiooptgroup .kd-cq-square-radio:not(.disabled-fc).radio-square-style-checked { border-color: var(--darkreader-text--theme-color)!important; color :var(--darkreader-text--theme-color)!important; }
#kd-theme.kd-cq-root .kd-cq-field.kd-cq-radiooptgroup .kd-cq-default-radio.disabled-fc > span,
#kd-theme.kd-cq-root .kd-cq-field.kd-cq-radiooptgroup .kd-cq-default-radio.disabled-fc > label { color: #555555 !important; }

#kd-theme.kd-cq-root .kd-cq-control.kd-cq-treemenu { background-color: #242525; color: #d1cbc2; }
#kd-theme.kd-cq-root .kd-cq-control.kd-cq-treemenu .kd-cq-treemenu-first-level { border-right: 1px solid rgb(65, 68, 68) }
#kd-theme.kd-cq-root .kd-cq-control.kd-cq-treemenu-popper .kd-cq-treemenu-second-level .kd-cq-treemenu-second-level-item,
#kd-theme.kd-cq-root .kd-cq-control.kd-cq-treemenu-popper .kd-cq-treemenu-third-level .kd-cq-treemenu-third-level-item { color: #d1cbc2; }
#kd-theme.kd-cq-root .kd-cq-control.kd-cq-treemenu .kd-cq-treemenu-first-level .kd-cq-treemenu-first-level-hoverItem { background-color: var(--color-fill-1); }
#kd-theme.kd-cq-root .kd-cq-control.kd-cq-treemenu .kd-cq-treemenu-first-level .kd-cq-treemenu-first-level-item > i,
#kd-theme.kd-cq-root .kd-cq-control.kd-cq-treemenu .kd-cq-treemenu-first-level .kd-cq-treemenu-switch-level1 .kd-cq-treemenu-switch-level1-button { color: #a9a093; }
#kd-theme.kd-cq-root .kd-cq-control.kd-cq-treemenu .kd-cq-treemenu-first-level .kd-cq-treemenu-first-level-hoverItem > div { background-color: unset; }
#kd-theme.kd-cq-root .kd-cq-control.kd-cq-treemenu-popper { border: 1px solid #454847; box-shadow: rgba(0,0,0,0.2) 0 -3px 8px -1px; }
#kd-theme.kd-cq-root .kd-cq-control.kd-cq-treemenu-popper .kd-cq-treemenu-second-level,
#kd-theme.kd-cq-root .kd-cq-control.kd-cq-treemenu-popper .kd-cq-treemenu-third-level,
#kd-theme.kd-cq-root .kd-cq-control.kd-cq-treemenu-popper .kd-cq-treemenu-third-level .kd-cq-treemenu-third-level-item > i { background-color: #2f3030 !important; }
#kd-theme.kd-cq-root [data-tree-menu-mode="1"].kd-cq-control.kd-cq-treemenu .kd-cq-treemenu-first-level .kd-cq-treemenu-first-level-hoverItem,
#kd-theme.kd-cq-root [data-tree-menu-mode="1"].kd-cq-control.kd-cq-treemenu .kd-cq-treemenu-first-level .kd-cq-treemenu-first-level-hoverItem > div > i,
#kd-theme.kd-cq-root [data-tree-menu-mode="1"].kd-cq-control.kd-cq-treemenu .kd-cq-treemenu-fold-hoverItem > div > i,
#kd-theme.kd-cq-root [data-tree-menu-mode="1"].kd-cq-control.kd-cq-treemenu .kd-cq-treemenu-fold-hoverItem { background-color: #2f3030 }
#kd-theme.kd-cq-root [data-tree-menu-mode="1"].kd-cq-control.kd-cq-treemenu .kd-cq-treemenu-fold-hoverItem > div {  background-color: unset; }

#kd-theme.kd-cq-root [data-form-id="bos_portal_personalcenter"] { border: 1px solid #454847; box-shadow: rgba(0,0,0,0.2) 0 -3px 8px -1px; background-color: #2f3030; border-radius: 8px; }
#kd-theme.kd-cq-root [data-form-id="bos_portal_personalcenter"] #infoflexpanelap { background-color: #2f3030 !important; }
#kd-theme.kd-cq-root [data-form-id="bos_portal_personalcenter"] #flexpanelap6 { background-image: url('public/thirdjs/image/personalcenter_dark_bg.png') !important }
#kd-theme.kd-cq-root [data-form-id="bos_portal_personalcenter"] #flexpanelap9 .kd-cq-field.kd-cq-label,
#kd-theme.kd-cq-root [data-form-id="bos_portal_personalcenter"] #flexpanelap4 .kd-cq-field.kd-cq-label { color: #fff !important; }
#kd-theme.kd-cq-root [data-form-id="bos_portal_personalcenter"] #headflexpanelap #flexpanelap7 { background-color: rgba(255, 255, 255, 0.5) !important; }
#kd-theme.kd-cq-root [data-form-id="bos_portal_personalcenter"] #iconflexpanelap #modecustomcontrol .kd-cq-custom-appearance-mode-icon,
#kd-theme.kd-cq-root [data-form-id="bos_portal_personalcenter"] #iconflexpanelap .kd-cq-control.kd-cq-icon,
#kd-theme.kd-cq-root [data-form-id="bos_portal_personalcenter"] #iconflexpanelap #langcustomcontrol,
#kd-theme.kd-cq-root [data-form-id="bos_portal_personalcenter"] #flexpanelap8 .kd-cq-field.kd-cq-label { color: rgba(255,255,255,0.75) !important; }
#kd-theme.kd-cq-root [data-form-id="bos_portal_personalcenter"] #iconflexpanelap #modecustomcontrol .kd-cq-custom-appearance-mode-icon:hover { color: var(--theme-color) !important; }
.monaco-editor.vs-dark .inputarea.ime-input { background-color: #1e1e1e !important; }

#kd-theme.kd-cq-root .kd-cq-dropdown.kd-cq-city-dropdown .kd-city-picker-list .kd-city-picker-list-item.kd-city-picker-list-item-active { background-color: #444545 }

#kd-theme.kd-cq-root .kd-dropdown.kd-cq-dropdown.kd-cq-dropdown-select-type.kd-cq-pagination-dropdown .kd-dropdown-menu-item.selected { background: var(--theme-color-level6-opacity20) }

.monaco-editor.vs-dark .unexpected-closing-bracket {
  color: rgba(255, 18, 18, 0.8) !important;
}
.monaco-editor.vs-dark .bracket-highlighting-0 {
  color: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-1 {
  color: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-2 {
  color: #179fff !important;
}
.monaco-editor.vs-dark .bracket-highlighting-3 {
  color: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-4 {
  color: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-5 {
  color: #179fff !important;
}
.monaco-editor.vs-dark .bracket-highlighting-6 {
  color: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-7 {
  color: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-8 {
  color: #179fff !important;
}
.monaco-editor.vs-dark .bracket-highlighting-9 {
  color: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-10 {
  color: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-11 {
  color: #179fff !important;
}
.monaco-editor.vs-dark .bracket-highlighting-12 {
  color: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-13 {
  color: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-14 {
  color: #179fff !important;
}
.monaco-editor.vs-dark .bracket-highlighting-15 {
  color: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-16 {
  color: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-17 {
  color: #179fff !important;
}
.monaco-editor.vs-dark .bracket-highlighting-18 {
  color: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-19 {
  color: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-20 {
  color: #179fff !important;
}
.monaco-editor.vs-dark .bracket-highlighting-21 {
  color: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-22 {
  color: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-23 {
  color: #179fff !important;
}
.monaco-editor.vs-dark .bracket-highlighting-24 {
  color: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-25 {
  color: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-26 {
  color: #179fff !important;
}
.monaco-editor.vs-dark .bracket-highlighting-27 {
  color: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-28 {
  color: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-highlighting-29 {
  color: #179fff !important;
}
.monaco-editor.vs-dark .line-numbers.dimmed-line-number {
  color: rgba(133, 133, 133, 0.4) !important;
}
.monaco-editor.vs-dark .view-overlays .current-line {
  border: 2px solid #282828 !important;
}
.monaco-editor.vs-dark .margin-view-overlays .current-line-margin {
  border: 2px solid #282828 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-0 {
  --guide-color: rgba(255, 215, 0, 0.3) !important;
  --guide-color-active: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-1 {
  --guide-color: rgba(218, 112, 214, 0.3) !important;
  --guide-color-active: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-2 {
  --guide-color: rgba(23, 159, 255, 0.3) !important;
  --guide-color-active: #179fff !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-3 {
  --guide-color: rgba(255, 215, 0, 0.3) !important;
  --guide-color-active: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-4 {
  --guide-color: rgba(218, 112, 214, 0.3) !important;
  --guide-color-active: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-5 {
  --guide-color: rgba(23, 159, 255, 0.3) !important;
  --guide-color-active: #179fff !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-6 {
  --guide-color: rgba(255, 215, 0, 0.3) !important;
  --guide-color-active: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-7 {
  --guide-color: rgba(218, 112, 214, 0.3) !important;
  --guide-color-active: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-8 {
  --guide-color: rgba(23, 159, 255, 0.3) !important;
  --guide-color-active: #179fff !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-9 {
  --guide-color: rgba(255, 215, 0, 0.3) !important;
  --guide-color-active: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-10 {
  --guide-color: rgba(218, 112, 214, 0.3) !important;
  --guide-color-active: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-11 {
  --guide-color: rgba(23, 159, 255, 0.3) !important;
  --guide-color-active: #179fff !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-12 {
  --guide-color: rgba(255, 215, 0, 0.3) !important;
  --guide-color-active: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-13 {
  --guide-color: rgba(218, 112, 214, 0.3) !important;
  --guide-color-active: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-14 {
  --guide-color: rgba(23, 159, 255, 0.3) !important;
  --guide-color-active: #179fff !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-15 {
  --guide-color: rgba(255, 215, 0, 0.3) !important;
  --guide-color-active: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-16 {
  --guide-color: rgba(218, 112, 214, 0.3) !important;
  --guide-color-active: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-17 {
  --guide-color: rgba(23, 159, 255, 0.3) !important;
  --guide-color-active: #179fff !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-18 {
  --guide-color: rgba(255, 215, 0, 0.3) !important;
  --guide-color-active: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-19 {
  --guide-color: rgba(218, 112, 214, 0.3) !important;
  --guide-color-active: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-20 {
  --guide-color: rgba(23, 159, 255, 0.3) !important;
  --guide-color-active: #179fff !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-21 {
  --guide-color: rgba(255, 215, 0, 0.3) !important;
  --guide-color-active: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-22 {
  --guide-color: rgba(218, 112, 214, 0.3) !important;
  --guide-color-active: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-23 {
  --guide-color: rgba(23, 159, 255, 0.3) !important;
  --guide-color-active: #179fff !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-24 {
  --guide-color: rgba(255, 215, 0, 0.3) !important;
  --guide-color-active: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-25 {
  --guide-color: rgba(218, 112, 214, 0.3) !important;
  --guide-color-active: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-26 {
  --guide-color: rgba(23, 159, 255, 0.3) !important;
  --guide-color-active: #179fff !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-27 {
  --guide-color: rgba(255, 215, 0, 0.3) !important;
  --guide-color-active: #ffd700 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-28 {
  --guide-color: rgba(218, 112, 214, 0.3) !important;
  --guide-color-active: #da70d6 !important;
}
.monaco-editor.vs-dark .bracket-indent-guide.lvl-29 {
  --guide-color: rgba(23, 159, 255, 0.3) !important;
  --guide-color-active: #179fff !important;
}
.monaco-editor.vs-dark .vertical {
  box-shadow: 1px 0 0 0 var(--guide-color) inset !important;
}
.monaco-editor.vs-dark .horizontal-top {
  border-top: 1px solid var(--guide-color) !important;
}
.monaco-editor.vs-dark .horizontal-bottom {
  border-bottom: 1px solid var(--guide-color) !important;
}
.monaco-editor.vs-dark .vertical.indent-active {
  box-shadow: 1px 0 0 0 var(--guide-color-active) inset !important;
}
.monaco-editor.vs-dark .horizontal-top.indent-active {
  border-top: 1px solid var(--guide-color-active) !important;
}
.monaco-editor.vs-dark .horizontal-bottom.indent-active {
  border-bottom: 1px solid var(--guide-color-active) !important;
}
.monaco-editor.vs-dark .cursors-layer .cursor {
  background-color: #aeafad !important;
  border-color: #aeafad !important;
  color: #515052 !important;
}
.monaco-editor.vs-dark .squiggly-error {
  background: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%206%203'%20enable-background%3D'new%200%200%206%203'%20height%3D'3'%20width%3D'6'%3E%3Cg%20fill%3D'%23f14c4c'%3E%3Cpolygon%20points%3D'5.5%2C0%202.5%2C3%201.1%2C3%204.1%2C0'%2F%3E%3Cpolygon%20points%3D'4%2C0%206%2C2%206%2C0.6%205.4%2C0'%2F%3E%3Cpolygon%20points%3D'0%2C2%201%2C3%202.4%2C3%200%2C0.6'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E") repeat-x bottom left !important;
}
.monaco-editor.vs-dark .squiggly-warning {
  background: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%206%203'%20enable-background%3D'new%200%200%206%203'%20height%3D'3'%20width%3D'6'%3E%3Cg%20fill%3D'%23cca700'%3E%3Cpolygon%20points%3D'5.5%2C0%202.5%2C3%201.1%2C3%204.1%2C0'%2F%3E%3Cpolygon%20points%3D'4%2C0%206%2C2%206%2C0.6%205.4%2C0'%2F%3E%3Cpolygon%20points%3D'0%2C2%201%2C3%202.4%2C3%200%2C0.6'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E") repeat-x bottom left !important;
}
.monaco-editor.vs-dark .squiggly-info {
  background: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%206%203'%20enable-background%3D'new%200%200%206%203'%20height%3D'3'%20width%3D'6'%3E%3Cg%20fill%3D'%233794ff'%3E%3Cpolygon%20points%3D'5.5%2C0%202.5%2C3%201.1%2C3%204.1%2C0'%2F%3E%3Cpolygon%20points%3D'4%2C0%206%2C2%206%2C0.6%205.4%2C0'%2F%3E%3Cpolygon%20points%3D'0%2C2%201%2C3%202.4%2C3%200%2C0.6'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E") repeat-x bottom left !important;
}
.monaco-editor.vs-dark .squiggly-hint {
  background: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%223%22%20width%3D%2212%22%3E%3Cg%20fill%3D%22rgba(238%2C%20238%2C%20238%2C%200.7)%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%225%22%20cy%3D%221%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%229%22%20cy%3D%221%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E") no-repeat bottom left !important;
}
.monaco-editor.vs-dark.showUnused .squiggly-inline-unnecessary {
  opacity: 0.667 !important;
}
.monaco-editor.vs-dark .monaco-hover .hover-row:not(:first-child):not(:empty) {
  border-top: 1px solid rgba(69, 69, 69, 0.5) !important;
}
.monaco-editor.vs-dark .monaco-hover hr {
  border-top: 1px solid rgba(69, 69, 69, 0.5) !important;
}
.monaco-editor.vs-dark .monaco-hover hr {
  border-bottom: 0px solid rgba(69, 69, 69, 0.5) !important;
}
.monaco-editor.vs-dark .findMatch {
  background-color: rgba(234, 92, 0, 0.33) !important;
}
.monaco-editor.vs-dark .currentFindMatch {
  background-color: #515c6a !important;
}
.monaco-editor.vs-dark .findScope {
  background-color: rgba(58, 61, 65, 0.4) !important;
}
.monaco-editor.vs-dark .find-widget {
  background-color: #252526 !important;
}
.monaco-editor.vs-dark .find-widget {
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.36) !important;
}
.monaco-editor.vs-dark .find-widget {
  color: #cccccc !important;
}
.monaco-editor.vs-dark .find-widget.no-results .matchesCount {
  color: #f48771 !important;
}
.monaco-editor.vs-dark .find-widget .monaco-sash {
  background-color: #454545 !important;
}
.monaco-editor.vs-dark .find-widget .button:not(.disabled):hover,
.monaco-editor.vs-dark .find-widget .codicon-find-selection:hover {
  background-color: rgba(90, 93, 94, 0.31) !important;
}
.monaco-editor.vs-dark .find-widget .monaco-inputbox.synthetic-focus {
  outline-color: #007fd4 !important;
}
.monaco-editor.vs-dark .selectionHighlight {
  background-color: rgba(173, 214, 255, 0.07) !important;
}
.monaco-editor.vs-dark .diagonal-fill {
  background-image: linear-gradient(-45deg,
      rgba(204, 204, 204, 0.2) 12.5%,
      #0000 12.5%, #0000 50%,
      rgba(204, 204, 204, 0.2) 50%, rgba(204, 204, 204, 0.2) 62.5%,
      #0000 62.5%, #0000 100%) !important;
  background-size: 8px 8px !important;
}
.monaco-editor.vs-dark {
  --vscode-foreground: #cccccc !important;
  --vscode-disabledForeground: rgba(204, 204, 204, 0.5) !important;
  --vscode-errorForeground: #f48771 !important;
  --vscode-descriptionForeground: rgba(204, 204, 204, 0.7) !important;
  --vscode-icon-foreground: #c5c5c5 !important;
  --vscode-focusBorder: #007fd4 !important;
  --vscode-textSeparator-foreground: rgba(255, 255, 255, 0.18) !important;
  --vscode-textLink-foreground: #3794ff !important;
  --vscode-textLink-activeForeground: #3794ff !important;
  --vscode-textPreformat-foreground: #d7ba7d !important;
  --vscode-textBlockQuote-background: rgba(127, 127, 127, 0.1) !important;
  --vscode-textBlockQuote-border: rgba(0, 122, 204, 0.5) !important;
  --vscode-textCodeBlock-background: rgba(10, 10, 10, 0.4) !important;
  --vscode-widget-shadow: rgba(0, 0, 0, 0.36) !important;
  --vscode-input-background: #3c3c3c !important;
  --vscode-input-foreground: #cccccc !important;
  --vscode-inputOption-activeBorder: #007acc !important;
  --vscode-inputOption-hoverBackground: rgba(90, 93, 94, 0.5) !important;
  --vscode-inputOption-activeBackground: rgba(0, 127, 212, 0.4) !important;
  --vscode-inputOption-activeForeground: #ffffff !important;
  --vscode-input-placeholderForeground: rgba(204, 204, 204, 0.5) !important;
  --vscode-inputValidation-infoBackground: #063b49 !important;
  --vscode-inputValidation-infoBorder: #007acc !important;
  --vscode-inputValidation-warningBackground: #352a05 !important;
  --vscode-inputValidation-warningBorder: #b89500 !important;
  --vscode-inputValidation-errorBackground: #5a1d1d !important;
  --vscode-inputValidation-errorBorder: #be1100 !important;
  --vscode-dropdown-background: #3c3c3c !important;
  --vscode-dropdown-foreground: #f0f0f0 !important;
  --vscode-dropdown-border: #3c3c3c !important;
  --vscode-button-foreground: #ffffff !important;
  --vscode-button-separator: rgba(255, 255, 255, 0.4) !important;
  --vscode-button-background: #0e639c !important;
  --vscode-button-hoverBackground: #1177bb !important;
  --vscode-button-secondaryForeground: #ffffff !important;
  --vscode-button-secondaryBackground: #3a3d41 !important;
  --vscode-button-secondaryHoverBackground: #45494e !important;
  --vscode-badge-background: #4d4d4d !important;
  --vscode-badge-foreground: #ffffff !important;
  --vscode-scrollbar-shadow: #000000 !important;
  --vscode-scrollbarSlider-background: rgba(121, 121, 121, 0.4) !important;
  --vscode-scrollbarSlider-hoverBackground: rgba(100, 100, 100, 0.7) !important;
  --vscode-scrollbarSlider-activeBackground: rgba(191, 191, 191, 0.4) !important;
  --vscode-progressBar-background: #0e70c0 !important;
  --vscode-editorError-foreground: #f14c4c !important;
  --vscode-editorWarning-foreground: #cca700 !important;
  --vscode-editorInfo-foreground: #3794ff !important;
  --vscode-editorHint-foreground: rgba(238, 238, 238, 0.7) !important;
  --vscode-sash-hoverBorder: #007fd4 !important;
  --vscode-editor-background: #1e1e1e !important;
  --vscode-editor-foreground: #d4d4d4 !important;
  --vscode-editorStickyScroll-background: #1e1e1e !important;
  --vscode-editorStickyScrollHover-background: #2a2d2e !important;
  --vscode-editorWidget-background: #252526 !important;
  --vscode-editorWidget-foreground: #cccccc !important;
  --vscode-editorWidget-border: #454545 !important;
  --vscode-quickInput-background: #252526 !important;
  --vscode-quickInput-foreground: #cccccc !important;
  --vscode-quickInputTitle-background: rgba(255, 255, 255, 0.1) !important;
  --vscode-pickerGroup-foreground: #3794ff !important;
  --vscode-pickerGroup-border: #3f3f46 !important;
  --vscode-keybindingLabel-background: rgba(128, 128, 128, 0.17) !important;
  --vscode-keybindingLabel-foreground: #cccccc !important;
  --vscode-keybindingLabel-border: rgba(51, 51, 51, 0.6) !important;
  --vscode-keybindingLabel-bottomBorder: rgba(68, 68, 68, 0.6) !important;
  --vscode-editor-selectionBackground: #264f78 !important;
  --vscode-editor-inactiveSelectionBackground: #3a3d41 !important;
  --vscode-editor-selectionHighlightBackground: rgba(173, 214, 255, 0.15) !important;
  --vscode-editor-findMatchBackground: #515c6a !important;
  --vscode-editor-findMatchHighlightBackground: rgba(234, 92, 0, 0.33) !important;
  --vscode-editor-findRangeHighlightBackground: rgba(58, 61, 65, 0.4) !important;
  --vscode-searchEditor-findMatchBackground: rgba(234, 92, 0, 0.22) !important;
  --vscode-search-resultsInfoForeground: rgba(204, 204, 204, 0.65) !important;
  --vscode-editor-hoverHighlightBackground: rgba(38, 79, 120, 0.25) !important;
  --vscode-editorHoverWidget-background: #252526 !important;
  --vscode-editorHoverWidget-foreground: #cccccc !important;
  --vscode-editorHoverWidget-border: #454545 !important;
  --vscode-editorHoverWidget-statusBarBackground: #2c2c2d !important;
  --vscode-editorLink-activeForeground: #4e94ce !important;
  --vscode-editorInlayHint-foreground: #ffffff !important;
  --vscode-editorInlayHint-background: rgba(77, 77, 77, 0.8) !important;
  --vscode-editorInlayHint-typeForeground: #ffffff !important;
  --vscode-editorInlayHint-typeBackground: rgba(77, 77, 77, 0.8) !important;
  --vscode-editorInlayHint-parameterForeground: #ffffff !important;
  --vscode-editorInlayHint-parameterBackground: rgba(77, 77, 77, 0.8) !important;
  --vscode-editorLightBulb-foreground: #ffcc00 !important;
  --vscode-editorLightBulbAutoFix-foreground: #75beff !important;
  --vscode-diffEditor-insertedTextBackground: rgba(156, 204, 44, 0.2) !important;
  --vscode-diffEditor-removedTextBackground: rgba(255, 0, 0, 0.2) !important;
  --vscode-diffEditor-insertedLineBackground: rgba(155, 185, 85, 0.2) !important;
  --vscode-diffEditor-removedLineBackground: rgba(255, 0, 0, 0.2) !important;
  --vscode-diffEditor-diagonalFill: rgba(204, 204, 204, 0.2) !important;
  --vscode-list-focusOutline: #007fd4 !important;
  --vscode-list-activeSelectionBackground: #04395e !important;
  --vscode-list-activeSelectionForeground: #ffffff !important;
  --vscode-list-inactiveSelectionBackground: #37373d !important;
  --vscode-list-hoverBackground: #2a2d2e !important;
  --vscode-list-dropBackground: #062f4a !important;
  --vscode-list-highlightForeground: #2aaaff !important;
  --vscode-list-focusHighlightForeground: #2aaaff !important;
  --vscode-list-invalidItemForeground: #b89500 !important;
  --vscode-list-errorForeground: #f88070 !important;
  --vscode-list-warningForeground: #cca700 !important;
  --vscode-listFilterWidget-background: #252526 !important;
  --vscode-listFilterWidget-outline: rgba(0, 0, 0, 0) !important;
  --vscode-listFilterWidget-noMatchesOutline: #be1100 !important;
  --vscode-listFilterWidget-shadow: rgba(0, 0, 0, 0.36) !important;
  --vscode-list-filterMatchBackground: rgba(234, 92, 0, 0.33) !important;
  --vscode-tree-indentGuidesStroke: #585858 !important;
  --vscode-tree-inactiveIndentGuidesStroke: rgba(88, 88, 88, 0.4) !important;
  --vscode-tree-tableColumnsBorder: rgba(204, 204, 204, 0.13) !important;
  --vscode-tree-tableOddRowsBackground: rgba(204, 204, 204, 0.04) !important;
  --vscode-list-deemphasizedForeground: #8c8c8c !important;
  --vscode-checkbox-background: #3c3c3c !important;
  --vscode-checkbox-selectBackground: #252526 !important;
  --vscode-checkbox-foreground: #f0f0f0 !important;
  --vscode-checkbox-border: #3c3c3c !important;
  --vscode-checkbox-selectBorder: #c5c5c5 !important;
  --vscode-quickInputList-focusForeground: #ffffff !important;
  --vscode-quickInputList-focusBackground: #04395e !important;
  --vscode-menu-foreground: #f0f0f0 !important;
  --vscode-menu-background: #3c3c3c !important;
  --vscode-menu-selectionForeground: #ffffff !important;
  --vscode-menu-selectionBackground: #04395e !important;
  --vscode-menu-separatorBackground: #606060 !important;
  --vscode-toolbar-hoverBackground: rgba(90, 93, 94, 0.31) !important;
  --vscode-toolbar-activeBackground: rgba(99, 102, 103, 0.31) !important;
  --vscode-editor-snippetTabstopHighlightBackground: rgba(124, 124, 124, 0.3) !important;
  --vscode-editor-snippetFinalTabstopHighlightBorder: #525252 !important;
  --vscode-breadcrumb-foreground: rgba(204, 204, 204, 0.8) !important;
  --vscode-breadcrumb-background: #1e1e1e !important;
  --vscode-breadcrumb-focusForeground: #e0e0e0 !important;
  --vscode-breadcrumb-activeSelectionForeground: #e0e0e0 !important;
  --vscode-breadcrumbPicker-background: #252526 !important;
  --vscode-merge-currentHeaderBackground: rgba(64, 200, 174, 0.5) !important;
  --vscode-merge-currentContentBackground: rgba(64, 200, 174, 0.2) !important;
  --vscode-merge-incomingHeaderBackground: rgba(64, 166, 255, 0.5) !important;
  --vscode-merge-incomingContentBackground: rgba(64, 166, 255, 0.2) !important;
  --vscode-merge-commonHeaderBackground: rgba(96, 96, 96, 0.4) !important;
  --vscode-merge-commonContentBackground: rgba(96, 96, 96, 0.16) !important;
  --vscode-editorOverviewRuler-currentContentForeground: rgba(64, 200, 174, 0.5) !important;
  --vscode-editorOverviewRuler-incomingContentForeground: rgba(64, 166, 255, 0.5) !important;
  --vscode-editorOverviewRuler-commonContentForeground: rgba(96, 96, 96, 0.4) !important;
  --vscode-editorOverviewRuler-findMatchForeground: rgba(209, 134, 22, 0.49) !important;
  --vscode-editorOverviewRuler-selectionHighlightForeground: rgba(160, 160, 160, 0.8) !important;
  --vscode-minimap-findMatchHighlight: #d18616 !important;
  --vscode-minimap-selectionOccurrenceHighlight: #676767 !important;
  --vscode-minimap-selectionHighlight: #264f78 !important;
  --vscode-minimap-errorHighlight: rgba(255, 18, 18, 0.7) !important;
  --vscode-minimap-warningHighlight: #cca700 !important;
  --vscode-minimap-foregroundOpacity: #000000 !important;
  --vscode-minimapSlider-background: rgba(121, 121, 121, 0.2) !important;
  --vscode-minimapSlider-hoverBackground: rgba(100, 100, 100, 0.35) !important;
  --vscode-minimapSlider-activeBackground: rgba(191, 191, 191, 0.2) !important;
  --vscode-problemsErrorIcon-foreground: #f14c4c !important;
  --vscode-problemsWarningIcon-foreground: #cca700 !important;
  --vscode-problemsInfoIcon-foreground: #3794ff !important;
  --vscode-charts-foreground: #cccccc !important;
  --vscode-charts-lines: rgba(204, 204, 204, 0.5) !important;
  --vscode-charts-red: #f14c4c !important;
  --vscode-charts-blue: #3794ff !important;
  --vscode-charts-yellow: #cca700 !important;
  --vscode-charts-orange: #d18616 !important;
  --vscode-charts-green: #89d185 !important;
  --vscode-charts-purple: #b180d7 !important;
  --vscode-editor-lineHighlightBorder: #282828 !important;
  --vscode-editor-rangeHighlightBackground: rgba(255, 255, 255, 0.04) !important;
  --vscode-editor-symbolHighlightBackground: rgba(234, 92, 0, 0.33) !important;
  --vscode-editorCursor-foreground: #aeafad !important;
  --vscode-editorWhitespace-foreground: rgba(227, 228, 226, 0.16) !important;
  --vscode-editorIndentGuide-background: #404040 !important;
  --vscode-editorIndentGuide-activeBackground: #707070 !important;
  --vscode-editorLineNumber-foreground: #858585 !important;
  --vscode-editorActiveLineNumber-foreground: #c6c6c6 !important;
  --vscode-editorLineNumber-activeForeground: #c6c6c6 !important;
  --vscode-editorRuler-foreground: #5a5a5a !important;
  --vscode-editorCodeLens-foreground: #999999 !important;
  --vscode-editorBracketMatch-background: rgba(0, 100, 0, 0.1) !important;
  --vscode-editorBracketMatch-border: #888888 !important;
  --vscode-editorOverviewRuler-border: rgba(127, 127, 127, 0.3) !important;
  --vscode-editorGutter-background: #1e1e1e !important;
  --vscode-editorUnnecessaryCode-opacity: rgba(0, 0, 0, 0.67) !important;
  --vscode-editorGhostText-foreground: rgba(255, 255, 255, 0.34) !important;
  --vscode-editorOverviewRuler-rangeHighlightForeground: rgba(0, 122, 204, 0.6) !important;
  --vscode-editorOverviewRuler-errorForeground: rgba(255, 18, 18, 0.7) !important;
  --vscode-editorOverviewRuler-warningForeground: #cca700 !important;
  --vscode-editorOverviewRuler-infoForeground: #3794ff !important;
  --vscode-editorBracketHighlight-foreground1: #ffd700 !important;
  --vscode-editorBracketHighlight-foreground2: #da70d6 !important;
  --vscode-editorBracketHighlight-foreground3: #179fff !important;
  --vscode-editorBracketHighlight-foreground4: rgba(0, 0, 0, 0) !important;
  --vscode-editorBracketHighlight-foreground5: rgba(0, 0, 0, 0) !important;
  --vscode-editorBracketHighlight-foreground6: rgba(0, 0, 0, 0) !important;
  --vscode-editorBracketHighlight-unexpectedBracket-foreground: rgba(255, 18, 18, 0.8) !important;
  --vscode-editorBracketPairGuide-background1: rgba(0, 0, 0, 0) !important;
  --vscode-editorBracketPairGuide-background2: rgba(0, 0, 0, 0) !important;
  --vscode-editorBracketPairGuide-background3: rgba(0, 0, 0, 0) !important;
  --vscode-editorBracketPairGuide-background4: rgba(0, 0, 0, 0) !important;
  --vscode-editorBracketPairGuide-background5: rgba(0, 0, 0, 0) !important;
  --vscode-editorBracketPairGuide-background6: rgba(0, 0, 0, 0) !important;
  --vscode-editorBracketPairGuide-activeBackground1: rgba(0, 0, 0, 0) !important;
  --vscode-editorBracketPairGuide-activeBackground2: rgba(0, 0, 0, 0) !important;
  --vscode-editorBracketPairGuide-activeBackground3: rgba(0, 0, 0, 0) !important;
  --vscode-editorBracketPairGuide-activeBackground4: rgba(0, 0, 0, 0) !important;
  --vscode-editorBracketPairGuide-activeBackground5: rgba(0, 0, 0, 0) !important;
  --vscode-editorBracketPairGuide-activeBackground6: rgba(0, 0, 0, 0) !important;
  --vscode-editorUnicodeHighlight-border: #bd9b03 !important;
  --vscode-editorUnicodeHighlight-background: rgba(189, 155, 3, 0.15) !important;
  --vscode-editorOverviewRuler-bracketMatchForeground: #a0a0a0 !important;
  --vscode-symbolIcon-arrayForeground: #cccccc !important;
  --vscode-symbolIcon-booleanForeground: #cccccc !important;
  --vscode-symbolIcon-classForeground: #ee9d28 !important;
  --vscode-symbolIcon-colorForeground: #cccccc !important;
  --vscode-symbolIcon-constantForeground: #cccccc !important;
  --vscode-symbolIcon-constructorForeground: #b180d7 !important;
  --vscode-symbolIcon-enumeratorForeground: #ee9d28 !important;
  --vscode-symbolIcon-enumeratorMemberForeground: #75beff !important;
  --vscode-symbolIcon-eventForeground: #ee9d28 !important;
  --vscode-symbolIcon-fieldForeground: #75beff !important;
  --vscode-symbolIcon-fileForeground: #cccccc !important;
  --vscode-symbolIcon-folderForeground: #cccccc !important;
  --vscode-symbolIcon-functionForeground: #b180d7 !important;
  --vscode-symbolIcon-interfaceForeground: #75beff !important;
  --vscode-symbolIcon-keyForeground: #cccccc !important;
  --vscode-symbolIcon-keywordForeground: #cccccc !important;
  --vscode-symbolIcon-methodForeground: #b180d7 !important;
  --vscode-symbolIcon-moduleForeground: #cccccc !important;
  --vscode-symbolIcon-namespaceForeground: #cccccc !important;
  --vscode-symbolIcon-nullForeground: #cccccc !important;
  --vscode-symbolIcon-numberForeground: #cccccc !important;
  --vscode-symbolIcon-objectForeground: #cccccc !important;
  --vscode-symbolIcon-operatorForeground: #cccccc !important;
  --vscode-symbolIcon-packageForeground: #cccccc !important;
  --vscode-symbolIcon-propertyForeground: #cccccc !important;
  --vscode-symbolIcon-referenceForeground: #cccccc !important;
  --vscode-symbolIcon-snippetForeground: #cccccc !important;
  --vscode-symbolIcon-stringForeground: #cccccc !important;
  --vscode-symbolIcon-structForeground: #cccccc !important;
  --vscode-symbolIcon-textForeground: #cccccc !important;
  --vscode-symbolIcon-typeParameterForeground: #cccccc !important;
  --vscode-symbolIcon-unitForeground: #cccccc !important;
  --vscode-symbolIcon-variableForeground: #75beff !important;
  --vscode-peekViewTitle-background: #252526 !important;
  --vscode-peekViewTitleLabel-foreground: #ffffff !important;
  --vscode-peekViewTitleDescription-foreground: rgba(204, 204, 204, 0.7) !important;
  --vscode-peekView-border: #3794ff !important;
  --vscode-peekViewResult-background: #252526 !important;
  --vscode-peekViewResult-lineForeground: #bbbbbb !important;
  --vscode-peekViewResult-fileForeground: #ffffff !important;
  --vscode-peekViewResult-selectionBackground: rgba(51, 153, 255, 0.2) !important;
  --vscode-peekViewResult-selectionForeground: #ffffff !important;
  --vscode-peekViewEditor-background: #001f33 !important;
  --vscode-peekViewEditorGutter-background: #001f33 !important;
  --vscode-peekViewEditorStickyScroll-background: #001f33 !important;
  --vscode-peekViewResult-matchHighlightBackground: rgba(234, 92, 0, 0.3) !important;
  --vscode-peekViewEditor-matchHighlightBackground: rgba(255, 143, 0, 0.6) !important;
  --vscode-editorMarkerNavigationError-background: #f14c4c !important;
  --vscode-editorMarkerNavigationError-headerBackground: rgba(241, 76, 76, 0.1) !important;
  --vscode-editorMarkerNavigationWarning-background: #cca700 !important;
  --vscode-editorMarkerNavigationWarning-headerBackground: rgba(204, 167, 0, 0.1) !important;
  --vscode-editorMarkerNavigationInfo-background: #3794ff !important;
  --vscode-editorMarkerNavigationInfo-headerBackground: rgba(55, 148, 255, 0.1) !important;
  --vscode-editorMarkerNavigation-background: #1e1e1e !important;
  --vscode-editor-foldBackground: rgba(38, 79, 120, 0.3) !important;
  --vscode-editorGutter-foldingControlForeground: #c5c5c5 !important;
  --vscode-editorSuggestWidget-background: #252526 !important;
  --vscode-editorSuggestWidget-border: #454545 !important;
  --vscode-editorSuggestWidget-foreground: #d4d4d4 !important;
  --vscode-editorSuggestWidget-selectedForeground: #ffffff !important;
  --vscode-editorSuggestWidget-selectedBackground: #04395e !important;
  --vscode-editorSuggestWidget-highlightForeground: #2aaaff !important;
  --vscode-editorSuggestWidget-focusHighlightForeground: #2aaaff !important;
  --vscode-editorSuggestWidgetStatus-foreground: rgba(212, 212, 212, 0.5) !important;
  --vscode-editor-linkedEditingBackground: rgba(255, 0, 0, 0.3) !important;
  --vscode-editor-wordHighlightBackground: rgba(87, 87, 87, 0.72) !important;
  --vscode-editor-wordHighlightStrongBackground: rgba(0, 73, 114, 0.72) !important;
  --vscode-editor-wordHighlightTextBackground: rgba(87, 87, 87, 0.72) !important;
  --vscode-editorOverviewRuler-wordHighlightForeground: rgba(160, 160, 160, 0.8) !important;
  --vscode-editorOverviewRuler-wordHighlightStrongForeground: rgba(192, 160, 192, 0.8) !important;
  --vscode-editorOverviewRuler-wordHighlightTextForeground: rgba(160, 160, 160, 0.8) !important;
  --vscode-editorHoverWidget-highlightForeground: #2aaaff !important;
}
.monaco-editor.vs-dark .mtk1 {
  color: #d4d4d4 !important;
}
.monaco-editor.vs-dark .mtk2 {
  color: #1e1e1e !important;
}
.monaco-editor.vs-dark .mtk3 {
  color: #cc6666 !important;
}
.monaco-editor.vs-dark .mtk4 {
  color: #9cdcfe !important;
}
.monaco-editor.vs-dark .mtk5 {
  color: #ce9178 !important;
}
.monaco-editor.vs-dark .mtk6 {
  color: #b5cea8 !important;
}
.monaco-editor.vs-dark .mtk7 {
  color: #608b4e !important;
}
.monaco-editor.vs-dark .mtk8 {
  color: #569cd6 !important;
}
.monaco-editor.vs-dark .mtk9 {
  color: #dcdcdc !important;
}
.monaco-editor.vs-dark .mtk10 {
  color: #808080 !important;
}
.monaco-editor.vs-dark .mtk11 {
  color: #f44747 !important;
}
.monaco-editor.vs-dark .mtk12 {
  color: #c586c0 !important;
}
.monaco-editor.vs-dark .mtk13 {
  color: #a79873 !important;
}
.monaco-editor.vs-dark .mtk14 {
  color: #dd6a6f !important;
}
.monaco-editor.vs-dark .mtk15 {
  color: #5bb498 !important;
}
.monaco-editor.vs-dark .mtk16 {
  color: #909090 !important;
}
.monaco-editor.vs-dark .mtk17 {
  color: #778899 !important;
}
.monaco-editor.vs-dark .mtk18 {
  color: #ff00ff !important;
}
.monaco-editor.vs-dark .mtk19 {
  color: #b46695 !important;
}
.monaco-editor.vs-dark .mtk20 {
  color: #ff0000 !important;
}
.monaco-editor.vs-dark .mtk21 {
  color: #4f76ac !important;
}
.monaco-editor.vs-dark .mtk22 {
  color: #3dc9b0 !important;
}
.monaco-editor.vs-dark .mtk23 {
  color: #74b0df !important;
}
.monaco-editor.vs-dark .mtk24 {
  color: #4864aa !important;
}
.monaco-editor.vs-dark .mtki {
  font-style: italic !important;
}
.monaco-editor.vs-dark .mtkb {
  font-weight: bold !important;
}
.monaco-editor.vs-dark .mtku {
  text-decoration: underline !important;
  text-underline-position: under !important;
}
.monaco-editor.vs-dark .mtks { text-decoration: line-through !important; }
.monaco-editor.vs-dark .mtks.mtku { text-decoration: underline line-through !important; text-underline-position: under !important; }
`

const ignoreInlineStyle = [
  '.kd-cq-color-picker-color-block',
  '.kd-cq-color-edit-line',
  '.tox-tinymce-aux .tox-swatches__row [role="menuitemcheckbox"]',
  '.kd-cq-rich-text .tox-editor-header #tox-icon-text-color__color',
  '.kdesigner-right-view-color-editor-prefix-icon rect',
  '.print-designer-nav-tool-operation-btn .navtool-icon rect',
  '.kd-cq-spread-condition-preview',
  // monaco-editor - Start
  '.monaco-scrollable-element',
  '.monaco-menu',
  '.codicon',
  '.monaco-menu .action-menu-item',
  '.monaco-submenu-item'
  // monaco-editor - end
]
  ; (function () {
    window.sessionStorage.setItem(
      'kd_dark_custom_style',
      JSON.stringify({
        fixDarkModeStyle,
        ignoreInlineStyle
      })
    )
  })()
