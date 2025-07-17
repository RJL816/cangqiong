(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.lapp.scene;
	oManager.registPackageResources(oPackage, 
	{
		//qing-lapp-longer-scene.js
        promptReExecute: "請退出後重新執行",
        promptNotEnoughMemory: "服務器忙，稍後重試……",
        promptErrorOccurred: "出錯了",
        
        //card-error
        themeIsDeleted: "對應主題不存在或者已被刪除",
        themeHasNoData: "對應主題沒有定義數據",
        componentSourceHasNotFound: "該組件來源已被發布者刪除",
        lackDataEntityAuthority: "尚未獲得實體數據表的查看權限",
        subjectEntityMySQLMoreThan61Table: "當前實體關聯數據表太多，請減少實體的分析字段或刪除不需要的實體分錄",
        subjectDataSourceError: "數據源發生異常，請聯繫發佈人檢查數據源",
        qingStorageFileSizeLimit: "輕存儲空間不足",
        qingStorageNoSpace:"磁盤空間不足，請聯繫運維人員添加磁盤",
        subjectDBDataSourceError: "數據源對應的數據庫連接異常，請聯繫發佈人檢查數據源",
        noDBCenterPermission: "沒有數據中心權限，請聯繫管理員分配權限",
		noSuperQueryAuth: "沒有當前超級查詢模式的權限，請聯系管理員分配權限",
        entityDestroyed: "對應主題的數據表被損壞，請聯繫發佈人檢查數據源",
        noDBCenterOwnerPermission: "發佈人“#1”沒有數據中心權限，請聯繫發佈人檢查權限",
		noSuperQueryPerm: "發佈人“#1”沒有超級查詢相關模式的權限，請聯繫發佈人檢查權限",
		notExistTable: "無法在模式“#1”中找到該實體數據表",
		ownerNotExistTable: "數據源異常，請聯系發布人檢查數據源",
        noDmoOwnerPermission: "發布人“#1”没有數據開發平台權限，請聯系發布人檢查權限",
        noDmoPermission: "没有數據開發平台權限，請聯繫管理員分配權限",
        dmoPermission: "没有數據開發平台#1權限，請檢查數據開發平台權限",
        cardHasNotFound: "該卡片已被刪除",
        componentSourceNoAuthority: "沒有該組件來源的查看權限",
        cardNoAuthority: "沒有該卡片的查看權限",
        cardNoDefaultSchema: "該卡片沒有定義默認方案",
        unsupportedDsbRefSource: "當前系統不支持該組件來源",
        illegalLicense: "當前系統沒有【輕分析】模塊的使用許可，請與系統管理員聯繫。",
        noQingModulePermission: "您所使用的賬戶沒有被分配【輕分析】模塊的使用許可，輕與系統管理員聯繫。",
        illegalQingReportLicense:"當前系統沒有【輕報表】模塊的使用許可，請與系統管理員聯繫。",
        noQingReportModulePermission:"您所使用的賬戶沒有被分配【輕報表】模塊的使用許可，輕與系統管理員聯繫。",
        noAuthorityForTheseEntities: "尚未獲得以下實體數據表的查看權限：",
        qingRuntimeException: "程序發生錯誤",
        extractDataFail: "準備數據失敗",
        executeFail: "圖表執行失敗",
        unknownException: "發生了未知錯誤",
        copyErrorLog: "複製錯誤日誌",
        hasCopied: "已複製到剪貼板",   
        semicolon: "；",   
		entityNotSupportQingAnalysis: "業務實體未開啟“支持輕分析”設置項，請在開發平台的對應表單中進行設置  ",
		viewDocument: "查看幫助文檔",
		viewDetails: "查看詳情",
		DetailInfo: "詳細信息",
		notSupportQingAnalysis: "以下業務實體尚未開啟“支持輕分析”設置項:",
		iknow: "我知道了",
		confirm: "確定",
		showMessage: "消息提示",
		loadError: "獲取失敗，請重試"
	});
})();