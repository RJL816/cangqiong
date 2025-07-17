var testdata = {
  label:{
    mobile:[{text:"标签"}],
	pc:[{text:"标签"}]
  },
  button:{
    mobile:[{name:"按钮"}],
	pc:[{name:"按钮"}]
  },
  kswiper:{
    mobile:[{defaultImg:"image/background_pic.png"}],
	pc:[{defaultImg:"image/banner.png"}]
  },
  imggroup:{
    mobile:[{showstyle:1}]
  },
  tabbaritem:{
    mobile:[{flex:1}]
  },
  switchtabbaritem:{
    mobile:[{flex:1}]
  },
  tab:{
    mobile:[{flex:1}]
  },
  admindivision:{
    mobile:[{flex:1}]
  },
  selectdata:{
    mobile:[{flex:1}]
  },
  mltext:{
    mobile:[{flex:1}]
  },
  checkboxgroup:{
    mobile:[{flex:1}]
  },
  input:{
    mobile:[{editable:true}] //flex:1, 如果是style有flex:unset这种，会失效
  },
  price:{
    mobile:[{flex:1}]
  },
  number:{
    mobile:[{flex:1}]
  },
  textarea:{
    mobile:[{flex:1}]
  },
  qty:{
    mobile:[{flex:1}]
  },
  starscore:{
    mobile:[{flex:1}]
  },
  datetime:{
    mobile:[{flex:1}]
  },
  sku:{
    mobile:[{flex:1}]
  },
  kswitch:{
    mobile:[{flex:1}]
  },
  multilanguagetext:{
    mobile:[{flex:1}]
  },
  levelmenu: {
    pc: [
      {
        parent: "0",
        level: "1",
        name: "电脑",
        id: "445422614295352320",
        key: "01"
      },
      {
        parent: "0",
        level: "1",
        children: [
          {
            parent: "445423252618090496",
            level: 2,
            name: "全部",
            id: "445423252618090496",
            key: "445423252618090496"
          },
          {
            parent: "445423252618090496",
            level: "2",
            children: [
              {
                parent: "445423421430436864",
                level: 3,
                name: "全部",
                id: "445423421430436864",
                key: "445423421430436864"
              },
              {
                parent: "445423421430436864",
                level: "3",
                name: "外设产品",
                id: "899892687677701120",
                key: "gdfgsdgfd"
              }
            ],
            name: "打印机",
            id: "445423421430436864",
            key: "02-01"
          }
        ],
        name: "办公设备",
        id: "445423252618090496",
        key: "02"
      }
    ],
    mobile: [
      { id: "970800508694483967", key: "test900", name: "服饰2", level: "1" },
      {
        id: "970800508694483968",
        key: "test901",
        name: "服饰",
        level: "1",
        children: [
          {
            id: "978253306570752000",
            name: "男装",
            parent: "970800508694483968",
            level: "2",
            children: [
              {
                id: "1191222679928074240",
                key: "itemclass",
                name: "衬衫",
                parent: "978253306570752000",
                level: "3",
                icon:
                  "https://feature.kingdee.com:2024/feature_fileserver/tenant_devscm_test/201912160858411208/202107/ocpos/ocpos_selectpicture/images/FBf8j6OFMNgJmos8Mg/HX0JQzQE.jpg?v=1.0"
              }
            ]
          },
          {
            id: "1",
            name: "品牌筛选",
            parent: "970800508694483968",
            level: "2",
            children: [
              {
                id: "900473861882005504",
                key: "brand",
                name: "333",
                parent: "1",
                level: "3",
                icon:
                  "https://feature.kingdee.com:2024/feature_fileserver/tenant_devscm_test/201912160858411208/202107/ocpos/ocpos_selectpicture/images/xVGAj3w8gdzf9nVzNA/w1svdnzy.jpg?v=1.0"
              }
            ]
          }
        ]
      }
    ]
  }
};
define([], function() {
  return testdata;
});
