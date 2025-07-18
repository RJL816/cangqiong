(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.map.ui;
	oManager.registPackageResources(oPackage, 
	{
		expect: "敬请期待。",
		mapGroup: "分类",
		addMapGroup: "添加分类",
		mapGroupNameCanNotEmpty: "分类名称不能为空。",
		mapGroupNameToLong: "分类名称不能超过50个字符。",
		mapGroupDuplicateName: "分类名称已存在。",
		successToUpdateMapGroup: "更新分类名称成功。",
		editMapGroup: "编辑分类",
		deleteMapGroup: "删除分类",
		confirmToDeleteMapGroup: "确定要删除分类“#1”吗？",
		deleteMapBeforeDeleteMapGroup: "删除分类前请先删除分类下的地图。",
		atLeastLeaveOneMapGroup: "至少留有一个分类。",
		successToDeleteMapGroup: "删除分类成功。",
		createMapGroupFirst: "您需要先创建一个分类。",
		successToSaveMapGroup: "保存分类成功。",
		create: "新建",
		createMapSuccess: "新建地图成功。",
		successToEditMapGroup: "修改分类成功",
		mapGroupNameHadExisted: "该分类名称已存在",
		monolayerMap: "地图",
		multillayerMap: "多层级地图",
		description: "描述",
		updateDate: "修改日期：",
		copy: "复制",
		move: "移动",
		edit: "编辑",
		deleteMap: "删除",
		copyMapSuccess: "复制地图成功。",
		noDescription: "无",
		editSuccess: "编辑地图成功。",
		moveSuccess: "移动地图成功。",
		deleteMapSuccess: "删除地图成功。",
		copyMap: "复制地图",
		mapName: "名称",
		copyTo: "复制到",
		mapNameTooLong: "名称长度不能超过50个字符。",
		mapNameCannotBeEmpty: "名称不能为空。",
		duplicateNameInMapGroup: "该分类下存在同名地图。",
		editMap: "编辑地图",
		createMap: "新建地图",
		mapDescriptionTooLong: "描述长度不能超过500个字符。",
		mapNameExist: "该地图名称已存在。",
		share: "共享",
		moveMap: "移动地图",
		moveTo: "移动到",
		comfirmToDeleteMap: "确定要删除地图“#2”吗？",
		operateConfirm: "操作确认",
		
		exportMap: "导出地图",
		importMap: "导入地图",
		noMapForExport: "没有可供导出的地图。",
		fileTooLarge: "文件太大，请重新上传。",
		uploadFileIsNull: "上传的文件为空，请重新上传。",
		fileTypeIncorrect: "文件类型不正确，请重新上传。",
		
		noMapBeSelected: "未选中地图。",
		mapGroupName: "分类名称",
		map: "地图",
		strategy: "处理策略",
		ignore: "忽略",
		overwrite: "覆盖",
		rename: "重命名",
		uploading: "正在上传中，请稍候",
		uploadFail: "上传失败",
		noMapAndMapGroup: "未找到地图分类和地图。",
		importSuccessPrompt: "成功导入#1个地图。以下地图名称冲突，请处理。",
		allIgnore: "全部忽略",
		allOverwrite: "全部覆盖",
		allRename: "全部重命名",
		
		preset: "预 置",
		systemMapGroup: "系统地图",
		chinaProvince: "中国省份示意图",
		noGroup: "没有可以选择的分类。"
	});
	
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.map.integration;
	oManager.registPackageResources(oPackage, 
	{
		mapTemplate: "选择地图模板",
		noData: "暂无数据",
		mapName: "地图名称",
		selectMapTemplate: "请选择地图模板",
		noMapTemplate: "未配置地图模板",
		mapHadBeDeleted: "地图已被删除。",
		mapIsEmpty: "未配置地图模板，无法使用。",
		systemMapGroup: "系统地图",
		chinaProvince: "中国省份示意图",
		mapGroup: "地图分类",
		preset: "预置",
		tips: "暂无地图"
	});
})();