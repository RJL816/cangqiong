var additiondata = {
  label:{
    common:[
	{
        id: "text",
		category: "",
        index: 10000,
        name: "标签值",
        required: false,
        type: "text",
		value:""
	}]
  },
  img:{
    common:[
	{
	    id: "src",
		category: "",
        index: 10000,
        name: "路径",
        required: false,
        type: "text",
		value:""
	},
	{
	    id: "clickable",
		category: "",
        index: 10001,
        name: "可点击",
        required: false,
        type: "bool",
		value:""
	}]
  },
  admindivision:{
    mobile:[
	{
	    id: "showstyle",
		category: "",
        index: 10000,
        name: "模式",
        required: false,
        type: "radiogroup",
		valueList:[{n:"地址级联",v:"1",default:true},{n:"地图选点",v:"2"}]
	}]
  }
};
define([], function() {
  return additiondata;
});
